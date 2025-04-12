import '../types/speech';

export interface VoiceOptions {
  onSpeechStart?: () => void;
  onSpeechEnd?: () => void;
  onResult?: (text: string) => void;
  onError?: (error: string) => void;
}

// Speech recognition implementation
export class SpeechRecognitionService {
  private recognition: SpeechRecognition | null = null;
  private isSupported: boolean;
  private isListening: boolean = false;
  private options: VoiceOptions = {};

  constructor(options?: VoiceOptions) {
    type SpeechRecognitionConstructor = new () => SpeechRecognition;
    
    this.isSupported = 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;
    if (options) this.options = options;
  }

  public initialize() {
    if (!this.isSupported) {
      console.warn('Speech recognition is not supported in this browser');
      return false;
    }

    try {
      const SpeechRecognitionImpl = window.SpeechRecognition || window.webkitSpeechRecognition;
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

      this.recognition.onerror = (event) => {
        if (this.options.onError) this.options.onError(event.error);
        console.error('Speech recognition error:', event.error);
      };

      this.recognition.onresult = (event) => {
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
      this.recognition!.start();
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

  constructor() {
    this.isSupported = 'speechSynthesis' in window;
    this.synth = window.speechSynthesis;
    this.setVoice();
  }

  private setVoice() {
    if (!this.isSupported) return;

    // Wait for voices to be loaded
    setTimeout(() => {
      const voices = this.synth.getVoices();
      // Try to find a female voice in English
      this.voice = voices.find(voice => 
        (voice.name.includes('female') || voice.name.includes('Female') || 
         voice.name.includes('girl') || voice.name.includes('Girl')) && 
        voice.lang.includes('en')
      );
      
      // If no female voice found, use any English voice
      if (!this.voice) {
        this.voice = voices.find(voice => voice.lang.includes('en')) || voices[0];
      }
    }, 100);
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

  public stop() {
    if (!this.isSupported) return;
    this.synth.cancel();
  }

  public isSynthesisSupported() {
    return this.isSupported;
  }
}
