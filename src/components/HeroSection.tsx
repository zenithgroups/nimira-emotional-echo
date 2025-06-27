
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6 text-left max-w-lg">
            <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 backdrop-blur-sm">
              <div className="w-1.5 h-1.5 bg-amber-400 rounded-full mr-2 animate-pulse"></div>
              <span className="text-xs font-medium text-amber-200">AI-powered emotional intelligence</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white">
              AI-powered
              <br />
              <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 bg-clip-text text-transparent">
                emotional
              </span>
              <br />
              companion
            </h1>

            <p className="text-base md:text-lg text-gray-300 max-w-md leading-relaxed font-light">
              Experience the future of emotional AI with Ruvo - your intelligent companion that understands, feels, and responds with genuine empathy.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a 
                href="/chat" 
                className="group inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-amber-500/25 text-sm"
              >
                <span>Get Started</span>
                <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
              <button
                onClick={handleLearnMore}
                className="group inline-flex items-center justify-center px-6 py-3 bg-white/5 backdrop-blur-sm text-white border border-white/20 hover:border-amber-500/50 rounded-lg transition-all duration-300 hover:scale-105 hover:bg-white/10 text-sm"
              >
                <span className="font-medium">Learn More</span>
                <svg className="ml-2 w-4 h-4 group-hover:translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>
            </div>

            <div className="pt-6 flex items-center space-x-6">
              <div className="flex items-center text-gray-400">
                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-2 animate-pulse"></div>
                <span className="text-xs font-medium">100% Secure</span>
              </div>
              <div className="flex items-center text-gray-400">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2 animate-pulse"></div>
                <span className="text-xs font-medium">24/7 Available</span>
              </div>
              <div className="flex items-center text-gray-400">
                <div className="w-1.5 h-1.5 bg-amber-400 rounded-full mr-2 animate-pulse"></div>
                <span className="text-xs font-medium">GPT-4 Powered</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-4xl">
              {/* Enhanced background glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/30 via-amber-400/40 to-amber-600/30 rounded-full blur-[100px] animate-pulse"></div>
              
              {/* Main image container with enhanced blur effects */}
              <div className="relative">
                <img 
                  src="/lovable-uploads/a341418d-e306-4bb0-a31f-82a01869d411.png" 
                  alt="Human and AI interaction" 
                  className="w-full h-auto object-contain relative z-10 scale-110"
                  style={{
                    maskImage: `
                      radial-gradient(ellipse 85% 80% at 50% 40%, black 50%, rgba(0,0,0,0.8) 70%, transparent 100%),
                      linear-gradient(to bottom, black 80%, rgba(0,0,0,0.6) 90%, transparent 100%),
                      linear-gradient(to right, transparent 0%, rgba(0,0,0,0.3) 5%, black 10%, black 90%, rgba(0,0,0,0.3) 95%, transparent 100%),
                      linear-gradient(to left, transparent 0%, rgba(0,0,0,0.3) 5%, black 10%, black 90%, rgba(0,0,0,0.3) 95%, transparent 100%)
                    `,
                    maskComposite: 'intersect',
                    WebkitMaskImage: `
                      radial-gradient(ellipse 85% 80% at 50% 40%, black 50%, rgba(0,0,0,0.8) 70%, transparent 100%),
                      linear-gradient(to bottom, black 80%, rgba(0,0,0,0.6) 90%, transparent 100%),
                      linear-gradient(to right, transparent 0%, rgba(0,0,0,0.3) 5%, black 10%, black 90%, rgba(0,0,0,0.3) 95%, transparent 100%),
                      linear-gradient(to left, transparent 0%, rgba(0,0,0,0.3) 5%, black 10%, black 90%, rgba(0,0,0,0.3) 95%, transparent 100%)
                    `,
                    WebkitMaskComposite: 'source-in',
                    filter: 'blur(0.5px)'
                  }}
                />
                
                {/* Enhanced ambient glow and professional blur overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent pointer-events-none"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900/60 via-transparent to-slate-900/40 pointer-events-none"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
