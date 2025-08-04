import React from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import TrueFocus from "./misc/TrueFocus";

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, loading } = useAuth();

  const handleGetStarted = () => {
    if (user) {
      navigate('/chat');
    } else {
      navigate('/auth');
    }
  };

  const handleLearnMore = () => {
    const featuresSection = document.getElementById("features");
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center pt-20 pb-16 relative overflow-hidden bg-black"
    >
      {/* Subtle animated background particles with reduced saturation */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-1 h-1 bg-blue-400/20 rounded-full opacity-40 animate-pulse"></div>
        <div
          className="absolute top-40 right-32 w-0.5 h-0.5 bg-orange-400/30 rounded-full opacity-30 animate-pulse"
          style={{ animationDelay: "0.5s" }}
        ></div>
        <div
          className="absolute bottom-40 left-40 w-1 h-1 bg-blue-500/20 rounded-full opacity-30 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-60 right-20 w-0.5 h-0.5 bg-orange-300/40 rounded-full opacity-30 animate-pulse"
          style={{ animationDelay: "1.5s" }}
        ></div>
        <div
          className="absolute bottom-60 right-60 w-1 h-1 bg-blue-300/20 rounded-full opacity-30 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-32 left-1/3 w-0.5 h-0.5 bg-orange-500/30 rounded-full opacity-25 animate-pulse"
          style={{ animationDelay: "2.5s" }}
        ></div>
        <div
          className="absolute bottom-32 left-1/4 w-1 h-1 bg-blue-400/20 rounded-full opacity-25 animate-pulse"
          style={{ animationDelay: "3s" }}
        ></div>
        <div
          className="absolute top-1/2 right-1/4 w-0.5 h-0.5 bg-orange-400/30 rounded-full opacity-25 animate-pulse"
          style={{ animationDelay: "3.5s" }}
        ></div>
        <div
          className="absolute bottom-1/3 left-1/2 w-1 h-1 bg-blue-300/20 rounded-full opacity-30 animate-pulse"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 text-left max-w-lg animate-fade-up">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2 animate-pulse"></div>
              <span className="text-xs font-medium text-white/80">
                AI-powered emotional intelligence
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white">
              AI-powered
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-blue-300 to-orange-400 bg-clip-text text-transparent">
                emotional
              </span>
              <br />
              companion
            </h1>

            <p className="text-lg text-gray-300 max-w-md leading-relaxed font-light">
              Experience the future of emotional AI with RUVO - your intelligent
              companion that understands, feels, and responds with genuine
              empathy.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={handleGetStarted}
                disabled={loading}
                className="group inline-flex items-center justify-center px-6 py-3 gradient-button-pulse text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>{loading ? 'Loading...' : user ? 'Start Chatting' : 'Get Started'}</span>
                <svg
                  className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
              <button
                onClick={handleLearnMore}
                className="group inline-flex items-center justify-center px-6 py-3 dark-button text-white rounded-lg transition-all duration-300 hover:scale-105 text-sm"
              >
                <span className="font-medium">Learn More</span>
                <svg
                  className="ml-2 w-4 h-4 group-hover:translate-y-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
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
                <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-2 animate-pulse"></div>
                <span className="text-xs font-medium">GPT-4 Powered</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end relative animate-slide-in-right">
            <div className="relative w-full max-w-6xl group">
              <img
                src="/lovable-uploads/a341418d-e306-4bb0-a31f-82a01869d411.png"
                alt="Human and AI interaction"
                className="w-full h-auto object-contain relative z-10 scale-125 transition-all duration-500 group-hover:animate-golden-glow"
                style={{
                  maskImage: `
                    radial-gradient(ellipse 90% 85% at 50% 40%, black 50%, rgba(0,0,0,0.9) 70%, rgba(0,0,0,0.3) 90%, transparent 100%),
                    linear-gradient(to right, transparent 0%, rgba(0,0,0,0.2) 10%, black 20%, black 80%, rgba(0,0,0,0.2) 90%, transparent 100%),
                    linear-gradient(to bottom, black 0%, black 70%, rgba(0,0,0,0.8) 85%, rgba(0,0,0,0.3) 95%, transparent 100%)
                  `,
                  maskComposite: "intersect",
                  WebkitMaskImage: `
                    radial-gradient(ellipse 90% 85% at 50% 40%, black 50%, rgba(0,0,0,0.9) 70%, rgba(0,0,0,0.3) 90%, transparent 100%),
                    linear-gradient(to right, transparent 0%, rgba(0,0,0,0.2) 10%, black 20%, black 80%, rgba(0,0,0,0.2) 90%, transparent 100%),
                    linear-gradient(to bottom, black 0%, black 70%, rgba(0,0,0,0.8) 85%, rgba(0,0,0,0.3) 95%, transparent 100%)
                  `,
                  WebkitMaskComposite: "source-in",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
