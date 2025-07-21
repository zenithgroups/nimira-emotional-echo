import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedVoiceSphereProps {
  state: 'idle' | 'listening' | 'processing' | 'speaking';
  audioLevel: number;
  onClick?: () => void;
  className?: string;
}

export const AnimatedVoiceSphere: React.FC<AnimatedVoiceSphereProps> = ({
  state,
  audioLevel,
  onClick,
  className
}) => {
  const [animationKey, setAnimationKey] = useState(0);

  // Reset animation when state changes
  useEffect(() => {
    setAnimationKey(prev => prev + 1);
  }, [state]);

  const getStateStyles = () => {
    const baseIntensity = audioLevel / 100;
    
    switch (state) {
      case 'listening':
        return {
          intensity: Math.max(0.3, baseIntensity),
          color1: 'rgba(59, 130, 246, 0.8)', // blue-500
          color2: 'rgba(139, 92, 246, 0.8)', // violet-500
          color3: 'rgba(236, 72, 153, 0.8)', // pink-500
          glowColor: 'rgba(59, 130, 246, 0.6)',
          pulseSpeed: 2 + baseIntensity * 2,
          waveSpeed: 3 + baseIntensity * 3
        };
      case 'processing':
        return {
          intensity: 0.7,
          color1: 'rgba(251, 191, 36, 0.8)', // amber-400
          color2: 'rgba(245, 158, 11, 0.8)', // amber-500
          color3: 'rgba(217, 119, 6, 0.8)', // amber-600
          glowColor: 'rgba(251, 191, 36, 0.6)',
          pulseSpeed: 1.5,
          waveSpeed: 2
        };
      case 'speaking':
        return {
          intensity: 0.9,
          color1: 'rgba(34, 197, 94, 0.8)', // green-500
          color2: 'rgba(16, 185, 129, 0.8)', // emerald-500
          color3: 'rgba(6, 182, 212, 0.8)', // cyan-500
          glowColor: 'rgba(34, 197, 94, 0.6)',
          pulseSpeed: 3,
          waveSpeed: 4
        };
      default:
        return {
          intensity: 0.2,
          color1: 'rgba(148, 163, 184, 0.4)', // slate-400
          color2: 'rgba(100, 116, 139, 0.4)', // slate-500
          color3: 'rgba(71, 85, 105, 0.4)', // slate-600
          glowColor: 'rgba(148, 163, 184, 0.3)',
          pulseSpeed: 1,
          waveSpeed: 1
        };
    }
  };

  const styles = getStateStyles();

  return (
    <div 
      className={cn("relative cursor-pointer", className)}
      onClick={onClick}
      style={{
        filter: `drop-shadow(0 0 30px ${styles.glowColor})`
      }}
    >
      {/* Outer sphere container */}
      <div className="relative w-64 h-64 rounded-full overflow-hidden">
        {/* Background sphere */}
        <div 
          className="absolute inset-0 rounded-full border-2 border-white/20"
          style={{
            background: `radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.3), transparent 50%),
                        radial-gradient(circle at center, transparent 40%, rgba(0, 0, 0, 0.3) 100%)`,
            backdropFilter: 'blur(1px)'
          }}
        />

        {/* Animated wave patterns */}
        <div 
          className="absolute inset-4 rounded-full overflow-hidden"
          key={`waves-${animationKey}`}
        >
          {/* Primary wave */}
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse 80% 60% at 50% 45%, ${styles.color1} 0%, transparent 50%)`,
              transform: `scale(${0.5 + styles.intensity * 0.5}) rotate(${audioLevel * 2}deg)`,
              animation: `voiceWave1 ${4 / styles.waveSpeed}s ease-in-out infinite`,
              opacity: 0.8 + styles.intensity * 0.2
            }}
          />

          {/* Secondary wave */}
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse 70% 80% at 45% 55%, ${styles.color2} 0%, transparent 50%)`,
              transform: `scale(${0.6 + styles.intensity * 0.4}) rotate(${-audioLevel * 1.5}deg)`,
              animation: `voiceWave2 ${3 / styles.waveSpeed}s ease-in-out infinite reverse`,
              opacity: 0.7 + styles.intensity * 0.3
            }}
          />

          {/* Tertiary wave */}
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse 90% 50% at 55% 40%, ${styles.color3} 0%, transparent 50%)`,
              transform: `scale(${0.4 + styles.intensity * 0.6}) rotate(${audioLevel * 3}deg)`,
              animation: `voiceWave3 ${5 / styles.waveSpeed}s ease-in-out infinite`,
              opacity: 0.6 + styles.intensity * 0.4
            }}
          />

          {/* Center flow pattern */}
          <div
            className="absolute inset-8 rounded-full"
            style={{
              background: `conic-gradient(from ${audioLevel * 4}deg, ${styles.color1}, ${styles.color2}, ${styles.color3}, ${styles.color1})`,
              transform: `scale(${0.3 + styles.intensity * 0.7})`,
              animation: `centerFlow ${6 / styles.waveSpeed}s linear infinite`,
              opacity: 0.5 + styles.intensity * 0.5,
              filter: 'blur(8px)'
            }}
          />
        </div>

        {/* Outer glow rings */}
        {state !== 'idle' && (
          <>
            <div 
              className="absolute inset-0 rounded-full border"
              style={{
                borderColor: styles.glowColor,
                animation: `pulse ${2 / styles.pulseSpeed}s ease-in-out infinite`,
                transform: 'scale(1.1)',
                opacity: 0.6
              }}
            />
            <div 
              className="absolute inset-0 rounded-full border"
              style={{
                borderColor: styles.glowColor,
                animation: `pulse ${2 / styles.pulseSpeed}s ease-in-out infinite 0.5s`,
                transform: 'scale(1.2)',
                opacity: 0.4
              }}
            />
            <div 
              className="absolute inset-0 rounded-full border"
              style={{
                borderColor: styles.glowColor,
                animation: `pulse ${2 / styles.pulseSpeed}s ease-in-out infinite 1s`,
                transform: 'scale(1.3)',
                opacity: 0.2
              }}
            />
          </>
        )}

        {/* Subtle highlight */}
        <div 
          className="absolute inset-2 rounded-full"
          style={{
            background: `radial-gradient(circle at 25% 25%, rgba(255, 255, 255, ${0.3 + styles.intensity * 0.2}), transparent 60%)`,
            pointerEvents: 'none'
          }}
        />
      </div>

      {/* Dynamic particles around sphere */}
      {state !== 'idle' && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div
              key={`particle-${i}-${animationKey}`}
              className="absolute w-2 h-2 rounded-full"
              style={{
                background: styles.glowColor,
                left: `${50 + Math.cos((i * Math.PI) / 4) * 45}%`,
                top: `${50 + Math.sin((i * Math.PI) / 4) * 45}%`,
                animation: `float ${3 + i * 0.2}s ease-in-out infinite ${i * 0.3}s`,
                transform: 'translate(-50%, -50%)',
                opacity: 0.6 + styles.intensity * 0.4
              }}
            />
          ))}
        </div>
      )}

      {/* CSS-in-JS styles for animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes voiceWave1 {
            0%, 100% { 
              transform: scale(${0.5 + styles.intensity * 0.5}) rotate(0deg) skewX(0deg);
            }
            25% { 
              transform: scale(${0.6 + styles.intensity * 0.4}) rotate(15deg) skewX(10deg);
            }
            50% { 
              transform: scale(${0.7 + styles.intensity * 0.3}) rotate(30deg) skewX(-5deg);
            }
            75% { 
              transform: scale(${0.6 + styles.intensity * 0.4}) rotate(45deg) skewX(15deg);
            }
          }

          @keyframes voiceWave2 {
            0%, 100% { 
              transform: scale(${0.6 + styles.intensity * 0.4}) rotate(90deg) skewY(0deg);
            }
            33% { 
              transform: scale(${0.5 + styles.intensity * 0.5}) rotate(75deg) skewY(-10deg);
            }
            66% { 
              transform: scale(${0.7 + styles.intensity * 0.3}) rotate(60deg) skewY(20deg);
            }
          }

          @keyframes voiceWave3 {
            0%, 100% { 
              transform: scale(${0.4 + styles.intensity * 0.6}) rotate(180deg) skew(0deg);
            }
            20% { 
              transform: scale(${0.6 + styles.intensity * 0.4}) rotate(195deg) skew(15deg);
            }
            40% { 
              transform: scale(${0.8 + styles.intensity * 0.2}) rotate(210deg) skew(-10deg);
            }
            60% { 
              transform: scale(${0.5 + styles.intensity * 0.5}) rotate(225deg) skew(25deg);
            }
            80% { 
              transform: scale(${0.7 + styles.intensity * 0.3}) rotate(240deg) skew(-5deg);
            }
          }

          @keyframes centerFlow {
            0% { 
              transform: scale(${0.3 + styles.intensity * 0.7}) rotate(0deg);
            }
            100% { 
              transform: scale(${0.3 + styles.intensity * 0.7}) rotate(360deg);
            }
          }

          @keyframes pulse {
            0%, 100% {
              transform: scale(1);
              opacity: 0.6;
            }
            50% {
              transform: scale(1.05);
              opacity: 0.2;
            }
          }

          @keyframes float {
            0%, 100% {
              transform: translate(-50%, -50%) translateY(0px) scale(1);
            }
            25% {
              transform: translate(-50%, -50%) translateY(-8px) scale(1.1);
            }
            50% {
              transform: translate(-50%, -50%) translateY(-4px) scale(0.9);
            }
            75% {
              transform: translate(-50%, -50%) translateY(-12px) scale(1.2);
            }
          }
        `
      }} />
    </div>
  );
};