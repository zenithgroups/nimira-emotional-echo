
import React from "react";
import { Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  selectedFile: File | null;
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleFileButtonClick: () => void;
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  clearSelectedFile: () => void;
  darkMode: boolean;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  selectedFile,
  fileInputRef,
  handleFileButtonClick,
  handleFileUpload,
  clearSelectedFile,
  darkMode
}) => {
  return (
    <>
      <input 
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        className="hidden"
        accept="image/*,application/pdf,text/plain"
      />
      
      {selectedFile && (
        <div className={cn(
          "mb-2 p-2 rounded-lg border flex items-center justify-between",
          darkMode 
            ? "bg-slate-700/50 border-slate-600" 
            : "bg-gray-50 border-gray-200"
        )}>
          <div className="flex items-center gap-2">
            <Paperclip size={16} className={darkMode ? "text-slate-300" : "text-gray-600"} />
            <span className={cn(
              "text-sm truncate max-w-[200px]",
              darkMode ? "text-slate-200" : ""
            )}>{selectedFile.name}</span>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={clearSelectedFile}
            className={cn(
              "h-6 w-6 p-0 rounded-full",
              darkMode ? "text-slate-300 hover:bg-slate-600" : ""
            )}
          >
            &times;
          </Button>
        </div>
      )}
      
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
    </>
  );
};
