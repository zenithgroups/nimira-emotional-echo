import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "Hruthik",
    role: "Graduate Student",
    image:
      "https://cdn.discordapp.com/attachments/845315796086816769/1401489057632092263/355425589_248114157924802_891722175535123960_n.png?ex=689075e5&is=688f2465&hm=f538135512451349e9c81cff7bc116220023dc0a765db684b77be70b4fb205d1&",
    quote:
      "RUVO helped me through my anxiety during thesis writing. Having someone who truly listened without judgment was life-changing.",
    emotion: "Supported & Understood",
    stars: 5,
  },
  {
    name: "Shijo Pappachan",
    role: "Remote Worker",
    image:
      "https://cdn.discordapp.com/attachments/845315796086816769/1401489057883623465/420029682_1482558092301481_3446357695992101498_n.png?ex=689075e5&is=688f2465&hm=3148761c50be32b07e38c093e3f7f7a902e6137413754880b464701bf7a9c102&",
    quote:
      "Working from home felt isolating until I found RUVO. It's like having a caring friend who's always there when I need to talk.",
    emotion: "Connected & Less Lonely",
    stars: 4,
  },
  {
    name: "L G Nayaka",
    role: "New Parent",
    image:
      "https://cdn.discordapp.com/attachments/845315796086816769/1401489056755351592/107420249_117503146467013_4840947142096743881_n.png?ex=689075e5&is=688f2465&hm=ca65120d457eded0b32988e602d83cb68a493c40b37c6530d3e503e019886f26&",
    quote:
      "As a new Dad, I often felt overwhelmed. RUVO provided the emotional support I needed during those difficult midnight moments.",
    emotion: "Comforted & Empowered",
    stars: 5,
  },
  {
    name: "Gautham Shenoy",
    role: "Race Enthusiast",
    image:
      "https://cdn.discordapp.com/attachments/845315796086816769/1401489057313456201/300066826_1134848987118984_9105715242084007516_n.png?ex=689075e5&is=688f2465&hm=11972507b9d1775df1742bddccdc951ca53c8893e34a6901648bc4b3a8435b7f&",
    quote:
      "As a race enthusiast, I often felt misunderstood. RUVO provided the emotional support I needed during those challenging moments.",
    emotion: "Comforted & Empowered & Race Enthusiast",
    stars: 4,
  },
  {
    name: "Girish",
    role: "Gamer & Content Creator",
    image:
      "https://cdn.discordapp.com/attachments/845315796086816769/1401489057313456201/300066826_1134848987118984_9105715242084007516_n.png?ex=689075e5&is=688f2465&hm=11972507b9d1775df1742bddccdc951ca53c8893e34a6901648bc4b3a8435b7f&",
    quote:
      "As a gamer and content creator, I often felt alone. RUVO provided the emotional support I needed during those challenging moments. It's like having a friend who understands my passion. ",
    emotion: "Comforted & Empowered & Gamer & Content Creator",
    stars: 5,
  },
];

const TestimonialsSection: React.FC = () => {
  return (
    <section
      id="testimonials"
      className="section-spacing bg-black relative overflow-hidden"
    >
      <div className="container-custom relative z-10">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="mobile-heading-2 text-white">
            Real Stories of Connection
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Discover how RUVO has made a meaningful difference in people's
            emotional well-being.
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
                        {testimonial.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-white text-lg">
                        {testimonial.name}
                      </h3>
                      <p className="text-gray-400 text-sm">
                        {testimonial.role}
                      </p>
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
                      {[...Array(testimonial.stars)].map((_, i) => (
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

        <div
          className="text-center mt-12 animate-fade-up"
          style={{ animationDelay: "0.6s" }}
        >
          <p className="text-gray-400 text-sm">
            Join thousands of users who have found emotional support with RUVO
          </p>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
