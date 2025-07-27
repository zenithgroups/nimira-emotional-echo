interface APIKeyUsage {
  key: string;
  usageCount: number;
  lastUsed: Date;
  isActive: boolean;
}

export class OpenAIKeyManager {
  private apiKeys: string[] = [
    "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",
    "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",
    "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",
    "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"
  ];
  
  private readonly FREE_TIER_LIMIT = 3;
  private readonly STORAGE_KEY = 'openai_key_usage';
  private currentKeyIndex = 0;
  private keyUsage: Map<string, APIKeyUsage> = new Map();

  constructor() {
    this.loadUsageFromStorage();
    this.initializeKeys();
  }

  private loadUsageFromStorage(): void {
    try {
      // Clear any corrupted localStorage data first
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const data = JSON.parse(stored);
        // Validate the stored data structure
        if (typeof data === 'object' && data !== null) {
          this.keyUsage = new Map(Object.entries(data).map(([key, usage]: [string, any]) => [
            key,
            {
              ...usage,
              lastUsed: new Date(usage.lastUsed || 0)
            }
          ]));
        }
      }
    } catch (error) {
      console.warn('Failed to load API key usage from storage, resetting:', error);
      localStorage.removeItem(this.STORAGE_KEY);
      this.keyUsage.clear();
    }
  }

  private saveUsageToStorage(): void {
    try {
      const data = Object.fromEntries(this.keyUsage);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.warn('Failed to save API key usage to storage:', error);
    }
  }

  private initializeKeys(): void {
    this.apiKeys.forEach(key => {
      if (!this.keyUsage.has(key)) {
        this.keyUsage.set(key, {
          key,
          usageCount: 0,
          lastUsed: new Date(0),
          isActive: true
        });
      }
    });
  }

  public getCurrentKey(): string {
    const availableKey = this.getNextAvailableKey();
    if (!availableKey) {
      console.log('All API keys exhausted, resetting counters');
      // Reset all counters if all keys are exhausted
      this.resetAllCounters();
      return this.apiKeys[0];
    }
    console.log(`Using API key ending in: ...${availableKey.slice(-6)}`);
    return availableKey;
  }

  private getNextAvailableKey(): string | null {
    // Try current key first
    const currentKey = this.apiKeys[this.currentKeyIndex];
    const currentUsage = this.keyUsage.get(currentKey);
    
    if (currentUsage && currentUsage.usageCount < this.FREE_TIER_LIMIT && currentUsage.isActive) {
      return currentKey;
    }

    // Find next available key
    for (let i = 0; i < this.apiKeys.length; i++) {
      const keyIndex = (this.currentKeyIndex + i + 1) % this.apiKeys.length;
      const key = this.apiKeys[keyIndex];
      const usage = this.keyUsage.get(key);
      
      if (usage && usage.usageCount < this.FREE_TIER_LIMIT && usage.isActive) {
        this.currentKeyIndex = keyIndex;
        return key;
      }
    }

    return null;
  }

  public recordUsage(apiKey: string): void {
    const usage = this.keyUsage.get(apiKey);
    if (usage) {
      usage.usageCount++;
      usage.lastUsed = new Date();
      this.keyUsage.set(apiKey, usage);
      this.saveUsageToStorage();
    }
  }

  public markKeyAsInvalid(apiKey: string): void {
    const usage = this.keyUsage.get(apiKey);
    if (usage) {
      usage.isActive = false;
      this.keyUsage.set(apiKey, usage);
      this.saveUsageToStorage();
    }
  }

  public resetAllCounters(): void {
    this.apiKeys.forEach(key => {
      const usage = this.keyUsage.get(key);
      if (usage) {
        usage.usageCount = 0;
        usage.isActive = true;
        this.keyUsage.set(key, usage);
      }
    });
    this.currentKeyIndex = 0;
    this.saveUsageToStorage();
  }

  public getUsageStats(): { key: string; usage: number; limit: number; active: boolean }[] {
    return this.apiKeys.map(key => {
      const usage = this.keyUsage.get(key);
      return {
        key: key.substring(0, 20) + '...',
        usage: usage?.usageCount || 0,
        limit: this.FREE_TIER_LIMIT,
        active: usage?.isActive || false
      };
    });
  }

  public async makeOpenAIRequest(url: string, options: RequestInit): Promise<Response> {
    let lastError: Error | null = null;
    
    // Try up to all available keys
    for (let attempt = 0; attempt < this.apiKeys.length; attempt++) {
      const apiKey = this.getCurrentKey();
      console.log(`API attempt ${attempt + 1}/${this.apiKeys.length} with key ending in ...${apiKey.slice(-6)}`);
      
      try {
        const response = await fetch(url, {
          ...options,
          headers: {
            ...options.headers,
            'Authorization': `Bearer ${apiKey}`
          }
        });

        if (response.ok) {
          this.recordUsage(apiKey);
          return response;
        }

        // Handle rate limit or quota exceeded
        if (response.status === 429 || response.status === 403 || response.status === 401) {
          console.warn(`API key invalid/exhausted (${response.status}), switching to next key`);
          this.markKeyAsInvalid(apiKey);
          continue;
        }

        // For other errors, still record usage but don't mark as invalid
        this.recordUsage(apiKey);
        return response;

      } catch (error) {
        console.error(`Request failed with key ${apiKey.substring(0, 20)}...`, error);
        lastError = error as Error;
        
        // Try next key
        this.markKeyAsInvalid(apiKey);
      }
    }

    // If all keys failed, throw the last error
    throw lastError || new Error('All API keys exhausted or failed');
  }
}

// Singleton instance
export const openAIKeyManager = new OpenAIKeyManager();