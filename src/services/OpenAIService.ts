import { supabase } from "@/integrations/supabase/client";

export class OpenAIService {
  public async makeRequest(messages: any[], options: any = {}): Promise<any> {
    try {
      console.log('Making OpenAI request via Supabase edge function');
      
      const { data, error } = await supabase.functions.invoke('openai-chat', {
        body: {
          messages,
          model: options.model || 'gpt-4o-mini',
          temperature: options.temperature || 0.7,
          max_tokens: options.max_tokens || 1000
        }
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw new Error(`OpenAI request failed: ${error.message}`);
      }

      return data;
    } catch (error) {
      console.error('OpenAI service error:', error);
      throw error;
    }
  }

  public async generateTitle(messages: any[]): Promise<string> {
    try {
      const response = await this.makeRequest([
        { role: 'system', content: 'Generate a short, descriptive title for this conversation (max 5 words)' },
        { role: 'user', content: messages.map(m => m.content).join('\n').slice(0, 200) }
      ], { max_tokens: 20 });

      return response.choices?.[0]?.message?.content || 'New Conversation';
    } catch (error) {
      console.error('Failed to generate title:', error);
      return 'New Conversation';
    }
  }
}

export const openAIService = new OpenAIService();