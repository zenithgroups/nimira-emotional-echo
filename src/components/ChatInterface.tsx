
import React, { useState, useRef, useEffect } from "react";
import { Send, RefreshCw } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hello! I'm Nimira. I'm here to listen and support you. How are you feeling today?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [fallbackMode, setFallbackMode] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  // API configuration - using the provided API key from sree.shop
  const apiUrl = "https://api.sree.shop/chat";
  const apiKey = "ddc-beta-dhxdvl9jah-YWwkA3J4DLOCoIwfJjMLxqKAUKtw2UWbBee";

  // Scroll to bottom when messages update
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current;
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  }, [messages]);

  // Test API connection on initial load
  useEffect(() => {
    checkApiConnection();
  }, []);

  const checkApiConnection = async () => {
    try {
      console.log("Checking API connection to:", apiUrl);
      
      // Use a POST request instead of HEAD for better compatibility
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "gpt-4o",
          messages: [
            { role: "system", content: "This is a connection test." }
          ]
        }),
        // No timeout - let the browser handle it
      });
      
      console.log("API connection check response:", response.status);
      
      if (response.ok) {
        setFallbackMode(false);
        console.log("API connection successful");
      } else {
        console.log("API connection failed with status:", response.status);
        setFallbackMode(true);
      }
    } catch (error) {
      console.error("API connection check failed:", error);
      setFallbackMode(true);
    }
  };

  const retryApiConnection = async () => {
    setIsRetrying(true);
    toast({
      title: "Connecting to API...",
      description: "Attempting to reconnect to Nimira's AI service.",
    });
    
    await checkApiConnection();
    
    setIsRetrying(false);
    if (!fallbackMode) {
      toast({
        title: "Connection Restored!",
        description: "Successfully reconnected to Nimira's AI service.",
      });
    } else {
      toast({
        title: "Connection Failed",
        description: "Still unable to connect to the API. Please try again later.",
        variant: "destructive",
      });
    }
  };

  const sendMessage = async () => {
    if (input.trim() === "" || isLoading) return;
    
    const userMessage = { role: "user" as const, content: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    if (fallbackMode) {
      simulateFallbackResponse(userMessage.content);
      return;
    }

    try {
      console.log("Sending message to API:", userMessage.content);
      
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "gpt-4o",
          messages: [
            { 
              role: "system", 
              content: "You are Nimira, an empathetic AI companion designed to provide emotional support. Your responses should be warm, understanding, and helpful. Keep responses concise (under 150 words) and focus on being a supportive friend. Never break character." 
            },
            ...messages.map(msg => ({ role: msg.role, content: msg.content })),
            { role: userMessage.role, content: userMessage.content }
          ]
        })
      });

      console.log("API response status:", response.status);
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      console.log("API response data:", data);
      
      const assistantMessage = data.choices?.[0]?.message?.content || "I'm having trouble responding right now. Can we try again?";
      
      setMessages(prev => [
        ...prev, 
        { role: "assistant", content: assistantMessage }
      ]);
      
      if (fallbackMode) {
        setFallbackMode(false);
        toast({
          title: "API Connection Restored",
          description: "Successfully connected to Nimira's AI. Enjoy your conversation!",
        });
      }
    } catch (error) {
      console.error("Error sending message:", error);
      
      // Only show toast if we're not already in fallback mode
      if (!fallbackMode) {
        toast({
          title: "API Connection Issue",
          description: "Unable to reach the AI service. Please check your connection and try again.",
          variant: "destructive",
        });
      }
      
      setFallbackMode(true);
      
      // Add a response indicating the error
      setMessages(prev => [
        ...prev,
        { 
          role: "assistant", 
          content: "I'm sorry, I couldn't process your message due to a connection issue. Please try again or click the 'Try API Again' button above." 
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Fallback response simulator
  const simulateFallbackResponse = (userInput: string) => {
    // We won't use this since we're focusing on making the API work
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { 
          role: "assistant", 
          content: "I'm sorry, I'm currently unable to connect to my AI service. Please try clicking the 'Try API Again' button above to restore the connection." 
        }
      ]);
      
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full w-full relative overflow-hidden rounded-2xl border border-nimira-200/50 bg-gradient-to-br from-nimira-300/10 to-nimira-400/10 transition-all hover:border-nimira-300">
      {/* Chat header */}
      <div className="flex items-center gap-3 p-4 border-b border-nimira-200/30 bg-white/50 backdrop-blur-sm">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-nimira-300 to-nimira-400 flex items-center justify-center text-white font-medium">
          N
        </div>
        <div>
          <h3 className="font-medium">Nimira AI</h3>
          <p className="text-xs text-gray-500">
            {fallbackMode ? "Trying to connect..." : "Online - GPT-4o Powered"}
          </p>
        </div>
        {fallbackMode && (
          <div className="ml-auto">
            <Button 
              variant="outline" 
              size="sm"
              className="text-xs flex items-center gap-1"
              onClick={retryApiConnection}
              disabled={isRetrying}
            >
              {isRetrying ? (
                <>
                  <RefreshCw size={14} className="animate-spin" /> Connecting...
                </>
              ) : (
                <>
                  <RefreshCw size={14} /> Try API Again
                </>
              )}
            </Button>
          </div>
        )}
      </div>

      {fallbackMode && (
        <Alert className="m-2 py-2 bg-yellow-50 border-yellow-200">
          <AlertDescription className="text-xs text-yellow-800">
            Unable to connect to the AI service. Please check your connection or try again later.
          </AlertDescription>
        </Alert>
      )}

      {/* Messages container */}
      <ScrollArea className="flex-1 p-4 overflow-y-auto" ref={scrollAreaRef}>
        <div className="flex flex-col gap-4">
          {messages.map((message, index) => (
            <div 
              key={index}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div 
                className={`max-w-[80%] p-3 rounded-2xl ${
                  message.role === "user" 
                    ? "bg-white border border-gray-100 shadow-sm rounded-br-none ml-auto" 
                    : `${fallbackMode ? "bg-gray-100/70" : "bg-nimira-100/50"} rounded-bl-none`
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] p-3 rounded-2xl bg-nimira-100/50 rounded-bl-none">
                <div className="flex gap-1 items-center">
                  <div className="w-2 h-2 rounded-full bg-nimira-400 animate-pulse"></div>
                  <div className="w-2 h-2 rounded-full bg-nimira-400 animate-pulse" style={{ animationDelay: "0.2s" }}></div>
                  <div className="w-2 h-2 rounded-full bg-nimira-400 animate-pulse" style={{ animationDelay: "0.4s" }}></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Message input */}
      <div className="p-4 border-t border-nimira-200/30 bg-white/50 backdrop-blur-sm">
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }} 
          className="relative flex items-end gap-2"
        >
          <Textarea
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full min-h-[44px] max-h-[120px] resize-none bg-gray-50 border border-gray-100 rounded-xl pr-12"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
          />
          <button 
            type="submit"
            className={`absolute right-2 bottom-2 p-2 rounded-full transition-colors ${
              isLoading || input.trim() === "" 
                ? "bg-gray-200 text-gray-500 cursor-not-allowed" 
                : "bg-nimira-400 hover:bg-nimira-500 text-white"
            }`}
            disabled={isLoading || input.trim() === ""}
          >
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;
