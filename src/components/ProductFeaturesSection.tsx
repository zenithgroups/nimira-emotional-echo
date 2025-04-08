import React from "react";
import { MessageSquare, Book, Smile, Mic, Shield } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import ChatInterface from "./ChatInterface";

const ProductFeaturesSection: React.FC = () => {
  const { toast } = useToast();
  
  const handleFeatureClick = (title: string, description: string) => {
    toast({
      title: title,
      description: description,
    });
  };

  return (
    <section id="features" className="section-spacing bg-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-40 right-0 w-72 h-72 bg-nimira-200/30 rounded-full blur-3xl z-0"></div>
      <div className="absolute bottom-20 left-10 w-60 h-60 bg-nimira-300/20 rounded-full blur-3xl z-0"></div>
      
      <div className="container-custom relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Advanced Features</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience a companion that's designed to support your emotional wellbeing with cutting-edge AI technology.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Interactive Chat Interface */}
          <div className="order-2 lg:order-1">
            <div className="glass h-full flex items-center justify-center p-4 md:p-8">
              <div className="w-full h-[500px]">
                <ChatInterface />
              </div>
            </div>
          </div>
          
          {/* Features List */}
          <div className="order-1 lg:order-2">
            <div className="space-y-8">
              <div 
                className="flex gap-4 cursor-pointer p-3 rounded-xl hover:bg-nimira-100/20 transition-colors"
                onClick={() => handleFeatureClick("Real-time Chat", "Experience natural, human-like conversations powered by OpenAI's most advanced language model, for meaningful interactions.")}
              >
                <div className="shrink-0 w-12 h-12 rounded-xl bg-nimira-100 flex items-center justify-center">
                  <MessageSquare className="h-6 w-6 text-nimira-500" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Real-time Chat with GPT-4o</h3>
                  <p className="text-gray-600">
                    Experience natural, human-like conversations powered by OpenAI's most advanced language model, for meaningful interactions.
                  </p>
                </div>
              </div>
              
              <div 
                className="flex gap-4 cursor-pointer p-3 rounded-xl hover:bg-nimira-100/20 transition-colors"
                onClick={() => handleFeatureClick("Memory Journaling", "Nimira remembers your past conversations and important life events, creating a digital memory journal that evolves with you.")}
              >
                <div className="shrink-0 w-12 h-12 rounded-xl bg-nimira-100 flex items-center justify-center">
                  <Book className="h-6 w-6 text-nimira-500" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Memory Journaling</h3>
                  <p className="text-gray-600">
                    Nimira remembers your past conversations and important life events, creating a digital memory journal that evolves with you.
                  </p>
                </div>
              </div>
              
              <div 
                className="flex gap-4 cursor-pointer p-3 rounded-xl hover:bg-nimira-100/20 transition-colors"
                onClick={() => handleFeatureClick("Daily Mood Check-ins", "Regular emotion tracking and personalized insights to help you understand patterns in your emotional wellbeing.")}
              >
                <div className="shrink-0 w-12 h-12 rounded-xl bg-nimira-100 flex items-center justify-center">
                  <Smile className="h-6 w-6 text-nimira-500" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Daily Mood Check-ins</h3>
                  <p className="text-gray-600">
                    Regular emotion tracking and personalized insights to help you understand patterns in your emotional wellbeing.
                  </p>
                </div>
              </div>
              
              <div 
                className="flex gap-4 cursor-pointer p-3 rounded-xl hover:bg-nimira-100/20 transition-colors"
                onClick={() => handleFeatureClick("Voice Interaction", "Coming soon: Talk directly to Nimira with natural voice conversations for an even more personal connection.")}
              >
                <div className="shrink-0 w-12 h-12 rounded-xl bg-nimira-100 flex items-center justify-center">
                  <Mic className="h-6 w-6 text-nimira-500" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Voice Interaction</h3>
                  <p className="text-gray-600">
                    Coming soon: Talk directly to Nimira with natural voice conversations for an even more personal connection.
                  </p>
                </div>
              </div>
              
              <div 
                className="flex gap-4 cursor-pointer p-3 rounded-xl hover:bg-nimira-100/20 transition-colors"
                onClick={() => handleFeatureClick("Security & Privacy", "Your conversations with Nimira are encrypted and private, with transparent data practices and user control.")}
              >
                <div className="shrink-0 w-12 h-12 rounded-xl bg-nimira-100 flex items-center justify-center">
                  <Shield className="h-6 w-6 text-nimira-500" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Secure, Private by Design</h3>
                  <p className="text-gray-600">
                    Your conversations with Nimira are encrypted and private, with transparent data practices and user control.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductFeaturesSection;
