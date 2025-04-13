
// ElevenLabs API integration for premium voice diversity

export interface ElevenLabsVoiceOption {
  voice_id: string;
  name: string;
  gender: 'male' | 'female';
}

// Top premium voices from ElevenLabs with distinct characteristics
export const ELEVEN_LABS_VOICES: ElevenLabsVoiceOption[] = [
  { voice_id: "9BWtsMINqrJLrRacOk9x", name: "Aria", gender: "female" },
  { voice_id: "CwhRBWXzGAHq8TQ4Fs17", name: "Roger", gender: "male" },
  { voice_id: "EXAVITQu4vr4xnSDxMaL", name: "Sarah", gender: "female" },
  { voice_id: "JBFqnCBsd6RMkjVDRZzb", name: "George", gender: "male" },
  { voice_id: "TX3LPaxmHKxFdv7VOQHJ", name: "Liam", gender: "male" },
  { voice_id: "XB0fDUnXU5powFXDhCwa", name: "Charlotte", gender: "female" },
  { voice_id: "Xb7hH8MSUJpSbSDYk0k2", name: "Alice", gender: "female" },
  { voice_id: "bIHbv24MWmeRgasZH58o", name: "Will", gender: "male" },
  { voice_id: "iP95p4xoKVk53GoZ742B", name: "Chris", gender: "male" },
  { voice_id: "pFZP5JQG7iQjIQuC4Bku", name: "Lily", gender: "female" },
];

// Default API key - can be overridden if needed
const DEFAULT_API_KEY = "sk_4ad8a41c6eb7a2c0050604676324c08f3ba24a830f9c75cf";

export class ElevenLabsService {
  private apiKey: string = DEFAULT_API_KEY;
  private selectedVoiceId: string = ELEVEN_LABS_VOICES[0].voice_id;
  private isReady: boolean = true;

  constructor(apiKey?: string) {
    if (apiKey) {
      this.apiKey = apiKey;
    }
  }

  public setApiKey(apiKey: string): boolean {
    if (!apiKey) return false;
    this.apiKey = apiKey;
    return true;
  }

  public getVoices(): ElevenLabsVoiceOption[] {
    return ELEVEN_LABS_VOICES;
  }

  public setVoice(voiceId: string): boolean {
    const voice = ELEVEN_LABS_VOICES.find(v => v.voice_id === voiceId);
    if (voice) {
      this.selectedVoiceId = voiceId;
      return true;
    }
    return false;
  }

  public setVoiceByIndex(index: number): boolean {
    if (index >= 0 && index < ELEVEN_LABS_VOICES.length) {
      this.selectedVoiceId = ELEVEN_LABS_VOICES[index].voice_id;
      return true;
    }
    return false;
  }

  public getSelectedVoice(): ElevenLabsVoiceOption | null {
    return ELEVEN_LABS_VOICES.find(v => v.voice_id === this.selectedVoiceId) || null;
  }

  public isServiceReady(): boolean {
    return this.isReady;
  }

  public async speak(text: string): Promise<boolean> {
    try {
      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${this.selectedVoiceId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'xi-api-key': this.apiKey
        },
        body: JSON.stringify({
          text: text,
          model_id: "eleven_multilingual_v2",
          voice_settings: {
            similarity_boost: 0.75,
            stability: 0.5,
            style: 0.0,
            use_speaker_boost: true
          }
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('ElevenLabs API error:', errorData);
        return false;
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      
      audio.onended = () => {
        URL.revokeObjectURL(audioUrl);
      };
      
      await audio.play();
      return true;
    } catch (error) {
      console.error('Failed to generate speech with ElevenLabs:', error);
      return false;
    }
  }

  public async speakSample(voiceIndex: number = -1): Promise<boolean> {
    if (voiceIndex >= 0) {
      this.setVoiceByIndex(voiceIndex);
    }
    
    const voice = this.getSelectedVoice();
    if (!voice) return false;
    
    const sampleText = `Hello, I'm ${voice.name}. How can I help you today?`;
    return this.speak(sampleText);
  }
}
