
import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, Send } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

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
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages update
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current;
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (input.trim() === "" || isLoading) return;
    
    const userMessage = { role: "user" as const, content: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // If we're in fallback mode, simulate responses
    if (fallbackMode) {
      simulateFallbackResponse(userMessage.content);
      return;
    }

    try {
      console.log("Sending request to API...");
      
      const response = await fetch("https://api.sree.shop/chat", {
        method: "POST",
        headers: {
          "Authorization": "Bearer ddc-beta-dhxdvl9jah-YWwkA3J4DLOCoIwfJjMLxqKAUKtw2UWbBee",
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

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      const assistantMessage = data.choices?.[0]?.message?.content || "I'm having trouble responding right now. Can we try again?";
      
      setMessages(prev => [
        ...prev, 
        { role: "assistant", content: assistantMessage }
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "API Connection Issue",
        description: "Switched to demo mode due to API connection issues. Responses are simulated.",
        variant: "destructive",
      });
      
      // Switch to fallback mode and generate simulated response
      setFallbackMode(true);
      simulateFallbackResponse(userMessage.content);
    }
  };

  // Fallback response simulator
  const simulateFallbackResponse = (userInput: string) => {
    setTimeout(() => {
      const fallbackResponses = [
        "I understand how you're feeling. Would you like to tell me more about that?",
        "That's interesting. How does that make you feel?",
        "I'm here for you. Let's explore that thought together.",
        "Thank you for sharing that with me. What would help you feel better right now?",
        "I appreciate you opening up. Is there anything specific you'd like to talk about today?"
      ];
      
      // Simple response selection based on input length to seem somewhat responsive
      const responseIndex = Math.floor(userInput.length % fallbackResponses.length);
      
      setMessages(prev => [
        ...prev,
        { role: "assistant", content: fallbackResponses[responseIndex] }
      ]);
      
      setIsLoading(false);
    }, 1500); // Simulate thinking time
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
            {fallbackMode ? "Demo Mode" : "Online now"}
          </p>
        </div>
        {fallbackMode && (
          <div className="ml-auto">
            <Button 
              variant="outline" 
              size="sm"
              className="text-xs"
              onClick={() => setFallbackMode(false)}
            >
              Try API Again
            </Button>
          </div>
        )}
      </div>

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
                    : "bg-nimira-100/50 rounded-bl-none"
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

