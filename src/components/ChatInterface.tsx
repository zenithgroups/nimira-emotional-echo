import React, { useState, useRef, useEffect } from "react";
import { Send, RefreshCw, Mic, Volume2, VolumeX, ChevronDown, PlayCircle, PauseCircle, Paperclip } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { SpeechRecognitionService, SpeechSynthesisService } from "@/utils/voiceUtils";
import { ElevenLabsService, ELEVEN_LABS_VOICES } from "@/utils/elevenLabsUtils";
import { getSystemPrompt } from "@/utils/sentimentUtils";

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
  fileUrl?: string;
  fileName?: string;
}

interface ChatInterfaceProps {
  selectedVoiceIndex?: number;
  onSpeakingChange?: (speaking: boolean) => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  selectedVoiceIndex = 0,
  onSpeakingChange = () => {}
}) => {
  const [messages, setMessages] = useState<Message[]>([{
    role: "assistant",
    content: "Hello! I'm Ruvo. I'm here to listen and support you. How are you feeling today?"
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
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const apiUrl = "https://api.openai.com/v1/chat/completions";
  const apiKey = "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";

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

  return <div className="flex flex-col h-full w-full relative overflow-hidden rounded-2xl border border-ruvo-200/50 bg-gradient-to-br from-slate-50 to-slate-100 transition-all hover:border-ruvo-300 shadow-md">
      <div className="flex items-center gap-3 p-4 border-b border-ruvo-200/30 bg-white/90 backdrop-blur-sm">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-ruvo-400 to-ruvo-500 flex items-center justify-center text-white font-medium bg-indigo-500">R</div>
        <div>
          <h3 className="font-medium">Ruvo AI</h3>
          <p className="text-xs text-gray-500">
            {fallbackMode ? "Demo Mode - Service Unavailable" : "Online - OpenAI GPT-4o Powered"}
            {voiceEnabled && " · Premium Voice"}
          </p>
        </div>
        <div className="flex gap-2 ml-auto">
          <Popover open={voicePopoverOpen} onOpenChange={setVoicePopoverOpen}>
            <PopoverTrigger asChild>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs flex items-center gap-1" 
                title="Voice settings"
              >
                {voiceEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
                <ChevronDown size={12} />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">Voice Agent</h4>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={toggleVoiceOutput}
                    >
                      {voiceEnabled ? "Disable" : "Enable"}
                    </Button>
                  </div>
                </div>
                
                {voiceEnabled && (
                  <div className="space-y-3">
                    <h5 className="text-sm font-medium">Select Premium Voice</h5>
                    
                    <RadioGroup 
                      value={String(currentVoiceIndex)} 
                      onValueChange={(value) => changeVoice(parseInt(value))}
                    >
                      <div className="space-y-2 max-h-60 overflow-y-auto">
                        {ELEVEN_LABS_VOICES.map((voice, index) => (
                          <div key={voice.voice_id} className="flex items-center justify-between space-x-2">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value={String(index)} id={`voice-${index}`} />
                              <Label htmlFor={`voice-${index}`} className="text-sm cursor-pointer">
                                {voice.name} <span className="text-xs text-gray-500">({voice.gender})</span>
                              </Label>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => playVoiceSample(index)}
                              title="Play sample"
                              className="flex items-center gap-1"
                            >
                              <PlayCircle size={14} />
                              <span className="text-xs">Sample</span>
                            </Button>
                          </div>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>
                )}
              </div>
            </PopoverContent>
          </Popover>
          
          {fallbackMode && (
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
                  <RefreshCw size={14} /> Retry
                </>
              )}
            </Button>
          )}
        </div>
      </div>

      {fallbackMode && (
        <Alert className="m-2 py-2 bg-yellow-50 border-yellow-200">
          <AlertDescription className="text-xs text-yellow-800">
            Running in demo mode. Can't chat more due to limit. Your messages will receive simulated responses.
          </AlertDescription>
        </Alert>
      )}

      <ScrollArea className="flex-1 p-4 overflow-y-auto bg-white/40" ref={scrollAreaRef}>
        <div className="flex flex-col gap-4">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] p-3 rounded-2xl ${message.role === "user" ? "bg-white border border-gray-100 shadow-sm rounded-br-none ml-auto" : `${fallbackMode ? "bg-slate-100" : "bg-ruvo-100"} rounded-bl-none shadow-sm`}`}>
                {message.fileUrl && (
                  <div className="mb-2">
                    {message.fileUrl.startsWith('blob:') && message.fileName?.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? (
                      <div className="relative">
                        <img 
                          src={message.fileUrl} 
                          alt={message.fileName || "Uploaded file"} 
                          className="max-w-full rounded-lg max-h-60 object-contain" 
                        />
                        <div className="mt-1 text-xs text-gray-500">{message.fileName}</div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-md border border-gray-200">
                        <div className="w-8 h-8 bg-gray-200 rounded-md flex items-center justify-center">
                          <Paperclip size={16} className="text-gray-600" />
                        </div>
                        <div className="overflow-hidden">
                          <div className="text-sm font-medium truncate">{message.fileName}</div>
                          <div className="text-xs text-gray-500">File attachment</div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                {message.role === "assistant" && (
                  <Button 
                    variant="ghost"
                    size="sm"
                    className="mt-2 h-6 p-0 text-xs text-gray-500 hover:text-ruvo-500 flex items-center gap-1"
                    onClick={() => playMessageVoice(message.content, index)}
                    title={playingMessageIndex === index ? "Stop" : "Listen"}
                  >
                    {playingMessageIndex === index ? (
                      <>
                        <PauseCircle size={14} className="mr-1" /> Stop
                      </>
                    ) : (
                      <>
                        <Volume2 size={14} className="mr-1" /> Listen
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] p-3 rounded-2xl bg-ruvo-100 rounded-bl-none shadow-sm">
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
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-ruvo-200/30 bg-white/90 backdrop-blur-sm">
        <input 
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          className="hidden"
          accept="image/*,application/pdf,text/plain"
        />
        
        {selectedFile && (
          <div className="mb-2 p-2 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Paperclip size={16} className="text-gray-600" />
              <span className="text-sm truncate max-w-[200px]">{selectedFile.name}</span>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={clearSelectedFile}
              className="h-6 w-6 p-0 rounded-full"
            >
              &times;
            </Button>
          </div>
        )}
        
        <form 
          onSubmit={e => {
            e.preventDefault();
            sendMessage();
          }} 
          className="relative flex items-end gap-2"
        >
          <Textarea 
            placeholder="Type a message..." 
            value={input} 
            onChange={e => setInput(e.target.value)} 
            className="w-full min-h-[44px] max-h-[120px] resize-none bg-gray-50 border border-gray-200 rounded-xl pr-20 focus:border-ruvo-300" 
            onKeyDown={e => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }} 
          />
          
          <div className="absolute right-2 bottom-2 flex gap-1">
            <button 
              type="button" 
              className="p-2 rounded-full bg-gray-200 text-gray-500 hover:bg-gray-300 transition-colors"
              onClick={handleFileButtonClick}
              title="Upload file"
            >
              <Paperclip size={16} />
            </button>
            
            {speechRecognitionSupported && (
              <button 
                type="button" 
                className={`p-2 rounded-full transition-colors ${isListening ? "bg-ruvo-500 text-white" : "bg-gray-200 text-gray-500 hover:bg-gray-300"}`}
                onClick={toggleListening}
                title={isListening ? "Stop listening" : "Start voice input"}
              >
                <Mic size={16} className={isListening ? "animate-pulse" : ""} />
              </button>
            )}
            
            <button 
              type="submit" 
              className={`p-2 rounded-full transition-colors ${(isLoading || (input.trim() === "" && !selectedFile)) ? "bg-gray-200 text-gray-500 cursor-not-allowed" : "bg-ruvo-400 hover:bg-ruvo-500 text-white"}`} 
              disabled={isLoading || (input.trim() === "" && !selectedFile)}
            >
              <Send size={16} />
            </button>
          </div>
        </form>
      </div>
    </div>;
};

export default ChatInterface;
