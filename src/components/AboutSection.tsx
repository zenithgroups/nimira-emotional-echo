
import React from "react";
import { Button } from "@/components/ui/button";
import TrueFocus from "./misc/TrueFocus";

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="section-spacing bg-gradient-to-br from-blue-950 via-slate-900 to-blue-900 relative overflow-hidden">
      {/* Animated background particles with blue and gold theme */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-2 h-2 bg-blue-400 rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-amber-400 rounded-full opacity-70 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-40 left-40 w-1.5 h-1.5 bg-blue-500 rounded-full opacity-50 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-60 right-60 w-2 h-2 bg-blue-300 rounded-full opacity-40 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center">
              <TrueFocus 
                sentence="About Ruvo"
                manualMode={false}
                blurAmount={3}
                borderColor="#7E69AB"
                pauseBetweenAnimations={3}
              />
            </h2>
            <p className="text-lg text-gray-200">
              Creating meaningful connections in a digital world
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h3 className="text-2xl font-bold mb-4 text-amber-300">Our Mission</h3>
              <p className="text-gray-200 mb-4">
                At Ruvo, we believe that technology should enhance human connection, not replace it. 
                Our mission is to develop AI companions that provide genuine emotional support and understanding, 
                helping to reduce loneliness and improve mental well-being in our increasingly digital world.
              </p>
              
              <p className="text-gray-200 mb-6">
                We're committed to responsible AI development, prioritizing user privacy, emotional safety, 
                and creating technology that serves genuine human needs for connection and understanding.
              </p>
              
              <div className="flex items-center space-x-4 glass-dark p-4 rounded-xl">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md overflow-hidden">
                  <img src="/lovable-uploads/e71e166c-04d8-40d0-a9d1-92b058c6bab9.png" alt="Tharun Raj" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="font-semibold text-white">Tharun Raj</p>
                  <p className="text-sm text-gray-300">Founder & CEO</p>
                </div>
              </div>
              
              <div className="mt-6">
                <Button 
                  variant="outline"
                  className="border-blue-400/30 text-blue-300 hover:bg-blue-500/20 hover:text-white hover:border-amber-400/50"
                  onClick={() => window.location.href = '/about'}
                >
                  Learn More About Us
                </Button>
              </div>
            </div>
            
            <div className="order-1 md:order-2">
              <div className="aspect-square bg-gradient-to-br from-blue-500/20 to-blue-600/30 rounded-3xl flex items-center justify-center p-8 shadow-lg relative overflow-hidden">
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-amber-400/20 rounded-full blur-xl"></div>
                <div className="absolute -left-5 -bottom-5 w-20 h-20 bg-blue-400/30 rounded-full blur-lg"></div>
                <div className="glass-dark p-6 rounded-2xl max-w-xs relative">
                  <p className="italic text-gray-200 mb-4">
                    "We created Ruvo to be more than just an AI – we wanted to build a companion 
                    that truly understands the nuances of human emotion and can provide comfort and 
                    insight when you need it most."
                  </p>
                  
                  <p className="text-right text-amber-300 font-medium">
                    – Founder's Vision
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-16 border-t border-blue-400/30 pt-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center glass-dark p-6 rounded-xl hover:bg-blue-950/80 hover:border-amber-400/40 transition-all duration-300">
                <div className="text-4xl font-bold text-amber-300 mb-2">92%</div>
                <p className="text-gray-200">Users report feeling less lonely after regular interactions</p>
              </div>
              
              <div className="text-center glass-dark p-6 rounded-xl hover:bg-blue-950/80 hover:border-amber-400/40 transition-all duration-300">
                <div className="text-4xl font-bold text-amber-300 mb-2">24/7</div>
                <p className="text-gray-200">Continuous emotional support whenever you need it</p>
              </div>
              
              <div className="text-center glass-dark p-6 rounded-xl hover:bg-blue-950/80 hover:border-amber-400/40 transition-all duration-300">
                <div className="text-4xl font-bold text-amber-300 mb-2">100%</div>
                <p className="text-gray-200">Committed to user privacy and ethical AI development</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
