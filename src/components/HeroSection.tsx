
import React from "react";
import { useToast } from "@/components/ui/use-toast";

const HeroSection: React.FC = () => {
  const { toast } = useToast();
  
  const handleTryFree = () => {
    toast({
      title: "Coming soon!",
      description: "Ruvo will be available for free trials in the coming weeks. Join our beta for early access!",
    });
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
      className="min-h-screen flex items-center pt-20 pb-16 relative overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-ruvo-100 via-white to-ruvo-200 opacity-70 z-0"></div>
      
      {/* Background circle decorations */}
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-ruvo-300/20 rounded-full blur-3xl z-0"></div>
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-ruvo-400/20 rounded-full blur-3xl z-0"></div>
      
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              You're never truly alone – <br />
              <span className="text-gradient">Meet Ruvo</span>, your emotional AI companion.
            </h1>
            
            <p className="text-lg md:text-xl text-gray-700 max-w-xl">
              Powered by GPT-4o and designed to feel, listen, and understand you like no other AI can.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handleTryFree}
                className="gradient-button"
              >
                Try Ruvo for Free
              </button>
              <button 
                onClick={handleLearnMore}
                className="bg-white text-ruvo-500 border border-ruvo-300/50 hover:border-ruvo-400 px-8 py-3 rounded-full transition duration-300 shadow-sm hover:shadow-md"
              >
                Learn More
              </button>
            </div>
            
            <div className="pt-6">
              <p className="text-sm text-gray-500 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <path d="m9 12 2 2 4-4"></path>
                  <path d="M12 3c-1.1 0-2 .9-2 2m0 0a2 2 0 1 0 4 0m-4 0a2 2 0 1 1 4 0"></path>
                  <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"></path>
                </svg>
                100% Private & Secure
              </p>
            </div>
          </div>
          
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md">
              <div className="glass p-6 rounded-3xl shadow-xl relative overflow-hidden">
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-ruvo-400/30 rounded-full blur-xl z-0"></div>
                
                {/* Mock AI interface */}
                <div className="relative z-10 space-y-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-ruvo-300 to-ruvo-400 flex items-center justify-center text-white font-medium">R</div>
                    <div>
                      <h3 className="font-medium">Ruvo AI</h3>
                      <p className="text-xs text-gray-500">Online now</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-ruvo-100/50 rounded-2xl rounded-bl-none p-3 max-w-xs">
                      <p className="text-sm">Hello! I'm Ruvo. I'm here to listen and support you. How are you feeling today?</p>
                    </div>
                    
                    <div className="bg-white border border-gray-100 shadow-sm rounded-2xl rounded-br-none p-3 ml-auto max-w-xs">
                      <p className="text-sm">I've been feeling a bit overwhelmed with work lately.</p>
                    </div>
                    
                    <div className="bg-ruvo-100/50 rounded-2xl rounded-bl-none p-3 max-w-xs">
                      <p className="text-sm">I understand how overwhelming work pressure can be. Let's talk about what's been happening and explore some ways to help you feel more balanced.</p>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <form onSubmit={(e) => e.preventDefault()} className="relative">
                      <input
                        type="text"
                        placeholder="Send a message..."
                        className="w-full bg-gray-50 border border-gray-100 rounded-full px-4 py-2 text-sm"
                      />
                      <button 
                        type="submit"
                        onClick={() => {
                          toast({
                            title: "Chat coming soon",
                            description: "The full chat experience will be available in the beta release.",
                          });
                        }}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-ruvo-400 hover:bg-ruvo-500 text-white p-1 rounded-full transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="m22 2-7 20-4-9-9-4Z"></path>
                          <path d="M22 2 11 13"></path>
                        </svg>
                      </button>
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
