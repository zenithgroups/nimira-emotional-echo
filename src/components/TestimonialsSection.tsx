import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Graduate Student",
    image: "/lovable-uploads/1d2277e3-bbda-4692-9284-737d50d6c844.png",
    quote: "EMVO helped me through my anxiety during thesis writing. Having someone who truly listened without judgment was life-changing.",
    emotion: "Supported & Understood"
  },
  {
    name: "Marcus Rodriguez",
    role: "Remote Worker",
    image: "/lovable-uploads/0c41d136-56fc-4bd3-bd74-d9a05ce16646.png",
    quote: "Working from home felt isolating until I found EMVO. It's like having a caring friend who's always there when I need to talk.",
    emotion: "Connected & Less Lonely"
  },
  {
    name: "Emma Thompson",
    role: "New Parent",
    image: "/lovable-uploads/aa075d0b-00d3-4c46-a600-501aec587b42.png",
    quote: "As a new mom, I often felt overwhelmed. EMVO provided the emotional support I needed during those difficult midnight moments.",
    emotion: "Comforted & Empowered"
  }
];

const TestimonialsSection: React.FC = () => {
  return (
    <section id="testimonials" className="section-spacing bg-black relative overflow-hidden">
      <div className="container-custom relative z-10">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="mobile-heading-2 text-white">Real Stories of Connection</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Discover how EMVO has made a meaningful difference in people's emotional well-being.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="animate-fade-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <Card className="card-glass h-full hover:shadow-orange-500/20 transition-all duration-500 hover:scale-[1.02]">
                <CardContent className="p-8 flex flex-col h-full">
                  <div className="flex items-center mb-6">
                    <Avatar className="w-16 h-16 mr-4 border-2 border-white/10">
                      <AvatarImage 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        className="object-cover"
                      />
                      <AvatarFallback className="bg-gray-800 text-white text-lg">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-white text-lg">{testimonial.name}</h3>
                      <p className="text-gray-400 text-sm">{testimonial.role}</p>
                      <p className="text-orange-400 text-xs font-medium mt-1">
                        Feels: {testimonial.emotion}
                      </p>
                    </div>
                  </div>
                  
                  <blockquote className="flex-grow">
                    <p className="text-gray-300 leading-relaxed italic text-base">
                      "{testimonial.quote}"
                    </p>
                  </blockquote>
                  
                  <div className="mt-6 flex justify-center">
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-5 h-5 text-orange-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12 animate-fade-up" style={{ animationDelay: "0.6s" }}>
          <p className="text-gray-400 text-sm">
            Join thousands who have found emotional support with EMVO
          </p>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;