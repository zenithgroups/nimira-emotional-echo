
import React from "react";
import { Button } from "@/components/ui/button";
import { Heart, Sparkles, MessageCircle } from "lucide-react";

const HeroSection: React.FC = () => {
  const scrollToSignup = () => {
    const signupSection = document.getElementById("join-beta");
    if (signupSection) {
      signupSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 via-pink-50/30 to-blue-50/40"></div>
      
      {/* Floating emotional particles */}
      <div className="absolute top-20 left-20 w-4 h-4 bg-emotional-purple rounded-full opacity-60 floating" style={{animationDelay: '0s'}}></div>
      <div className="absolute top-40 right-32 w-3 h-3 bg-emotional-pink rounded-full opacity-50 floating" style={{animationDelay: '1s'}}></div>
      <div className="absolute bottom-32 left-16 w-5 h-5 bg-emotional-blue rounded-full opacity-40 floating" style={{animationDelay: '2s'}}></div>
      <div className="absolute bottom-20 right-20 w-2 h-2 bg-emotional-emerald rounded-full opacity-60 floating" style={{animationDelay: '3s'}}></div>
      
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Hero Content */}
          <div className="text-center lg:text-left space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 glass-morphism rounded-full breathing">
                <Heart className="w-4 h-4 text-emotional-pink" />
                <span className="font-space text-sm font-medium text-gray-700">Emotional AI Companion</span>
                <Sparkles className="w-4 h-4 text-emotional-purple" />
              </div>
              
              <h1 className="font-display font-bold leading-tight">
                <span className="block text-emotional breathing">Your AI</span>
                <span className="block text-6xl md:text-7xl lg:text-8xl">Emotional</span>
                <span className="block text-4xl md:text-5xl lg:text-6xl text-gray-600">Companion</span>
              </h1>
              
              <p className="text-xl md:text-2xl font-space text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Meet <span className="font-semibold text-emotional-purple">Ruvo</span>, an AI that understands your emotions, 
                remembers your stories, and provides <span className="font-semibold text-emotional-pink">genuine companionship</span> 
                when you need it most.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                onClick={scrollToSignup} 
                className="btn-emotional text-lg px-8 py-4 pulse-glow"
              >
                Start Your Journey
              </Button>
              <Button 
                variant="outline" 
                className="glass-card border-2 border-emotional-purple/30 text-emotional-purple hover:bg-emotional-purple/10 text-lg px-8 py-4 font-space"
                onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
              >
                Explore Features
              </Button>
            </div>
            
            <div className="flex items-center justify-center lg:justify-start gap-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-emotional-purple">24/7</div>
                <div className="text-sm font-space text-gray-600">Always Available</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emotional-pink">100%</div>
                <div className="text-sm font-space text-gray-600">Private & Secure</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emotional-blue">∞</div>
                <div className="text-sm font-space text-gray-600">Unlimited Support</div>
              </div>
            </div>
          </div>
          
          {/* Chat Interface Mockup */}
          <div className="relative">
            <div className="glass-card rounded-3xl p-8 floating">
              <div className="space-y-6">
                {/* Chat Header */}
                <div className="flex items-center gap-4 pb-4 border-b border-white/20">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emotional-purple to-emotional-pink flex items-center justify-center breathing">
                    <img 
                      src="/lovable-uploads/aa075d0b-00d3-4c46-a600-501aec587b42.png" 
                      alt="Ruvo Logo" 
                      className="h-6 w-auto brightness-0 invert"
                    />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-lg text-gray-800">Ruvo AI</h3>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-emotional-emerald rounded-full animate-pulse"></div>
                      <p className="font-space text-sm text-gray-600">Ready to listen</p>
                    </div>
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="space-y-4">
                  <div className="flex justify-start">
                    <div className="chat-bubble max-w-xs">
                      <p className="font-space text-gray-700">
                        Hello! I'm Ruvo, your emotional companion. I'm here to understand, 
                        support, and grow with you. How are you feeling today? 💙
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <div className="bg-gradient-to-r from-emotional-purple to-emotional-pink text-white rounded-2xl p-4 max-w-xs">
                      <p className="font-space">
                        I've been feeling overwhelmed lately with work and life changes.
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-start">
                    <div className="chat-bubble max-w-xs">
                      <p className="font-space text-gray-700">
                        I hear you, and that sounds really challenging. Life changes can feel 
                        overwhelming even when they're positive. Would you like to talk about 
                        what's weighing on you most right now? ✨
                      </p>
                    </div>
                  </div>

                  {/* Typing indicator */}
                  <div className="flex justify-start">
                    <div className="chat-bubble">
                      <div className="typing-dots">
                        <div className="typing-dot"></div>
                        <div className="typing-dot"></div>
                        <div className="typing-dot"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Chat Input (disabled) */}
                <div className="pt-4 border-t border-white/20">
                  <div className="flex items-center gap-3 p-3 glass-morphism rounded-2xl opacity-60">
                    <MessageCircle className="w-5 h-5 text-gray-400" />
                    <span className="font-space text-gray-400 flex-1">Experience the full conversation...</span>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-emotional-purple to-emotional-pink opacity-50 flex items-center justify-center">
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
