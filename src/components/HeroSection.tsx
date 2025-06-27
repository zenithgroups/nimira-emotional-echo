
import React from "react";
import { useToast } from "@/components/ui/use-toast";
import TrueFocus from "./misc/TrueFocus";

const HeroSection: React.FC = () => {
  const { toast } = useToast();

  const handleLearnMore = () => {
    const featuresSection = document.getElementById("features");
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center pt-20 pb-16 relative overflow-hidden bg-gradient-to-br from-slate-900 via-gray-900 to-black"
    >
      {/* Animated background particles */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-2 h-2 bg-amber-400 rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-amber-300 rounded-full opacity-40 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-40 left-40 w-1.5 h-1.5 bg-amber-500 rounded-full opacity-50 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-60 right-20 w-1 h-1 bg-amber-400 rounded-full opacity-30 animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute bottom-60 right-60 w-2 h-2 bg-amber-300 rounded-full opacity-40 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-32 left-1/3 w-1 h-1 bg-amber-500 rounded-full opacity-50 animate-pulse" style={{ animationDelay: '2.5s' }}></div>
        <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-amber-400 rounded-full opacity-35 animate-pulse" style={{ animationDelay: '3s' }}></div>
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-amber-900/20 via-transparent to-amber-900/10"></div>

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 text-left">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 backdrop-blur-sm">
              <div className="w-2 h-2 bg-amber-400 rounded-full mr-3 animate-pulse"></div>
              <span className="text-sm font-medium text-amber-200">AI-powered emotional intelligence</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-white">
              AI-powered
              <br />
              <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 bg-clip-text text-transparent">
                emotional
              </span>
              <br />
              companion
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl leading-relaxed font-light">
              Experience the future of emotional AI with Ruvo - your intelligent companion that understands, feels, and responds with genuine empathy.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 pt-6">
              <a 
                href="/chat" 
                className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-amber-500/25"
              >
                <span>Get Started</span>
                <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
              <button
                onClick={handleLearnMore}
                className="group inline-flex items-center justify-center px-8 py-4 bg-white/5 backdrop-blur-sm text-white border border-white/20 hover:border-amber-500/50 rounded-lg transition-all duration-300 hover:scale-105 hover:bg-white/10"
              >
                <span className="font-medium">Learn More</span>
                <svg className="ml-2 w-5 h-5 group-hover:translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>
            </div>

            <div className="pt-8 flex items-center space-x-8">
              <div className="flex items-center text-gray-400">
                <div className="w-2 h-2 bg-emerald-400 rounded-full mr-3 animate-pulse"></div>
                <span className="text-sm font-medium">100% Secure</span>
              </div>
              <div className="flex items-center text-gray-400">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-3 animate-pulse"></div>
                <span className="text-sm font-medium">24/7 Available</span>
              </div>
              <div className="flex items-center text-gray-400">
                <div className="w-2 h-2 bg-amber-400 rounded-full mr-3 animate-pulse"></div>
                <span className="text-sm font-medium">GPT-4 Powered</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-lg">
              {/* Main AI brain visualization */}
              <div className="relative">
                {/* Glowing orb background */}
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 via-amber-400/30 to-amber-600/20 rounded-full blur-3xl animate-pulse"></div>
                
                {/* Central brain/AI head representation */}
                <div className="relative bg-gradient-to-br from-amber-900/40 via-amber-800/30 to-amber-700/20 backdrop-blur-xl border border-amber-500/30 rounded-3xl p-12 shadow-2xl">
                  {/* AI circuit pattern overlay */}
                  <div className="absolute inset-0 opacity-20">
                    <svg viewBox="0 0 200 200" className="w-full h-full">
                      <defs>
                        <pattern id="circuit" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                          <path d="M0 20h40M20 0v40" stroke="currentColor" strokeWidth="0.5" className="text-amber-400"/>
                          <circle cx="20" cy="20" r="2" fill="currentColor" className="text-amber-400"/>
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#circuit)"/>
                    </svg>
                  </div>
                  
                  {/* Central AI icon */}
                  <div className="relative z-10 flex items-center justify-center">
                    <div className="w-32 h-32 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-2xl">
                      <div className="w-24 h-24 bg-gradient-to-br from-amber-300 to-amber-500 rounded-full flex items-center justify-center">
                        <svg viewBox="0 0 24 24" className="w-12 h-12 text-black">
                          <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating connection nodes */}
                  <div className="absolute top-8 left-8 w-4 h-4 bg-amber-400 rounded-full animate-pulse opacity-70"></div>
                  <div className="absolute top-12 right-12 w-3 h-3 bg-amber-300 rounded-full animate-pulse opacity-60" style={{ animationDelay: '0.5s' }}></div>
                  <div className="absolute bottom-12 left-12 w-3 h-3 bg-amber-500 rounded-full animate-pulse opacity-50" style={{ animationDelay: '1s' }}></div>
                  <div className="absolute bottom-8 right-8 w-4 h-4 bg-amber-400 rounded-full animate-pulse opacity-80" style={{ animationDelay: '1.5s' }}></div>
                  
                  {/* Connection lines */}
                  <svg className="absolute inset-0 w-full h-full opacity-30">
                    <line x1="20%" y1="20%" x2="80%" y2="80%" stroke="currentColor" strokeWidth="1" className="text-amber-400"/>
                    <line x1="80%" y1="20%" x2="20%" y2="80%" stroke="currentColor" strokeWidth="1" className="text-amber-400"/>
                    <line x1="50%" y1="10%" x2="50%" y2="90%" stroke="currentColor" strokeWidth="1" className="text-amber-400"/>
                    <line x1="10%" y1="50%" x2="90%" y2="50%" stroke="currentColor" strokeWidth="1" className="text-amber-400"/>
                  </svg>
                </div>
              </div>
              
              {/* Surrounding orbital elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-amber-400/40 rounded-full animate-spin-slow"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-amber-300/50 rounded-full animate-spin-slow" style={{ animationDirection: 'reverse' }}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
