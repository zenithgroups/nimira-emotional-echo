
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
    <section id="features" className="section-spacing relative overflow-hidden">
      {/* Enhanced background with multiple gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-ruvo-50/50 to-purple-50/30"></div>
      
      {/* Animated background elements */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-gradient-to-br from-ruvo-300/20 to-purple-300/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 left-0 w-80 h-80 bg-gradient-to-br from-blue-300/15 to-ruvo-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-br from-purple-200/20 to-ruvo-200/25 rounded-full blur-2xl"></div>
      
      <div className="container-custom relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-ruvo-100 to-purple-100 border border-ruvo-200/50 shadow-sm mb-6">
            <div className="w-2 h-2 bg-gradient-to-r from-ruvo-400 to-purple-400 rounded-full mr-3 animate-pulse"></div>
            <span className="text-sm font-semibold text-ruvo-600">Powerful AI Features</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-ruvo-600 via-purple-600 to-ruvo-500 bg-clip-text text-transparent">
              Advanced Capabilities
            </span>
          </h2>
          
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed mb-4">
            Experience a companion that's designed to support your emotional wellbeing with cutting-edge AI technology.
          </p>
          
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200/50">
            <div className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-green-400 rounded-full mr-2 animate-pulse"></div>
            <p className="text-sm text-emerald-600 font-medium">
              Try the interactive demo below powered by OpenAI GPT-4o with premium voice!
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Interactive Chat Interface with enhanced styling */}
          <div className="order-2 lg:order-1 relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-ruvo-400 via-purple-400 to-ruvo-300 rounded-3xl blur-lg opacity-30 group-hover:opacity-40 transition-opacity duration-500"></div>
            <div className="relative bg-white/90 backdrop-blur-xl border border-white/50 rounded-3xl shadow-2xl p-6 md:p-8">
              <div className="w-full h-[500px]">
                <ChatInterface />
              </div>
            </div>
          </div>
          
          {/* Features List with enhanced cards */}
          <div className="order-1 lg:order-2">
            <div className="space-y-6">
              <div 
                className="group flex gap-6 cursor-pointer p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-ruvo-100/50 hover:bg-white/80 hover:border-ruvo-200/60 transition-all duration-500 hover:scale-[1.02] hover:shadow-xl"
                onClick={() => handleFeatureClick("Real-time Chat", "Experience natural, human-like conversations powered by OpenAI's most advanced language model, for meaningful interactions.")}
              >
                <div className="shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-ruvo-400 to-purple-500 flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                  <MessageSquare className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3 text-slate-800 group-hover:text-ruvo-600 transition-colors duration-300">Real-time Chat with OpenAI</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Experience natural, human-like conversations powered by OpenAI's most advanced language model, for meaningful interactions.
                  </p>
                </div>
              </div>
              
              <div 
                className="group flex gap-6 cursor-pointer p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-ruvo-100/50 hover:bg-white/80 hover:border-ruvo-200/60 transition-all duration-500 hover:scale-[1.02] hover:shadow-xl"
                onClick={() => handleFeatureClick("Memory Journaling", "Ruvo remembers your past conversations and important life events, creating a digital memory journal that evolves with you.")}
              >
                <div className="shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-400 to-ruvo-500 flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                  <Book className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3 text-slate-800 group-hover:text-ruvo-600 transition-colors duration-300">Memory Journaling</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Ruvo remembers your past conversations and important life events, creating a digital memory journal that evolves with you.
                  </p>
                </div>
              </div>
              
              <div 
                className="group flex gap-6 cursor-pointer p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-ruvo-100/50 hover:bg-white/80 hover:border-ruvo-200/60 transition-all duration-500 hover:scale-[1.02] hover:shadow-xl"
                onClick={() => handleFeatureClick("Daily Mood Check-ins", "Regular emotion tracking and personalized insights to help you understand patterns in your emotional wellbeing.")}
              >
                <div className="shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                  <Smile className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3 text-slate-800 group-hover:text-ruvo-600 transition-colors duration-300">Daily Mood Check-ins</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Regular emotion tracking and personalized insights to help you understand patterns in your emotional wellbeing.
                  </p>
                </div>
              </div>
              
              <div 
                className="group flex gap-6 cursor-pointer p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-ruvo-100/50 hover:bg-white/80 hover:border-ruvo-200/60 transition-all duration-500 hover:scale-[1.02] hover:shadow-xl"
                onClick={() => handleFeatureClick("Security & Privacy", "Your conversations with Ruvo are encrypted and private, with transparent data practices and user control.")}
              >
                <div className="shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                  <Shield className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3 text-slate-800 group-hover:text-ruvo-600 transition-colors duration-300">Secure, Private by Design</h3>
                  <p className="text-slate-600 leading-relaxed">
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
