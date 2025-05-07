
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
      "p-3 sm:p-4 border-t",
      darkMode 
        ? "border-slate-700/50 bg-slate-800/30 backdrop-blur-md" 
        : "border-ruvo-200/30 bg-white/30 backdrop-blur-md"
    )}>
      <FileUpload
        selectedFile={selectedFile}
        fileInputRef={fileInputRef}
        handleFileButtonClick={handleFileButtonClick}
        handleFileUpload={handleFileUpload}
        clearSelectedFile={clearSelectedFile}
        darkMode={darkMode}
      />
      
      <form 
        onSubmit={e => {
          e.preventDefault();
          sendMessage();
        }} 
        className="relative flex items-end gap-2"
      >
        <Textarea 
          placeholder="Type a message..." 
          value={input} 
          onChange={e => setInput(e.target.value)} 
          className={cn(
            "w-full min-h-[44px] max-h-[120px] resize-none pr-16 sm:pr-20 rounded-xl text-sm",
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
        
        <div className="absolute right-2 bottom-2 flex gap-1">
          {speechRecognitionSupported && (
            <button 
              type="button" 
              className={cn(
                "p-1.5 sm:p-2 rounded-full transition-colors",
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
              <Mic size={15} className={isListening ? "animate-pulse" : ""} />
            </button>
          )}
          
          <button 
            type="submit" 
            className={cn(
              "p-1.5 sm:p-2 rounded-full transition-colors",
              (isLoading || (input.trim() === "" && !selectedFile)) 
                ? (darkMode 
                  ? "bg-slate-600 text-slate-400 cursor-not-allowed" 
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
                )
                : "bg-ruvo-400 hover:bg-ruvo-500 text-white"
            )}
            disabled={isLoading || (input.trim() === "" && !selectedFile)}
          >
            <Send size={15} />
          </button>
        </div>
      </form>
    </div>
  );
};
