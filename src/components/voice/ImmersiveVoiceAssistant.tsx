import React, { useState, useRef, useEffect, useCallback } from 'react';
import { X, Mic, MicOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { VoiceRecognitionService } from '@/services/VoiceRecognitionService';
import { ConversationManager } from '@/services/ConversationManager';
import { useToast } from '@/hooks/use-toast';

interface ImmersiveVoiceAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  userData?: any;
  selectedVoiceId?: string;
}

type AssistantState = 'idle' | 'listening' | 'thinking' | 'speaking' | 'stopped' | 'error';

export const ImmersiveVoiceAssistant: React.FC<ImmersiveVoiceAssistantProps> = ({
  isOpen,
  onClose,
  userData,
  selectedVoiceId
}) => {
  const [state, setState] = useState<AssistantState>('idle');
  const [isConversationActive, setIsConversationActive] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const [statusMessage, setStatusMessage] = useState('');
  
  const voiceService = useRef<VoiceRecognitionService | null>(null);
  const conversationManager = useRef<ConversationManager | null>(null);
  const audioContext = useRef<AudioContext | null>(null);
  const analyser = useRef<AnalyserNode | null>(null);
  const mediaStream = useRef<MediaStream | null>(null);
  const animationFrame = useRef<number | null>(null);
  const { toast } = useToast();

  // Initialize audio context for real-time visualization
  const initializeAudioContext = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStream.current = stream;
      
      audioContext.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      analyser.current = audioContext.current.createAnalyser();
      
      const source = audioContext.current.createMediaStreamSource(stream);
      source.connect(analyser.current);
      
      analyser.current.fftSize = 256;
      analyser.current.smoothingTimeConstant = 0.8;
      
      return true;
    } catch (error) {
      console.error('Failed to initialize audio context:', error);
      return false;
    }
  }, []);

  // Real-time audio level monitoring
  const updateAudioLevel = useCallback(() => {
    if (!analyser.current) return;
    
    const dataArray = new Uint8Array(analyser.current.frequencyBinCount);
    analyser.current.getByteFrequencyData(dataArray);
    
    // Calculate average amplitude
    const sum = dataArray.reduce((acc, val) => acc + val, 0);
    const average = sum / dataArray.length;
    const normalizedLevel = Math.min(100, (average / 128) * 100);
    
    setAudioLevel(normalizedLevel);
    
    if (state === 'listening' || state === 'speaking') {
      animationFrame.current = requestAnimationFrame(updateAudioLevel);
    }
  }, [state]);

  // Initialize services
  useEffect(() => {
    if (!isOpen) return;

    // Initialize voice recognition service
    voiceService.current = new VoiceRecognitionService({
      continuous: true,
      interimResults: false,
      silenceTimeout: 1000, // 1 second of silence
      onSpeechStart: () => {
        setState('listening');
        setStatusMessage('Listening...');
        updateAudioLevel();
      },
      onSpeechEnd: () => {
        setState('thinking');
        setStatusMessage('Processing...');
        if (animationFrame.current) {
          cancelAnimationFrame(animationFrame.current);
        }
        setAudioLevel(0);
      },
      onResult: (text) => {
        if (text.trim()) {
          handleUserInput(text);
        }
      },
      onError: (error) => {
        console.error('Speech recognition error:', error);
        setState('error');
        setStatusMessage('Voice recognition error');
        toast({
          title: "Voice Error",
          description: "Please check your microphone and try again.",
          variant: "destructive"
        });
      }
    });

    // Initialize conversation manager
    conversationManager.current = new ConversationManager({
      userData,
      voiceId: selectedVoiceId,
      onResponseReceived: (response) => {
        // Voice-only mode - don't store text responses
        setStatusMessage('Speaking...');
      },
      onSpeechStart: () => {
        setState('speaking');
        setStatusMessage('RUVO is speaking...');
        // Start monitoring TTS audio output
        updateAudioLevel();
      },
      onSpeechEnd: () => {
        if (animationFrame.current) {
          cancelAnimationFrame(animationFrame.current);
        }
        setAudioLevel(0);
        
        // Automatically restart listening after speech ends
        if (isConversationActive) {
          setTimeout(() => {
            restartListening();
          }, 300);
        } else {
          setState('idle');
          setStatusMessage('');
        }
      },
      onError: (error) => {
        console.error('Conversation error:', error);
        setState('error');
        setStatusMessage('Conversation error');
        toast({
          title: "Conversation Error",
          description: error,
          variant: "destructive"
        });
      }
    });

    // Initialize audio context
    initializeAudioContext();

    return () => {
      // Cleanup
      if (voiceService.current) {
        voiceService.current.cleanup();
      }
      if (conversationManager.current) {
        conversationManager.current.cleanup();
      }
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
      if (mediaStream.current) {
        mediaStream.current.getTracks().forEach(track => track.stop());
      }
      if (audioContext.current) {
        audioContext.current.close();
      }
    };
  }, [isOpen, userData, selectedVoiceId, isConversationActive, initializeAudioContext, updateAudioLevel]);

  const handleUserInput = async (text: string) => {
    if (!conversationManager.current || !text.trim()) return;
    
    try {
      await conversationManager.current.processUserInput(text);
    } catch (error) {
      console.error('Error processing user input:', error);
      setState('error');
    }
  };

  const startConversation = async () => {
    if (!voiceService.current) return;

    // Initialize audio context if not already done
    const audioInitialized = await initializeAudioContext();
    if (!audioInitialized) {
      toast({
        title: "Microphone Access Required",
        description: "Please allow microphone access to use voice features.",
        variant: "destructive"
      });
      return;
    }

    try {
      await voiceService.current.start();
      setIsConversationActive(true);
      setState('listening');
      setStatusMessage('Listening...');
      
      toast({
        title: "Voice Assistant Active",
        description: "I'm listening! Speak naturally.",
      });
    } catch (error) {
      console.error('Failed to start conversation:', error);
      setState('error');
    }
  };

  const stopConversation = () => {
    if (voiceService.current) {
      voiceService.current.stop();
    }
    if (conversationManager.current) {
      conversationManager.current.stopSpeaking();
    }
    if (animationFrame.current) {
      cancelAnimationFrame(animationFrame.current);
    }
    
    setIsConversationActive(false);
    setState('stopped');
    setStatusMessage('Conversation stopped');
    setAudioLevel(0);
    
    toast({
      title: "Voice Assistant Stopped",
      description: "Conversation has been ended."
    });
  };

  const restartListening = async () => {
    if (!isConversationActive || !voiceService.current) return;

    try {
      await voiceService.current.start();
      setState('listening');
      setStatusMessage('Listening...');
    } catch (error) {
      console.error('Failed to restart listening:', error);
      setState('error');
    }
  };

  // Calculate sphere scale based on audio level and state
  const getSphereScale = () => {
    const baseScale = 1;
    const audioScale = state === 'listening' || state === 'speaking' 
      ? 1 + (audioLevel / 300) // Scale based on real audio level
      : baseScale;
    
    return Math.max(0.8, Math.min(1.4, audioScale));
  };

  // Get sphere color based on state
  const getSphereColor = () => {
    switch (state) {
      case 'listening':
        return 'from-green-500/30 via-green-400/20 to-green-600/30';
      case 'thinking':
        return 'from-yellow-500/30 via-yellow-400/20 to-orange-500/30';
      case 'speaking':
        return 'from-blue-500/30 via-purple-400/20 to-violet-500/30';
      case 'error':
        return 'from-red-500/30 via-red-400/20 to-red-600/30';
      default:
        return 'from-slate-500/20 via-slate-400/10 to-slate-600/20';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-black to-slate-800" />
      
      {/* Ambient particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Main sphere */}
      <div className="relative flex items-center justify-center">
        <div 
          className={cn(
            "w-80 h-80 md:w-96 md:h-96 rounded-full transition-all duration-300 ease-out",
            "bg-gradient-radial border border-white/10 backdrop-blur-sm",
            `bg-gradient-to-br ${getSphereColor()}`,
            state === 'thinking' && "animate-pulse"
          )}
          style={{
            transform: `scale(${getSphereScale()})`,
            boxShadow: state !== 'idle' 
              ? `0 0 100px rgba(255, 255, 255, ${audioLevel / 200 + 0.1})` 
              : '0 0 50px rgba(255, 255, 255, 0.05)'
          }}
        >
          {/* Inner glow rings */}
          {(state === 'listening' || state === 'speaking') && (
            <>
              <div className="absolute inset-4 rounded-full border border-white/20 animate-ping" />
              <div className="absolute inset-8 rounded-full border border-white/10 animate-pulse" />
            </>
          )}
          
          {/* Center icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            {state === 'listening' && (
              <Mic className="w-16 h-16 text-green-400 animate-pulse" />
            )}
            {state === 'thinking' && (
              <div className="w-16 h-16 rounded-full border-4 border-yellow-400 border-t-transparent animate-spin" />
            )}
            {state === 'speaking' && (
              <div className="flex items-center gap-1">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-3 h-12 bg-blue-400 rounded-full animate-pulse"
                    style={{
                      animationDelay: `${i * 0.2}s`,
                      transform: `scaleY(${0.5 + (audioLevel / 100)})`
                    }}
                  />
                ))}
              </div>
            )}
            {(state === 'idle' || state === 'stopped') && (
              <Mic className="w-16 h-16 text-slate-400" />
            )}
            {state === 'error' && (
              <X className="w-16 h-16 text-red-400" />
            )}
          </div>
        </div>
      </div>

      {/* Status text */}
      {statusMessage && (
        <div className="absolute top-1/2 mt-60 text-center">
          <p className="text-white/80 text-lg font-medium">
            {statusMessage}
          </p>
        </div>
      )}

      {/* Bottom controls */}
      <div className="absolute bottom-0 left-0 right-0 p-6 flex justify-between items-end">
        {/* Mic button (fallback) */}
        <Button
          onClick={isConversationActive ? stopConversation : startConversation}
          disabled={state === 'error'}
          className={cn(
            "w-16 h-16 rounded-full border-2 border-white/20 backdrop-blur-sm transition-all duration-300",
            isConversationActive
              ? "bg-red-500/80 hover:bg-red-600/80 text-white"
              : "bg-green-500/80 hover:bg-green-600/80 text-white"
          )}
        >
          {isConversationActive ? <MicOff size={24} /> : <Mic size={24} />}
        </Button>

        {/* Stop button */}
        <Button
          onClick={stopConversation}
          className="w-16 h-16 rounded-full bg-red-500/80 hover:bg-red-600/80 text-white border-2 border-white/20 backdrop-blur-sm transition-all duration-300"
        >
          <X size={24} />
        </Button>
      </div>

      {/* Exit button */}
      <Button
        onClick={onClose}
        variant="ghost"
        className="absolute top-6 right-6 w-12 h-12 rounded-full text-white/60 hover:text-white hover:bg-white/10"
      >
        <X size={20} />
      </Button>

      {/* Instructions */}
      {!isConversationActive && state !== 'error' && (
        <div className="absolute bottom-20 left-0 right-0 text-center">
          <p className="text-white/60 text-sm">
            Tap the microphone to start a hands-free conversation
          </p>
        </div>
      )}
    </div>
  );
};