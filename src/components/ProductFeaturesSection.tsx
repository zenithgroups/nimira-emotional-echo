
import React from "react";
import { MessageSquare, Book, Smile, Shield } from "lucide-react";
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
            Try the interactive demo below powered by OpenAI GPT-4o with premium voice!
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Interactive Chat Interface */}
          <div className="order-2 lg:order-1 relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-ruvo-300 to-ruvo-400 rounded-2xl blur opacity-40"></div>
            <div className="glass h-full flex items-center justify-center p-4 md:p-8 relative">
              <div className="w-full h-[500px]">
                <ChatInterface />
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
    </section>
  );
};

export default ProductFeaturesSection;
