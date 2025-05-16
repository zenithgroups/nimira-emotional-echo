
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
        <div className="mt-2 p-2 rounded-lg border bg-gray-50 border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Paperclip size={16} className="text-gray-600" />
            <span className="text-sm truncate max-w-[200px]">{selectedFile.name}</span>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={clearSelectedFile}
            className="h-6 w-6 p-0 rounded-full"
          >
            &times;
          </Button>
        </div>
      )}
    </>
  );
};
