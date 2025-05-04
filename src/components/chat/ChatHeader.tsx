
import React from "react";
import { RefreshCw, Volume2, VolumeX, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { VoicePopover } from "./VoicePopover";

interface ChatHeaderProps {
  darkMode: boolean;
  fallbackMode: boolean;
  voiceEnabled: boolean;
  voicePopoverOpen: boolean;
  setVoicePopoverOpen: (open: boolean) => void;
  toggleVoiceOutput: () => void;
  playVoiceSample: (index: number) => void;
  changeVoice: (index: number) => void;
  currentVoiceIndex: number;
  isRetrying: boolean;
  retryApiConnection: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
  darkMode,
  fallbackMode,
  voiceEnabled,
  voicePopoverOpen,
  setVoicePopoverOpen,
  toggleVoiceOutput,
  playVoiceSample,
  changeVoice,
  currentVoiceIndex,
  isRetrying,
  retryApiConnection
}) => {
  return (
    <div className={cn(
      "flex items-center gap-3 p-4 border-b",
      darkMode 
        ? "border-slate-700/50 bg-slate-800/30 backdrop-blur-md" 
        : "border-ruvo-200/20 bg-white/30 backdrop-blur-md"
    )}>
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-ruvo-400 to-ruvo-500 flex items-center justify-center text-white font-bold font-pixel-light">R</div>
      <div>
        <h3 className={cn(
          "font-pixel text-sm",
          darkMode ? "text-white" : "text-slate-800"
        )}>Ruvo AI</h3>
        <p className={cn(
          "text-xs",
          darkMode ? "text-slate-400" : "text-gray-500"
        )}>
          {fallbackMode ? "Demo Mode - Service Unavailable" : "Online - OpenAI GPT-4o Powered"}
          {voiceEnabled && " · Premium Voice"}
        </p>
      </div>
      <div className="flex gap-2 ml-auto">
        <VoicePopover
          darkMode={darkMode}
          voiceEnabled={voiceEnabled}
          open={voicePopoverOpen}
          onOpenChange={setVoicePopoverOpen}
          toggleVoiceOutput={toggleVoiceOutput}
          playVoiceSample={playVoiceSample}
          changeVoice={changeVoice}
          currentVoiceIndex={currentVoiceIndex}
        />
        
        {fallbackMode && (
          <Button 
            variant="outline" 
            size="sm" 
            className={cn(
              "text-xs flex items-center gap-1",
              darkMode ? "border-slate-700 bg-slate-800 hover:bg-slate-700" : ""
            )}
            onClick={retryApiConnection} 
            disabled={isRetrying}
          >
            {isRetrying ? (
              <>
                <RefreshCw size={14} className="animate-spin" /> Connecting...
              </>
            ) : (
              <>
                <RefreshCw size={14} /> Retry
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
};
