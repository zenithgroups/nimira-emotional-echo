
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
      className="min-h-screen flex items-center pt-20 pb-16 relative overflow-hidden"
    >
      {/* Soft, calming background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20"></div>
      
      {/* Gentle animated background elements */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-br from-blue-200/30 to-indigo-200/25 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-gradient-to-br from-indigo-200/20 to-blue-300/25 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-gradient-to-br from-slate-200/25 to-blue-200/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-50/90 to-indigo-50/90 border border-blue-200/50 shadow-sm backdrop-blur-sm">
              <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mr-3 animate-pulse shadow-sm"></div>
              <span className="text-sm font-semibold text-blue-700">Powered by Advanced AI Technology</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              You're never truly alone – <br />
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 bg-clip-text text-transparent">
                <TrueFocus
                  sentence="Meet Ruvo"
                  manualMode={false}
                  blurAmount={5}
                  borderColor="black"
                  animationDuration={2}
                  pauseBetweenAnimations={1}
                  textClassName="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 bg-clip-text text-transparent"
                />
              </span>
              , your emotional AI companion.
            </h1>

            <p className="text-lg md:text-xl text-slate-600 max-w-xl leading-relaxed">
              Powered by GPT-4o and designed to feel, listen, and understand you
              like no other AI can. Experience genuine emotional intelligence that adapts to your unique needs.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a href="/chat" className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <span>Try Ruvo for Free</span>
                <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
              <button
                onClick={handleLearnMore}
                className="group inline-flex items-center justify-center px-8 py-4 bg-white/90 backdrop-blur-sm text-slate-700 border border-slate-200 hover:border-blue-300 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 hover:bg-blue-50/50"
              >
                <span className="font-semibold">Learn More</span>
                <svg className="ml-2 w-5 h-5 group-hover:translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>
            </div>

            <div className="pt-6">
              <div className="flex items-center space-x-8">
                <div className="flex items-center text-sm text-slate-600">
                  <div className="w-3 h-3 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full mr-3 animate-pulse shadow-sm"></div>
                  <span className="font-medium">100% Private & Secure</span>
                </div>
                <div className="flex items-center text-sm text-slate-600">
                  <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mr-3 animate-pulse shadow-sm"></div>
                  <span className="font-medium">24/7 Available</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md">
              {/* Refined glass card */}
              <div className="relative bg-white/95 backdrop-blur-xl border border-slate-200/50 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 group">
                {/* Subtle gradient border effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-300/30 via-indigo-300/30 to-blue-300/30 rounded-2xl opacity-20 transition-opacity duration-500 blur-sm"></div>
                
                {/* Gentle floating orbs */}
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-blue-300/40 to-indigo-300/40 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute -bottom-2 -left-2 w-12 h-12 bg-gradient-to-br from-indigo-300/30 to-blue-300/30 rounded-full blur-lg animate-pulse" style={{ animationDelay: '0.5s' }}></div>

                {/* Mock AI interface */}
                <div className="relative z-10 space-y-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
                      <img 
                        src="/lovable-uploads/aa075d0b-00d3-4c46-a600-501aec587b42.png" 
                        alt="Ruvo Logo" 
                        className="h-6 w-auto brightness-0 invert"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800">Ruvo AI</h3>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full mr-2 animate-pulse"></div>
                        <p className="text-xs text-slate-500 font-medium">Online now</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/50 rounded-xl rounded-bl-md p-4 max-w-xs shadow-sm">
                      <p className="text-sm text-slate-700 leading-relaxed">
                        Hello! I'm Ruvo. I'm here to listen and support you. How
                        are you feeling today? 💙
                      </p>
                    </div>

                    <div className="bg-white border border-slate-200 shadow-sm rounded-xl rounded-br-md p-4 ml-auto max-w-xs">
                      <p className="text-sm text-slate-700">
                        I've been feeling a bit overwhelmed with work lately.
                      </p>
                    </div>

                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/50 rounded-xl rounded-bl-md p-4 max-w-xs shadow-sm">
                      <p className="text-sm text-slate-700 leading-relaxed">
                        I understand how overwhelming work pressure can be.
                        Let's talk about what's been happening and explore some
                        ways to help you feel more balanced. ✨
                      </p>
                    </div>
                  </div>

                  <div className="pt-4">
                    <div className="relative">
                      <div className="w-full bg-slate-50/90 backdrop-blur-sm border border-slate-200 rounded-full px-4 py-3 text-sm placeholder-slate-400 cursor-not-allowed">
                        <span className="text-slate-400">Send a message...</span>
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
