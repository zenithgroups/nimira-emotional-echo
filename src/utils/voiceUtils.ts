
import '../types/speech.d';

export interface VoiceOptions {
  onSpeechStart?: () => void;
  onSpeechEnd?: () => void;
  onResult?: (text: string) => void;
  onError?: (error: string) => void;
}

export interface VoiceOption {
  name: string;
  voiceObj: SpeechSynthesisVoice | null;
}

// Speech recognition implementation
export class SpeechRecognitionService {
  private recognition: any = null; // Using any to avoid type issues
  private isSupported: boolean;
  private isListening: boolean = false;
  private options: VoiceOptions = {};

  constructor(options?: VoiceOptions) {    
    // Check if SpeechRecognition is supported in this browser
    this.isSupported = typeof window !== 'undefined' && 
      (('SpeechRecognition' in window) || ('webkitSpeechRecognition' in window));
    
    if (options) this.options = options;
  }

  public initialize() {
    if (!this.isSupported) {
      console.warn('Speech recognition is not supported in this browser');
      return false;
    }

    try {
      // Use the correct way to access SpeechRecognition constructor
      const SpeechRecognitionImpl = (window as any).SpeechRecognition || 
        (window as any).webkitSpeechRecognition;
        
      this.recognition = new SpeechRecognitionImpl();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.lang = 'en-US';

      this.recognition.onstart = () => {
        this.isListening = true;
        if (this.options.onSpeechStart) this.options.onSpeechStart();
      };

      this.recognition.onend = () => {
        this.isListening = false;
        if (this.options.onSpeechEnd) this.options.onSpeechEnd();
      };

      this.recognition.onerror = (event: any) => {
        if (this.options.onError) this.options.onError(event.error);
        console.error('Speech recognition error:', event.error);
      };

      this.recognition.onresult = (event: any) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        if (finalTranscript !== '' && this.options.onResult) {
          this.options.onResult(finalTranscript);
        }
      };

      return true;
    } catch (error) {
      console.error('Failed to initialize speech recognition:', error);
      return false;
    }
  }

  public start() {
    if (!this.recognition) {
      const initialized = this.initialize();
      if (!initialized) return false;
    }

    if (this.isListening) return true;

    try {
      this.recognition.start();
      return true;
    } catch (error) {
      console.error('Failed to start speech recognition:', error);
      return false;
    }
  }

  public stop() {
    if (!this.recognition || !this.isListening) return;
    try {
      this.recognition.stop();
    } catch (error) {
      console.error('Failed to stop speech recognition:', error);
    }
  }

  public isRecognitionSupported() {
    return this.isSupported;
  }
}

// Text-to-Speech implementation
export class SpeechSynthesisService {
  private synth: SpeechSynthesis;
  private voice: SpeechSynthesisVoice | null = null;
  private isSupported: boolean;
  private availableVoices: VoiceOption[] = [];

  constructor() {
    this.isSupported = 'speechSynthesis' in window;
    this.synth = window.speechSynthesis;
    this.loadVoices();
  }

  private loadVoices() {
    if (!this.isSupported) return;

    // Handle the case when voices are already loaded
    const populateVoices = () => {
      const voices = this.synth.getVoices();
      
      // Create voice options with agent-like names based on voice characteristics
      this.availableVoices = voices
        .filter(voice => voice.lang.includes('en'))
        .map((voice, index) => {
          // Create agent-like names based on voice characteristics
          let agentName = '';
          
          if (voice.name.toLowerCase().includes('female') || 
              voice.name.toLowerCase().includes('woman') || 
              voice.name.toLowerCase().includes('girl')) {
            // Female voices
            const femaleNames = ["Sophia", "Nova", "Emma", "Olivia", "Harper", "Aria", "Maya", "Zoe"];
            agentName = femaleNames[index % femaleNames.length];
          } else {
            // Male voices
            const maleNames = ["Max", "Atlas", "Ethan", "Jack", "Leo", "Owen", "Theo", "Kai"];
            agentName = maleNames[index % maleNames.length];
          }
          
          return {
            name: `${agentName} (Agent ${index + 1})`,
            voiceObj: voice
          };
        });

      // Select a default voice
      if (this.availableVoices.length > 0) {
        this.voice = this.availableVoices[0].voiceObj;
      }
    };

    // Chrome loads voices asynchronously
    if (this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = populateVoices;
    }

    // Try initial population - works for Firefox
    populateVoices();
  }

  public getVoices(): VoiceOption[] {
    return this.availableVoices;
  }

  public setVoiceByIndex(index: number) {
    if (index >= 0 && index < this.availableVoices.length) {
      this.voice = this.availableVoices[index].voiceObj;
      return true;
    }
    return false;
  }

  public speak(text: string, rate: number = 1, pitch: number = 1) {
    if (!this.isSupported) {
      console.warn('Speech synthesis not supported');
      return false;
    }

    try {
      this.synth.cancel(); // Cancel any ongoing speech
      const utterance = new SpeechSynthesisUtterance(text);
      
      if (this.voice) {
        utterance.voice = this.voice;
      }
      
      utterance.rate = rate;
      utterance.pitch = pitch;
      this.synth.speak(utterance);
      return true;
    } catch (error) {
      console.error('Failed to synthesize speech:', error);
      return false;
    }
  }

  public speakSample(voiceIndex: number) {
    if (this.setVoiceByIndex(voiceIndex)) {
      this.speak("Hello, this is a sample of my voice.");
      return true;
    }
    return false;
  }

  public stop() {
    if (!this.isSupported) return;
    this.synth.cancel();
  }

  public isSynthesisSupported() {
    return this.isSupported;
  }
}
