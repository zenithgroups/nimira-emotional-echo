import React, { useRef, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatMessage } from "./ChatMessage";
import { cn } from "@/lib/utils";
import { Bot } from "lucide-react";

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
  fileUrl?: string;
  fileName?: string;
}

interface ChatMessageListProps {
  messages: Message[];
  isLoading: boolean;
  darkMode: boolean;
  fallbackMode: boolean;
  playingMessageIndex: number | null;
  playMessageVoice: (text: string, messageIndex: number) => void;
}

export const ChatMessageList: React.FC<ChatMessageListProps> = ({
  messages,
  isLoading,
  darkMode,
  fallbackMode,
  playingMessageIndex,
  playMessageVoice
}) => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current;
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  }, [messages]);

  return (
    <ScrollArea className={cn(
      "flex-1 px-6 py-8 overflow-y-auto relative",
      darkMode 
        ? "bg-gradient-to-b from-slate-900/50 via-slate-800/30 to-slate-900/50" 
        : "bg-gradient-to-b from-gray-50/50 via-white/30 to-gray-50/50"
    )} ref={scrollAreaRef}>
      {/* Ambient background */}
      <div className="particles absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${10 + (i * 8)}%`,
              top: `${20 + (i % 3) * 30}%`,
              animationDelay: `${i * 0.8}s`,
              opacity: 0.4
            }}
          />
        ))}
      </div>

      <div className="flex flex-col gap-8 max-w-4xl mx-auto relative z-10">
        {messages.map((message, index) => (
          <div 
            key={index}
            className="opacity-0 animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <ChatMessage 
              {...message}
              index={index}
              darkMode={darkMode}
              fallbackMode={fallbackMode}
              playingMessageIndex={playingMessageIndex}
              playMessageVoice={playMessageVoice}
            />
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-3 items-start animate-fade-in">
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
              "ai-avatar speaking",
              darkMode 
                ? "bg-gradient-to-br from-violet-600 to-violet-800" 
                : "bg-gradient-to-br from-violet-500 to-violet-700"
            )}>
              <Bot size={14} className="text-white" />
            </div>
            <div className={cn(
              "p-4 rounded-2xl rounded-bl-sm backdrop-blur-xl",
              darkMode 
                ? "chat-bubble-assistant" 
                : "chat-bubble-assistant-light"
            )}>
              <div className="typing-indicator">
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ScrollArea>
  );
};