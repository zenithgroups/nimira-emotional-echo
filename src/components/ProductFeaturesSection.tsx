
import React from "react";
import { MessageSquare, Book, Smile, Shield } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

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
      {/* Calming background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/20 to-indigo-50/10"></div>
      
      {/* Gentle animated background elements */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-gradient-to-br from-blue-200/20 to-indigo-200/15 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 left-0 w-80 h-80 bg-gradient-to-br from-indigo-200/15 to-blue-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      
      <div className="container-custom relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/50 shadow-sm mb-6">
            <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full mr-3 animate-pulse"></div>
            <span className="text-sm font-semibold text-blue-600">Powerful AI Features</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 bg-clip-text text-transparent">
              Advanced Capabilities
            </span>
          </h2>
          
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed mb-4">
            Experience a companion that's designed to support your emotional wellbeing with cutting-edge AI technology.
          </p>
          
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200/50">
            <div className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-green-400 rounded-full mr-2 animate-pulse"></div>
            <p className="text-sm text-emerald-600 font-medium">
              Experience our AI companion below - Visual Demo
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Static Chat Interface Mockup */}
          <div className="order-2 lg:order-1 relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-300/20 via-indigo-300/20 to-blue-300/20 rounded-2xl blur-lg opacity-30 transition-opacity duration-500"></div>
            <div className="relative bg-white/95 backdrop-blur-xl border border-slate-200/50 rounded-2xl shadow-xl p-6 md:p-8">
              <div className="w-full h-[500px] flex flex-col">
                {/* Chat Header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-200/50">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold">
                      <img 
                        src="/lovable-uploads/aa075d0b-00d3-4c46-a600-501aec587b42.png" 
                        alt="Ruvo Logo" 
                        className="h-5 w-auto brightness-0 invert"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800">Ruvo AI</h3>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full mr-2 animate-pulse"></div>
                        <p className="text-xs text-slate-500 font-medium">Ready to help</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="flex-1 py-4 space-y-4 overflow-hidden">
                  <div className="flex justify-start">
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/50 rounded-xl rounded-bl-md p-4 max-w-sm shadow-sm">
                      <p className="text-sm text-slate-700 leading-relaxed">
                        Hello! I'm Ruvo, your emotional AI companion. I'm designed to understand and support your feelings. How are you doing today? 💙
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <div className="bg-white border border-slate-200 shadow-sm rounded-xl rounded-br-md p-4 max-w-sm">
                      <p className="text-sm text-slate-700">
                        I've been feeling anxious about some upcoming changes in my life.
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-start">
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/50 rounded-xl rounded-bl-md p-4 max-w-sm shadow-sm">
                      <p className="text-sm text-slate-700 leading-relaxed">
                        I understand how unsettling upcoming changes can feel. It's completely natural to feel anxious about the unknown. Would you like to talk about what specific changes are causing you the most concern? ✨
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <div className="bg-white border border-slate-200 shadow-sm rounded-xl rounded-br-md p-4 max-w-sm">
                      <p className="text-sm text-slate-700">
                        Thank you for understanding. It really helps to feel heard.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Chat Input Area */}
                <div className="pt-4 border-t border-slate-200/50">
                  <div className="relative">
                    <div className="w-full bg-slate-50/90 backdrop-blur-sm border border-slate-200 rounded-full px-4 py-3 text-sm placeholder-slate-400 cursor-not-allowed opacity-75">
                      <span className="text-slate-400">Try our full chat experience...</span>
                    </div>
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-2.5 rounded-full shadow-md cursor-not-allowed opacity-50">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="m22 2-7 20-4-9-9-4Z"></path>
                        <path d="M22 2 11 13"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Features List */}
          <div className="order-1 lg:order-2">
            <div className="space-y-6">
              <div 
                className="group flex gap-6 cursor-pointer p-6 rounded-xl bg-white/70 backdrop-blur-sm border border-blue-100/50 hover:bg-white/90 hover:border-blue-200/60 transition-all duration-500 hover:scale-[1.02] hover:shadow-lg"
                onClick={() => handleFeatureClick("Real-time Chat", "Experience natural, human-like conversations powered by OpenAI's most advanced language model, for meaningful interactions.")}
              >
                <div className="shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-300">
                  <MessageSquare className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3 text-slate-800 group-hover:text-blue-600 transition-colors duration-300">Real-time Chat with OpenAI</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Experience natural, human-like conversations powered by OpenAI's most advanced language model, for meaningful interactions.
                  </p>
                </div>
              </div>
              
              <div 
                className="group flex gap-6 cursor-pointer p-6 rounded-xl bg-white/70 backdrop-blur-sm border border-blue-100/50 hover:bg-white/90 hover:border-blue-200/60 transition-all duration-500 hover:scale-[1.02] hover:shadow-lg"
                onClick={() => handleFeatureClick("Memory Journaling", "Ruvo remembers your past conversations and important life events, creating a digital memory journal that evolves with you.")}
              >
                <div className="shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-300">
                  <Book className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3 text-slate-800 group-hover:text-blue-600 transition-colors duration-300">Memory Journaling</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Ruvo remembers your past conversations and important life events, creating a digital memory journal that evolves with you.
                  </p>
                </div>
              </div>
              
              <div 
                className="group flex gap-6 cursor-pointer p-6 rounded-xl bg-white/70 backdrop-blur-sm border border-blue-100/50 hover:bg-white/90 hover:border-blue-200/60 transition-all duration-500 hover:scale-[1.02] hover:shadow-lg"
                onClick={() => handleFeatureClick("Daily Mood Check-ins", "Regular emotion tracking and personalized insights to help you understand patterns in your emotional wellbeing.")}
              >
                <div className="shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-300">
                  <Smile className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3 text-slate-800 group-hover:text-blue-600 transition-colors duration-300">Daily Mood Check-ins</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Regular emotion tracking and personalized insights to help you understand patterns in your emotional wellbeing.
                  </p>
                </div>
              </div>
              
              <div 
                className="group flex gap-6 cursor-pointer p-6 rounded-xl bg-white/70 backdrop-blur-sm border border-blue-100/50 hover:bg-white/90 hover:border-blue-200/60 transition-all duration-500 hover:scale-[1.02] hover:shadow-lg"
                onClick={() => handleFeatureClick("Security & Privacy", "Your conversations with Ruvo are encrypted and private, with transparent data practices and user control.")}
              >
                <div className="shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-300">
                  <Shield className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3 text-slate-800 group-hover:text-blue-600 transition-colors duration-300">Secure, Private by Design</h3>
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
