
import React, { useState, useEffect } from "react";
import { Paperclip, Volume2, PauseCircle, Bot, User } from "lucide-react";
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
  isTyping?: boolean;
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
  playMessageVoice,
  isTyping = false
}) => {
  const [displayedContent, setDisplayedContent] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (role === "assistant" && !isTyping) {
      setIsAnimating(true);
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex <= content.length) {
          setDisplayedContent(content.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(interval);
          setIsAnimating(false);
        }
      }, 30);

      return () => clearInterval(interval);
    } else {
      setDisplayedContent(content);
    }
  }, [content, role, isTyping]);

  const isAssistantPlaying = playingMessageIndex === index;

  return (
    <div className={cn(
      "flex gap-3 items-start group",
      role === "user" ? "justify-end" : "justify-start"
    )}>
      {/* AI Avatar */}
      {role === "assistant" && (
        <div className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1",
          "ai-avatar",
          isAssistantPlaying && "speaking",
          darkMode 
            ? "bg-gradient-to-br from-violet-600 to-violet-800" 
            : "bg-gradient-to-br from-violet-500 to-violet-700"
        )}>
          <Bot size={14} className="text-white" />
        </div>
      )}

      <div className={cn(
        "max-w-[85%] sm:max-w-[80%] p-4 rounded-2xl text-sm transition-all duration-300 group-hover:shadow-lg",
        role === "user" 
          ? "chat-bubble-user text-white rounded-br-sm ml-auto" 
          : darkMode 
            ? "chat-bubble-assistant text-slate-100 rounded-bl-sm" 
            : "chat-bubble-assistant-light text-gray-800 rounded-bl-sm"
      )}>
        {fileUrl && (
          <div className="mb-3">
            {fileUrl.startsWith('blob:') && fileName?.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? (
              <div className="relative">
                <img 
                  src={fileUrl} 
                  alt={fileName || "Uploaded file"} 
                  className="max-w-full rounded-xl max-h-60 object-contain shadow-lg" 
                />
                <div className={cn(
                  "mt-2 text-xs opacity-70",
                  darkMode ? "text-slate-300" : "text-gray-600"
                )}>{fileName}</div>
              </div>
            ) : (
              <div className={cn(
                "flex items-center gap-3 p-3 rounded-xl border backdrop-blur-sm",
                darkMode 
                  ? "bg-slate-700/30 border-slate-600/30" 
                  : "bg-white/50 border-gray-200/50"
              )}>
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center",
                  darkMode ? "bg-slate-600/50" : "bg-gray-200/70"
                )}>
                  <Paperclip size={16} className={darkMode ? "text-slate-300" : "text-gray-600"} />
                </div>
                <div className="overflow-hidden">
                  <div className={cn(
                    "text-sm font-medium truncate",
                    darkMode ? "text-slate-200" : "text-gray-800"
                  )}>{fileName}</div>
                  <div className={cn(
                    "text-xs opacity-70",
                    darkMode ? "text-slate-400" : "text-gray-500"
                  )}>File attachment</div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Typing indicator */}
        {isTyping ? (
          <div className="typing-indicator">
            <div className="typing-dot"></div>
            <div className="typing-dot"></div>
            <div className="typing-dot"></div>
          </div>
        ) : (
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {displayedContent}
            {isAnimating && <span className="animate-pulse">|</span>}
          </p>
        )}

        {role === "assistant" && !isTyping && (
          <Button 
            variant="ghost"
            size="sm"
            className={cn(
              "mt-2 h-7 px-2 text-xs flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300",
              "hover:scale-105 rounded-lg backdrop-blur-sm",
              darkMode 
                ? "text-slate-400 hover:text-violet-300 hover:bg-slate-700/50" 
                : "text-gray-500 hover:text-violet-600 hover:bg-white/50"
            )}
            onClick={() => playMessageVoice(content, index)}
            title={isAssistantPlaying ? "Stop" : "Listen"}
          >
            {isAssistantPlaying ? (
              <>
                <PauseCircle size={14} /> Stop
              </>
            ) : (
              <>
                <Volume2 size={14} /> Listen
              </>
            )}
          </Button>
        )}
      </div>

      {/* User Avatar */}
      {role === "user" && (
        <div className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1",
          "bg-gradient-to-br from-orange-400 to-orange-600"
        )}>
          <User size={14} className="text-white" />
        </div>
      )}
    </div>
  );
};
