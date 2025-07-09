import React, { useState, useRef, useEffect } from 'react';
import { X, Phone, PhoneOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface VoiceConversationProps {
  isOpen: boolean;
  onClose: () => void;
  darkMode: boolean;
  isListening: boolean;
  onToggleListening: () => void;
  isProcessing: boolean;
  onSendMessage: (message: string) => void;
}

export const VoiceConversation: React.FC<VoiceConversationProps> = ({
  isOpen,
  onClose,
  darkMode,
  isListening,
  onToggleListening,
  isProcessing,
  onSendMessage
}) => {
  const [audioData, setAudioData] = useState<number[]>([]);
  const [transcript, setTranscript] = useState('');
  const animationRef = useRef<number>();

  // Generate random audio visualization data
  useEffect(() => {
    if (isListening || isProcessing) {
      const generateWaveform = () => {
        const newData = Array.from({ length: 50 }, () => Math.random() * 100);
        setAudioData(newData);
        animationRef.current = requestAnimationFrame(generateWaveform);
      };
      generateWaveform();
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      setAudioData(Array(50).fill(0));
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isListening, isProcessing]);

  if (!isOpen) return null;

  return (
    <div className={cn(
      "fixed inset-0 z-50 flex items-center justify-center",
      "backdrop-blur-xl transition-all duration-500",
      darkMode 
        ? "bg-black/80" 
        : "bg-white/80"
    )}>
      {/* Background overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 via-black/40 to-orange-900/20" />
      
      {/* Voice interface content */}
      <div className={cn(
        "relative w-full max-w-md mx-4 p-8 rounded-3xl backdrop-blur-2xl",
        "border border-white/10 shadow-2xl",
        darkMode 
          ? "bg-gradient-to-br from-slate-900/90 via-slate-800/80 to-slate-900/90" 
          : "bg-gradient-to-br from-white/90 via-gray-50/80 to-white/90"
      )}>
        {/* Close button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className={cn(
            "absolute top-4 right-4 rounded-full w-10 h-10 p-0",
            darkMode 
              ? "text-slate-400 hover:text-white hover:bg-slate-700/50" 
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-200/50"
          )}
        >
          <X size={18} />
        </Button>

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className={cn(
            "text-2xl font-semibold mb-2",
            darkMode ? "text-white" : "text-gray-900"
          )}>
            Voice Chat
          </h2>
          <p className={cn(
            "text-sm",
            darkMode ? "text-slate-300" : "text-gray-600"
          )}>
            {isListening ? "Listening..." : isProcessing ? "AI is responding..." : "Tap to speak"}
          </p>
        </div>

        {/* Waveform visualization */}
        <div className="flex items-center justify-center h-32 mb-8">
          <div className="flex items-end justify-center gap-1 h-full w-full max-w-xs">
            {audioData.map((value, index) => (
              <div
                key={index}
                className={cn(
                  "rounded-full transition-all duration-150 ease-out",
                  isListening 
                    ? "bg-gradient-to-t from-orange-500 to-violet-500" 
                    : isProcessing
                      ? "bg-gradient-to-t from-violet-500 to-orange-500"
                      : darkMode 
                        ? "bg-slate-600" 
                        : "bg-gray-300"
                )}
                style={{
                  height: `${Math.max(4, value)}%`,
                  width: '3px',
                  transform: isListening || isProcessing ? 'scaleY(1)' : 'scaleY(0.1)',
                }}
              />
            ))}
          </div>
        </div>

        {/* Transcript display */}
        {transcript && (
          <div className={cn(
            "mb-6 p-4 rounded-2xl backdrop-blur-sm",
            darkMode 
              ? "bg-slate-800/50 text-slate-100" 
              : "bg-white/50 text-gray-800"
          )}>
            <p className="text-sm">{transcript}</p>
          </div>
        )}

        {/* Control buttons */}
        <div className="flex justify-center gap-4">
          <Button
            onClick={onToggleListening}
            disabled={isProcessing}
            className={cn(
              "w-16 h-16 rounded-full transition-all duration-300",
              "hover:scale-110 shadow-lg backdrop-blur-sm",
              isListening
                ? "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white"
                : "bg-gradient-to-r from-violet-500 to-orange-500 hover:from-violet-600 hover:to-orange-600 text-white",
              "border border-white/20"
            )}
          >
            {isListening ? <PhoneOff size={24} /> : <Phone size={24} />}
          </Button>
        </div>

        {/* Status indicator */}
        <div className="text-center mt-4">
          <div className={cn(
            "inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs",
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
                  : "bg-gray-400"
            )} />
            {isListening ? "Recording" : isProcessing ? "Processing" : "Ready"}
          </div>
        </div>
      </div>

      {/* Ambient particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={cn(
              "absolute w-1 h-1 rounded-full opacity-30",
              "animate-pulse",
              darkMode ? "bg-violet-400" : "bg-violet-600"
            )}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};