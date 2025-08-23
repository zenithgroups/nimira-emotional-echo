import React from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { Plus, Menu, X, Trash2, Volume2, VolumeX, Moon, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLongPress } from '@/hooks/use-long-press';

interface ChatHistory {
  id: string;
  title: string;
  timestamp: Date;
  lastMessage?: string;
}

interface ChatSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  voiceEnabled: boolean;
  onToggleVoice: () => void;
  chatHistory: ChatHistory[];
  activeChat: string | null;
  onSelectChat: (chatId: string) => void;
  onCreateNewChat: () => void;
  onDeleteChat: (chatId: string) => void;
  isMobile: boolean;
  pressedChatId: string | null;
  setPressedChatId: (id: string | null) => void;
}

export const ChatSidebar: React.FC<ChatSidebarProps> = ({
  isOpen,
  onToggle,
  darkMode,
  onToggleDarkMode,
  voiceEnabled,
  onToggleVoice,
  chatHistory,
  activeChat,
  onSelectChat,
  onCreateNewChat,
  onDeleteChat,
  isMobile,
  pressedChatId,
  setPressedChatId
}) => {
  // Handle long press for any chat item
  const handleLongPress = (chatId: string) => {
    setPressedChatId(chatId);
    onDeleteChat(chatId);
  };

  // Handle click for any chat item
  const handleClick = (chatId: string) => {
    onSelectChat(chatId);
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

  return (
    <>
      {/* Mobile toggle button */}
      {isMobile && (
        <button 
          onClick={onToggle}
          className={cn(
            "fixed top-4 left-4 z-50 rounded-full p-2.5 transition-all duration-300",
            darkMode ? "bg-slate-800/90 text-white" : "bg-white/90 text-slate-700",
            "shadow-lg hover:scale-105 backdrop-blur-sm"
          )}
        >
          {isOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      )}
      
      {/* Overlay on mobile */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 backdrop-blur-sm"
          onClick={onToggle}
        />
      )}
      
      {/* Sidebar */}
      <aside 
        className={cn(
          "transition-all duration-500 fixed md:relative h-screen z-40 overflow-hidden",
          "backdrop-blur-2xl border-r border-white/10 shadow-2xl",
          darkMode 
            ? "bg-gradient-to-b from-slate-900/95 via-slate-800/90 to-slate-900/95" 
            : "bg-gradient-to-b from-white/95 via-gray-50/90 to-white/95",
          isOpen 
            ? "w-[320px] translate-x-0" 
            : "w-0 -translate-x-full"
        )}
      >
        <div className="p-6 flex flex-col h-full overflow-hidden">
          {/* Logo and branding */}
          <div className="flex items-center gap-3 mb-8 mt-1">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-orange-400 flex items-center justify-center overflow-hidden">
              <img 
                src="/lovable-uploads/aa075d0b-00d3-4c46-a600-501aec587b42.png" 
                alt="Ruvo Logo" 
                className={cn(
                  "h-full w-full object-contain p-2", 
                  darkMode ? "invert" : "" 
                )} 
              />
            </div>
            <div>
              <h1 className={cn(
                "text-xl font-bold",
                darkMode ? "text-white" : "text-gray-900"
              )}>Ruvo</h1>
              <p className={cn(
                "text-xs",
                darkMode ? "text-slate-400" : "text-gray-500"
              )}>Your AI companion</p>
            </div>
          </div>
          
          {/* New chat button */}
          <Button 
            className={cn(
              "mb-6 w-full justify-start transition-all duration-300 rounded-xl h-12",
              "bg-gradient-to-r from-violet-500 to-orange-400 text-white border-0",
              "hover:from-violet-600 hover:to-orange-500 hover:scale-105 hover:shadow-lg",
              "shadow-lg backdrop-blur-sm"
            )}
            onClick={onCreateNewChat}
          >
            <Plus size={18} className="mr-3" />
            New Chat
          </Button>

          {/* Voice toggle */}
          <div className={cn(
            "flex items-center justify-between p-4 rounded-xl mb-6 transition-all duration-300",
            "backdrop-blur-sm border border-white/10",
            darkMode 
              ? "bg-slate-800/50 hover:bg-slate-700/50" 
              : "bg-white/50 hover:bg-white/70"
          )}>
            <div className="flex items-center gap-3">
              {voiceEnabled ? (
                <Volume2 size={18} className={cn(
                  darkMode ? "text-violet-400" : "text-violet-600"
                )} />
              ) : (
                <VolumeX size={18} className={cn(
                  darkMode ? "text-slate-400" : "text-gray-500"
                )} />
              )}
              <span className={cn(
                "text-sm font-medium",
                darkMode ? "text-white" : "text-gray-900"
              )}>
                Voice Replies
              </span>
            </div>
            <Switch 
              checked={voiceEnabled} 
              onCheckedChange={onToggleVoice}
              className="data-[state=checked]:bg-violet-500"
            />
          </div>
          
          {/* Chat history list */}
          <div className="flex-grow overflow-y-auto mb-6 pr-2">
            <h2 className={cn(
              "text-xs uppercase mb-4 font-semibold tracking-wider",
              darkMode ? "text-slate-400" : "text-gray-500"
            )}>Recent Conversations</h2>
            
            <div className="space-y-2">
              {chatHistory.map((chat) => {
                return (
                  <div 
                    key={chat.id}
                    className={cn(
                      "p-4 rounded-xl text-sm cursor-pointer transition-all duration-300 relative",
                      "backdrop-blur-sm border border-white/5 hover:scale-[1.02] hover:shadow-lg",
                      chat.id === activeChat
                        ? darkMode 
                          ? "bg-gradient-to-r from-violet-600/30 to-orange-400/20 border-violet-500/50" 
                          : "bg-gradient-to-r from-violet-100/80 to-orange-100/60 border-violet-300/50"
                        : darkMode 
                          ? "hover:bg-slate-800/60 hover:border-slate-600/30" 
                          : "hover:bg-white/60 hover:border-gray-300/30"
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
                    <div className={cn(
                      "truncate font-medium",
                      darkMode ? "text-white" : "text-gray-900"
                    )}>
                      {chat.title}
                    </div>
                    {chat.lastMessage && (
                      <div className={cn(
                        "text-xs truncate mt-1",
                        darkMode ? "text-slate-400" : "text-gray-500"
                      )}>
                        {chat.lastMessage?.length > 35 
                          ? chat.lastMessage.substring(0, 35) + "..." 
                          : chat.lastMessage}
                      </div>
                    )}
                    
                    {longPress.isLongPressing && pressedChatId === chat.id && (
                      <div className={cn(
                        "absolute inset-0 flex items-center justify-center bg-opacity-90 rounded-xl",
                        "backdrop-blur-sm",
                        darkMode ? "bg-slate-800/90" : "bg-white/90"
                      )}>
                        <Trash2 size={20} className="text-red-500" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Settings section */}
          <div className="space-y-4 pt-4 border-t border-white/10">
            {/* Theme toggle */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {darkMode ? (
                  <Moon size={16} className="text-slate-400" />
                ) : (
                  <Sun size={16} className="text-orange-500" />
                )}
                <span className={cn(
                  "text-sm",
                  darkMode ? "text-slate-300" : "text-gray-600"
                )}>
                  {darkMode ? "Dark" : "Light"} Mode
                </span>
              </div>
              <Switch 
                checked={darkMode} 
                onCheckedChange={onToggleDarkMode}
                className="data-[state=checked]:bg-slate-600"
              />
            </div>
            
            {/* Home link */}
            <Link 
              to="/" 
              className={cn(
                "block p-3 rounded-lg hover:underline transition-colors text-sm",
                darkMode ? "text-slate-300 hover:text-white" : "text-gray-600 hover:text-gray-900"
              )}
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
};