
import React, { useState, useEffect } from 'react';
import { Mic, Brain, Volume2, MicOff, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AudioVisualizationProps {
  state: 'idle' | 'listening' | 'thinking' | 'speaking' | 'stopped' | 'error';
  darkMode: boolean;
  isActive: boolean;
}

export const AudioVisualization: React.FC<AudioVisualizationProps> = ({
  state,
  darkMode,
  isActive
}) => {
  const [audioLevels, setAudioLevels] = useState<number[]>(Array(20).fill(0));

  // Generate audio visualization data
  useEffect(() => {
    let animationFrame: number;
    
    const updateLevels = () => {
      if (state === 'listening' || state === 'speaking') {
        const newLevels = Array.from({ length: 20 }, (_, i) => {
          const baseLevel = state === 'listening' ? 30 : 40;
          const randomVariation = Math.random() * 50;
          const sinWave = Math.sin((Date.now() * 0.005) + (i * 0.5)) * 25;
          return Math.max(5, baseLevel + randomVariation + sinWave);
        });
        setAudioLevels(newLevels);
      } else if (state === 'thinking') {
        // Gentle pulsing for thinking state
        const pulse = Math.sin(Date.now() * 0.003) * 20 + 30;
        setAudioLevels(Array(20).fill(pulse));
      } else {
        setAudioLevels(Array(20).fill(8));
      }
      
      animationFrame = requestAnimationFrame(updateLevels);
    };

    updateLevels();
    
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [state]);

  const getIcon = () => {
    switch (state) {
      case 'listening':
        return <Mic size={40} className="text-green-500" />;
      case 'thinking':
        return <Brain size={40} className="text-yellow-500" />;
      case 'speaking':
        return <Volume2 size={40} className="text-blue-500" />;
      case 'error':
        return <AlertTriangle size={40} className="text-red-500" />;
      case 'stopped':
        return <MicOff size={40} className="text-gray-500" />;
      default:
        return <Mic size={40} className={darkMode ? "text-slate-400" : "text-gray-600"} />;
    }
  };

  const getGlowColor = () => {
    switch (state) {
      case 'listening':
        return 'shadow-green-500/50';
      case 'thinking':
        return 'shadow-yellow-500/50';
      case 'speaking':
        return 'shadow-blue-500/50';
      case 'error':
        return 'shadow-red-500/50';
      default:
        return 'shadow-gray-500/20';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      {/* Central icon with glow effect */}
      <div className={cn(
        "relative p-8 rounded-full backdrop-blur-sm transition-all duration-500",
        "border border-white/20",
        state !== 'idle' && state !== 'stopped' ? 'animate-pulse' : '',
        darkMode ? "bg-slate-800/50" : "bg-white/50",
        `shadow-2xl ${getGlowColor()}`
      )}>
        {getIcon()}
        
        {/* Pulsing ring for active states */}
        {(state === 'listening' || state === 'speaking') && (
          <>
            <div className={cn(
              "absolute inset-0 rounded-full border-2 animate-ping",
              state === 'listening' ? "border-green-500/40" : "border-blue-500/40"
            )} />
            <div className={cn(
              "absolute inset-2 rounded-full border animate-pulse",
              state === 'listening' ? "border-green-500/60" : "border-blue-500/60"
            )} />
          </>
        )}
      </div>

      {/* Audio visualization bars */}
      <div className="flex items-end justify-center gap-1 h-24 w-80">
        {audioLevels.map((level, index) => (
          <div
            key={index}
            className={cn(
              "rounded-full transition-all duration-200 ease-out",
              state === 'listening' 
                ? "bg-gradient-to-t from-green-600 via-green-400 to-green-300"
                : state === 'speaking'
                  ? "bg-gradient-to-t from-blue-600 via-blue-400 to-blue-300"
                  : state === 'thinking'
                    ? "bg-gradient-to-t from-yellow-600 via-yellow-400 to-yellow-300"
                    : darkMode 
                      ? "bg-slate-600/50" 
                      : "bg-gray-300/50"
            )}
            style={{
              height: `${Math.max(4, level)}%`,
              width: '6px',
              transform: (state === 'listening' || state === 'speaking' || state === 'thinking') 
                ? 'scaleY(1)' 
                : 'scaleY(0.2)',
              opacity: (state === 'listening' || state === 'speaking' || state === 'thinking') 
                ? 0.9 
                : 0.3,
              animationDelay: `${index * 50}ms`
            }}
          />
        ))}
      </div>

      {/* Ambient particles around the visualization */}
      {(state === 'listening' || state === 'speaking') && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className={cn(
                "absolute w-2 h-2 rounded-full animate-ping",
                state === 'listening' ? "bg-green-400/30" : "bg-blue-400/30"
              )}
              style={{
                left: `${30 + Math.cos((i * Math.PI) / 4) * 100 + 10}%`,
                top: `${50 + Math.sin((i * Math.PI) / 4) * 100 + 10}%`,
                animationDelay: `${i * 200}ms`,
                animationDuration: '2s'
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};
