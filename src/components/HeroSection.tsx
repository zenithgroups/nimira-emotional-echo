
import React from "react";
import { Button } from "@/components/ui/button";
import { Brain, Sparkles, MessageCircle } from "lucide-react";

const HeroSection: React.FC = () => {
  const scrollToSignup = () => {
    const signupSection = document.getElementById("join-beta");
    if (signupSection) {
      signupSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Professional background */}
      <div className="absolute inset-0 professional-gradient"></div>
      
      {/* Subtle floating elements */}
      <div className="absolute top-32 left-20 w-2 h-2 bg-professional-blue rounded-full opacity-40 gentle-float" style={{animationDelay: '0s'}}></div>
      <div className="absolute top-48 right-32 w-1.5 h-1.5 bg-professional-indigo rounded-full opacity-30 gentle-float" style={{animationDelay: '2s'}}></div>
      <div className="absolute bottom-40 left-16 w-2.5 h-2.5 bg-professional-violet rounded-full opacity-35 gentle-float" style={{animationDelay: '4s'}}></div>
      <div className="absolute bottom-32 right-24 w-1 h-1 bg-professional-slate rounded-full opacity-50 gentle-float" style={{animationDelay: '6s'}}></div>
      
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Hero Content */}
          <div className="text-center lg:text-left space-y-10">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-3 px-6 py-3 glass-elegant rounded-full subtle-breathe">
                <Brain className="w-5 h-5 text-professional-blue" />
                <span className="font-medium text-slate-700">AI Emotional Intelligence</span>
                <Sparkles className="w-4 h-4 text-professional-indigo" />
              </div>
              
              <h1 className="font-serif font-semibold leading-tight">
                <span className="block text-professional text-5xl md:text-6xl lg:text-7xl">Ruvo</span>
                <span className="block text-3xl md:text-4xl lg:text-5xl text-slate-600 font-sans font-normal mt-2">
                  Your Intelligent Companion
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
                Experience meaningful conversations with an AI that understands context, 
                remembers your preferences, and provides <span className="font-semibold text-professional-blue">thoughtful companionship</span> 
                tailored to your needs.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
              <Button 
                onClick={scrollToSignup} 
                className="btn-professional text-lg px-10 py-4 elegant-glow"
              >
                Get Early Access
              </Button>
              <Button 
                variant="outline" 
                className="glass-elegant border-2 border-slate-200 text-slate-700 hover:bg-slate-50 text-lg px-10 py-4 font-medium transition-all duration-300"
                onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
              >
                Learn More
              </Button>
            </div>
            
            <div className="flex items-center justify-center lg:justify-start gap-12 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-professional-blue">24/7</div>
                <div className="text-sm text-slate-600">Available</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-professional-indigo">Private</div>
                <div className="text-sm text-slate-600">& Secure</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-professional-violet">Smart</div>
                <div className="text-sm text-slate-600">Memory</div>
              </div>
            </div>
          </div>
          
          {/* Chat Interface Mockup */}
          <div className="relative">
            <div className="glass-sophisticated rounded-3xl p-10 gentle-float depth-moderate">
              <div className="space-y-8">
                {/* Chat Header */}
                <div className="flex items-center gap-4 pb-6 border-b border-slate-200/50">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-professional-blue to-professional-indigo flex items-center justify-center subtle-breathe">
                    <img 
                      src="/lovable-uploads/aa075d0b-00d3-4c46-a600-501aec587b42.png" 
                      alt="Ruvo Logo" 
                      className="h-6 w-auto brightness-0 invert opacity-90"
                    />
                  </div>
                  <div>
                    <h3 className="font-serif font-semibold text-xl text-slate-800">Ruvo</h3>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <p className="text-sm text-slate-500">Online</p>
                    </div>
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="space-y-6">
                  <div className="flex justify-start">
                    <div className="chat-bubble-elegant max-w-sm">
                      <p className="text-slate-700 leading-relaxed">
                        Hello! I'm Ruvo, your AI companion. I'm designed to understand 
                        and engage with you meaningfully. How can I assist you today?
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <div className="bg-gradient-to-r from-professional-blue to-professional-indigo text-white rounded-2xl p-4 max-w-sm depth-subtle">
                      <p className="leading-relaxed">
                        I'm interested in learning more about how you work and what makes you different.
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-start">
                    <div className="chat-bubble-elegant max-w-sm">
                      <p className="text-slate-700 leading-relaxed">
                        I combine advanced language understanding with contextual memory, 
                        allowing me to have more personalized and meaningful conversations. 
                        Would you like to explore a specific area?
                      </p>
                    </div>
                  </div>

                  {/* Typing indicator */}
                  <div className="flex justify-start">
                    <div className="chat-bubble-elegant">
                      <div className="typing-dots-professional">
                        <div className="typing-dot-professional"></div>
                        <div className="typing-dot-professional"></div>
                        <div className="typing-dot-professional"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Chat Input (disabled) */}
                <div className="pt-6 border-t border-slate-200/50">
                  <div className="flex items-center gap-4 p-4 glass-elegant rounded-2xl opacity-70">
                    <MessageCircle className="w-5 h-5 text-slate-400" />
                    <span className="text-slate-400 flex-1">Try the full experience...</span>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-professional-blue to-professional-indigo opacity-60 flex items-center justify-center">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
                        <path d="m22 2-7 20-4-9-9-4Z"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
