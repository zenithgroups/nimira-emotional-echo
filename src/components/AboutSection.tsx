
import React from "react";
const AboutSection: React.FC = () => {
  return <section id="about" className="section-spacing bg-white relative">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-ruvo-100/30 rounded-bl-full z-0"></div>
      
      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">About Ruvo</h2>
            <p className="text-lg text-gray-600">
              Creating meaningful connections in a digital world
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-gray-600 mb-4">
                At Ruvo, we believe that technology should enhance human connection, not replace it. 
                Our mission is to develop AI companions that provide genuine emotional support and understanding, 
                helping to reduce loneliness and improve mental well-being in our increasingly digital world.
              </p>
              
              <p className="text-gray-600 mb-6">
                We're committed to responsible AI development, prioritizing user privacy, emotional safety, 
                and creating technology that serves genuine human needs for connection and understanding.
              </p>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-ruvo-400/10 flex items-center justify-center">
                  <span className="text-ruvo-500 font-semibold">TR</span>
                </div>
                <div>
                  <p className="font-semibold">Tharun Raj</p>
                  <p className="text-sm text-gray-500">Founder & CEO</p>
                </div>
              </div>
            </div>
            
            <div className="order-1 md:order-2">
              <div className="aspect-square bg-gradient-to-br from-ruvo-100 to-ruvo-200 rounded-3xl flex items-center justify-center p-8 shadow-lg">
                <div className="glass p-6 rounded-2xl max-w-xs">
                  <p className="italic text-gray-700 mb-4">
                    "We created Ruvo to be more than just an AI – we wanted to build a companion 
                    that truly understands the nuances of human emotion and can provide comfort and 
                    insight when you need it most."
                  </p>
                  
                  <p className="text-right text-ruvo-500 font-medium">
                    – Founder's Vision
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-16 border-t border-gray-100 pt-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-ruvo-400 mb-2">92%</div>
                <p className="text-gray-600">Users report feeling less lonely after regular interactions</p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl font-bold text-ruvo-400 mb-2">24/7</div>
                <p className="text-gray-600">Continuous emotional support whenever you need it</p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl font-bold text-ruvo-400 mb-2">100%</div>
                <p className="text-gray-600">Committed to user privacy and ethical AI development</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default AboutSection;
