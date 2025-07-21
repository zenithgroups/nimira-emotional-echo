import React, { useState, useRef, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { VoiceRecognitionService } from '@/services/VoiceRecognitionService';
import { ConversationManager } from '@/services/ConversationManager';
import { useToast } from '@/hooks/use-toast';
import { AnimatedVoiceSphere } from './AnimatedVoiceSphere';

interface SiriVoiceInterfaceProps {
  isOpen: boolean;
  onClose: () => void;
  userData?: any;
  selectedVoiceId?: string;
}

type VoiceState = 'idle' | 'listening' | 'processing' | 'speaking';

export const SiriVoiceInterface: React.FC<SiriVoiceInterfaceProps> = ({
  isOpen,
  onClose,
  userData,
  selectedVoiceId
}) => {
  const [state, setState] = useState<VoiceState>('idle');
  const [audioLevel, setAudioLevel] = useState(0);
  const [isActive, setIsActive] = useState(false);
  
  const voiceService = useRef<VoiceRecognitionService | null>(null);
  const conversationManager = useRef<ConversationManager | null>(null);
  const audioContext = useRef<AudioContext | null>(null);
  const analyser = useRef<AnalyserNode | null>(null);
  const microphone = useRef<MediaStream | null>(null);
  const animationRef = useRef<number>();
  const { toast } = useToast();

  // Initialize audio analysis for real-time animation
  const initializeAudioAnalysis = useCallback(async () => {
    try {
      audioContext.current = new AudioContext();
      analyser.current = audioContext.current.createAnalyser();
      analyser.current.fftSize = 256;
      analyser.current.smoothingTimeConstant = 0.8;

      microphone.current = await navigator.mediaDevices.getUserMedia({
        audio: {
          sampleRate: 24000,
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });

      const source = audioContext.current.createMediaStreamSource(microphone.current);
      source.connect(analyser.current);

      const analyzeAudio = () => {
        if (!analyser.current) return;
        
        const dataArray = new Uint8Array(analyser.current.frequencyBinCount);
        analyser.current.getByteFrequencyData(dataArray);
        
        // Calculate average amplitude
        const average = dataArray.reduce((sum, value) => sum + value, 0) / dataArray.length;
        const normalizedLevel = Math.min(100, (average / 255) * 100);
        
        setAudioLevel(normalizedLevel);
        animationRef.current = requestAnimationFrame(analyzeAudio);
      };

      analyzeAudio();
    } catch (error) {
      console.error('Failed to initialize audio analysis:', error);
      toast({
        title: "Microphone Error",
        description: "Unable to access microphone. Please check permissions.",
        variant: "destructive"
      });
    }
  }, [toast]);

  // Initialize services
  useEffect(() => {
    if (!isOpen) return;

    // Initialize voice recognition with optimized settings for low latency
    voiceService.current = new VoiceRecognitionService({
      continuous: true,
      interimResults: false,
      silenceTimeout: 800, // Reduced for faster response
      onSpeechStart: () => {
        setState('listening');
      },
      onSpeechEnd: () => {
        setState('processing');
      },
      onResult: (text) => {
        if (text.trim()) {
          handleUserInput(text);
        }
      },
      onError: (error) => {
        console.error('Speech recognition error:', error);
        setState('idle');
        setIsActive(false);
      }
    });

    // Initialize conversation manager with optimized settings
    conversationManager.current = new ConversationManager({
      userData,
      voiceId: selectedVoiceId,
      onResponseReceived: () => {
        // Skip storing response text for Siri-like experience
      },
      onSpeechStart: () => {
        setState('speaking');
        // Pause microphone during speech to prevent feedback
        if (microphone.current) {
          microphone.current.getTracks().forEach(track => track.enabled = false);
        }
      },
      onSpeechEnd: () => {
        // Resume listening automatically after speech
        if (isActive) {
          setTimeout(() => {
            restartListening();
          }, 300); // Minimal delay for natural flow
        } else {
          setState('idle');
        }
      },
      onError: (error) => {
        console.error('Conversation error:', error);
        setState('idle');
        setIsActive(false);
      }
    });

    return () => {
      cleanup();
    };
  }, [isOpen, userData, selectedVoiceId, isActive]);

  const handleUserInput = async (text: string) => {
    if (!conversationManager.current || !text.trim()) return;
    
    try {
      // Use streamlined processing for minimal delay
      await conversationManager.current.processUserInput(text);
    } catch (error) {
      console.error('Error processing user input:', error);
      setState('idle');
      setIsActive(false);
    }
  };

  const startVoiceSession = async () => {
    if (!voiceService.current) return;

    try {
      await initializeAudioAnalysis();
      await voiceService.current.start();
      setIsActive(true);
      setState('listening');
    } catch (error) {
      console.error('Failed to start voice session:', error);
      setState('idle');
    }
  };

  const restartListening = async () => {
    if (!isActive || !voiceService.current) return;

    try {
      // Re-enable microphone
      if (microphone.current) {
        microphone.current.getTracks().forEach(track => track.enabled = true);
      }
      
      await voiceService.current.start();
      setState('listening');
    } catch (error) {
      console.error('Failed to restart listening:', error);
      setState('idle');
      setIsActive(false);
    }
  };

  const stopVoiceSession = () => {
    setIsActive(false);
    setState('idle');
    cleanup();
    onClose();
  };

  const cleanup = () => {
    if (voiceService.current) {
      voiceService.current.cleanup();
    }
    if (conversationManager.current) {
      conversationManager.current.cleanup();
    }
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    if (microphone.current) {
      microphone.current.getTracks().forEach(track => track.stop());
    }
    if (audioContext.current) {
      audioContext.current.close();
    }
  };

  // Calculate sphere animation based on state and audio level
  const getSphereAnimation = () => {
    const baseScale = 1;
    const audioScale = state === 'listening' ? 1 + (audioLevel * 0.01) : baseScale;
    
    switch (state) {
      case 'listening':
        return {
          scale: audioScale,
          opacity: 0.9,
          glow: audioLevel > 10 ? 'shadow-2xl shadow-blue-500/50' : 'shadow-xl shadow-blue-500/30'
        };
      case 'processing':
        return {
          scale: 1.1,
          opacity: 0.8,
          glow: 'shadow-2xl shadow-yellow-500/50'
        };
      case 'speaking':
        return {
          scale: 1.2,
          opacity: 1,
          glow: 'shadow-2xl shadow-green-500/60'
        };
      default:
        return {
          scale: baseScale,
          opacity: 0.7,
          glow: 'shadow-lg shadow-gray-500/20'
        };
    }
  };

  const sphereAnimation = getSphereAnimation();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900" />
      
      {/* Main interactive sphere */}
      <div 
        className="relative flex items-center justify-center"
        onClick={!isActive ? startVoiceSession : undefined}
      >
        <AnimatedVoiceSphere
          state={state}
          audioLevel={audioLevel}
          onClick={!isActive ? startVoiceSession : undefined}
        />

        {/* Tap hint for idle state */}
        {!isActive && state === 'idle' && (
          <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 text-center">
            <p className="text-white/80 text-lg font-medium mb-2">Tap to speak</p>
            <p className="text-white/50 text-sm">Hold a natural conversation</p>
          </div>
        )}
      </div>

      {/* Minimal status indicator */}
      {isActive && (
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
          <div className={cn(
            "w-3 h-3 rounded-full transition-colors duration-300",
            state === 'listening' ? 'bg-blue-500 animate-pulse' :
            state === 'processing' ? 'bg-yellow-500 animate-pulse' :
            state === 'speaking' ? 'bg-green-500 animate-pulse' :
            'bg-gray-500'
          )} />
        </div>
      )}

      {/* Exit button - bottom right */}
      {isActive && (
        <button
          onClick={stopVoiceSession}
          className="absolute bottom-8 right-8 w-14 h-14 rounded-full bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500/30 transition-all duration-200"
        >
          <div className="w-6 h-6 mx-auto">
            <div className="w-full h-0.5 bg-current rotate-45 translate-y-3" />
            <div className="w-full h-0.5 bg-current -rotate-45 translate-y-2.5" />
          </div>
        </button>
      )}
    </div>
  );
};