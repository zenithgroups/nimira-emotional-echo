
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
            <div className="relative w-full max-w-lg">
              {/* Human-AI interaction visualization */}
              <div className="relative">
                {/* Glowing interaction field */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-cyan-400/30 to-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
                
                {/* Main interaction container */}
                <div className="relative bg-gradient-to-br from-blue-900/40 via-cyan-800/30 to-blue-700/20 backdrop-blur-xl border border-blue-500/30 rounded-3xl p-8 shadow-2xl">
                  {/* Human figure (simplified silhouette) */}
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <div className="w-16 h-20 relative">
                      {/* Head */}
                      <div className="w-6 h-6 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full mx-auto"></div>
                      {/* Body */}
                      <div className="w-8 h-12 bg-gradient-to-br from-gray-300 to-gray-400 rounded-lg mx-auto mt-1"></div>
                    </div>
                  </div>

                  {/* AI wireframe figure */}
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <div className="w-16 h-20 relative">
                      {/* AI Head wireframe */}
                      <div className="w-6 h-6 border-2 border-cyan-400 rounded-full mx-auto relative overflow-hidden">
                        {/* Grid pattern inside head */}
                        <div className="absolute inset-0 opacity-60">
                          <svg viewBox="0 0 24 24" className="w-full h-full">
                            <defs>
                              <pattern id="brain-grid" x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse">
                                <path d="M0 2h4M2 0v4" stroke="currentColor" strokeWidth="0.5" className="text-cyan-400"/>
                              </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill="url(#brain-grid)"/>
                          </svg>
                        </div>
                        {/* Pulsing center dot */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-cyan-300 rounded-full animate-pulse"></div>
                      </div>
                      {/* AI Body wireframe */}
                      <div className="w-8 h-12 border-2 border-cyan-400 rounded-lg mx-auto mt-1 relative">
                        {/* Vertical lines */}
                        <div className="absolute left-1/4 top-0 bottom-0 w-px bg-cyan-400/50"></div>
                        <div className="absolute right-1/4 top-0 bottom-0 w-px bg-cyan-400/50"></div>
                        {/* Horizontal lines */}
                        <div className="absolute top-1/3 left-0 right-0 h-px bg-cyan-400/50"></div>
                        <div className="absolute top-2/3 left-0 right-0 h-px bg-cyan-400/50"></div>
                      </div>
                    </div>
                  </div>

                  {/* Interaction beam/connection */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-20 h-1 bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 opacity-80 animate-pulse rounded-full"></div>
                    {/* Floating particles along the beam */}
                    <div className="absolute top-0 left-2 w-1 h-1 bg-cyan-300 rounded-full animate-ping" style={{ animationDelay: '0s' }}></div>
                    <div className="absolute top-0 left-8 w-1 h-1 bg-blue-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
                    <div className="absolute top-0 left-14 w-1 h-1 bg-cyan-300 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
                  </div>

                  {/* Emotional indicators around the scene */}
                  <div className="absolute top-8 left-8 text-xs text-cyan-300 opacity-70 animate-pulse">
                    💝 Empathy
                  </div>
                  <div className="absolute top-8 right-8 text-xs text-blue-300 opacity-70 animate-pulse" style={{ animationDelay: '0.5s' }}>
                    🧠 Intelligence
                  </div>
                  <div className="absolute bottom-8 left-8 text-xs text-cyan-300 opacity-70 animate-pulse" style={{ animationDelay: '1s' }}>
                    ❤️ Connection
                  </div>
                  <div className="absolute bottom-8 right-8 text-xs text-blue-300 opacity-70 animate-pulse" style={{ animationDelay: '1.5s' }}>
                    ✨ Understanding
                  </div>

                  {/* Circuit pattern overlay */}
                  <div className="absolute inset-0 opacity-10">
                    <svg viewBox="0 0 200 200" className="w-full h-full">
                      <defs>
                        <pattern id="circuit" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                          <path d="M0 10h20M10 0v20" stroke="currentColor" strokeWidth="0.5" className="text-cyan-400"/>
                          <circle cx="10" cy="10" r="1" fill="currentColor" className="text-cyan-400"/>
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#circuit)"/>
                    </svg>
                  </div>
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
