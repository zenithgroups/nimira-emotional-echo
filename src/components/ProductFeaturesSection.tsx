import React from "react";
import { MessageSquare, Book, Smile, Shield } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import Tooltip from "@/components/misc/ToolTip";
const ProductFeaturesSection: React.FC = () => {
  const { toast } = useToast();

  const handleFeatureClick = (title: string, description: string) => {
    toast({
      title: title,
      description: description,
    });
  };

  return (
    <section
      id="features"
      className="section-spacing bg-black relative overflow-hidden"
    >
      <div className="container-custom relative z-10">
        <div className="text-center mb-16 animate-fade-up">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8">
            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2 animate-pulse"></div>
            <span className="text-xs font-medium text-white/80">
              Powerful AI Features
            </span>
          </div>

          <h2 className="mobile-heading-2 text-white">Advanced Capabilities</h2>

          <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed mb-6">
            Experience a companion that's designed to support your emotional
            wellbeing with cutting-edge AI technology.
          </p>

          <div className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-400/30 backdrop-blur-sm">
            <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-2 animate-pulse"></div>
            <p className="text-xs text-emerald-300 font-medium">
              Experience our AI companion below - Visual Demo
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Static Chat Interface Mockup */}
          <div className="order-2 lg:order-1 relative group animate-slide-in-left">
            <div className="relative card-glass p-6 md:p-8">
              <div className="w-full h-[500px] flex flex-col">
                {/* Chat Header */}
                <div className="flex items-center justify-between pb-4 border-b border-white/20">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold">
                      <img
                        src="/lovable-uploads/aa075d0b-00d3-4c46-a600-501aec587b42.png"
                        alt="RUVO Logo"
                        className="h-5 w-auto brightness-0 invert"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-white">RUVO AI</h3>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse"></div>
                        <p className="text-xs text-gray-400 font-medium">
                          Ready to help
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="flex-1 py-4 space-y-4 overflow-hidden">
                  <div className="flex justify-start">
                    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl rounded-bl-md p-4 max-w-sm">
                      <p className="text-sm text-gray-200 leading-relaxed">
                        Hello! I'm RUVO, your emotional AI companion. I'm
                        designed to understand and support your feelings. How
                        are you doing today? 💙
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl rounded-br-md p-4 max-w-sm">
                      <p className="text-sm text-gray-300">
                        I've been feeling anxious about some upcoming changes in
                        my life.
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-start">
                    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl rounded-bl-md p-4 max-w-sm">
                      <p className="text-sm text-gray-200 leading-relaxed">
                        I understand how unsettling upcoming changes can feel.
                        It's completely natural to feel anxious about the
                        unknown. Would you like to talk about what specific
                        changes are causing you the most concern? ✨
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl rounded-br-md p-4 max-w-sm">
                      <p className="text-sm text-gray-300">
                        Thank you for understanding. It really helps to feel
                        heard.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Chat Input Area */}
                <Tooltip text="Click on Get Started!">
                  <div className="pt-4 border-t border-white/20">
                    <div className="relative">
                      <div className="w-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-4 py-3 text-sm cursor-not-allowed opacity-75">
                        <span className="text-gray-400">
                          Try our full chat experience...
                        </span>
                      </div>
                      <div className="absolute right-2 top-1/2 -translate-y-1/2 gradient-button p-2.5 rounded-full shadow-md cursor-not-allowed opacity-50">
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
                </Tooltip>
              </div>
            </div>
          </div>

          {/* Features List */}
          <div className="order-1 lg:order-2 animate-slide-in-right">
            <div className="space-y-6">
              <div
                className="group flex gap-6 cursor-pointer p-6 rounded-xl card-feature hover:scale-[1.02] transition-all duration-500"
                onClick={() =>
                  handleFeatureClick(
                    "Real-time Chat",
                    "Experience natural, human-like conversations powered by OpenAI's most advanced language model, for meaningful interactions."
                  )
                }
              >
                <div className="shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-300">
                  <MessageSquare className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-orange-300 transition-colors duration-300">
                    Real-time Chat with OpenAI
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    Experience natural, human-like conversations powered by
                    OpenAI's most advanced language model, for meaningful
                    interactions.
                  </p>
                </div>
              </div>

              <div
                className="group flex gap-6 cursor-pointer p-6 rounded-xl card-feature hover:scale-[1.02] transition-all duration-500"
                onClick={() =>
                  handleFeatureClick(
                    "Memory Journaling",
                    "RUVO remembers your past conversations and important life events, creating a digital memory journal that evolves with you."
                  )
                }
              >
                <div className="shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-300">
                  <Book className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-orange-300 transition-colors duration-300">
                    Memory Journaling
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    RUVO remembers your past conversations and important life
                    events, creating a digital memory journal that evolves with
                    you.
                  </p>
                </div>
              </div>

              <div
                className="group flex gap-6 cursor-pointer p-6 rounded-xl card-feature hover:scale-[1.02] transition-all duration-500"
                onClick={() =>
                  handleFeatureClick(
                    "Daily Mood Check-ins",
                    "Regular emotion tracking and personalized insights to help you understand patterns in your emotional wellbeing."
                  )
                }
              >
                <div className="shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-300">
                  <Smile className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-orange-300 transition-colors duration-300">
                    Daily Mood Check-ins
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    Regular emotion tracking and personalized insights to help
                    you understand patterns in your emotional wellbeing.
                  </p>
                </div>
              </div>

              <div
                className="group flex gap-6 cursor-pointer p-6 rounded-xl card-feature hover:scale-[1.02] transition-all duration-500"
                onClick={() =>
                  handleFeatureClick(
                    "Security & Privacy",
                    "Your conversations with RUVO are encrypted and private, with transparent data practices and user control."
                  )
                }
              >
                <div className="shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-300">
                  <Shield className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-orange-300 transition-colors duration-300">
                    Secure, Private by Design
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    Your conversations with RUVO are encrypted and private, with
                    transparent data practices and user control.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductFeaturesSection;
