
import React, { useState, useEffect } from "react";
import { Send, Mic, Paperclip, MicIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { FileUpload } from "./FileUpload";
import { cn } from "@/lib/utils";

interface ChatInputFormProps {
  input: string;
  setInput: (input: string) => void;
  sendMessage: () => void;
  isLoading: boolean;
  selectedFile: File | null;
  darkMode: boolean;
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleFileButtonClick: () => void;
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  clearSelectedFile: () => void;
  toggleListening: () => void;
  isListening: boolean;
  speechRecognitionSupported: boolean;
  onOpenVoiceConversation?: () => void;
}

export const ChatInputForm: React.FC<ChatInputFormProps> = ({
  input,
  setInput,
  sendMessage,
  isLoading,
  selectedFile,
  darkMode,
  fileInputRef,
  handleFileButtonClick,
  handleFileUpload,
  clearSelectedFile,
  toggleListening,
  isListening,
  speechRecognitionSupported,
  onOpenVoiceConversation,
}) => {
  const [showWave, setShowWave] = useState(false);

  useEffect(() => {
    setShowWave(isListening);
  }, [isListening]);

  return (
    <div className={cn(
      "p-6 border-t backdrop-blur-xl relative",
      darkMode 
        ? "bg-gradient-to-r from-slate-900/90 via-slate-800/90 to-slate-900/90 border-slate-700/50" 
        : "bg-gradient-to-r from-white/90 via-gray-50/90 to-white/90 border-gray-200/50"
    )}>
      {/* Ambient particles */}
      <div className="particles absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${20 + i * 15}%`,
              animationDelay: `${i * 0.5}s`,
              opacity: 0.6
            }}
          />
        ))}
      </div>

      <form 
        onSubmit={e => {
          e.preventDefault();
          sendMessage();
        }} 
        className="relative z-10"
      >
        <div className="relative">
          <Textarea 
            placeholder="Share your thoughts..." 
            value={input} 
            onChange={e => setInput(e.target.value)} 
            className={cn(
              "w-full min-h-[52px] max-h-[120px] resize-none pr-[140px] rounded-2xl text-sm transition-all duration-300",
              "border-2 focus:border-violet-400/50 focus:ring-4 focus:ring-violet-400/10",
              darkMode 
                ? "bg-slate-800/80 backdrop-blur-xl border-slate-600/50 text-white placeholder:text-slate-400" 
                : "bg-white/80 backdrop-blur-xl border-gray-300/50 text-gray-900 placeholder:text-gray-500",
              "shadow-lg hover:shadow-xl"
            )}
            onKeyDown={e => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }} 
          />
          
          <div className="absolute right-3 bottom-3 flex gap-2 items-center">
            <button 
              type="button" 
              className={cn(
                "p-2.5 rounded-full transition-all duration-300 hover:scale-110",
                darkMode 
                  ? "bg-slate-700/80 text-slate-300 hover:bg-slate-600/80 hover:text-white" 
                  : "bg-gray-100/80 text-gray-600 hover:bg-gray-200/80 hover:text-gray-800",
                "backdrop-blur-sm border border-white/10"
              )}
              onClick={handleFileButtonClick}
              title="Upload file"
            >
              <Paperclip size={16} />
            </button>
            
            {speechRecognitionSupported && (
              <button 
                type="button" 
                className={cn(
                  "relative p-3 rounded-full transition-all duration-300 hover:scale-110",
                  "group overflow-hidden",
                  "bg-gradient-to-r from-violet-500 to-orange-400 text-white",
                  "shadow-lg hover:shadow-xl hover:shadow-violet-500/30",
                  "backdrop-blur-sm border border-white/20",
                  "before:absolute before:inset-0 before:bg-gradient-to-r before:from-violet-600 before:to-orange-500",
                  "before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300"
                )}
                onClick={onOpenVoiceConversation || toggleListening}
                title="Start voice conversation"
              >
                <div className="relative z-10 flex items-center justify-center">
                  <MicIcon size={16} className="text-white" />
                  
                  {/* Pulsing ring effect */}
                  <div className={cn(
                    "absolute inset-0 rounded-full border-2 border-white/40",
                    "animate-ping opacity-75"
                  )} />
                  <div className={cn(
                    "absolute inset-0 rounded-full border border-white/60",
                    "animate-pulse"
                  )} />
                </div>
              </button>
            )}
            
            <button 
              type="submit" 
              className={cn(
                "p-2.5 rounded-full transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-white/10",
                (isLoading || (input.trim() === "" && !selectedFile)) 
                  ? darkMode 
                    ? "bg-slate-700/50 text-slate-500 cursor-not-allowed" 
                    : "bg-gray-100/50 text-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-violet-500 to-orange-400 text-white shadow-lg shadow-violet-500/30 hover:shadow-xl hover:shadow-violet-500/40"
              )}
              disabled={isLoading || (input.trim() === "" && !selectedFile)}
            >
              <Send size={16} />
            </button>
          </div>
        </div>
        
        <FileUpload
          selectedFile={selectedFile}
          fileInputRef={fileInputRef}
          handleFileButtonClick={handleFileButtonClick}
          handleFileUpload={handleFileUpload}
          clearSelectedFile={clearSelectedFile}
          darkMode={darkMode}
        />
      </form>
    </div>
  );
};
