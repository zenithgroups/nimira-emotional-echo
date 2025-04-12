
import React, { useState } from "react";
import { MessageSquare, Book, Smile, Mic, Shield, Volume2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import ChatInterface from "./ChatInterface";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ELEVEN_LABS_VOICES, ElevenLabsService } from "@/utils/elevenLabsUtils";

const ProductFeaturesSection: React.FC = () => {
  const { toast } = useToast();
  const [showVoiceDemo, setShowVoiceDemo] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [elevenLabsService] = useState(() => new ElevenLabsService());
  const [selectedVoiceIndex, setSelectedVoiceIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const handleFeatureClick = (title: string, description: string) => {
    toast({
      title: title,
      description: description,
    });
  };

  const handleVoiceFeatureClick = () => {
    setShowVoiceDemo(true);
  };

  const handleApiKeySubmit = () => {
    if (apiKey) {
      const success = elevenLabsService.setApiKey(apiKey);
      if (success) {
        toast({
          title: "API Key Set",
          description: "Your ElevenLabs API key has been set successfully."
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to set API key. Please try again.",
          variant: "destructive"
        });
      }
    }
  };

  const playVoiceSample = async (index: number) => {
    if (!elevenLabsService.isServiceReady()) {
      toast({
        title: "API Key Required",
        description: "Please enter your ElevenLabs API key first.",
        variant: "destructive"
      });
      return;
    }

    setIsPlaying(true);
    const success = await elevenLabsService.speakSample(index);
    setIsPlaying(false);
    
    if (!success) {
      toast({
        title: "Playback Error",
        description: "Failed to play voice sample. Please check your API key.",
        variant: "destructive"
      });
    } else {
      setSelectedVoiceIndex(index);
    }
  };

  return (
    <section id="features" className="section-spacing bg-gradient-to-br from-white to-ruvo-100/30 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-40 right-0 w-72 h-72 bg-ruvo-300/20 rounded-full blur-3xl z-0"></div>
      <div className="absolute bottom-20 left-10 w-60 h-60 bg-ruvo-400/20 rounded-full blur-3xl z-0"></div>
      <div className="absolute top-60 left-20 w-40 h-40 bg-ruvo-200/30 rounded-full blur-2xl z-0"></div>
      
      <div className="container-custom relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-ruvo-100 text-ruvo-500 text-sm font-medium mb-4">Powerful AI Features</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">Advanced Capabilities</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience a companion that's designed to support your emotional wellbeing with cutting-edge AI technology.
          </p>
          <p className="mt-2 text-sm text-ruvo-500 font-medium">
            Try the interactive demo below powered by OpenAI GPT-4o!
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Interactive Chat Interface */}
          <div className="order-2 lg:order-1 relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-ruvo-300 to-ruvo-400 rounded-2xl blur opacity-40"></div>
            <div className="glass h-full flex items-center justify-center p-4 md:p-8 relative">
              <div className="w-full h-[500px]">
                <ChatInterface elevenLabsService={elevenLabsService} selectedVoiceIndex={selectedVoiceIndex} />
              </div>
            </div>
          </div>
          
          {/* Features List */}
          <div className="order-1 lg:order-2">
            <div className="space-y-6">
              <div 
                className="flex gap-4 cursor-pointer p-5 rounded-xl hover:bg-ruvo-100/30 transition-all duration-300 hover:scale-[1.02] border border-transparent hover:border-ruvo-200/50"
                onClick={() => handleFeatureClick("Real-time Chat", "Experience natural, human-like conversations powered by OpenAI's most advanced language model, for meaningful interactions.")}
              >
                <div className="shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-ruvo-300 to-ruvo-400 flex items-center justify-center shadow-md">
                  <MessageSquare className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-ruvo-600">Real-time Chat with OpenAI</h3>
                  <p className="text-gray-600">
                    Experience natural, human-like conversations powered by OpenAI's most advanced language model, for meaningful interactions.
                  </p>
                </div>
              </div>
              
              <div 
                className="flex gap-4 cursor-pointer p-5 rounded-xl hover:bg-ruvo-100/30 transition-all duration-300 hover:scale-[1.02] border border-transparent hover:border-ruvo-200/50"
                onClick={() => handleFeatureClick("Memory Journaling", "Ruvo remembers your past conversations and important life events, creating a digital memory journal that evolves with you.")}
              >
                <div className="shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-ruvo-300 to-ruvo-400 flex items-center justify-center shadow-md">
                  <Book className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-ruvo-600">Memory Journaling</h3>
                  <p className="text-gray-600">
                    Ruvo remembers your past conversations and important life events, creating a digital memory journal that evolves with you.
                  </p>
                </div>
              </div>
              
              <div 
                className="flex gap-4 cursor-pointer p-5 rounded-xl hover:bg-ruvo-100/30 transition-all duration-300 hover:scale-[1.02] border border-transparent hover:border-ruvo-200/50"
                onClick={() => handleFeatureClick("Daily Mood Check-ins", "Regular emotion tracking and personalized insights to help you understand patterns in your emotional wellbeing.")}
              >
                <div className="shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-ruvo-300 to-ruvo-400 flex items-center justify-center shadow-md">
                  <Smile className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-ruvo-600">Daily Mood Check-ins</h3>
                  <p className="text-gray-600">
                    Regular emotion tracking and personalized insights to help you understand patterns in your emotional wellbeing.
                  </p>
                </div>
              </div>
              
              <div 
                className="flex gap-4 cursor-pointer p-5 rounded-xl hover:bg-ruvo-100/30 transition-all duration-300 hover:scale-[1.02] border border-transparent hover:border-ruvo-200/50"
                onClick={handleVoiceFeatureClick}
              >
                <div className="shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-ruvo-300 to-ruvo-400 flex items-center justify-center shadow-md">
                  <Volume2 className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-ruvo-600">Premium Voice Selection</h3>
                  <p className="text-gray-600">
                    Try our premium voice selection powered by ElevenLabs. Experience truly distinct voice personalities with industry-leading voice quality.
                  </p>
                </div>
              </div>
              
              <div 
                className="flex gap-4 cursor-pointer p-5 rounded-xl hover:bg-ruvo-100/30 transition-all duration-300 hover:scale-[1.02] border border-transparent hover:border-ruvo-200/50"
                onClick={() => handleFeatureClick("Security & Privacy", "Your conversations with Ruvo are encrypted and private, with transparent data practices and user control.")}
              >
                <div className="shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-ruvo-300 to-ruvo-400 flex items-center justify-center shadow-md">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-ruvo-600">Secure, Private by Design</h3>
                  <p className="text-gray-600">
                    Your conversations with Ruvo are encrypted and private, with transparent data practices and user control.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Voice Demo Dialog */}
      <Dialog open={showVoiceDemo} onOpenChange={setShowVoiceDemo}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Premium Voice Selection</DialogTitle>
            <DialogDescription>
              Experience our high-quality voice agents powered by ElevenLabs. Enter your API key below to test the voices.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 mt-4">
            <div className="flex items-end gap-2">
              <div className="flex-1">
                <Label htmlFor="api-key">ElevenLabs API Key</Label>
                <Input
                  id="api-key"
                  type="password"
                  placeholder="Enter your ElevenLabs API key"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                />
              </div>
              <Button onClick={handleApiKeySubmit}>Set Key</Button>
            </div>
            
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-3">Select a Voice to Preview</h4>
              <RadioGroup value={String(selectedVoiceIndex)} onValueChange={(value) => setSelectedVoiceIndex(parseInt(value))}>
                <div className="space-y-2 max-h-[300px] overflow-y-auto border rounded-md p-2">
                  {ELEVEN_LABS_VOICES.map((voice, index) => (
                    <div key={voice.voice_id} className="flex items-center justify-between space-x-2 p-2 hover:bg-gray-50 rounded">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value={String(index)} id={`voice-${index}`} />
                        <Label htmlFor={`voice-${index}`} className="text-sm cursor-pointer">
                          {voice.name} <span className="text-xs text-gray-500">({voice.gender})</span>
                        </Label>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => playVoiceSample(index)}
                        disabled={isPlaying || !elevenLabsService.isServiceReady()}
                        className="flex items-center gap-1"
                      >
                        {isPlaying && selectedVoiceIndex === index ? 'Playing...' : 'Play Sample'}
                      </Button>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>
            
            <div className="text-xs text-gray-500 mt-4">
              <p>Need an ElevenLabs API key? <a href="https://elevenlabs.io/speech-synthesis" target="_blank" rel="noopener noreferrer" className="text-ruvo-500 underline">Get one here</a>.</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ProductFeaturesSection;
