
import React, { useRef, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatMessage } from "./ChatMessage";
import { cn } from "@/lib/utils";

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
      "flex-1 px-4 py-6 overflow-y-auto",
      darkMode ? "bg-transparent" : "bg-transparent"
    )} ref={scrollAreaRef}>
      <div className="flex flex-col gap-6 max-w-3xl mx-auto md:px-0 px-2">
        {messages.map((message, index) => (
          <ChatMessage 
            key={index}
            {...message}
            index={index}
            darkMode={darkMode}
            fallbackMode={fallbackMode}
            playingMessageIndex={playingMessageIndex}
            playMessageVoice={playMessageVoice}
          />
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className={cn(
              "max-w-[80%] p-3 rounded-2xl rounded-bl-none",
              darkMode 
                ? "bg-slate-800/70 border border-slate-700/50" 
                : "bg-ruvo-100/70 shadow-sm"
            )}>
              <div className="typing-animation">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
            </div>
          </div>
        )}
      </div>
    </ScrollArea>
  );
};
