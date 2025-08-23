import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Plus, MessageCircle, Trash2, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface Conversation {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
}

interface ConversationSidebarProps {
  activeConversationId?: string | null;
  onConversationSelect: (conversationId: string) => void;
  onNewConversation: () => void;
  darkMode?: boolean;
  isOpen: boolean;
  onClose?: () => void;
}

export const ConversationSidebar: React.FC<ConversationSidebarProps> = ({
  activeConversationId,
  onConversationSelect,
  onNewConversation,
  darkMode = false,
  isOpen,
  onClose
}) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [conversationToDelete, setConversationToDelete] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadConversations();
  }, []);

  const loadConversations = async () => {
    try {
      const { data, error } = await supabase
        .from('conversations')
        .select('*')
        .order('updated_at', { ascending: false });

      if (error) throw error;
      setConversations(data || []);
    } catch (error: any) {
      console.error('Error loading conversations:', error);
      toast({
        title: "Error",
        description: "Failed to load conversations",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleNewConversation = () => {
    onNewConversation();
    onClose?.();
  };

  const handleConversationSelect = (conversationId: string) => {
    onConversationSelect(conversationId);
    onClose?.();
  };

  const handleDeleteClick = (conversationId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setConversationToDelete(conversationId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!conversationToDelete) return;

    try {
      const { error } = await supabase
        .from('conversations')
        .delete()
        .eq('id', conversationToDelete);

      if (error) throw error;

      setConversations(prev => prev.filter(conv => conv.id !== conversationToDelete));
      
      if (activeConversationId === conversationToDelete) {
        onNewConversation();
      }

      toast({
        title: "Success",
        description: "Conversation deleted successfully"
      });
    } catch (error: any) {
      console.error('Error deleting conversation:', error);
      toast({
        title: "Error",
        description: "Failed to delete conversation",
        variant: "destructive"
      });
    } finally {
      setDeleteDialogOpen(false);
      setConversationToDelete(null);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) {
      return 'Today';
    } else if (days === 1) {
      return 'Yesterday';
    } else if (days < 7) {
      return `${days} days ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className={cn(
        "w-80 h-full border-r flex flex-col",
        darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"
      )}>
        {/* Header */}
        <div className="p-4 border-b border-inherit">
          <Button
            onClick={handleNewConversation}
            className={cn(
              "w-full gap-2",
              darkMode 
                ? "bg-violet-600 hover:bg-violet-700" 
                : "bg-violet-500 hover:bg-violet-600"
            )}
          >
            <Plus className="w-4 h-4" />
            New Conversation
          </Button>
        </div>

        {/* Conversations List */}
        <ScrollArea className="flex-1">
          <div className="p-2">
            {loading ? (
              <div className="space-y-2">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      "h-16 rounded-lg animate-pulse",
                      darkMode ? "bg-slate-700" : "bg-gray-100"
                    )}
                  />
                ))}
              </div>
            ) : conversations.length === 0 ? (
              <div className={cn(
                "text-center py-8 text-sm",
                darkMode ? "text-gray-400" : "text-gray-500"
              )}>
                <MessageCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
                No conversations yet
              </div>
            ) : (
              <div className="space-y-1">
                {conversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className={cn(
                      "group relative rounded-lg p-3 cursor-pointer transition-colors",
                      "hover:bg-opacity-50",
                      activeConversationId === conversation.id
                        ? darkMode
                          ? "bg-violet-600/20 text-violet-300"
                          : "bg-violet-100 text-violet-900"
                        : darkMode
                          ? "hover:bg-slate-700 text-gray-300"
                          : "hover:bg-gray-100 text-gray-700"
                    )}
                    onClick={() => handleConversationSelect(conversation.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <h3 className={cn(
                          "font-medium text-sm truncate",
                          activeConversationId === conversation.id
                            ? darkMode ? "text-white" : "text-violet-900"
                            : darkMode ? "text-white" : "text-gray-900"
                        )}>
                          {conversation.title}
                        </h3>
                        <p className={cn(
                          "text-xs mt-1",
                          darkMode ? "text-gray-400" : "text-gray-500"
                        )}>
                          {formatDate(conversation.updated_at)}
                        </p>
                      </div>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className={cn(
                              "opacity-0 group-hover:opacity-100 transition-opacity p-1 h-6 w-6",
                              darkMode ? "hover:bg-slate-600" : "hover:bg-gray-200"
                            )}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <MoreVertical className="w-3 h-3" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={(e) => handleDeleteClick(conversation.id, e)}
                            className="text-red-600 focus:text-red-600"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Conversation</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this conversation? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};