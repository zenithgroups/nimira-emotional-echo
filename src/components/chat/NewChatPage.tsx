import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { NewChatInterface } from './NewChatInterface';
import { ConversationSidebar } from './ConversationSidebar';
import { useIsMobile } from '@/hooks/use-mobile';

interface Conversation {
  id: string;
  title: string;
  messages: Array<{
    id: string;
    content: string;
    role: 'user' | 'assistant';
    timestamp: Date;
  }>;
}

export const NewChatPage: React.FC = () => {
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('darkMode') === 'true' || 
             document.documentElement.classList.contains('dark');
    }
    return false;
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const isMobile = useIsMobile();
  const { toast } = useToast();

  // Check authentication status
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setIsAuthenticated(!!session);
      } catch (error) {
        console.error('Error checking auth:', error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Handle dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  // Close sidebar on mobile when conversation is selected
  useEffect(() => {
    if (isMobile && activeConversationId) {
      setSidebarOpen(false);
    }
  }, [activeConversationId, isMobile]);

  const handleNewConversation = () => {
    setActiveConversationId(null);
  };

  const handleConversationSelect = (conversationId: string) => {
    setActiveConversationId(conversationId);
  };

  const handleConversationUpdate = (conversation: Conversation) => {
    // Update the active conversation when a new message is added
    if (!activeConversationId && conversation.id) {
      setActiveConversationId(conversation.id);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  if (loading) {
    return (
      <div className={cn(
        "flex items-center justify-center h-screen",
        darkMode ? "bg-slate-900" : "bg-gray-50"
      )}>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className={cn(
        "flex items-center justify-center h-screen",
        darkMode ? "bg-slate-900 text-white" : "bg-gray-50 text-gray-900"
      )}>
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Please Sign In</h1>
          <p className="text-gray-500 mb-6">You need to be authenticated to use the chat.</p>
          <Button 
            onClick={() => window.location.href = '/auth'}
            className="bg-violet-500 hover:bg-violet-600"
          >
            Go to Sign In
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      "flex h-screen w-full overflow-hidden",
      darkMode ? "bg-slate-900" : "bg-gray-50"
    )}>
      {/* Mobile Overlay */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "relative z-50 transition-transform duration-300 ease-in-out",
        isMobile ? "fixed left-0 top-0 h-full" : "relative",
        isMobile && !sidebarOpen ? "-translate-x-full" : "translate-x-0"
      )}>
        <ConversationSidebar
          activeConversationId={activeConversationId}
          onConversationSelect={handleConversationSelect}
          onNewConversation={handleNewConversation}
          darkMode={darkMode}
          isOpen={true}
          onClose={() => setSidebarOpen(false)}
        />
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <div className={cn(
          "flex items-center justify-between p-4 border-b",
          darkMode ? "border-slate-700 bg-slate-800" : "border-gray-200 bg-white"
        )}>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleSidebar}
              className={cn(
                "p-2",
                darkMode ? "hover:bg-slate-700" : "hover:bg-gray-100"
              )}
            >
              {sidebarOpen && isMobile ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
            
            <div>
              <h1 className={cn(
                "text-lg font-semibold",
                darkMode ? "text-white" : "text-gray-900"
              )}>
                Ruvo AI Chat
              </h1>
              {activeConversationId && (
                <p className={cn(
                  "text-sm",
                  darkMode ? "text-gray-400" : "text-gray-500"
                )}>
                  Conversation active
                </p>
              )}
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={toggleDarkMode}
            className={cn(
              "p-2",
              darkMode ? "hover:bg-slate-700" : "hover:bg-gray-100"
            )}
          >
            {darkMode ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </Button>
        </div>

        {/* Chat Interface */}
        <div className="flex-1">
          <NewChatInterface
            activeConversationId={activeConversationId}
            onConversationUpdate={handleConversationUpdate}
            darkMode={darkMode}
          />
        </div>
      </div>
    </div>
  );
};