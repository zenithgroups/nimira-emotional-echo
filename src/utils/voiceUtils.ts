
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
      
      // Filter out only English voices that we can use
      const englishVoices = voices.filter(voice => voice.lang.includes('en'));
      
      // Create an array to store our voice agents
      const voiceAgents: VoiceOption[] = [];
      
      // Process each voice to create distinctive voice agents
      if (englishVoices.length > 0) {
        // Separate voices by gender characteristics for better variety
        const femaleVoices = englishVoices.filter(voice => 
          voice.name.toLowerCase().includes('female') || 
          voice.name.toLowerCase().includes('woman') ||
          voice.name.toLowerCase().includes('girl') ||
          // Some voice APIs use different naming patterns
          voice.name.includes('Samantha') ||
          voice.name.includes('Victoria') ||
          voice.name.includes('Karen') ||
          voice.name.includes('Moira') ||
          voice.name.includes('Tessa')
        );
        
        const maleVoices = englishVoices.filter(voice => 
          !femaleVoices.includes(voice)
        );
        
        // Female agent names
        const femaleNames = ["Sophia", "Nova", "Emma", "Olivia", "Harper", "Aria", "Maya", "Zoe"];
        
        // Male agent names
        const maleNames = ["Max", "Atlas", "Ethan", "Jack", "Leo", "Owen", "Theo", "Kai"];
        
        // Process female voices first
        femaleVoices.forEach((voice, index) => {
          if (index < femaleNames.length) {
            voiceAgents.push({
              name: `${femaleNames[index]} (Female Agent)`,
              voiceObj: voice
            });
          }
        });
        
        // Process male voices
        maleVoices.forEach((voice, index) => {
          if (index < maleNames.length) {
            voiceAgents.push({
              name: `${maleNames[index]} (Male Agent)`,
              voiceObj: voice
            });
          }
        });
        
        // If we didn't get enough voices, add remaining voices with generic names
        if (voiceAgents.length < 4) {
          englishVoices.forEach((voice, index) => {
            if (!voiceAgents.some(agent => agent.voiceObj === voice)) {
              voiceAgents.push({
                name: `Voice Agent ${index + 1}`,
                voiceObj: voice
              });
            }
          });
        }
      }
      
      // If we still don't have any voices, use the original approach as fallback
      if (voiceAgents.length === 0) {
        englishVoices.forEach((voice, index) => {
          const isFemaleSounding = voice.name.toLowerCase().includes('female') || 
            voice.name.toLowerCase().includes('woman');
          
          const agentName = isFemaleSounding ? 
            ["Sophia", "Nova", "Emma", "Olivia"][index % 4] : 
            ["Max", "Atlas", "Ethan", "Jack"][index % 4];
            
          voiceAgents.push({
            name: `${agentName} (Agent ${index + 1})`,
            voiceObj: voice
          });
        });
      }
      
      // Save our voice agents
      this.availableVoices = voiceAgents;
      
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
    
    // As a fallback, try again after a short delay
    setTimeout(populateVoices, 1000);
  }

  public getVoices(): VoiceOption[] {
    if (this.availableVoices.length === 0 && this.isSupported) {
      // Try to reload voices if they weren't loaded initially
      this.loadVoices();
    }
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
      const voice = this.availableVoices[voiceIndex];
      const name = voice.name.split(" ")[0]; // Get just the first name
      this.speak(`Hello, I'm ${name}. How can I help you today?`);
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
