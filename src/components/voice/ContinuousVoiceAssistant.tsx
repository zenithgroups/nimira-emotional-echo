import React, { useState, useRef, useEffect } from "react";
import { X, Mic, MicOff, Volume2, VolumeX, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { VoiceRecognitionService } from "@/services/VoiceRecognitionService";
import { ConversationManager } from "@/services/ConversationManager";
import { AudioVisualization } from "./AudioVisualization";
import { useToast } from "@/hooks/use-toast";

interface ContinuousVoiceAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  darkMode: boolean;
  userData?: any;
  selectedVoiceId?: string;
}

type AssistantState =
  | "idle"
  | "listening"
  | "thinking"
  | "speaking"
  | "stopped"
  | "error";

export const ContinuousVoiceAssistant: React.FC<
  ContinuousVoiceAssistantProps
> = ({ isOpen, onClose, darkMode, userData, selectedVoiceId }) => {
  const [state, setState] = useState<AssistantState>("idle");
  const [transcript, setTranscript] = useState("");
  const [currentResponse, setCurrentResponse] = useState("");
  const [isConversationActive, setIsConversationActive] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<string[]>([]);
  const [audioEnabled, setAudioEnabled] = useState(true);

  const voiceService = useRef<VoiceRecognitionService | null>(null);
  const conversationManager = useRef<ConversationManager | null>(null);
  const { toast } = useToast();

  // Initialize services
  useEffect(() => {
    if (!isOpen) return;

    // Initialize voice recognition service
    voiceService.current = new VoiceRecognitionService({
      continuous: true,
      interimResults: false,
      silenceTimeout: 1200, // 1.2 seconds of silence
      onSpeechStart: () => {
        setState("listening");
        setTranscript("");
      },
      onSpeechEnd: () => {
        setState("thinking");
        // Auto-process after silence
        setTimeout(() => {
          if (voiceService.current) {
            voiceService.current.stop();
          }
        }, 100);
      },
      onResult: (text) => {
        setTranscript(text);
        if (text.trim()) {
          handleUserInput(text);
        }
      },
      onError: (error) => {
        console.error("Speech recognition error:", error);
        setState("error");
        toast({
          title: "Voice Recognition Error",
          description:
            "Please check your microphone permissions and try again.",
          variant: "destructive",
        });
      },
    });

    // Initialize conversation manager
    conversationManager.current = new ConversationManager({
      userData,
      voiceId: selectedVoiceId,
      onResponseReceived: (response) => {
        setCurrentResponse(response);
        setConversationHistory((prev) => [...prev, `AI: ${response}`]);
      },
      onSpeechStart: () => {
        setState("speaking");
      },
      onSpeechEnd: () => {
        // Automatically restart listening after speech ends
        if (isConversationActive) {
          setTimeout(() => {
            restartListening();
          }, 500); // Small delay before restarting
        } else {
          setState("idle");
        }
      },
      onError: (error) => {
        console.error("Conversation error:", error);
        setState("error");
        toast({
          title: "Conversation Error",
          description: error,
          variant: "destructive",
        });
      },
    });

    return () => {
      // Cleanup
      if (voiceService.current) {
        voiceService.current.cleanup();
      }
      if (conversationManager.current) {
        conversationManager.current.cleanup();
      }
    };
  }, [isOpen, userData, selectedVoiceId, isConversationActive]);

  const handleUserInput = async (text: string) => {
    if (!conversationManager.current || !text.trim()) return;

    setConversationHistory((prev) => [...prev, `You: ${text}`]);

    try {
      await conversationManager.current.processUserInput(text);
    } catch (error) {
      console.error("Error processing user input:", error);
      setState("error");
    }
  };

  const startConversation = async () => {
    if (!voiceService.current) return;

    try {
      await voiceService.current.start();
      setIsConversationActive(true);
      setState("listening");
      setConversationHistory([]);

      toast({
        title: "Conversation Started",
        description: "I'm listening! Start speaking naturally.",
      });
    } catch (error) {
      console.error("Failed to start conversation:", error);
      setState("error");
    }
  };

  const stopConversation = () => {
    if (voiceService.current) {
      voiceService.current.stop();
    }
    if (conversationManager.current) {
      conversationManager.current.stopSpeaking();
    }

    setIsConversationActive(false);
    setState("stopped");
    setTranscript("");
    setCurrentResponse("");

    toast({
      title: "Conversation Stopped",
      description: "Voice conversation has been ended.",
    });
  };

  const restartListening = async () => {
    if (!isConversationActive || !voiceService.current) return;

    try {
      await voiceService.current.start();
      setState("listening");
    } catch (error) {
      console.error("Failed to restart listening:", error);
      setState("error");
    }
  };

  const toggleAudio = () => {
    setAudioEnabled(!audioEnabled);
    if (conversationManager.current) {
      conversationManager.current.setAudioEnabled(!audioEnabled);
    }
  };

  const getStateMessage = () => {
    switch (state) {
      case "idle":
        return "Ready to start conversation";
      case "listening":
        return "Listening... speak naturally";
      case "thinking":
        return "Processing your message...";
      case "speaking":
        return "RUVO is speaking...";
      case "stopped":
        return "Conversation stopped";
      case "error":
        return "Error occurred - please try again";
      default:
        return "Ready";
    }
  };

  const getStateColor = () => {
    switch (state) {
      case "listening":
        return "text-green-500";
      case "thinking":
        return "text-yellow-500";
      case "speaking":
        return "text-blue-500";
      case "error":
        return "text-red-500";
      default:
        return darkMode ? "text-slate-400" : "text-gray-600";
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center",
        "backdrop-blur-2xl transition-all duration-700",
        darkMode
          ? "bg-gradient-to-br from-black/90 via-slate-900/80 to-black/90"
          : "bg-gradient-to-br from-white/90 via-gray-50/80 to-white/90"
      )}
    >
      {/* Ambient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-900/10 via-transparent to-orange-900/10" />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className={cn(
              "absolute w-1 h-1 rounded-full animate-pulse",
              darkMode ? "bg-violet-400/20" : "bg-violet-600/20"
            )}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${3 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Main conversation window */}
      <div
        className={cn(
          "relative w-full max-w-2xl mx-6 p-8 rounded-3xl backdrop-blur-3xl",
          "border border-white/10 shadow-2xl transform transition-all duration-700",
          darkMode
            ? "bg-gradient-to-br from-slate-900/95 via-slate-800/90 to-slate-900/95"
            : "bg-gradient-to-br from-white/95 via-gray-50/90 to-white/95"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div
              className={cn(
                "w-16 h-16 rounded-full flex items-center justify-center",
                "bg-gradient-to-br from-violet-500 to-orange-400 shadow-lg"
              )}
            >
              <img
                src="/lovable-uploads/aa075d0b-00d3-4c46-a600-501aec587b42.png"
                alt="RUVO AI"
                className="h-10 w-10 object-contain invert"
              />
            </div>
            <div>
              <h2
                className={cn(
                  "text-2xl font-bold bg-gradient-to-r from-violet-600 to-orange-500 bg-clip-text text-transparent"
                )}
              >
                RUVO Voice Assistant
              </h2>
              <p className={cn("text-sm", getStateColor())}>
                {getStateMessage()}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleAudio}
              className={cn(
                "rounded-full w-12 h-12 p-0",
                darkMode
                  ? "text-slate-400 hover:text-white hover:bg-slate-700/50"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-200/50"
              )}
            >
              {audioEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className={cn(
                "rounded-full w-12 h-12 p-0",
                darkMode
                  ? "text-slate-400 hover:text-white hover:bg-slate-700/50"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-200/50"
              )}
            >
              <X size={20} />
            </Button>
          </div>
        </div>

        {/* Audio Visualization */}
        <div className="flex items-center justify-center h-48 mb-8">
          <AudioVisualization
            state={state}
            darkMode={darkMode}
            isActive={isConversationActive}
          />
        </div>

        {/* Current transcript/response */}
        {(transcript || currentResponse) && (
          <div
            className={cn(
              "mb-6 p-6 rounded-2xl backdrop-blur-sm transition-all duration-500",
              "border border-white/10",
              darkMode ? "bg-slate-800/60" : "bg-white/60"
            )}
          >
            {transcript && (
              <div className="mb-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-2 animate-pulse" />
                  <div>
                    <p className="text-xs font-medium opacity-60 mb-1">
                      You said:
                    </p>
                    <p
                      className={cn(
                        "text-sm",
                        darkMode ? "text-slate-100" : "text-gray-800"
                      )}
                    >
                      {transcript}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {currentResponse && (
              <div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-orange-400 flex items-center justify-center flex-shrink-0">
                    <img
                      src="/lovable-uploads/aa075d0b-00d3-4c46-a600-501aec587b42.png"
                      alt="AI"
                      className="h-5 w-5 object-contain invert"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-medium opacity-60 mb-1">RUVO:</p>
                    <p
                      className={cn(
                        "text-sm leading-relaxed",
                        darkMode ? "text-slate-100" : "text-gray-800"
                      )}
                    >
                      {currentResponse}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Conversation history */}
        {conversationHistory.length > 0 && (
          <div
            className={cn(
              "mb-6 max-h-32 overflow-y-auto p-4 rounded-xl",
              darkMode ? "bg-slate-800/30" : "bg-gray-100/30"
            )}
          >
            <p className="text-xs font-medium opacity-60 mb-2">
              Conversation History:
            </p>
            {conversationHistory.slice(-3).map((message, index) => (
              <p
                key={index}
                className={cn(
                  "text-xs mb-1",
                  darkMode ? "text-slate-300" : "text-gray-700"
                )}
              >
                {message}
              </p>
            ))}
          </div>
        )}

        {/* Control buttons */}
        <div className="flex justify-center gap-6">
          {!isConversationActive ? (
            <Button
              onClick={startConversation}
              disabled={state === "error"}
              className={cn(
                "w-20 h-20 rounded-full transition-all duration-300",
                "hover:scale-110 shadow-2xl backdrop-blur-sm",
                "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white",
                "border-2 border-white/20"
              )}
            >
              <Mic size={32} />
            </Button>
          ) : (
            <>
              {state === "speaking" && (
                <Button
                  onClick={() => conversationManager.current?.stopSpeaking()}
                  className={cn(
                    "w-16 h-16 rounded-full transition-all duration-300",
                    "bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white",
                    "border-2 border-white/20"
                  )}
                >
                  <Pause size={24} />
                </Button>
              )}

              <Button
                onClick={stopConversation}
                className={cn(
                  "w-20 h-20 rounded-full transition-all duration-300",
                  "hover:scale-110 shadow-2xl backdrop-blur-sm",
                  "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white",
                  "border-2 border-white/20"
                )}
              >
                <MicOff size={32} />
              </Button>
            </>
          )}
        </div>

        {/* Status indicator */}
        <div className="text-center mt-6">
          <div
            className={cn(
              "inline-flex items-center gap-3 px-6 py-3 rounded-full text-sm font-medium",
              "backdrop-blur-sm border border-white/10",
              darkMode
                ? "bg-slate-700/50 text-slate-300"
                : "bg-gray-200/50 text-gray-600"
            )}
          >
            <div
              className={cn(
                "w-3 h-3 rounded-full",
                state === "listening"
                  ? "bg-green-500 animate-pulse"
                  : state === "thinking"
                  ? "bg-yellow-500 animate-pulse"
                  : state === "speaking"
                  ? "bg-blue-500 animate-pulse"
                  : state === "error"
                  ? "bg-red-500"
                  : "bg-gray-400"
              )}
            />
            {getStateMessage()}
            {isConversationActive && state !== "error" && (
              <span className="text-xs opacity-60">
                • Continuous mode active
              </span>
            )}
          </div>
        </div>

        {/* Instructions */}
        {!isConversationActive && state !== "error" && (
          <div className="text-center mt-4">
            <p
              className={cn(
                "text-xs opacity-60",
                darkMode ? "text-slate-400" : "text-gray-500"
              )}
            >
              Click the mic to start a hands-free conversation with RUVO
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
