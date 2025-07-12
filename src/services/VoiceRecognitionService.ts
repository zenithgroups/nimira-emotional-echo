
export interface VoiceRecognitionOptions {
  continuous?: boolean;
  interimResults?: boolean;
  silenceTimeout?: number;
  language?: string;
  onSpeechStart?: () => void;
  onSpeechEnd?: () => void;
  onResult?: (text: string) => void;
  onError?: (error: string) => void;
}

export class VoiceRecognitionService {
  private recognition: any = null;
  private isSupported: boolean;
  private isListening: boolean = false;
  private options: VoiceRecognitionOptions;
  private silenceTimer: NodeJS.Timeout | null = null;
  private lastSpeechTime: number = 0;

  constructor(options: VoiceRecognitionOptions = {}) {
    this.options = {
      continuous: true,
      interimResults: false,
      silenceTimeout: 1500,
      language: 'en-US',
      ...options
    };

    // Check browser support
    this.isSupported = typeof window !== 'undefined' && 
      (('SpeechRecognition' in window) || ('webkitSpeechRecognition' in window));

    if (this.isSupported) {
      this.initialize();
    }
  }

  private initialize() {
    if (!this.isSupported) return;

    try {
      const SpeechRecognitionImpl = (window as any).SpeechRecognition || 
        (window as any).webkitSpeechRecognition;
        
      this.recognition = new SpeechRecognitionImpl();
      this.setupRecognition();
    } catch (error) {
      console.error('Failed to initialize speech recognition:', error);
      this.isSupported = false;
    }
  }

  private setupRecognition() {
    if (!this.recognition) return;

    this.recognition.continuous = this.options.continuous;
    this.recognition.interimResults = this.options.interimResults;
    this.recognition.lang = this.options.language;

    this.recognition.onstart = () => {
      console.log('Speech recognition started');
      this.isListening = true;
      this.lastSpeechTime = Date.now();
      this.options.onSpeechStart?.();
    };

    this.recognition.onend = () => {
      console.log('Speech recognition ended');
      this.isListening = false;
      this.clearSilenceTimer();
      this.options.onSpeechEnd?.();
    };

    this.recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      this.isListening = false;
      this.clearSilenceTimer();
      
      // Handle specific errors
      let errorMessage = 'Speech recognition error';
      switch (event.error) {
        case 'not-allowed':
          errorMessage = 'Microphone access denied. Please allow microphone permissions.';
          break;
        case 'no-speech':
          errorMessage = 'No speech detected. Please try speaking clearly.';
          break;
        case 'network':
          errorMessage = 'Network error occurred during speech recognition.';
          break;
        default:
          errorMessage = `Speech recognition error: ${event.error}`;
      }
      
      this.options.onError?.(errorMessage);
    };

    this.recognition.onspeechstart = () => {
      console.log('Speech detected');
      this.lastSpeechTime = Date.now();
      this.clearSilenceTimer();
    };

    this.recognition.onspeechend = () => {
      console.log('Speech ended');
      this.startSilenceTimer();
    };

    this.recognition.onresult = (event: any) => {
      this.lastSpeechTime = Date.now();
      
      let finalTranscript = '';
      let interimTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      // Only call onResult with final results unless interimResults is enabled
      if (finalTranscript.trim()) {
        console.log('Final transcript:', finalTranscript);
        this.options.onResult?.(finalTranscript.trim());
      } else if (this.options.interimResults && interimTranscript.trim()) {
        console.log('Interim transcript:', interimTranscript);
        this.options.onResult?.(interimTranscript.trim());
      }
    };
  }

  private startSilenceTimer() {
    this.clearSilenceTimer();
    
    if (this.options.silenceTimeout && this.options.silenceTimeout > 0) {
      this.silenceTimer = setTimeout(() => {
        console.log('Silence timeout reached, stopping recognition');
        this.stop();
      }, this.options.silenceTimeout);
    }
  }

  private clearSilenceTimer() {
    if (this.silenceTimer) {
      clearTimeout(this.silenceTimer);
      this.silenceTimer = null;
    }
  }

  public async start(): Promise<boolean> {
    if (!this.isSupported) {
      this.options.onError?.('Speech recognition not supported in this browser');
      return false;
    }

    if (!this.recognition) {
      this.initialize();
      if (!this.recognition) {
        this.options.onError?.('Failed to initialize speech recognition');
        return false;
      }
    }

    if (this.isListening) {
      console.log('Already listening');
      return true;
    }

    try {
      this.recognition.start();
      return true;
    } catch (error) {
      console.error('Failed to start speech recognition:', error);
      this.options.onError?.('Failed to start speech recognition');
      return false;
    }
  }

  public stop() {
    if (!this.recognition || !this.isListening) return;
    
    try {
      this.clearSilenceTimer();
      this.recognition.stop();
    } catch (error) {
      console.error('Failed to stop speech recognition:', error);
    }
  }

  public isRecognitionSupported(): boolean {
    return this.isSupported;
  }

  public isCurrentlyListening(): boolean {
    return this.isListening;
  }

  public cleanup() {
    this.stop();
    this.clearSilenceTimer();
    this.recognition = null;
  }
}
