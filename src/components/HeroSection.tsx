
import React from "react";
import { Button } from "@/components/ui/button";
import { Brain, Sparkles, MessageCircle, Zap } from "lucide-react";

const HeroSection: React.FC = () => {
  const scrollToSignup = () => {
    const signupSection = document.getElementById("join-beta");
    if (signupSection) {
      signupSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Subtle accent elements */}
      <div className="absolute top-32 left-20 w-3 h-3 bg-modern-blue rounded-full pulse-slow" style={{animationDelay: '0s'}}></div>
      <div className="absolute top-48 right-32 w-2 h-2 bg-modern-purple rounded-full pulse-slow" style={{animationDelay: '2s'}}></div>
      <div className="absolute bottom-40 left-16 w-4 h-4 bg-modern-pink rounded-full pulse-slow" style={{animationDelay: '4s'}}></div>
      <div className="absolute bottom-32 right-24 w-2.5 h-2.5 bg-modern-gray-400 rounded-full pulse-slow" style={{animationDelay: '6s'}}></div>
      
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          {/* Hero Content */}
          <div className="text-center lg:text-left space-y-12">
            <div className="space-y-10">
              <div className="inline-flex items-center gap-4 px-8 py-4 glass-modern rounded-full blur-breathe">
                <Brain className="w-6 h-6 text-black" />
                <span className="font-semibold text-black text-lg">Emotional AI</span>
                <Zap className="w-5 h-5 text-modern-blue" />
              </div>
              
              <h1 className="font-serif font-bold leading-tight">
                <span className="block text-gradient text-6xl md:text-7xl lg:text-8xl">Ruvo</span>
                <span className="block text-4xl md:text-5xl lg:text-6xl text-modern-gray-600 font-sans font-normal mt-4">
                  Your Intelligent Companion
                </span>
              </h1>
              
              <p className="text-2xl md:text-3xl text-modern-gray-700 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-light">
                Experience meaningful conversations with an AI that understands context, 
                remembers your preferences, and provides 
                <span className="font-semibold text-accent-gradient"> thoughtful companionship</span> 
                tailored to your emotional needs.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-8 justify-center lg:justify-start">
              <Button 
                onClick={scrollToSignup} 
                className="btn-modern text-xl px-12 py-6 shadow-dramatic"
              >
                Get Early Access
              </Button>
              <Button 
                variant="outline" 
                className="glass-dark border-2 border-modern-gray-200 text-modern-gray-800 hover:bg-modern-gray-50 text-xl px-12 py-6 font-semibold transition-all duration-300 rounded-2xl"
                onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
              >
                Learn More
              </Button>
            </div>
            
            <div className="flex items-center justify-center lg:justify-start gap-16 pt-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-gradient">24/7</div>
                <div className="text-lg text-modern-gray-600 font-medium">Available</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gradient">Private</div>
                <div className="text-lg text-modern-gray-600 font-medium">& Secure</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gradient">Smart</div>
                <div className="text-lg text-modern-gray-600 font-medium">Memory</div>
              </div>
            </div>
          </div>
          
          {/* Chat Interface Mockup */}
          <div className="relative">
            <div className="card-dark float-gentle shadow-dramatic">
              <div className="space-y-10">
                {/* Chat Header */}
                <div className="flex items-center gap-6 pb-8 border-b border-modern-gray-200/30">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-black to-modern-gray-700 flex items-center justify-center pulse-slow">
                    <img 
                      src="/lovable-uploads/aa075d0b-00d3-4c46-a600-501aec587b42.png" 
                      alt="Ruvo Logo" 
                      className="h-8 w-auto brightness-0 invert opacity-90"
                    />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-2xl text-black">Ruvo</h3>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-modern-blue rounded-full animate-pulse"></div>
                      <p className="text-lg text-modern-gray-600 font-medium">Online & Ready</p>
                    </div>
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="space-y-8">
                  <div className="flex justify-start">
                    <div className="chat-bubble-modern max-w-lg">
                      <p className="text-modern-gray-800 leading-relaxed text-lg font-medium">
                        Hello! I'm Ruvo, your AI companion. I'm designed to understand 
                        and engage with your emotions meaningfully. How are you feeling today?
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <div className="bg-gradient-to-r from-black to-modern-gray-700 text-white rounded-3xl p-6 max-w-lg shadow-elegant">
                      <p className="leading-relaxed text-lg">
                        I'm curious about how you work and what makes you different from other AI assistants.
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-start">
                    <div className="chat-bubble-modern max-w-lg">
                      <p className="text-modern-gray-800 leading-relaxed text-lg font-medium">
                        I combine advanced emotional intelligence with contextual memory, 
                        allowing me to have more personalized and empathetic conversations. 
                        What aspect interests you most?
                      </p>
                    </div>
                  </div>

                  {/* Typing indicator */}
                  <div className="flex justify-start">
                    <div className="chat-bubble-dark">
                      <div className="typing-dots-modern">
                        <div className="typing-dot-modern"></div>
                        <div className="typing-dot-modern"></div>
                        <div className="typing-dot-modern"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Chat Input (disabled) */}
                <div className="pt-8 border-t border-modern-gray-200/30">
                  <div className="flex items-center gap-6 p-6 glass-modern rounded-3xl opacity-60">
                    <MessageCircle className="w-6 h-6 text-modern-gray-500" />
                    <span className="text-modern-gray-500 flex-1 text-lg">Experience the full conversation...</span>
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-black to-modern-gray-700 opacity-60 flex items-center justify-center">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
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
