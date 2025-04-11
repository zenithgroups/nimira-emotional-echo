import React, { useState, useRef, useEffect } from "react";
import { Send, RefreshCw } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([{
    role: "assistant",
    content: "Hello! I'm Ruvo. I'm here to listen and support you. How are you feeling today?"
  }]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [fallbackMode, setFallbackMode] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);
  
  const {
    toast
  } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const apiUrl = "https://api.openai.com/v1/chat/completions";
  const apiKey = "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";

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current;
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    checkApiConnection();
  }, []);

  const checkApiConnection = async () => {
    try {
      console.log("Checking OpenAI API connection");
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [{
            role: "system",
            content: "This is a connection test."
          }, {
            role: "user",
            content: "Hello"
          }],
          max_tokens: 5
        })
      });
      console.log("API connection check response:", response.status);
      const data = await response.json();
      console.log("API connection check data:", data);
      if (response.ok) {
        setFallbackMode(false);
        console.log("OpenAI API connection successful");
      } else {
        console.log("OpenAI API connection failed with status:", response.status);
        console.log("Error message:", data.error?.message);
        setFallbackMode(true);
      }
    } catch (error) {
      console.error("OpenAI API connection check failed:", error);
      setFallbackMode(true);
    }
  };

  const retryApiConnection = async () => {
    setIsRetrying(true);
    toast({
      title: "Connecting...",
      description: "Attempting to reconnect to the service."
    });
    await checkApiConnection();
    setIsRetrying(false);
    if (!fallbackMode) {
      toast({
        title: "Connection Restored!",
        description: "Successfully reconnected to the service."
      });
    } else {
      toast({
        title: "Connection Failed",
        description: "Unable to connect. Please try again later.",
        variant: "destructive"
      });
    }
  };

  const sendMessage = async () => {
    if (input.trim() === "" || isLoading) return;
    const userMessage = {
      role: "user" as const,
      content: input.trim()
    };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    
    if (fallbackMode) {
      simulateFallbackResponse(userMessage.content);
      return;
    }
    
    try {
      console.log("Sending message to OpenAI API");
      const systemPrompt = "You are Ruvo, an empathetic AI companion designed to provide emotional support. Your responses should be warm, understanding, and helpful. Keep responses concise (under 150 words) and focus on being a supportive friend. Never break character.";
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [{
            role: "system",
            content: systemPrompt
          }, ...messages.map(msg => ({
            role: msg.role,
            content: msg.content
          })), {
            role: userMessage.role,
            content: userMessage.content
          }],
          temperature: 0.7,
          max_tokens: 300
        })
      });
      console.log("OpenAI API response status:", response.status);
      if (!response.ok) {
        const errorData = await response.json();
        console.error("OpenAI API error:", errorData);
        throw new Error(`Error ${response.status}: ${errorData.error?.message || 'Unknown error'}`);
      }
      const data = await response.json();
      console.log("OpenAI API response data:", data);
      const assistantMessage = data.choices?.[0]?.message?.content || "I'm having trouble responding right now. Can we try again?";
      setMessages(prev => [...prev, {
        role: "assistant",
        content: assistantMessage
      }]);
      if (fallbackMode) {
        setFallbackMode(false);
        toast({
          title: "API Connection Restored",
          description: "Successfully connected to OpenAI API. Enjoy your conversation!"
        });
      }
    } catch (error) {
      console.error("Error sending message to OpenAI API:", error);
      if (!fallbackMode) {
        toast({
          title: "Connection Issue",
          description: "Can't chat more due to limit. Please try again later.",
          variant: "destructive"
        });
      }
      setFallbackMode(true);
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "I'm sorry, I can't chat more due to limit. Please try again later."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const simulateFallbackResponse = (userInput: string) => {
    setTimeout(() => {
      const fallbackResponses = ["I understand how you're feeling. Would you like to talk more about that?", "That's interesting. Could you tell me more about your experience?", "I appreciate you sharing that with me. How does that make you feel?", "I'm here to listen. What else is on your mind today?", "Thank you for opening up. Is there anything specific you'd like to focus on in our conversation?"];
      const randomResponse = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
      setMessages(prev => [...prev, {
        role: "assistant",
        content: randomResponse
      }]);
      setIsLoading(false);
    }, 1000);
  };

  return <div className="flex flex-col h-full w-full relative overflow-hidden rounded-2xl border border-ruvo-200/50 bg-gradient-to-br from-ruvo-300/10 to-ruvo-400/10 transition-all hover:border-ruvo-300">
      <div className="flex items-center gap-3 p-4 border-b border-ruvo-200/30 bg-white/50 backdrop-blur-sm">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-ruvo-300 to-ruvo-400 flex items-center justify-center text-white font-medium bg-indigo-500">R</div>
        <div>
          <h3 className="font-medium">Ruvo AI</h3>
          <p className="text-xs text-gray-500">
            {fallbackMode ? "Demo Mode - Service Unavailable" : "Online - OpenAI GPT-4o Powered"}
          </p>
        </div>
        {fallbackMode && <div className="ml-auto">
            <Button variant="outline" size="sm" className="text-xs flex items-center gap-1" onClick={retryApiConnection} disabled={isRetrying}>
              {isRetrying ? <>
                  <RefreshCw size={14} className="animate-spin" /> Connecting...
                </> : <>
                  <RefreshCw size={14} /> Retry
                </>}
            </Button>
          </div>}
      </div>

      {fallbackMode && <Alert className="m-2 py-2 bg-yellow-50 border-yellow-200">
          <AlertDescription className="text-xs text-yellow-800">
            Running in demo mode. Can't chat more due to limit. Your messages will receive simulated responses.
          </AlertDescription>
        </Alert>}

      <ScrollArea className="flex-1 p-4 overflow-y-auto" ref={scrollAreaRef}>
        <div className="flex flex-col gap-4">
          {messages.map((message, index) => <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] p-3 rounded-2xl ${message.role === "user" ? "bg-white border border-gray-100 shadow-sm rounded-br-none ml-auto" : `${fallbackMode ? "bg-gray-100/70" : "bg-ruvo-100/50"} rounded-bl-none`}`}>
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>)}
          {isLoading && <div className="flex justify-start">
              <div className="max-w-[80%] p-3 rounded-2xl bg-ruvo-100/50 rounded-bl-none">
                <div className="flex gap-1 items-center">
                  <div className="w-2 h-2 rounded-full bg-ruvo-400 animate-pulse"></div>
                  <div className="w-2 h-2 rounded-full bg-ruvo-400 animate-pulse" style={{
                animationDelay: "0.2s"
              }}></div>
                  <div className="w-2 h-2 rounded-full bg-ruvo-400 animate-pulse" style={{
                animationDelay: "0.4s"
              }}></div>
                </div>
              </div>
            </div>}
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-ruvo-200/30 bg-white/50 backdrop-blur-sm">
        <form onSubmit={e => {
        e.preventDefault();
        sendMessage();
      }} className="relative flex items-end gap-2">
          <Textarea placeholder="Type a message..." value={input} onChange={e => setInput(e.target.value)} className="w-full min-h-[44px] max-h-[120px] resize-none bg-gray-50 border border-gray-100 rounded-xl pr-12" onKeyDown={e => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
          }
        }} />
          <button type="submit" className={`absolute right-2 bottom-2 p-2 rounded-full transition-colors ${isLoading || input.trim() === "" ? "bg-gray-200 text-gray-500 cursor-not-allowed" : "bg-ruvo-400 hover:bg-ruvo-500 text-white"}`} disabled={isLoading || input.trim() === ""}>
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>;
};

export default ChatInterface;
