
import React, { useState, useRef, useEffect } from 'react';
import { X, Phone, PhoneOff, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface EnhancedVoiceConversationProps {
  isOpen: boolean;
  onClose: () => void;
  darkMode: boolean;
  isListening: boolean;
  onToggleListening: () => void;
  isProcessing: boolean;
  onSendMessage: (message: string) => void;
  voiceEnabled: boolean;
  onToggleVoice: () => void;
}

export const EnhancedVoiceConversation: React.FC<EnhancedVoiceConversationProps> = ({
  isOpen,
  onClose,
  darkMode,
  isListening,
  onToggleListening,
  isProcessing,
  onSendMessage,
  voiceEnabled,
  onToggleVoice
}) => {
  const [audioData, setAudioData] = useState<number[]>([]);
  const [transcript, setTranscript] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [showResponse, setShowResponse] = useState(false);
  const [recognitionSupported, setRecognitionSupported] = useState(false);
  const animationRef = useRef<number>();
  const recognitionRef = useRef<any>(null);

  // Check speech recognition support and initialize
  useEffect(() => {
    const SpeechRecognitionConstructor = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (SpeechRecognitionConstructor) {
      setRecognitionSupported(true);
      
      try {
        const recognition = new SpeechRecognitionConstructor() as any;
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onresult = (event) => {
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

          setTranscript(finalTranscript || interimTranscript);

          if (finalTranscript) {
            onSendMessage(finalTranscript);
            setTranscript('');
          }
        };

        recognition.onerror = (event) => {
          console.error('Speech recognition error:', event.error);
          setTranscript('');
        };

        recognitionRef.current = recognition;
      } catch (error) {
        console.error('Failed to initialize speech recognition:', error);
        setRecognitionSupported(false);
      }
    } else {
      setRecognitionSupported(false);
    }
  }, [onSendMessage]);

  // Generate realistic audio visualization data
  useEffect(() => {
    if (isListening || isProcessing) {
      const generateWaveform = () => {
        const newData = Array.from({ length: 60 }, (_, index) => {
          const baseFreq = Math.sin(Date.now() * 0.001 + index * 0.1) * 50;
          const randomNoise = Math.random() * 30;
          const activity = isListening ? 70 : 40;
          return Math.max(5, baseFreq + randomNoise + activity);
        });
        setAudioData(newData);
        animationRef.current = requestAnimationFrame(generateWaveform);
      };
      generateWaveform();
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      setAudioData(Array(60).fill(8));
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isListening, isProcessing]);

  // Handle listening toggle
  const handleToggleListening = () => {
    if (!recognitionSupported || !recognitionRef.current) {
      console.warn('Speech recognition not supported');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      try {
        recognitionRef.current.start();
      } catch (error) {
        console.error('Failed to start speech recognition:', error);
      }
    }
    onToggleListening();
  };

  // Simulate AI response for demo
  useEffect(() => {
    if (isProcessing && transcript) {
      const responses = [
        "I understand how you're feeling. Let's work through this together.",
        "Your emotions are valid, and it's okay to feel this way.",
        "I'm here to support you. Would you like to talk more about what's bothering you?",
        "That sounds challenging. How are you taking care of yourself right now?"
      ];
      
      const response = responses[Math.floor(Math.random() * responses.length)];
      setAiResponse(response);
      setShowResponse(true);
      
      // Auto-hide response after a delay
      setTimeout(() => {
        setShowResponse(false);
        setAiResponse('');
      }, 4000);
    }
  }, [isProcessing, transcript]);

  if (!isOpen) return null;

  return (
    <div className={cn(
      "fixed inset-0 z-50 flex items-center justify-center",
      "backdrop-blur-2xl transition-all duration-700",
      darkMode 
        ? "bg-gradient-to-br from-black/90 via-slate-900/80 to-black/90" 
        : "bg-gradient-to-br from-white/90 via-gray-50/80 to-white/90"
    )}>
      {/* Ambient background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-900/10 via-transparent to-orange-900/10" />
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className={cn(
              "absolute w-1 h-1 rounded-full animate-pulse",
              darkMode ? "bg-violet-400/30" : "bg-violet-600/30"
            )}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${3 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Voice interface content */}
      <div className={cn(
        "relative w-full max-w-lg mx-6 p-8 rounded-3xl backdrop-blur-3xl",
        "border border-white/10 shadow-2xl transform transition-all duration-700",
        darkMode 
          ? "bg-gradient-to-br from-slate-900/95 via-slate-800/90 to-slate-900/95" 
          : "bg-gradient-to-br from-white/95 via-gray-50/90 to-white/95"
      )}>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className={cn(
              "w-12 h-12 rounded-full flex items-center justify-center",
              "bg-gradient-to-br from-violet-500 to-orange-400"
            )}>
              <img 
                src="/lovable-uploads/aa075d0b-00d3-4c46-a600-501aec587b42.png" 
                alt="Ruvo AI" 
                className="h-8 w-8 object-contain invert" 
              />
            </div>
            <div>
              <h2 className={cn(
                "text-xl font-semibold",
                darkMode ? "text-white" : "text-gray-900"
              )}>
                Voice Chat
              </h2>
              <p className={cn(
                "text-sm",
                darkMode ? "text-slate-400" : "text-gray-500"
              )}>
                {isListening ? "Listening..." : isProcessing ? "Analyzing..." : "Ready to chat"}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleVoice}
              className={cn(
                "rounded-full w-10 h-10 p-0",
                darkMode 
                  ? "text-slate-400 hover:text-white hover:bg-slate-700/50" 
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-200/50"
              )}
            >
              {voiceEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className={cn(
                "rounded-full w-10 h-10 p-0",
                darkMode 
                  ? "text-slate-400 hover:text-white hover:bg-slate-700/50" 
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-200/50"
              )}
            >
              <X size={18} />
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-center h-40 mb-8">
          <div className="flex items-end justify-center gap-1 h-full w-full max-w-sm">
            {audioData.map((value, index) => (
              <div
                key={index}
                className={cn(
                  "rounded-full transition-all duration-200 ease-out",
                  isListening 
                    ? "bg-gradient-to-t from-orange-500 via-orange-400 to-violet-500" 
                    : isProcessing
                      ? "bg-gradient-to-t from-violet-500 via-violet-400 to-orange-500"
                      : darkMode 
                        ? "bg-slate-600/50" 
                        : "bg-gray-300/50"
                )}
                style={{
                  height: `${Math.max(8, value)}%`,
                  width: '4px',
                  transform: isListening || isProcessing ? 'scaleY(1)' : 'scaleY(0.3)',
                  opacity: isListening || isProcessing ? 0.9 : 0.4,
                  animationDelay: `${index * 50}ms`
                }}
              />
            ))}
          </div>
        </div>

        {transcript && (
          <div className={cn(
            "mb-6 p-5 rounded-2xl backdrop-blur-sm transition-all duration-500",
            "border border-white/10",
            darkMode 
              ? "bg-slate-800/60 text-slate-100" 
              : "bg-white/60 text-gray-800"
          )}>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 animate-pulse" />
              <p className="text-sm leading-relaxed">{transcript}</p>
            </div>
          </div>
        )}

        {showResponse && aiResponse && (
          <div className={cn(
            "mb-6 p-5 rounded-2xl backdrop-blur-sm transition-all duration-500",
            "border border-white/10",
            darkMode 
              ? "bg-violet-900/30 text-slate-100" 
              : "bg-violet-100/60 text-gray-800"
          )}>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-orange-400 flex items-center justify-center flex-shrink-0">
                <img 
                  src="/lovable-uploads/aa075d0b-00d3-4c46-a600-501aec587b42.png" 
                  alt="AI" 
                  className="h-5 w-5 object-contain invert" 
                />
              </div>
              <p className="text-sm leading-relaxed">{aiResponse}</p>
            </div>
          </div>
        )}

        <div className="flex justify-center gap-6">
          <Button
            onClick={handleToggleListening}
            disabled={isProcessing || !recognitionSupported}
            className={cn(
              "w-20 h-20 rounded-full transition-all duration-300",
              "hover:scale-110 shadow-2xl backdrop-blur-sm",
              "relative overflow-hidden",
              isListening
                ? "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white"
                : "bg-gradient-to-r from-violet-500 to-orange-500 hover:from-violet-600 hover:to-orange-600 text-white",
              "border-2 border-white/20"
            )}
          >
            {(isListening || isProcessing) && (
              <div className="absolute inset-0 rounded-full border-2 border-white/40 animate-ping" />
            )}
            
            {isListening ? <PhoneOff size={28} /> : <Phone size={28} />}
          </Button>
        </div>

        <div className="text-center mt-6">
          <div className={cn(
            "inline-flex items-center gap-3 px-4 py-2 rounded-full text-xs font-medium",
            "backdrop-blur-sm border border-white/10",
            darkMode 
              ? "bg-slate-700/50 text-slate-300" 
              : "bg-gray-200/50 text-gray-600"
          )}>
            <div className={cn(
              "w-2 h-2 rounded-full",
              isListening 
                ? "bg-red-500 animate-pulse" 
                : isProcessing
                  ? "bg-violet-500 animate-pulse"
                  : voiceEnabled
                    ? "bg-green-500"
                    : "bg-gray-400"
            )} />
            {isListening ? "Listening to you..." : isProcessing ? "AI is analyzing..." : voiceEnabled ? "Ready to chat" : "Voice disabled"}
          </div>
        </div>

        {!recognitionSupported && (
          <div className="text-center mt-4">
            <p className={cn(
              "text-xs text-red-500",
              darkMode ? "text-red-400" : "text-red-600"
            )}>
              Speech recognition not supported in this browser
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
