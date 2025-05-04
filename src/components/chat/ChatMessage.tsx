
import React from "react";
import { Paperclip, Volume2, PauseCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  role: "user" | "assistant" | "system";
  content: string;
  fileUrl?: string;
  fileName?: string;
  darkMode: boolean;
  fallbackMode: boolean;
  index: number;
  playingMessageIndex: number | null;
  playMessageVoice: (text: string, messageIndex: number) => void;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  role,
  content,
  fileUrl,
  fileName,
  darkMode,
  fallbackMode,
  index,
  playingMessageIndex,
  playMessageVoice
}) => {
  return (
    <div className={`flex ${role === "user" ? "justify-end" : "justify-start"}`}>
      <div className={cn(
        "max-w-[80%] p-3 rounded-2xl",
        role === "user" 
          ? cn(
              "rounded-br-none ml-auto",
              darkMode 
                ? "bg-ruvo-500/70 text-white border border-ruvo-500/30" 
                : "bg-white border border-gray-100 shadow-sm"
            )
          : cn(
              "rounded-bl-none", 
              darkMode 
                ? "bg-slate-800/70 border border-slate-700/50" 
                : `${fallbackMode ? "bg-slate-100" : "bg-ruvo-100/70"} shadow-sm`
            )
      )}>
        {fileUrl && (
          <div className="mb-2">
            {fileUrl.startsWith('blob:') && fileName?.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? (
              <div className="relative">
                <img 
                  src={fileUrl} 
                  alt={fileName || "Uploaded file"} 
                  className="max-w-full rounded-lg max-h-60 object-contain" 
                />
                <div className={cn(
                  "mt-1 text-xs",
                  darkMode ? "text-slate-300" : "text-gray-500"
                )}>{fileName}</div>
              </div>
            ) : (
              <div className={cn(
                "flex items-center gap-2 p-2 rounded-md border",
                darkMode 
                  ? "bg-slate-700/50 border-slate-600" 
                  : "bg-gray-50 border-gray-200"
              )}>
                <div className={cn(
                  "w-8 h-8 rounded-md flex items-center justify-center",
                  darkMode ? "bg-slate-600" : "bg-gray-200"
                )}>
                  <Paperclip size={16} className={darkMode ? "text-slate-300" : "text-gray-600"} />
                </div>
                <div className="overflow-hidden">
                  <div className={cn(
                    "text-sm font-medium truncate",
                    darkMode ? "text-slate-200" : ""
                  )}>{fileName}</div>
                  <div className={cn(
                    "text-xs",
                    darkMode ? "text-slate-400" : "text-gray-500"
                  )}>File attachment</div>
                </div>
              </div>
            )}
          </div>
        )}
        <p className={cn(
          "text-sm whitespace-pre-wrap",
          darkMode ? (role === "user" ? "text-white" : "text-slate-200") : ""
        )}>{content}</p>
        {role === "assistant" && (
          <Button 
            variant="ghost"
            size="sm"
            className={cn(
              "mt-2 h-6 p-0 text-xs flex items-center gap-1",
              darkMode 
                ? "text-slate-400 hover:text-ruvo-300" 
                : "text-gray-500 hover:text-ruvo-500"
            )}
            onClick={() => playMessageVoice(content, index)}
            title={playingMessageIndex === index ? "Stop" : "Listen"}
          >
            {playingMessageIndex === index ? (
              <>
                <PauseCircle size={14} className="mr-1" /> Stop
              </>
            ) : (
              <>
                <Volume2 size={14} className="mr-1" /> Listen
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
};
