
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Trash } from "lucide-react";

interface DeleteChatDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  chatTitle: string;
  onDeleteConfirm: () => void;
  darkMode: boolean;
}

export const DeleteChatDialog: React.FC<DeleteChatDialogProps> = ({
  open,
  setOpen,
  chatTitle,
  onDeleteConfirm,
  darkMode,
}) => {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className={darkMode ? "bg-slate-800 border-slate-700 text-white" : ""}>
        <AlertDialogHeader>
          <AlertDialogTitle className={darkMode ? "text-white" : ""}>
            <div className="flex items-center gap-2">
              <Trash size={16} className="text-red-500" />
              Delete Chat
            </div>
          </AlertDialogTitle>
          <AlertDialogDescription className={darkMode ? "text-slate-300" : ""}>
            Are you sure you want to delete "{chatTitle}"? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className={darkMode ? "bg-slate-700 text-white hover:bg-slate-600" : ""}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction 
            onClick={onDeleteConfirm}
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
