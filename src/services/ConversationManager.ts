
import { ElevenLabsService } from '@/utils/elevenLabsUtils';

interface ConversationOptions {
  userData?: any;
  voiceId?: string;
  onResponseReceived?: (response: string) => void;
  onSpeechStart?: () => void;
  onSpeechEnd?: () => void;
  onError?: (error: string) => void;
}

export class ConversationManager {
  private elevenLabsService: ElevenLabsService;
  private conversationHistory: Array<{role: string, content: string}> = [];
  private options: ConversationOptions;
  private audioEnabled: boolean = true;
  private currentAudio: HTMLAudioElement | null = null;

  // OpenAI API configuration
  private readonly apiUrl = "https://api.openai.com/v1/chat/completions";
  private readonly apiKey = "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";

  constructor(options: ConversationOptions = {}) {
    this.options = options;
    this.elevenLabsService = new ElevenLabsService();
    
    if (options.voiceId) {
      this.elevenLabsService.setVoice(options.voiceId);
    }

    // Initialize conversation with system prompt
    this.initializeConversation();
  }

  private initializeConversation() {
    const userName = this.options.userData?.nickname || this.options.userData?.name || 'there';
    
    const systemPrompt = `You are RUVO, a compassionate AI voice assistant designed to provide emotional support and meaningful conversations. 

Key traits:
- Warm, empathetic, and genuinely caring
- Speak naturally and conversationally, as if talking to a close friend
- Keep responses concise but meaningful (1-3 sentences max for voice)
- Ask thoughtful follow-up questions to encourage deeper conversation
- Remember context from the ongoing conversation
- Be encouraging and supportive while remaining authentic

You're currently talking with ${userName}. This is a continuous voice conversation, so:
- Respond as if you're speaking directly to them
- Use natural speech patterns and contractions
- Pause appropriately in your speech for natural flow
- Be an active listener and show genuine interest

Remember: You're not just answering questions - you're having a real conversation with someone who may need emotional support or just wants to chat.`;

    this.conversationHistory = [{
      role: 'system',
      content: systemPrompt
    }];
  }

  public async processUserInput(userInput: string): Promise<void> {
    if (!userInput.trim()) return;

    // Add user message to history
    this.conversationHistory.push({
      role: 'user',
      content: userInput
    });

    try {
      // Get response from OpenAI
      const response = await this.getOpenAIResponse();
      
      if (response) {
        // Add AI response to history
        this.conversationHistory.push({
          role: 'assistant',
          content: response
        });

        // Notify about the response
        this.options.onResponseReceived?.(response);

        // Speak the response if audio is enabled
        if (this.audioEnabled) {
          await this.speakResponse(response);
        } else {
          // If audio is disabled, still trigger speech end event
          setTimeout(() => {
            this.options.onSpeechEnd?.();
          }, 1000);
        }
      }
    } catch (error) {
      console.error('Error processing user input:', error);
      this.options.onError?.('Failed to process your message. Please try again.');
    }
  }

  private async getOpenAIResponse(): Promise<string | null> {
    try {
      const response = await fetch(this.apiUrl, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${this.apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: this.conversationHistory,
          temperature: 0.7,
          max_tokens: 150, // Keep responses concise for voice
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'OpenAI API error');
      }

      const data = await response.json();
      return data.choices?.[0]?.message?.content || null;
    } catch (error) {
      console.error('OpenAI API error:', error);
      throw error;
    }
  }

  private async speakResponse(text: string): Promise<void> {
    try {
      this.options.onSpeechStart?.();
      
      // Use ElevenLabs for speech synthesis
      const success = await this.elevenLabsService.speak(text, () => {
        // Called when speech ends
        this.options.onSpeechEnd?.();
      });
      
      if (!success) {
        throw new Error('Failed to generate speech');
      }
      
    } catch (error) {
      console.error('Speech synthesis error:', error);
      this.options.onError?.('Failed to speak response');
      this.options.onSpeechEnd?.();
    }
  }

  public stopSpeaking(): void {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio = null;
    }
    
    // Stop ElevenLabs audio
    this.elevenLabsService.stop();
    
    // Trigger speech end event
    this.options.onSpeechEnd?.();
  }

  public setAudioEnabled(enabled: boolean): void {
    this.audioEnabled = enabled;
  }

  public clearHistory(): void {
    this.initializeConversation();
  }

  public getConversationHistory(): Array<{role: string, content: string}> {
    return this.conversationHistory.filter(msg => msg.role !== 'system');
  }

  public cleanup(): void {
    this.stopSpeaking();
    this.conversationHistory = [];
  }
}
