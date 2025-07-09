import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Plus, Menu, X, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import ChatInterface from "@/components/ChatInterface";
import { Switch } from "@/components/ui/switch";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useLongPress } from "@/hooks/use-long-press";
import { DeleteChatDialog } from "@/components/chat/DeleteChatDialog";

interface ChatHistory {
  id: string;
  title: string;
  timestamp: Date;
  lastMessage?: string;
}

const ChatPage: React.FC = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([]);
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [chatToDelete, setChatToDelete] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [pressedChatId, setPressedChatId] = useState<string | null>(null);
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  // Handle long press for any chat item
  const handleLongPress = (chatId: string) => {
    setPressedChatId(chatId);
    handleDeleteChat(chatId);
  };

  // Handle click for any chat item
  const handleClick = (chatId: string) => {
    selectChat(chatId);
  };

  // Create a single instance of the long press hook
  const longPress = useLongPress(
    (e) => {
      if (pressedChatId) {
        handleLongPress(pressedChatId);
      }
    },
    (e) => {
      if (pressedChatId) {
        handleClick(pressedChatId);
      }
    }
  );
  
  // Auto-close sidebar on mobile
  React.useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
  }, [isMobile]);

  // Load chat history from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('chatHistory');
    const savedDarkMode = localStorage.getItem('darkMode');
    
    if (savedHistory) {
      const parsedHistory = JSON.parse(savedHistory);
      // Convert string dates back to Date objects
      const processedHistory = parsedHistory.map((chat: any) => ({
        ...chat,
        timestamp: new Date(chat.timestamp)
      }));
      setChatHistory(processedHistory);
      
      // Set first chat as active if no active chat is set
      if (processedHistory.length > 0 && !activeChat) {
        setActiveChat(processedHistory[0].id);
      }
    } else {
      // Initialize with the first chat
      const initialChat = {
        id: 'chat_' + Date.now(),
        title: 'New conversation',
        timestamp: new Date(),
      };
      setChatHistory([initialChat]);
      setActiveChat(initialChat.id);
      localStorage.setItem('chatHistory', JSON.stringify([initialChat]));
    }
    
    if (savedDarkMode) {
      const isDark = savedDarkMode === 'true';
      setDarkMode(isDark);
      if (isDark) {
        document.documentElement.classList.add("dark");
      }
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', String(newDarkMode));
    document.documentElement.classList.toggle("dark");
  };
  
  const createNewChat = () => {
    const newChat = {
      id: 'chat_' + Date.now(),
      title: 'New conversation',
      timestamp: new Date(),
    };
    
    const updatedHistory = [newChat, ...chatHistory];
    setChatHistory(updatedHistory);
    setActiveChat(newChat.id);
    localStorage.setItem('chatHistory', JSON.stringify(updatedHistory));
    
    // Remove messages for this chat session
    localStorage.removeItem(`messages_${newChat.id}`);
    
    // Close sidebar on mobile after creating new chat
    if (isMobile) {
      setSidebarOpen(false);
    }
  };
  
  const selectChat = (chatId: string) => {
    setActiveChat(chatId);
    // Close sidebar on mobile after selecting a chat
    if (isMobile) {
      setSidebarOpen(false);
    }
  };
  
  const updateChatTitle = (id: string, title: string, lastMessage?: string) => {
    const updatedHistory = chatHistory.map(chat => 
      chat.id === id 
        ? { ...chat, title, lastMessage, timestamp: new Date() } 
        : chat
    );
    setChatHistory(updatedHistory);
    localStorage.setItem('chatHistory', JSON.stringify(updatedHistory));
  };
  
  const handleDeleteChat = (chatId: string) => {
    const chatToBeDeleted = chatHistory.find(chat => chat.id === chatId);
    if (chatToBeDeleted) {
      setChatToDelete(chatId);
      setIsDeleteDialogOpen(true);
    }
  };

  const confirmDeleteChat = () => {
    if (chatToDelete) {
      // Remove chat from history
      const updatedHistory = chatHistory.filter(chat => chat.id !== chatToDelete);
      setChatHistory(updatedHistory);
      
      // Update localStorage
      localStorage.setItem('chatHistory', JSON.stringify(updatedHistory));
      
      // Remove messages for this chat
      localStorage.removeItem(`messages_${chatToDelete}`);
      
      // If deleted chat was active, set another chat as active
      if (chatToDelete === activeChat) {
        if (updatedHistory.length > 0) {
          setActiveChat(updatedHistory[0].id);
        } else {
          // Create a new chat if history is empty
          createNewChat();
        }
      }
      
      toast({
        title: "Chat deleted",
        description: "The chat has been permanently removed.",
      });
      
      // Close dialog
      setIsDeleteDialogOpen(false);
      setChatToDelete(null);
    }
  };

  return (
    <div className={cn(
      "min-h-screen transition-colors duration-500 flex relative overflow-hidden",
      darkMode 
        ? "bg-gradient-to-br from-black via-slate-900 to-slate-800 text-white" 
        : "bg-gradient-to-br from-gray-50 via-white to-gray-100"
    )}>
      {/* Mobile menu button - moved to top left corner with z-index */}
      {isMobile && (
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className={cn(
            "fixed top-4 left-4 z-50 rounded-full p-2.5 transition-colors",
            darkMode ? "bg-slate-800 text-white" : "bg-white text-slate-700",
            "shadow-md hover:bg-opacity-80"
          )}
        >
          {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      )}
      
      {/* Transparent overlay behind sidebar on mobile */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar with glassmorphism */}
      <aside 
        className={cn(
          "transition-all duration-500 fixed md:relative h-screen z-40 overflow-hidden backdrop-blur-2xl",
          darkMode 
            ? "bg-gradient-to-b from-slate-900/95 via-slate-800/90 to-slate-900/95 border-r border-slate-700/50" 
            : "bg-gradient-to-b from-white/95 via-gray-50/90 to-white/95 border-r border-gray-200/50",
          sidebarOpen 
            ? "w-[300px] translate-x-0 shadow-2xl" 
            : "w-0 -translate-x-full"
        )}
      >
        <div className="p-5 flex flex-col h-full overflow-hidden">
          {/* Logo and branding */}
          <div className="flex items-center gap-3 mb-7 mt-1">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-ruvo-400 to-ruvo-500 flex items-center justify-center overflow-hidden">
              <img 
                src="/lovable-uploads/aa075d0b-00d3-4c46-a600-501aec587b42.png" 
                alt="Ruvo Logo" 
                className={cn(
                  "h-full w-full object-contain p-1.5", 
                  darkMode ? "invert" : "" 
                )} 
              />
            </div>
            <h1 className={cn(
              "text-xl font-bold",
              darkMode ? "text-white" : "text-ruvo-600"
            )}>Ruvo</h1>
          </div>
          
          {/* New chat button */}
          <Button 
            className={cn(
              "mb-8 w-full justify-start transition-all duration-300 rounded-xl h-12",
              "bg-gradient-to-r from-violet-500 to-orange-400 text-white border-0",
              "hover:from-violet-600 hover:to-orange-500 hover:scale-105 hover:shadow-lg",
              "shadow-lg backdrop-blur-sm"
            )}
            onClick={createNewChat}
          >
            <Plus size={18} className="mr-3" />
            New Chat
          </Button>
          
          {/* Chat history list */}
          <div className="flex-grow overflow-y-auto mb-4 pr-1">
            <h2 className={cn(
              "text-xs uppercase mb-3 font-medium",
              darkMode ? "text-slate-400" : "text-slate-500"
            )}>Recent Chats</h2>
            
            <div className="space-y-2">
              {chatHistory.map((chat) => {
                return (
                  <div 
                    key={chat.id}
                    className={cn(
                      "p-4 rounded-xl text-sm cursor-pointer transition-all duration-300 relative backdrop-blur-sm",
                      "border border-white/10 hover:scale-[1.02] hover:shadow-lg",
                      chat.id === activeChat
                        ? darkMode 
                          ? "bg-gradient-to-r from-violet-600/30 to-orange-400/20 border-violet-500/50" 
                          : "bg-gradient-to-r from-violet-100/80 to-orange-100/60 border-violet-300/50"
                        : darkMode 
                          ? "hover:bg-slate-800/60 hover:border-slate-600/50" 
                          : "hover:bg-white/60 hover:border-gray-300/50"
                    )}
                    {...(() => {
                      // Set current chat id for handling in the hook
                      const handleMouseDown = (e: React.MouseEvent) => {
                        setPressedChatId(chat.id);
                        longPress.getHandlers().onMouseDown(e);
                      };
                      
                      const handleMouseUp = (e: React.MouseEvent) => {
                        longPress.getHandlers().onMouseUp(e);
                      };
                      
                      const handleMouseLeave = (e: React.MouseEvent) => {
                        longPress.getHandlers().onMouseLeave(e);
                      };
                      
                      const handleTouchStart = (e: React.TouchEvent) => {
                        setPressedChatId(chat.id);
                        longPress.getHandlers().onTouchStart(e);
                      };
                      
                      const handleTouchEnd = (e: React.TouchEvent) => {
                        longPress.getHandlers().onTouchEnd(e);
                      };
                      
                      return {
                        onMouseDown: handleMouseDown,
                        onMouseUp: handleMouseUp,
                        onMouseLeave: handleMouseLeave,
                        onTouchStart: handleTouchStart,
                        onTouchEnd: handleTouchEnd
                      };
                    })()}
                  >
                    <div className="truncate font-medium">{chat.title}</div>
                    {chat.lastMessage && (
                      <div className="text-xs text-slate-400 truncate mt-1">
                        {chat.lastMessage?.length > 30 
                          ? chat.lastMessage.substring(0, 30) + "..." 
                          : chat.lastMessage}
                      </div>
                    )}
                    
                    {longPress.isLongPressing && pressedChatId === chat.id && (
                      <div className={cn(
                        "absolute inset-0 flex items-center justify-center bg-opacity-90 rounded-lg",
                        darkMode ? "bg-slate-800" : "bg-ruvo-100"
                      )}>
                        <Trash2 size={20} className="text-red-500" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Home link */}
          <div className="mt-auto">
            <Link 
              to="/" 
              className={cn(
                "block p-2.5 rounded hover:underline",
                darkMode ? "text-slate-300" : "text-slate-600"
              )}
            >
              Back to Home
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={cn(
        "flex-grow transition-all duration-300 relative",
        sidebarOpen ? "md:pl-0" : "pl-0"
      )}>
        {/* Top navigation bar */}
        <header 
          className={cn(
            "py-5 px-6 flex items-center justify-between backdrop-blur-2xl relative z-10",
            darkMode 
              ? "bg-gradient-to-r from-slate-900/80 via-slate-800/70 to-slate-900/80 border-b border-slate-700/50" 
              : "bg-gradient-to-r from-white/80 via-gray-50/70 to-white/80 border-b border-gray-200/50",
            "shadow-lg"
          )}
        >
          <div className="w-full flex justify-end items-center gap-4">
            <div className="flex items-center">
              <span className={cn("text-sm mr-2", darkMode ? "text-slate-300" : "text-slate-600")}>
                {darkMode ? "Dark" : "Light"}
              </span>
              <Switch 
                checked={darkMode} 
                onCheckedChange={toggleDarkMode} 
                className={darkMode ? "bg-ruvo-400" : ""}
              />
              {darkMode ? (
                <Moon size={16} className="ml-2 text-slate-300" />
              ) : (
                <Sun size={16} className="ml-2 text-yellow-500" />
              )}
            </div>
          </div>
        </header>
        
        {/* Chat interface wrapper - now full height */}
        <div className="h-[calc(100vh-60px)]">
          <ChatInterface 
            selectedVoiceIndex={0} 
            onSpeakingChange={setIsSpeaking} 
            darkMode={darkMode}
            updateChatTitle={updateChatTitle}
            activeChat={activeChat}
          />
        </div>
      </main>
      
      {/* Delete confirmation dialog */}
      {chatToDelete && (
        <DeleteChatDialog
          open={isDeleteDialogOpen}
          setOpen={setIsDeleteDialogOpen}
          chatTitle={chatHistory.find(chat => chat.id === chatToDelete)?.title || "this conversation"}
          onDeleteConfirm={confirmDeleteChat}
          darkMode={darkMode}
        />
      )}
    </div>
  );
};

export default ChatPage;
