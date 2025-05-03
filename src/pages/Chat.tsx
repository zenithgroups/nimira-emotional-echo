
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun, MessageSquare, Menu, X, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import ChatInterface from "@/components/ChatInterface";
import { Switch } from "@/components/ui/switch";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

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
  const isMobile = useIsMobile();
  
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
      setChatHistory(JSON.parse(savedHistory));
    } else {
      // Initialize with the first chat
      const initialChat = {
        id: 'chat_' + Date.now(),
        title: 'How can I feel better today?',
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
    
    // Reload the page to reset the chat interface
    window.location.reload();
  };
  
  const selectChat = (chatId: string) => {
    setActiveChat(chatId);
    // In a real app, you would load the messages for this chat here
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

  return (
    <div className={cn(
      "min-h-screen transition-colors duration-300 flex",
      darkMode 
        ? "bg-gradient-to-br from-slate-900 to-slate-800 text-white" 
        : "bg-gradient-to-br from-white to-ruvo-50"
    )}>
      {/* Mobile menu button */}
      {isMobile && (
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className={cn(
            "fixed top-4 left-4 z-50 rounded-full p-2 transition-colors",
            darkMode ? "bg-slate-800 text-white" : "bg-white text-slate-700",
            "shadow-md hover:bg-opacity-80"
          )}
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      )}
      
      {/* Sidebar */}
      <div 
        className={cn(
          "transition-all duration-300 fixed md:relative h-screen z-40",
          darkMode ? "bg-slate-900 border-r border-slate-700" : "bg-white/80 backdrop-blur-md border-r border-slate-200",
          sidebarOpen ? "w-72 translate-x-0" : "w-0 -translate-x-full md:w-0 md:-translate-x-full"
        )}
      >
        <div className="p-4 flex flex-col h-full">
          {/* Logo and branding */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-ruvo-400 to-ruvo-500 flex items-center justify-center text-white font-bold text-xl">R</div>
            <h1 className={cn(
              "text-2xl font-bold",
              darkMode ? "text-white" : "text-ruvo-600"
            )}>Ruvo</h1>
          </div>
          
          {/* New chat button */}
          <Button 
            variant={darkMode ? "outline" : "default"}
            className={cn(
              "mb-6 w-full justify-start",
              darkMode ? "border-slate-700 hover:bg-slate-800 text-white" : ""
            )}
            onClick={createNewChat}
          >
            <Plus size={18} className="mr-2" />
            New Chat
          </Button>
          
          {/* Chat history list */}
          <div className="flex-grow overflow-y-auto mb-4">
            <h2 className={cn(
              "text-sm uppercase mb-2",
              darkMode ? "text-slate-400" : "text-slate-500"
            )}>Recent Chats</h2>
            
            <div className="space-y-1">
              {chatHistory.map((chat, i) => (
                <div 
                  key={chat.id}
                  className={cn(
                    "p-2 rounded-lg text-sm cursor-pointer transition-colors truncate",
                    chat.id === activeChat
                      ? (darkMode ? "bg-slate-800" : "bg-ruvo-100") 
                      : (darkMode ? "hover:bg-slate-800" : "hover:bg-ruvo-50")
                  )}
                  onClick={() => selectChat(chat.id)}
                >
                  {chat.title}
                </div>
              ))}
            </div>
          </div>
          
          {/* Home link */}
          <div className="mt-auto">
            <Link 
              to="/" 
              className={cn(
                "block p-2 rounded hover:underline",
                darkMode ? "text-slate-300" : "text-slate-600"
              )}
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className={cn(
        "flex-grow transition-all duration-300 relative",
        sidebarOpen ? "md:pl-0" : "pl-0"
      )}>
        {/* Top navigation bar */}
        <header 
          className={cn(
            "py-3 px-4 md:px-6 flex items-center justify-between",
            darkMode 
              ? "bg-slate-900/50 backdrop-blur-md border-b border-slate-700" 
              : "bg-white/50 backdrop-blur-md border-b border-slate-100"
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
                <Moon size={18} className="ml-2 text-slate-300" />
              ) : (
                <Sun size={18} className="ml-2 text-yellow-500" />
              )}
            </div>
          </div>
        </header>
        
        {/* Chat interface wrapper - now full height */}
        <div className="h-[calc(100vh-57px)]">
          <ChatInterface 
            selectedVoiceIndex={0} 
            onSpeakingChange={setIsSpeaking} 
            darkMode={darkMode}
            updateChatTitle={updateChatTitle}
            activeChat={activeChat}
          />
        </div>
      </main>
    </div>
  );
};

export default ChatPage;
