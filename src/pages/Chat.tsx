
import React, { useState, useEffect } from "react";
import ChatInterface from "@/components/ChatInterface";
import { ChatSidebar } from "@/components/chat/ChatSidebar";
import { UserOnboarding } from "@/components/onboarding/UserOnboarding";
import { VoiceSelection } from "@/components/onboarding/VoiceSelection";
import { DeleteChatDialog } from "@/components/chat/DeleteChatDialog";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface ChatHistory {
  id: string;
  title: string;
  timestamp: Date;
  lastMessage?: string;
}

interface UserData {
  name: string;
  age: string;
  nickname?: string;
}

const ChatPage: React.FC = () => {
  // Onboarding states
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [selectedVoice, setSelectedVoice] = useState<string | null>(null);
  const [showVoiceSelection, setShowVoiceSelection] = useState(false);
  
  // Chat states
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([]);
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [chatToDelete, setChatToDelete] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [pressedChatId, setPressedChatId] = useState<string | null>(null);
  
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  // Check onboarding status on mount
  useEffect(() => {
    const savedUserData = localStorage.getItem('ruvo_user_data');
    const savedVoice = localStorage.getItem('ruvo_selected_voice');
    const savedVoiceEnabled = localStorage.getItem('ruvo_voice_enabled');
    
    if (savedUserData) {
      const parsedUserData = JSON.parse(savedUserData);
      setUserData(parsedUserData);
      setIsOnboarded(true);
      console.log('Loaded user data:', parsedUserData);
    }
    
    if (savedVoice) {
      setSelectedVoice(savedVoice);
      console.log('Loaded selected voice:', savedVoice);
    }

    if (savedVoiceEnabled !== null) {
      setVoiceEnabled(savedVoiceEnabled === 'true');
    }
  }, []);

  const handleOnboardingComplete = (data: UserData) => {
    console.log('Onboarding completed with data:', data);
    setUserData(data);
    localStorage.setItem('ruvo_user_data', JSON.stringify(data));
    setShowVoiceSelection(true);
  };

  const handleVoiceSelect = (voiceId: string) => {
    console.log('Voice selected:', voiceId);
    setSelectedVoice(voiceId);
    localStorage.setItem('ruvo_selected_voice', voiceId);
    setShowVoiceSelection(false);
    setIsOnboarded(true);
    
    toast({
      title: "Welcome to Ruvo!",
      description: `Hi ${userData?.nickname || userData?.name}! I'm excited to chat with you.`,
    });
  };

  const handleVoiceSkip = () => {
    setShowVoiceSelection(false);
    setIsOnboarded(true);
    
    toast({
      title: "Welcome to Ruvo!",
      description: `Hi ${userData?.nickname || userData?.name}! I'm excited to chat with you.`,
    });
  };
  
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

  const toggleVoiceOutput = () => {
    const newVoiceEnabled = !voiceEnabled;
    setVoiceEnabled(newVoiceEnabled);
    localStorage.setItem('ruvo_voice_enabled', String(newVoiceEnabled));
    toast({
      title: newVoiceEnabled ? "Voice Output Enabled" : "Voice Output Disabled",
      description: newVoiceEnabled ? "AI responses will be read aloud." : "AI responses will not be read aloud."
    });
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

  // Show onboarding if not completed
  if (!isOnboarded) {
    return (
      <>
        {!showVoiceSelection ? (
          <UserOnboarding 
            onComplete={handleOnboardingComplete}
            darkMode={darkMode}
          />
        ) : (
          <VoiceSelection
            onVoiceSelect={handleVoiceSelect}
            onSkip={handleVoiceSkip}
            darkMode={darkMode}
          />
        )}
      </>
    );
  }

  return (
    <div className={cn(
      "min-h-screen transition-all duration-700 flex relative overflow-hidden",
      darkMode 
        ? "bg-gradient-to-br from-black via-slate-900 to-slate-800 text-white" 
        : "bg-gradient-to-br from-gray-50 via-white to-gray-100"
    )}>
      {/* Ambient background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className={cn(
              "absolute w-1 h-1 rounded-full opacity-10 animate-pulse",
              darkMode ? "bg-violet-400" : "bg-violet-600"
            )}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Enhanced sidebar */}
      <ChatSidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
        voiceEnabled={voiceEnabled}
        onToggleVoice={toggleVoiceOutput}
        chatHistory={chatHistory}
        activeChat={activeChat}
        onSelectChat={selectChat}
        onCreateNewChat={createNewChat}
        onDeleteChat={handleDeleteChat}
        isMobile={isMobile}
        pressedChatId={pressedChatId}
        setPressedChatId={setPressedChatId}
      />

      {/* Main chat area */}
      <main className="flex-grow transition-all duration-500 relative">
        <div className="h-screen">
          <ChatInterface 
            selectedVoiceIndex={0} 
            onSpeakingChange={setIsSpeaking} 
            darkMode={darkMode}
            updateChatTitle={updateChatTitle}
            activeChat={activeChat}
            userData={userData}
            voiceEnabled={voiceEnabled}
            onToggleVoice={toggleVoiceOutput}
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
