
import React from "react";
import { MessageCircle, Brain, Heart, Clock } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const features = [
  {
    icon: <MessageCircle className="h-8 w-8 text-nimira-400" />,
    title: "Talk to Nimira 24/7",
    description: "Your AI companion is available anytime you need someone to talk to, offering support day and night."
  },
  {
    icon: <Brain className="h-8 w-8 text-nimira-400" />,
    title: "Stores Meaningful Memories",
    description: "Nimira remembers your important moments, preferences, and conversations to provide personalized support."
  },
  {
    icon: <Heart className="h-8 w-8 text-nimira-400" />,
    title: "Offers Emotional Comfort",
    description: "Designed to provide empathetic responses and emotional support when you need it most."
  },
  {
    icon: <Clock className="h-8 w-8 text-nimira-400" />,
    title: "AI That Learns You Over Time",
    description: "The more you interact with Nimira, the better it understands your needs, preferences, and communication style."
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
    <section id="how-it-works" className="section-spacing bg-gray-50/80 relative">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent"></div>
      
      <div className="container-custom relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How Nimira Works</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience the power of emotional AI designed to support your well-being through intelligent, empathetic interaction.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="card-feature flex flex-col items-center text-center cursor-pointer hover:translate-y-[-5px] transition-transform"
              onClick={() => {
                toast({
                  title: feature.title,
                  description: feature.description,
                });
              }}
            >
              <div className="mb-5 p-3 rounded-2xl bg-nimira-100/50">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <button 
            onClick={handleExploreFeatures} 
            className="gradient-button"
          >
            Explore More Features
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
