
import React from "react";
import { Send, Mic } from "lucide-react";
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
}) => {
  return (
    <div className={cn(
      "p-4 border-t",
      darkMode 
        ? "border-slate-700/50 bg-slate-800/30 backdrop-blur-md" 
        : "border-ruvo-200/30 bg-white/30 backdrop-blur-md"
    )}>
      <form 
        onSubmit={e => {
          e.preventDefault();
          sendMessage();
        }} 
        className="relative"
      >
        <div className="relative">
          <Textarea 
            placeholder="Type a message..." 
            value={input} 
            onChange={e => setInput(e.target.value)} 
            className={cn(
              "w-full min-h-[44px] max-h-[120px] resize-none pr-[76px] rounded-xl text-sm",
              darkMode 
                ? "bg-slate-700/70 border-slate-600 focus:border-ruvo-400 text-white placeholder:text-slate-400" 
                : "bg-white/80 border-gray-200 focus:border-ruvo-300"
            )}
            onKeyDown={e => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }} 
          />
          
          <div className="absolute right-2.5 bottom-2.5 flex gap-2">
            <button 
              type="button" 
              className={cn(
                "p-2 rounded-full transition-colors",
                darkMode 
                  ? "bg-slate-600 text-slate-300 hover:bg-slate-500" 
                  : "bg-gray-200 text-gray-500 hover:bg-gray-300"
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
                  "p-2 rounded-full transition-colors",
                  isListening 
                    ? "bg-ruvo-500 text-white" 
                    : (darkMode 
                      ? "bg-slate-600 text-slate-300 hover:bg-slate-500" 
                      : "bg-gray-200 text-gray-500 hover:bg-gray-300"
                    )
                )}
                onClick={toggleListening}
                title={isListening ? "Stop listening" : "Start voice input"}
              >
                <Mic size={16} className={isListening ? "animate-pulse" : ""} />
              </button>
            )}
            
            <button 
              type="submit" 
              className={cn(
                "p-2 rounded-full transition-colors",
                (isLoading || (input.trim() === "" && !selectedFile)) 
                  ? (darkMode 
                    ? "bg-slate-600 text-slate-400 cursor-not-allowed" 
                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                  )
                  : "bg-ruvo-400 hover:bg-ruvo-500 text-white"
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
