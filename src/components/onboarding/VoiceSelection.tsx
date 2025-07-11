
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Play, Pause, Mic, ChevronLeft, ChevronRight, Volume2 } from 'lucide-react';
import { ELEVEN_LABS_VOICES, ElevenLabsService } from '@/utils/elevenLabsUtils';

interface VoiceSelectionProps {
  onVoiceSelect: (voiceId: string) => void;
  onSkip: () => void;
  darkMode: boolean;
}

export const VoiceSelection: React.FC<VoiceSelectionProps> = ({
  onVoiceSelect,
  onSkip,
  darkMode
}) => {
  const [selectedVoice, setSelectedVoice] = useState<string>(ELEVEN_LABS_VOICES[0].voice_id);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playingVoice, setPlayingVoice] = useState<string | null>(null);
  const [sampleError, setSampleError] = useState<string | null>(null);
  const elevenLabsService = React.useRef(new ElevenLabsService());

  const handlePrevious = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : ELEVEN_LABS_VOICES.length - 1;
    setCurrentIndex(newIndex);
    setSelectedVoice(ELEVEN_LABS_VOICES[newIndex].voice_id);
  };

  const handleNext = () => {
    const newIndex = currentIndex < ELEVEN_LABS_VOICES.length - 1 ? currentIndex + 1 : 0;
    setCurrentIndex(newIndex);
    setSelectedVoice(ELEVEN_LABS_VOICES[newIndex].voice_id);
  };

  const playVoiceSample = async (voiceId: string) => {
    if (playingVoice === voiceId) {
      setPlayingVoice(null);
      elevenLabsService.current.stop();
      return;
    }
    
    setPlayingVoice(voiceId);
    setSampleError(null);
    
    try {
      const voiceIndex = ELEVEN_LABS_VOICES.findIndex(v => v.voice_id === voiceId);
      const success = await elevenLabsService.current.speakSample(voiceIndex);
      
      if (!success) {
        setSampleError("Sample unavailable");
      }
      
      setTimeout(() => {
        setPlayingVoice(null);
      }, 4000);
    } catch (error) {
      console.error('Error playing voice sample:', error);
      setSampleError("Sample unavailable");
      setPlayingVoice(null);
    }
  };

  const handleConfirm = () => {
    onVoiceSelect(selectedVoice);
  };

  const currentVoice = ELEVEN_LABS_VOICES[currentIndex];

  return (
    <div className={cn(
      "fixed inset-0 z-50 flex items-center justify-center transition-all duration-500",
      "backdrop-blur-xl",
      darkMode 
        ? "bg-gradient-to-br from-black/90 via-slate-900/90 to-black/90" 
        : "bg-gradient-to-br from-white/90 via-gray-50/90 to-white/90"
    )}>
      {/* Ambient particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className={cn(
              "absolute w-1 h-1 rounded-full opacity-20 animate-pulse",
              darkMode ? "bg-orange-400" : "bg-orange-600"
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

      <Card className={cn(
        "w-full max-w-lg mx-4 relative backdrop-blur-2xl border-white/10 shadow-2xl",
        darkMode 
          ? "bg-gradient-to-br from-slate-900/95 via-slate-800/90 to-slate-900/95 text-white" 
          : "bg-gradient-to-br from-white/95 via-gray-50/90 to-white/95"
      )}>
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-violet-400 flex items-center justify-center">
              <Volume2 size={32} className="text-white" />
            </div>
          </div>
          <CardTitle className={cn(
            "text-2xl font-bold mb-2",
            darkMode ? "text-white" : "text-gray-900"
          )}>
            Choose Your AI Voice
          </CardTitle>
          <CardDescription className={cn(
            "text-sm",
            darkMode ? "text-slate-300" : "text-gray-600"
          )}>
            Select a voice that feels right for your conversations
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Voice carousel */}
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handlePrevious}
                className={cn(
                  "rounded-full w-10 h-10 p-0",
                  darkMode 
                    ? "text-slate-400 hover:text-white hover:bg-slate-700/50" 
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-200/50"
                )}
              >
                <ChevronLeft size={20} />
              </Button>
              
              <div className="text-center flex-1">
                <div className="text-4xl mb-2">{currentVoice.avatar}</div>
                <h3 className={cn(
                  "text-xl font-semibold",
                  darkMode ? "text-white" : "text-gray-900"
                )}>
                  {currentVoice.name}
                </h3>
                <p className={cn(
                  "text-sm",
                  darkMode ? "text-slate-300" : "text-gray-600"
                )}>
                  {currentVoice.description}
                </p>
                <div className={cn(
                  "inline-block px-3 py-1 rounded-full text-xs mt-2",
                  currentVoice.gender === 'female'
                    ? "bg-pink-100 text-pink-800"
                    : "bg-blue-100 text-blue-800",
                  darkMode && currentVoice.gender === 'female'
                    ? "bg-pink-900/30 text-pink-300"
                    : darkMode && "bg-blue-900/30 text-blue-300"
                )}>
                  {currentVoice.gender === 'female' ? '♀' : '♂'} {currentVoice.gender}
                </div>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handleNext}
                className={cn(
                  "rounded-full w-10 h-10 p-0",
                  darkMode 
                    ? "text-slate-400 hover:text-white hover:bg-slate-700/50" 
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-200/50"
                )}
              >
                <ChevronRight size={20} />
              </Button>
            </div>

            {/* Sample play button */}
            <div className="flex justify-center mb-6">
              <Button
                onClick={() => playVoiceSample(currentVoice.voice_id)}
                variant="outline"
                className={cn(
                  "rounded-full px-6 py-2 transition-all duration-300 hover:scale-105",
                  darkMode 
                    ? "border-slate-600 text-slate-300 hover:bg-slate-800 hover:border-slate-500" 
                    : "border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400",
                  playingVoice === currentVoice.voice_id && "animate-pulse"
                )}
              >
                {playingVoice === currentVoice.voice_id ? (
                  <>
                    <Pause size={16} className="mr-2" />
                    Playing...
                  </>
                ) : (
                  <>
                    <Play size={16} className="mr-2" />
                    Play Sample
                  </>
                )}
              </Button>
            </div>

            {/* Error message */}
            {sampleError && (
              <div className="text-center mb-4">
                <p className="text-red-500 text-sm">{sampleError}</p>
              </div>
            )}

            {/* Voice indicators */}
            <div className="flex justify-center gap-2 mb-6">
              {ELEVEN_LABS_VOICES.map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all duration-300",
                    index === currentIndex
                      ? "bg-gradient-to-r from-violet-500 to-orange-400 w-6"
                      : darkMode
                        ? "bg-slate-600"
                        : "bg-gray-300"
                  )}
                />
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onSkip}
              className={cn(
                "flex-1 h-12 rounded-xl transition-all duration-300",
                darkMode 
                  ? "border-slate-600 text-slate-300 hover:bg-slate-800" 
                  : "border-gray-300 text-gray-700 hover:bg-gray-100"
              )}
            >
              Skip for now
            </Button>
            <Button
              onClick={handleConfirm}
              className={cn(
                "flex-1 h-12 rounded-xl transition-all duration-300 hover:scale-105",
                "bg-gradient-to-r from-violet-500 to-orange-400 text-white border-0",
                "hover:from-violet-600 hover:to-orange-500 hover:shadow-lg",
                "shadow-lg backdrop-blur-sm"
              )}
            >
              <Mic size={16} className="mr-2" />
              Choose {currentVoice.name}
            </Button>
          </div>

          {/* Info message */}
          <div className="text-center">
            <p className={cn(
              "text-xs",
              darkMode ? "text-slate-400" : "text-gray-500"
            )}>
              You can change this anytime in Settings
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
