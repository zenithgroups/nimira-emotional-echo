import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Send, Loader2, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

interface Conversation {
  id: string;
  title: string;
  messages: Message[];
}

interface NewChatInterfaceProps {
  activeConversationId?: string | null;
  onConversationUpdate?: (conversation: Conversation) => void;
  darkMode?: boolean;
}

export const NewChatInterface: React.FC<NewChatInterfaceProps> = ({
  activeConversationId,
  onConversationUpdate,
  darkMode = false
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null);
  
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  // Load conversation when activeConversationId changes
  useEffect(() => {
    if (activeConversationId) {
      loadConversation(activeConversationId);
    } else {
      setMessages([]);
      setCurrentConversation(null);
    }
  }, [activeConversationId]);

  // Auto-focus input
  useEffect(() => {
    if (inputRef.current && !isLoading) {
      inputRef.current.focus();
    }
  }, [isLoading]);

  const loadConversation = async (conversationId: string) => {
    try {
      // Load conversation details
      const { data: conversation, error: convError } = await supabase
        .from('conversations')
        .select('*')
        .eq('id', conversationId)
        .single();

      if (convError) throw convError;

      // Load messages
      const { data: messagesData, error: msgError } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });

      if (msgError) throw msgError;

      const formattedMessages: Message[] = messagesData.map(msg => ({
        id: msg.id,
        content: msg.content,
        role: msg.role as 'user' | 'assistant',
        timestamp: new Date(msg.created_at)
      }));

      setMessages(formattedMessages);
      setCurrentConversation({
        id: conversation.id,
        title: conversation.title,
        messages: formattedMessages
      });
      setError(null);
    } catch (error: any) {
      console.error('Error loading conversation:', error);
      toast({
        title: "Error",
        description: "Failed to load conversation",
        variant: "destructive"
      });
    }
  };

  const createNewConversation = async (firstMessage: string): Promise<string> => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data: conversation, error } = await supabase
      .from('conversations')
      .insert({
        user_id: user.id,
        title: generateTitle(firstMessage)
      })
      .select()
      .single();

    if (error) throw error;
    return conversation.id;
  };

  const saveMessage = async (conversationId: string, content: string, role: 'user' | 'assistant') => {
    const { data, error } = await supabase
      .from('messages')
      .insert({
        conversation_id: conversationId,
        content,
        role
      })
      .select()
      .single();

    if (error) throw error;
    return {
      id: data.id,
      content: data.content,
      role: data.role as 'user' | 'assistant',
      timestamp: new Date(data.created_at)
    };
  };

  const generateTitle = (message: string): string => {
    const words = message.split(' ').slice(0, 5);
    return words.join(' ') + (message.split(' ').length > 5 ? '...' : '');
  };

  const callOpenAI = async (messages: Array<{role: string, content: string}>) => {
    const { data, error } = await supabase.functions.invoke('openai-chat', {
      body: {
        messages,
        model: 'gpt-5-2025-08-07',
        max_completion_tokens: 1000
      }
    });

    if (error) {
      console.error('OpenAI API error:', error);
      throw new Error(`AI service error: ${error.message}`);
    }

    return data.choices[0].message.content;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      let conversationId = activeConversationId;

      // Create new conversation if none exists
      if (!conversationId) {
        conversationId = await createNewConversation(userMessage);
      }

      // Save user message
      const savedUserMessage = await saveMessage(conversationId, userMessage, 'user');
      setMessages(prev => [...prev, savedUserMessage]);

      // Prepare messages for OpenAI
      const currentMessages = [...messages, savedUserMessage];
      const openAIMessages = currentMessages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      // Get AI response
      const aiResponse = await callOpenAI(openAIMessages);

      // Save AI message
      const savedAiMessage = await saveMessage(conversationId, aiResponse, 'assistant');
      setMessages(prev => [...prev, savedAiMessage]);

      // Update conversation
      const updatedConversation: Conversation = {
        id: conversationId,
        title: currentConversation?.title || generateTitle(userMessage),
        messages: [...currentMessages, savedAiMessage]
      };

      setCurrentConversation(updatedConversation);
      onConversationUpdate?.(updatedConversation);

    } catch (error: any) {
      console.error('Error sending message:', error);
      setError(error.message);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleRetry = async () => {
    if (!currentConversation || isRetrying) return;
    
    setIsRetrying(true);
    setError(null);

    try {
      await loadConversation(currentConversation.id);
      toast({
        title: "Success",
        description: "Connection restored",
      });
    } catch (error: any) {
      console.error('Retry failed:', error);
      setError("Retry failed. Please check your connection.");
    } finally {
      setIsRetrying(false);
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).format(timestamp);
  };

  return (
    <div className={cn(
      "flex flex-col h-full w-full",
      darkMode ? "bg-gradient-to-b from-slate-900 to-slate-800" : "bg-gradient-to-b from-gray-50 to-white"
    )}>
      {/* Header */}
      <div className={cn(
        "p-4 border-b flex items-center justify-between",
        darkMode ? "border-slate-700 bg-slate-800/50" : "border-gray-200 bg-white/50"
      )}>
        <div className="flex items-center gap-3">
          <div className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center",
            darkMode ? "bg-violet-600" : "bg-violet-500"
          )}>
            <span className="text-white font-bold text-sm">R</span>
          </div>
          <div>
            <h2 className={cn(
              "font-semibold",
              darkMode ? "text-white" : "text-gray-900"
            )}>
              Ruvo AI Assistant
            </h2>
            <p className={cn(
              "text-xs",
              darkMode ? "text-gray-400" : "text-gray-500"
            )}>
              {isLoading ? "Ruvo is typing..." : "Ready to help"}
            </p>
          </div>
        </div>
        
        {error && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleRetry}
            disabled={isRetrying}
            className={cn(
              "gap-2",
              darkMode ? "border-slate-600 text-slate-300 hover:bg-slate-700" : ""
            )}
          >
            {isRetrying ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <RefreshCw className="w-4 h-4" />
            )}
            Retry
          </Button>
        )}
      </div>

      {/* Messages */}
      <ScrollArea
        ref={scrollAreaRef}
        className="flex-1 p-4"
      >
        <div className="space-y-4 max-w-4xl mx-auto">
          {messages.length === 0 ? (
            <div className={cn(
              "text-center py-12",
              darkMode ? "text-gray-400" : "text-gray-500"
            )}>
              <div className={cn(
                "w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center",
                darkMode ? "bg-violet-600/20" : "bg-violet-100"
              )}>
                <span className={cn(
                  "text-2xl font-bold",
                  darkMode ? "text-violet-400" : "text-violet-600"
                )}>
                  R
                </span>
              </div>
              <h3 className={cn(
                "text-lg font-semibold mb-2",
                darkMode ? "text-white" : "text-gray-900"
              )}>
                Welcome to Ruvo AI
              </h3>
              <p>Start a conversation by typing a message below.</p>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex gap-3 animate-in slide-in-from-bottom-4 duration-300",
                  message.role === 'user' ? "justify-end" : "justify-start"
                )}
              >
                {message.role === 'assistant' && (
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1",
                    darkMode ? "bg-violet-600" : "bg-violet-500"
                  )}>
                    <span className="text-white font-bold text-sm">R</span>
                  </div>
                )}
                
                <div className={cn(
                  "max-w-[80%] sm:max-w-[70%]",
                  message.role === 'user' ? "order-first" : ""
                )}>
                  <div className={cn(
                    "rounded-2xl px-4 py-3 shadow-sm",
                    message.role === 'user'
                      ? darkMode 
                        ? "bg-violet-600 text-white ml-auto" 
                        : "bg-violet-500 text-white ml-auto"
                      : darkMode
                        ? "bg-slate-700 text-white"
                        : "bg-white text-gray-900 border border-gray-200"
                  )}>
                    <p className="whitespace-pre-wrap break-words">{message.content}</p>
                  </div>
                  <div className={cn(
                    "text-xs mt-1",
                    darkMode ? "text-gray-400" : "text-gray-500",
                    message.role === 'user' ? "text-right" : "text-left"
                  )}>
                    {formatTimestamp(message.timestamp)}
                  </div>
                </div>

                {message.role === 'user' && (
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1",
                    darkMode ? "bg-slate-600" : "bg-gray-300"
                  )}>
                    <span className={cn(
                      "font-bold text-sm",
                      darkMode ? "text-white" : "text-gray-700"
                    )}>
                      U
                    </span>
                  </div>
                )}
              </div>
            ))
          )}
          
          {isLoading && (
            <div className="flex gap-3 animate-in slide-in-from-bottom-4 duration-300">
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                darkMode ? "bg-violet-600" : "bg-violet-500"
              )}>
                <span className="text-white font-bold text-sm">R</span>
              </div>
              <div className={cn(
                "rounded-2xl px-4 py-3 shadow-sm",
                darkMode ? "bg-slate-700" : "bg-white border border-gray-200"
              )}>
                <div className="flex items-center gap-1">
                  <div className={cn(
                    "w-2 h-2 rounded-full animate-bounce",
                    darkMode ? "bg-gray-400" : "bg-gray-500"
                  )} style={{ animationDelay: '0ms' }} />
                  <div className={cn(
                    "w-2 h-2 rounded-full animate-bounce",
                    darkMode ? "bg-gray-400" : "bg-gray-500"
                  )} style={{ animationDelay: '150ms' }} />
                  <div className={cn(
                    "w-2 h-2 rounded-full animate-bounce",
                    darkMode ? "bg-gray-400" : "bg-gray-500"
                  )} style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input Form */}
      <div className={cn(
        "p-4 border-t",
        darkMode ? "border-slate-700 bg-slate-800/50" : "border-gray-200 bg-white/50"
      )}>
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          <div className="flex gap-3 items-end">
            <div className="flex-1">
              <Textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message here..."
                disabled={isLoading}
                className={cn(
                  "min-h-[60px] max-h-[200px] resize-none",
                  darkMode 
                    ? "bg-slate-700 border-slate-600 text-white placeholder:text-gray-400" 
                    : "bg-white border-gray-300"
                )}
              />
            </div>
            <Button
              type="submit"
              disabled={!input.trim() || isLoading}
              className={cn(
                "px-4 py-3 h-[60px]",
                darkMode 
                  ? "bg-violet-600 hover:bg-violet-700" 
                  : "bg-violet-500 hover:bg-violet-600"
              )}
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </Button>
          </div>
          
          {error && (
            <div className={cn(
              "mt-2 text-sm text-red-500 flex items-center gap-2"
            )}>
              <span>⚠️ {error}</span>
              <Button
                variant="link"
                size="sm"
                onClick={handleRetry}
                className="text-red-500 p-0 h-auto"
              >
                Try again
              </Button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};