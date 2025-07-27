
// ElevenLabs API integration for premium voice diversity

export interface ElevenLabsVoiceOption {
  voice_id: string;
  name: string;
  gender: 'male' | 'female';
  description: string;
  avatar: string;
}

// Top premium voices from ElevenLabs with distinct characteristics
export const ELEVEN_LABS_VOICES: ElevenLabsVoiceOption[] = [
  { voice_id: "9BWtsMINqrJLrRacOk9x", name: "Aria", gender: "female", description: "Warm and empathetic", avatar: "👩‍🦰" },
  { voice_id: "EXAVITQu4vr4xnSDxMaL", name: "Sarah", gender: "female", description: "Gentle and caring", avatar: "👩‍🦱" },
  { voice_id: "XB0fDUnXU5powFXDhCwa", name: "Charlotte", gender: "female", description: "Friendly and supportive", avatar: "👩‍🦳" },
  { voice_id: "JBFqnCBsd6RMkjVDRZzb", name: "George", gender: "male", description: "Calm and reassuring", avatar: "👨‍🦰" },
  { voice_id: "TX3LPaxmHKxFdv7VOQHJ", name: "Liam", gender: "male", description: "Understanding and patient", avatar: "👨‍🦱" },
  { voice_id: "bIHbv24MWmeRgasZH58o", name: "Will", gender: "male", description: "Encouraging and wise", avatar: "👨‍🦳" },
];

// Default API key - can be overridden if needed
const DEFAULT_API_KEY = "sk_4ad8a41c6eb7a2c0050604676324c08f3ba24a830f9c75cf";

export class ElevenLabsService {
  private apiKey: string = DEFAULT_API_KEY;
  private selectedVoiceId: string = ELEVEN_LABS_VOICES[0].voice_id;
  private isReady: boolean = true;
  private currentAudio: HTMLAudioElement | null = null;

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

  public stop(): void {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio = null;
    }
  }

  public async speak(text: string): Promise<boolean> {
    this.stop();
    
    try {
      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${this.selectedVoiceId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'xi-api-key': this.apiKey
        },
        body: JSON.stringify({
          text: text,
          model_id: "eleven_turbo_v2", // Fastest model for minimal latency
          voice_settings: {
            similarity_boost: 0.9,
            stability: 0.3, // Lower for faster processing
            style: 0.1,
            use_speaker_boost: true
          },
          optimize_streaming_latency: 4, // Maximum optimization for speed
          output_format: "mp3_22050_32" // Lower quality for faster processing
        })
      });

      if (!response.ok) {
        console.error('ElevenLabs API error:', response.status);
        return false;
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      
      // Preload and configure for minimal delay
      audio.preload = 'auto';
      audio.crossOrigin = 'anonymous';
      
      this.currentAudio = audio;
      
      return new Promise((resolve) => {
        audio.oncanplaythrough = async () => {
          try {
            await audio.play();
            resolve(true);
          } catch (error) {
            console.error('Audio play error:', error);
            resolve(false);
          }
        };
        
        audio.onended = () => {
          URL.revokeObjectURL(audioUrl);
          this.currentAudio = null;
        };

        audio.onerror = () => {
          console.error('Audio loading error');
          URL.revokeObjectURL(audioUrl);
          this.currentAudio = null;
          resolve(false);
        };

        // Fallback timeout
        setTimeout(() => {
          if (audio.readyState >= 2) { // HAVE_CURRENT_DATA
            audio.play().then(() => resolve(true)).catch(() => resolve(false));
          } else {
            resolve(false);
          }
        }, 1000);
      });
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
    
    const sampleText = `Hello, I'm ${voice.name}. I'm here to support you and listen to whatever you'd like to share today. How are you feeling?`;
    return this.speak(sampleText);
  }
}
