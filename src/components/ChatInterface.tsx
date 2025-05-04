import React, { useState, useRef, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { SpeechRecognitionService, SpeechSynthesisService } from "@/utils/voiceUtils";
import { ElevenLabsService, ELEVEN_LABS_VOICES } from "@/utils/elevenLabsUtils";
import { getSystemPrompt, detectEmotion } from "@/utils/sentimentUtils";
import { cn } from "@/lib/utils";

// Import refactored components 
import { ChatHeader } from "./chat/ChatHeader";
import { ChatMessageList } from "./chat/ChatMessageList"; 
import { ChatInputForm } from "./chat/ChatInputForm";
import { ConnectionAlert } from "./chat/ConnectionAlert";

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
  fileUrl?: string;
  fileName?: string;
}

interface ChatInterfaceProps {
  selectedVoiceIndex?: number;
  onSpeakingChange?: (speaking: boolean) => void;
  darkMode?: boolean;
  activeChat?: string | null;
  updateChatTitle?: (id: string, title: string, lastMessage?: string) => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  selectedVoiceIndex = 0,
  onSpeakingChange = () => {},
  darkMode = false,
  activeChat = null,
  updateChatTitle = () => {}
}) => {
  const [messages, setMessages] = useState<Message[]>([{
    role: "assistant",
    content: "Hi there! How are you feeling today?"
  }]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [fallbackMode, setFallbackMode] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);
  
  const [isListening, setIsListening] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [speechRecognitionSupported, setSpeechRecognitionSupported] = useState(false);
  const [currentVoiceIndex, setCurrentVoiceIndex] = useState(selectedVoiceIndex);
  const [voicePopoverOpen, setVoicePopoverOpen] = useState(false);
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  
  const speechRecognition = useRef<SpeechRecognitionService | null>(null);
  const speechSynthesis = useRef<SpeechSynthesisService | null>(null);
  const elevenLabsService = useRef<ElevenLabsService | null>(null);
  
  const [playingMessageIndex, setPlayingMessageIndex] = useState<number | null>(null);
  
  const { toast } = useToast();
  const apiUrl = "https://api.openai.com/v1/chat/completions";
  const apiKey = "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";

  // Helper function to generate intelligent chat titles based on emotional content
  const generateChatTitle = (userMessage: string): string => {
    const emotion = detectEmotion(userMessage);
    
    if (emotion === "sad") {
      return "Feeling down today";
    } else if (emotion === "anxious") {
      return "Managing anxiety";
    } else if (emotion === "angry") {
      return "Processing frustration";
    } else if (emotion === "heartbroken") {
      return "Healing heartache";
    } else if (userMessage.length <= 20) {
      return userMessage;
    } else {
      // Create a summarized version of longer messages
      return userMessage.slice(0, 20) + "...";
    }
  };

  // Load saved messages for the active chat
  useEffect(() => {
    if (activeChat) {
      const savedMessages = localStorage.getItem(`messages_${activeChat}`);
      if (savedMessages) {
        setMessages(JSON.parse(savedMessages));
      } else {
        setMessages([{
          role: "assistant",
          content: "Hi there! How are you feeling today?"
        }]);
      }
    }
  }, [activeChat]);

  // Save messages when they change
  useEffect(() => {
    if (activeChat && messages.length > 0) {
      localStorage.setItem(`messages_${activeChat}`, JSON.stringify(messages));
      
      // Update chat title based on first user message
      const userMessages = messages.filter(msg => msg.role === "user");
      if (userMessages.length > 0) {
        const firstUserMessage = userMessages[0].content;
        const intelligentTitle = generateChatTitle(firstUserMessage);
        
        updateChatTitle(activeChat, intelligentTitle, messages[messages.length - 1].content);
      }
    }
  }, [messages, activeChat, updateChatTitle]);

  // Initialize voice services
  useEffect(() => {
    elevenLabsService.current = new ElevenLabsService();
    
    speechRecognition.current = new SpeechRecognitionService({
      onSpeechStart: () => setIsListening(true),
      onSpeechEnd: () => setIsListening(false),
      onResult: (text) => {
        setInput(prev => prev + text);
      },
      onError: (error) => {
        console.error("Speech recognition error:", error);
        setIsListening(false);
        toast({
          title: "Voice Recognition Error",
          description: `Error: ${error}. Please try again.`,
          variant: "destructive",
        });
      }
    });
    
    speechSynthesis.current = new SpeechSynthesisService();
    
    const recognitionSupported = speechRecognition.current.isRecognitionSupported();
    setSpeechRecognitionSupported(recognitionSupported);
    
    if (elevenLabsService.current) {
      elevenLabsService.current.setVoiceByIndex(currentVoiceIndex);
    }
    
    return () => {
      if (speechRecognition.current) {
        speechRecognition.current.stop();
      }
      if (speechSynthesis.current) {
        speechSynthesis.current.stop();
      }
    };
  }, []);

  // Check API connection on load
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

  const playVoiceSample = (index: number) => {
    if (elevenLabsService.current) {
      elevenLabsService.current.speakSample(index);
    } else if (speechSynthesis.current) {
      speechSynthesis.current.speakSample(index);
    }
  };

  const changeVoice = (index: number) => {
    if (elevenLabsService.current) {
      const success = elevenLabsService.current.setVoiceByIndex(index);
      if (success) {
        setCurrentVoiceIndex(index);
        toast({
          title: "Voice Changed",
          description: `Voice set to ${ELEVEN_LABS_VOICES[index].name}`
        });
      }
    } else if (speechSynthesis.current) {
      const success = speechSynthesis.current.setVoiceByIndex(index);
      if (success) {
        setCurrentVoiceIndex(index);
      }
    }
  };

  const toggleListening = () => {
    if (!speechRecognitionSupported) {
      toast({
        title: "Speech Recognition Not Supported",
        description: "Your browser doesn't support voice input. Please use text input instead.",
        variant: "destructive"
      });
      return;
    }
    
    if (isListening) {
      speechRecognition.current?.stop();
      setIsListening(false);
    } else {
      const started = speechRecognition.current?.start();
      if (!started) {
        toast({
          title: "Voice Input Error",
          description: "Failed to start voice recognition. Please try again.",
          variant: "destructive"
        });
      }
    }
  };
  
  const toggleVoiceOutput = () => {
    setVoiceEnabled(!voiceEnabled);
    toast({
      title: voiceEnabled ? "Voice Output Disabled" : "Voice Output Enabled",
      description: voiceEnabled ? "Responses will not be read aloud." : "Responses will be read aloud."
    });
  };

  const speakMessage = async (text: string) => {
    if (!voiceEnabled) return;
    
    // Signal that speaking has started
    onSpeakingChange(true);
    
    if (elevenLabsService.current) {
      await elevenLabsService.current.speak(text);
    } else if (speechSynthesis.current) {
      speechSynthesis.current.speak(text);
    }
    
    // Signal that speaking has ended
    onSpeakingChange(false);
  };

  const playMessageVoice = async (text: string, messageIndex: number) => {
    if (playingMessageIndex === messageIndex) {
      // Stop playing if it's the same message
      if (elevenLabsService.current) {
        elevenLabsService.current.stop();
      } else if (speechSynthesis.current) {
        speechSynthesis.current.stop();
      }
      setPlayingMessageIndex(null);
      onSpeakingChange(false);
      return;
    }
    
    setPlayingMessageIndex(messageIndex);
    onSpeakingChange(true);
    
    if (elevenLabsService.current) {
      await elevenLabsService.current.speak(text);
    } else if (speechSynthesis.current) {
      speechSynthesis.current.speak(text);
    }
    
    setPlayingMessageIndex(null);
    onSpeakingChange(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      toast({
        title: "File Selected",
        description: `${e.target.files[0].name} ready to send.`
      });
    }
  };

  const handleFileButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const clearSelectedFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleFileSend = async () => {
    if (!selectedFile) return;

    const fileUrl = URL.createObjectURL(selectedFile);
    const userMessage: Message = {
      role: "user",
      content: input.trim() || `I'm sending you this file: ${selectedFile.name}`,
      fileUrl,
      fileName: selectedFile.name
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    clearSelectedFile();

    const fileType = selectedFile.type;
    let fileDescription = "";

    if (fileType.startsWith("image/")) {
      fileDescription = "an image";
    } else if (fileType.startsWith("application/pdf")) {
      fileDescription = "a PDF document";
    } else if (fileType.startsWith("text/")) {
      fileDescription = "a text file";
    } else {
      fileDescription = "a file";
    }

    setTimeout(() => {
      const assistantMessage = {
        role: "assistant" as const,
        content: `I've received ${fileDescription} named "${selectedFile.name}". What would you like me to help you with regarding this file?`
      };
      setMessages(prev => [...prev, assistantMessage]);
      speakMessage(assistantMessage.content);
      setIsLoading(false);
    }, 1000);
  };

  const simulateFallbackResponse = (userInput: string) => {
    setTimeout(() => {
      // Adjust fallback responses to be more in line with emotional support when needed
      const needsSupport = userInput.toLowerCase().match(/sad|anxious|worried|depressed|upset|angry|hurt|pain|lonely|alone/);
      
      let fallbackResponses;
      
      if (needsSupport) {
        fallbackResponses = [
          "I can sense how difficult this is for you right now. Would you like to take a moment to breathe together? I'm here with you through this.",
          "Your feelings are completely valid. Thank you for sharing them with me. Would you like to tell me more about what's happening?",
          "I'm here with you, and I want you to know you're not facing this alone. These emotions are real, and it takes courage to express them.",
          "Sometimes the weight we carry feels too heavy. But I want you to know that I'm here, listening, and I care about what you're going through.",
          "Let's take this one moment at a time together. I'm here with you, and I'm not going anywhere. How can I support you right now?"
        ];
      } else {
        fallbackResponses = [
          "I understand how you're feeling. Would you like to talk more about that?",
          "That's interesting. Could you tell me more about your experience?",
          "I appreciate you sharing that with me. How does that make you feel?",
          "I'm here to listen. What else is on your mind today?",
          "Thank you for opening up. Is there anything specific you'd like to focus on in our conversation?"
        ];
      }
      
      const randomResponse = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
      
      setMessages(prev => [...prev, {
        role: "assistant",
        content: randomResponse
      }]);
      
      speakMessage(randomResponse);
      
      setIsLoading(false);
    }, 1000);
  };
  
  const sendMessage = async () => {
    if ((input.trim() === "" && !selectedFile) || isLoading) return;
    
    if (selectedFile) {
      await handleFileSend();
      return;
    }

    const userMessage = {
      role: "user" as const,
      content: input.trim()
    };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    
    if (isListening) {
      speechRecognition.current?.stop();
    }
    
    if (speechSynthesis.current) {
      speechSynthesis.current.stop();
    }
    
    if (fallbackMode) {
      simulateFallbackResponse(userMessage.content);
      return;
    }
    
    try {
      console.log("Sending message to OpenAI API");
      
      // Get the appropriate system prompt based on sentiment analysis
      const systemPrompt = getSystemPrompt(userMessage.content);
      console.log("Using system prompt based on emotional state:", systemPrompt.substring(0, 50) + "...");
      
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
      
      speakMessage(assistantMessage);
      
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
      const errorMessage = "I'm sorry, I can't chat more due to limit. Please try again later.";
      setMessages(prev => [...prev, {
        role: "assistant",
        content: errorMessage
      }]);
      
      speakMessage(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn(
      "flex flex-col h-full w-full relative overflow-hidden",
      darkMode 
        ? "bg-gradient-to-br from-slate-800 to-slate-900 text-white" 
        : "bg-gradient-to-br from-white/40 to-ruvo-50/30 backdrop-blur-sm"
    )}>
      <ChatHeader
        darkMode={darkMode}
        fallbackMode={fallbackMode}
        voiceEnabled={voiceEnabled}
        voicePopoverOpen={voicePopoverOpen}
        setVoicePopoverOpen={setVoicePopoverOpen}
        toggleVoiceOutput={toggleVoiceOutput}
        playVoiceSample={playVoiceSample}
        changeVoice={changeVoice}
        currentVoiceIndex={currentVoiceIndex}
        isRetrying={isRetrying}
        retryApiConnection={retryApiConnection}
      />

      <ConnectionAlert 
        fallbackMode={fallbackMode} 
        darkMode={darkMode} 
      />

      <ChatMessageList
        messages={messages}
        isLoading={isLoading}
        darkMode={darkMode}
        fallbackMode={fallbackMode}
        playingMessageIndex={playingMessageIndex}
        playMessageVoice={playMessageVoice}
      />

      <ChatInputForm
        input={input}
        setInput={setInput}
        sendMessage={sendMessage}
        isLoading={isLoading}
        selectedFile={selectedFile}
        darkMode={darkMode}
        fileInputRef={fileInputRef}
        handleFileButtonClick={handleFileButtonClick}
        handleFileUpload={handleFileUpload}
        clearSelectedFile={clearSelectedFile}
        toggleListening={toggleListening}
        isListening={isListening}
        speechRecognitionSupported={speechRecognitionSupported}
      />
    </div>
  );
};

export default ChatInterface;
