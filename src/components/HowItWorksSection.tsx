
import React from "react";
import { MessageCircle, Brain, Heart, Clock } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const features = [
  {
    icon: <MessageCircle className="h-8 w-8 text-blue-400" />,
    title: "Talk to Ruvo 24/7",
    description: "Your AI companion is available anytime you need someone to talk to, offering support day and night."
  },
  {
    icon: <Brain className="h-8 w-8 text-blue-400" />,
    title: "Stores Meaningful Memories",
    description: "Ruvo remembers your important moments, preferences, and conversations to provide personalized support."
  },
  {
    icon: <Heart className="h-8 w-8 text-blue-400" />,
    title: "Offers Emotional Comfort",
    description: "Designed to provide empathetic responses and emotional support when you need it most."
  },
  {
    icon: <Clock className="h-8 w-8 text-blue-400" />,
    title: "AI That Learns You Over Time",
    description: "The more you interact with Ruvo, the better it understands your needs, preferences, and communication style."
  }
];

const HowItWorksSection: React.FC = () => {
  const { toast } = useToast();

  const handleExploreFeatures = () => {
    const featuresSection = document.getElementById("features");
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: "smooth" });
    } else {
      toast({
        title: "Navigation",
        description: "Scrolling to features section.",
      });
    }
  };

  return (
    <section id="how-it-works" className="section-spacing bg-gradient-to-br from-blue-950 via-slate-900 to-blue-900 relative">
      {/* Animated background particles with blue and gold theme */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-2 h-2 bg-blue-400 rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-amber-400 rounded-full opacity-70 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-40 left-40 w-1.5 h-1.5 bg-blue-500 rounded-full opacity-50 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-60 right-20 w-1 h-1 bg-amber-300 rounded-full opacity-80 animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute bottom-60 right-60 w-2 h-2 bg-blue-300 rounded-full opacity-40 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="container-custom relative z-10">
        <div className="text-center mb-16">
          <h2 className="mobile-heading-2 bg-gradient-to-r from-blue-400 to-amber-300 bg-clip-text text-transparent">How Ruvo Works</h2>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto leading-relaxed">
            Experience the power of emotional AI designed to support your well-being through intelligent, empathetic interaction.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="glass-dark flex flex-col items-center text-center cursor-pointer hover:translate-y-[-5px] transition-all duration-300 hover:shadow-2xl hover:border-amber-400/40 hover:bg-blue-950/60 p-6"
              onClick={() => {
                toast({
                  title: feature.title,
                  description: feature.description,
                });
              }}
            >
              <div className="mb-5 p-3 rounded-2xl bg-blue-500/20 backdrop-blur-sm border border-blue-400/30">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
              <p className="text-gray-300 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <button 
            onClick={handleExploreFeatures} 
            className="group inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/25 border border-blue-400/20"
          >
            <span>Explore More Features</span>
            <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
