
import React from "react";
import { Volume2, VolumeX, ChevronDown, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ELEVEN_LABS_VOICES } from "@/utils/elevenLabsUtils";
import { cn } from "@/lib/utils";

interface VoicePopoverProps {
  darkMode: boolean;
  voiceEnabled: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  toggleVoiceOutput: () => void;
  playVoiceSample: (index: number) => void;
  changeVoice: (index: number) => void;
  currentVoiceIndex: number;
}

export const VoicePopover: React.FC<VoicePopoverProps> = ({
  darkMode,
  voiceEnabled,
  open,
  onOpenChange,
  toggleVoiceOutput,
  playVoiceSample,
  changeVoice,
  currentVoiceIndex
}) => {
  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button 
          variant={darkMode ? "outline" : "outline"} 
          size="sm" 
          className={cn(
            "text-xs flex items-center gap-1",
            darkMode ? "border-slate-700 bg-slate-800 hover:bg-slate-700" : ""
          )}
          title="Voice settings"
        >
          {voiceEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
          <ChevronDown size={12} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn(
        "w-80 p-4",
        darkMode ? "bg-slate-800 border-slate-700" : ""
      )}>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className={cn(
              "font-semibold",
              darkMode ? "text-white" : ""
            )}>Voice Agent</h4>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={toggleVoiceOutput}
                className={darkMode ? "border-slate-700 hover:bg-slate-700" : ""}
              >
                {voiceEnabled ? "Disable" : "Enable"}
              </Button>
            </div>
          </div>
          
          {voiceEnabled && (
            <div className="space-y-3">
              <h5 className={cn(
                "text-sm font-medium",
                darkMode ? "text-slate-200" : ""
              )}>Select Premium Voice</h5>
              
              <RadioGroup 
                value={String(currentVoiceIndex)} 
                onValueChange={(value) => changeVoice(parseInt(value))}
              >
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {ELEVEN_LABS_VOICES.map((voice, index) => (
                    <div key={voice.voice_id} className="flex items-center justify-between space-x-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value={String(index)} id={`voice-${index}`} />
                        <Label htmlFor={`voice-${index}`} className={cn(
                          "text-sm cursor-pointer",
                          darkMode ? "text-slate-200" : ""
                        )}>
                          {voice.name} <span className={cn(
                            "text-xs",
                            darkMode ? "text-slate-400" : "text-gray-500"
                          )}>({voice.gender})</span>
                        </Label>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => playVoiceSample(index)}
                        title="Play sample"
                        className={cn(
                          "flex items-center gap-1",
                          darkMode ? "hover:bg-slate-700 text-slate-200" : ""
                        )}
                      >
                        <PlayCircle size={14} />
                        <span className="text-xs">Sample</span>
                      </Button>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};
