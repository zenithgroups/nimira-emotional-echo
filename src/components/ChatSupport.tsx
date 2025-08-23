
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bot, User, Send, X } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatSupportProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatSupport: React.FC<ChatSupportProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm Ruvipi, your Ruvo AI support companion. I'm here to help you understand how our emotionally intelligent AI can support your journey. How can I assist you today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('ai-support', {
        body: {
          name: 'Chat User',
          email: 'chat@example.com',
          subject: 'chat',
          message: inputMessage
        }
      });

      if (error) throw error;

      // Clean up the AI response by removing any formal signatures
      let cleanResponse = data.response || data.fallbackResponse || "I'm sorry, I'm having trouble responding right now. Please try again.";
      
      // Remove various signature patterns
      cleanResponse = cleanResponse.replace(/^Subject:\s*[^:]*:?\s*/i, '');
      cleanResponse = cleanResponse.replace(/Best regards,[\s\S]*$/i, '');
      cleanResponse = cleanResponse.replace(/Sincerely,[\s\S]*$/i, '');
      cleanResponse = cleanResponse.replace(/Thank you,[\s\S]*$/i, '');
      cleanResponse = cleanResponse.replace(/\[Your Name\][\s\S]*$/i, '');
      cleanResponse = cleanResponse.replace(/Customer Support Team[\s\S]*$/i, '');
      cleanResponse = cleanResponse.replace(/RuvoLabs[\s\S]*$/i, '');
      cleanResponse = cleanResponse.replace(/^Hi Chat User,?\s*/i, '');
      
      // Remove any trailing signatures or formal closings
      cleanResponse = cleanResponse.replace(/\n\n.*Team.*$/s, '');
      cleanResponse = cleanResponse.trim();

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: cleanResponse,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="fixed inset-0" onClick={onClose} />
      <Card className="relative w-full max-w-md h-[600px] flex flex-col shadow-2xl">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardTitle className="flex items-center gap-2 text-slate-800">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
              <Bot className="h-4 w-4 text-white" />
            </div>
            Ruvipi - Ruvo AI Support
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose} className="hover:bg-white/50">
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-lg p-3 ${
                      message.isUser
                        ? 'bg-blue-600 text-white ml-2'
                        : 'bg-gray-50 text-gray-900 border mr-2'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {!message.isUser && (
                        <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Bot className="h-3 w-3 text-white" />
                        </div>
                      )}
                      {message.isUser && (
                        <User className="h-4 w-4 mt-0.5 text-white flex-shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
                        <span className="text-xs opacity-70 mt-1 block">
                          {message.timestamp.toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-50 border rounded-lg p-3 mr-2">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                        <Bot className="h-3 w-3 text-white" />
                      </div>
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
          <div className="p-4 border-t bg-white">
            <div className="flex gap-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about Ruvo AI..."
                disabled={isLoading}
                className="flex-1"
              />
              <Button 
                onClick={sendMessage} 
                disabled={!inputMessage.trim() || isLoading}
                size="sm"
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatSupport;
