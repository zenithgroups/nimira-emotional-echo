
import React from "react";
import { useToast } from "@/components/ui/use-toast";
import TrueFocus from "./misc/TrueFocus";
import { Link } from "react-router-dom";

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
      {/* Enhanced background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-ruvo-50 via-white to-purple-50"></div>
      
      {/* Animated background elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-br from-ruvo-300/30 to-purple-300/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-br from-blue-300/20 to-ruvo-400/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-ruvo-200/20 to-purple-200/20 rounded-full blur-3xl"></div>

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-ruvo-100 to-purple-100 border border-ruvo-200/50 shadow-sm">
              <div className="w-2 h-2 bg-gradient-to-r from-ruvo-400 to-purple-400 rounded-full mr-2 animate-pulse"></div>
              <span className="text-sm font-medium text-ruvo-600">Powered by Advanced AI Technology</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              You're never truly alone – <br />
              <span className="bg-gradient-to-r from-ruvo-500 via-purple-500 to-ruvo-400 bg-clip-text text-transparent">
                <TrueFocus
                  sentence="Meet Ruvo"
                  manualMode={false}
                  blurAmount={5}
                  borderColor="black"
                  animationDuration={2}
                  pauseBetweenAnimations={1}
                  textClassName="bg-gradient-to-r from-ruvo-500 via-purple-500 to-ruvo-400 bg-clip-text text-transparent"
                />
              </span>
              , your emotional AI companion.
            </h1>

            <p className="text-lg md:text-xl text-slate-600 max-w-xl leading-relaxed">
              Powered by GPT-4o and designed to feel, listen, and understand you
              like no other AI can. Experience genuine emotional intelligence.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/chat" className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-ruvo-500 to-purple-500 hover:from-ruvo-600 hover:to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <span>Try Ruvo for Free</span>
                <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <button
                onClick={handleLearnMore}
                className="group inline-flex items-center justify-center px-8 py-4 bg-white/90 backdrop-blur-sm text-ruvo-600 border border-ruvo-200 hover:border-ruvo-300 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <span>Learn More</span>
                <svg className="ml-2 w-4 h-4 group-hover:translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>
            </div>

            <div className="pt-6">
              <div className="flex items-center space-x-6">
                <div className="flex items-center text-sm text-slate-500">
                  <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full mr-2 animate-pulse"></div>
                  <span className="font-medium">100% Private & Secure</span>
                </div>
                <div className="flex items-center text-sm text-slate-500">
                  <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mr-2 animate-pulse"></div>
                  <span className="font-medium">24/7 Available</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md">
              {/* Enhanced glass card with better visual effects */}
              <div className="relative bg-white/80 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 group">
                {/* Gradient border effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-ruvo-400 via-purple-400 to-ruvo-300 rounded-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
                
                {/* Floating orbs */}
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-ruvo-400/40 to-purple-400/40 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute -bottom-2 -left-2 w-12 h-12 bg-gradient-to-br from-blue-400/30 to-ruvo-400/30 rounded-full blur-lg animate-pulse" style={{ animationDelay: '0.5s' }}></div>

                {/* Mock AI interface */}
                <div className="relative z-10 space-y-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-ruvo-400 to-purple-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      R
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800">Ruvo AI</h3>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full mr-2 animate-pulse"></div>
                        <p className="text-xs text-slate-500 font-medium">Online now</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-ruvo-50 to-purple-50 border border-ruvo-100 rounded-2xl rounded-bl-md p-4 max-w-xs shadow-sm">
                      <p className="text-sm text-slate-700 leading-relaxed">
                        Hello! I'm Ruvo. I'm here to listen and support you. How
                        are you feeling today? 💙
                      </p>
                    </div>

                    <div className="bg-white border border-slate-200 shadow-sm rounded-2xl rounded-br-md p-4 ml-auto max-w-xs">
                      <p className="text-sm text-slate-700">
                        I've been feeling a bit overwhelmed with work lately.
                      </p>
                    </div>

                    <div className="bg-gradient-to-r from-ruvo-50 to-purple-50 border border-ruvo-100 rounded-2xl rounded-bl-md p-4 max-w-xs shadow-sm">
                      <p className="text-sm text-slate-700 leading-relaxed">
                        I understand how overwhelming work pressure can be.
                        Let's talk about what's been happening and explore some
                        ways to help you feel more balanced. ✨
                      </p>
                    </div>
                  </div>

                  <div className="pt-4">
                    <form onSubmit={(e) => e.preventDefault()} className="relative">
                      <input
                        type="text"
                        placeholder="Send a message..."
                        className="w-full bg-slate-50/80 backdrop-blur-sm border border-slate-200 rounded-full px-4 py-3 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-ruvo-400/50 focus:border-ruvo-400 transition-all duration-300"
                      />
                      <Link
                        to="/chat"
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-ruvo-500 to-purple-500 hover:from-ruvo-600 hover:to-purple-600 text-white p-2 rounded-full transition-all duration-300 hover:scale-110 shadow-md"
                      >
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
                      </Link>
                    </form>
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
