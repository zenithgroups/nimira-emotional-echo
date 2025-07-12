import React, { useState, useRef, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { SpeechRecognitionService, SpeechSynthesisService } from "@/utils/voiceUtils";
import { ElevenLabsService, ELEVEN_LABS_VOICES } from "@/utils/elevenLabsUtils";
import { getSystemPrompt, detectEmotion, getOpenAITitlePrompt } from "@/utils/sentimentUtils";
import { cn } from "@/lib/utils";

// Import refactored components 
import { ChatHeader } from "./chat/ChatHeader";
import { ChatMessageList } from "./chat/ChatMessageList"; 
import { ChatInputForm } from "./chat/ChatInputForm";
import { ConnectionAlert } from "./chat/ConnectionAlert";
import { EnhancedVoiceConversation } from "./chat/EnhancedVoiceConversation";
import { ContinuousVoiceAssistant } from "./voice/ContinuousVoiceAssistant";

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
  userData?: any;
  voiceEnabled?: boolean;
  onToggleVoice?: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  selectedVoiceIndex = 0,
  onSpeakingChange = () => {},
  darkMode = false,
  activeChat = null,
  updateChatTitle = () => {},
  userData = null,
  voiceEnabled = true,
  onToggleVoice = () => {}
}) => {
  const [messages, setMessages] = useState<Message[]>([{
    role: "assistant",
    content: userData 
      ? `Hi ${userData.nickname || userData.name}! How are you feeling today?`
      : "Hi there! How are you feeling today?"
  }]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [fallbackMode, setFallbackMode] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);
  const [chatTitleGenerated, setChatTitleGenerated] = useState(false);
  
  const [isListening, setIsListening] = useState(false);
  const [speechRecognitionSupported, setSpeechRecognitionSupported] = useState(false);
  const [currentVoiceIndex, setCurrentVoiceIndex] = useState(selectedVoiceIndex);
  const [voicePopoverOpen, setVoicePopoverOpen] = useState(false);
  const [isVoiceConversationOpen, setIsVoiceConversationOpen] = useState(false);
  const [isContinuousVoiceOpen, setIsContinuousVoiceOpen] = useState(false);
  const [isProcessingVoice, setIsProcessingVoice] = useState(false);
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  
  const speechRecognition = useRef<SpeechRecognitionService | null>(null);
  const speechSynthesis = useRef<SpeechSynthesisService | null>(null);
  const elevenLabsService = useRef<ElevenLabsService | null>(null);
  
  const [playingMessageIndex, setPlayingMessageIndex] = useState<number | null>(null);
  
  const { toast } = useToast();
  const apiUrl = "https://api.openai.com/v1/chat/completions";
  const apiKey = "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";

  // Generate smarter chat title using OpenAI
  const generateOpenAIChatTitle = async (userMessage: string): Promise<string> => {
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [{
            role: "user",
            content: getOpenAITitlePrompt(userMessage)
          }],
          temperature: 0.7,
          max_tokens: 50
        })
      });
      
      if (!response.ok) {
        console.error("Error generating chat title:", response.status);
        return generateFallbackChatTitle(userMessage);
      }
      
      const data = await response.json();
      const title = data.choices?.[0]?.message?.content?.trim() || "New conversation";
      return title;
    } catch (error) {
      console.error("Error generating chat title:", error);
      return generateFallbackChatTitle(userMessage);
    }
  };

  // Fallback title generation if OpenAI call fails
  const generateFallbackChatTitle = (userMessage: string): string => {
    if (!userMessage || userMessage.trim() === '') {
      return 'New conversation';
    }
    
    // Detect the emotional state from the message
    const emotion = detectEmotion(userMessage);
    
    // Create more intelligent titles based on emotional content
    switch(emotion) {
      case "sad":
        return "Feeling down today";
      case "anxious":
        return "Managing anxiety";
      case "angry":
        return "Processing frustration";
      case "happy":
        return "Positive chat";
      case "excited":
        return "Exciting discussion";
      case "confused":
        return "Seeking clarity"; 
      case "heartbroken":
        return "Healing heartache";
      case "stressed":
        return "Stress relief";
      case "tired":
        return "Finding energy";
      case "fearful":
        return "Overcoming fears";
      default:
        // For neutral or undetected emotions, use a shortened version of the message
        if (userMessage.length <= 20) {
          return userMessage;
        } else {
          // Extract key topics from message or just truncate
          const keywords = userMessage
            .toLowerCase()
            .split(' ')
            .filter(word => word.length > 3)
            .slice(0, 2)
            .join(' ');
            
          return keywords.charAt(0).toUpperCase() + keywords.slice(1) + " discussion";
        }
    }
  };

  // Load saved messages for the active chat
  useEffect(() => {
    if (activeChat) {
      const savedMessages = localStorage.getItem(`messages_${activeChat}`);
      if (savedMessages) {
        setMessages(JSON.parse(savedMessages));
        setChatTitleGenerated(true);
      } else {
        setMessages([{
          role: "assistant",
          content: userData 
            ? `Hi ${userData.nickname || userData.name}! How are you feeling today?`
            : "Hi there! How are you feeling today?"
        }]);
        setChatTitleGenerated(false);
      }
    }
  }, [activeChat, userData]);

  // Save messages when they change and update chat title only after user has sent a message
  useEffect(() => {
    if (activeChat && messages.length > 0) {
      localStorage.setItem(`messages_${activeChat}`, JSON.stringify(messages));
      
      // Update chat title based on first user message if not already done
      const userMessages = messages.filter(msg => msg.role === "user");
      if (userMessages.length > 0 && !chatTitleGenerated) {
        const firstUserMessage = userMessages[0].content;
        
        // Use OpenAI to generate a title
        generateOpenAIChatTitle(firstUserMessage).then(title => {
          updateChatTitle(activeChat, title, messages[messages.length - 1].content);
          setChatTitleGenerated(true);
        });
      } else if (userMessages.length > 0) {
        // Just update the last message
        updateChatTitle(activeChat, undefined, messages[messages.length - 1].content);
      }
    }
  }, [messages, activeChat, updateChatTitle, chatTitleGenerated]);

  // Initialize voice services
  useEffect(() => {
    // Initialize ElevenLabs with user's selected voice
    const savedVoice = localStorage.getItem('ruvo_selected_voice');
    elevenLabsService.current = new ElevenLabsService();
    
    if (savedVoice && elevenLabsService.current) {
      elevenLabsService.current.setVoice(savedVoice);
    }
    
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
  }, [currentVoiceIndex]);

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
        // Save voice selection
        localStorage.setItem('ruvo_selected_voice', ELEVEN_LABS_VOICES[index].voice_id);
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

  const openContinuousVoiceConversation = () => {
    setIsContinuousVoiceOpen(true);
  };

  const closeContinuousVoiceConversation = () => {
    setIsContinuousVoiceOpen(false);
  };

  const openVoiceConversation = () => {
    setIsVoiceConversationOpen(true);
  };

  const closeVoiceConversation = () => {
    setIsVoiceConversationOpen(false);
    setIsListening(false);
    setIsProcessingVoice(false);
    speechRecognition.current?.stop();
  };

  const handleVoiceToggle = () => {
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

  const handleVoiceMessage = async (message: string) => {
    setIsProcessingVoice(true);
    
    // Add user message to chat
    const userMessage = {
      role: "user" as const,
      content: message.trim()
    };
    setMessages(prev => [...prev, userMessage]);
    
    // Send to OpenAI and get response
    await sendMessageToAI(userMessage);
    
    setIsProcessingVoice(false);
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

  const sendMessageToAI = async (userMessage: Message): Promise<string | null> => {
    setIsLoading(true);
    
    if (fallbackMode) {
      simulateFallbackResponse(userMessage.content);
      return null;
    }
    
    try {
      console.log("Sending message to OpenAI API");
      
      // Get the appropriate system prompt based on sentiment analysis and user data
      const systemPrompt = getSystemPrompt(userMessage.content, userData);
      console.log("Using system prompt based on emotional state and user data:", systemPrompt.substring(0, 50) + "...");
      
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
      
      // Auto-speak if voice is enabled and called from voice conversation
      if (voiceEnabled && isProcessingVoice && elevenLabsService.current) {
        await elevenLabsService.current.speak(assistantMessage);
      }
      
      if (fallbackMode) {
        setFallbackMode(false);
        toast({
          title: "API Connection Restored",
          description: "Successfully connected to OpenAI API. Enjoy your conversation!"
        });
      }
      
      return assistantMessage;
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
      return null;
    } finally {
      setIsLoading(false);
    }
  };
  
  const sendMessage = async (e?: React.FormEvent, messageContent?: string) => {
    if (e) e.preventDefault();
    
    const messageToSend = messageContent || input.trim();
    if (!messageToSend && !selectedFile) return;
    
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
    
    if (isListening) {
      speechRecognition.current?.stop();
    }
    
    if (speechSynthesis.current) {
      speechSynthesis.current.stop();
    }
    
    await sendMessageToAI(userMessage);
  };

  return (
    <div className={cn(
      "flex flex-col h-full w-full relative overflow-hidden",
      darkMode 
        ? "bg-gradient-to-br from-slate-900/95 via-slate-800/90 to-slate-900/95" 
        : "bg-gradient-to-br from-white/95 via-gray-50/90 to-white/95"
    )}>
      <ChatHeader
        darkMode={darkMode}
        fallbackMode={fallbackMode}
        voiceEnabled={voiceEnabled}
        voicePopoverOpen={voicePopoverOpen}
        setVoicePopoverOpen={setVoicePopoverOpen}
        toggleVoiceOutput={onToggleVoice}
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
        onOpenVoiceConversation={openContinuousVoiceConversation}
      />

      <EnhancedVoiceConversation
        isOpen={isVoiceConversationOpen}
        onClose={closeVoiceConversation}
        darkMode={darkMode}
        isListening={isListening}
        onToggleListening={handleVoiceToggle}
        isProcessing={isProcessingVoice}
        onSendMessage={handleVoiceMessage}
        voiceEnabled={voiceEnabled}
        onToggleVoice={onToggleVoice}
      />

      <ContinuousVoiceAssistant
        isOpen={isContinuousVoiceOpen}
        onClose={closeContinuousVoiceConversation}
        darkMode={darkMode}
        userData={userData}
        selectedVoiceId={ELEVEN_LABS_VOICES[currentVoiceIndex]?.voice_id}
      />
    </div>
  );
};

export default ChatInterface;
