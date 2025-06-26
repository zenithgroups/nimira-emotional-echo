
import React from "react";
import { useToast } from "@/components/ui/use-toast";
import HumanAIInteraction3D from "./HumanAIInteraction3D";

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
        <div className="absolute top-20 left-20 w-2 h-2 bg-blue-400 rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-cyan-300 rounded-full opacity-40 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-40 left-40 w-1.5 h-1.5 bg-blue-500 rounded-full opacity-50 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-60 right-20 w-1 h-1 bg-cyan-400 rounded-full opacity-30 animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute bottom-60 right-60 w-2 h-2 bg-blue-300 rounded-full opacity-40 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-32 left-1/3 w-1 h-1 bg-cyan-500 rounded-full opacity-50 animate-pulse" style={{ animationDelay: '2.5s' }}></div>
        <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-blue-400 rounded-full opacity-35 animate-pulse" style={{ animationDelay: '3s' }}></div>
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-transparent to-cyan-900/10"></div>

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 text-left">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 backdrop-blur-sm">
              <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3 animate-pulse"></div>
              <span className="text-sm font-medium text-cyan-200">AI-powered emotional intelligence</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-white">
              AI-powered
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
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
                className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/25"
              >
                <span>Get Started</span>
                <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
              <button
                onClick={handleLearnMore}
                className="group inline-flex items-center justify-center px-8 py-4 bg-white/5 backdrop-blur-sm text-white border border-white/20 hover:border-blue-500/50 rounded-lg transition-all duration-300 hover:scale-105 hover:bg-white/10"
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
                <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3 animate-pulse"></div>
                <span className="text-sm font-medium">GPT-4 Powered</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-lg h-96 lg:h-[500px]">
              {/* 3D Scene Container */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-cyan-800/10 to-blue-700/10 backdrop-blur-xl border border-blue-500/20 rounded-3xl overflow-hidden">
                <HumanAIInteraction3D />
                
                {/* Overlay UI elements */}
                <div className="absolute top-4 left-4 text-xs text-cyan-300 opacity-70 animate-pulse">
                  💝 Empathy
                </div>
                <div className="absolute top-4 right-4 text-xs text-blue-300 opacity-70 animate-pulse" style={{ animationDelay: '0.5s' }}>
                  🧠 Intelligence
                </div>
                <div className="absolute bottom-4 left-4 text-xs text-cyan-300 opacity-70 animate-pulse" style={{ animationDelay: '1s' }}>
                  ❤️ Connection
                </div>
                <div className="absolute bottom-4 right-4 text-xs text-blue-300 opacity-70 animate-pulse" style={{ animationDelay: '1.5s' }}>
                  ✨ Understanding
                </div>
              </div>
              
              {/* Surrounding orbital elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-400/40 rounded-full animate-spin-slow"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-cyan-300/50 rounded-full animate-spin-slow" style={{ animationDirection: 'reverse' }}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
