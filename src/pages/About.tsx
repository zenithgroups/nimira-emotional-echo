
import React from "react";
import PageLayout from "@/components/PageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const About = () => {
  const teamMembers = [
    { name: "Alex Miller", role: "CEO & Founder", image: "/placeholder.svg" },
    { name: "Sarah Johnson", role: "Chief AI Officer", image: "/placeholder.svg" },
    { name: "David Chen", role: "CTO", image: "/placeholder.svg" },
    { name: "Melissa Patel", role: "Head of Psychology", image: "/placeholder.svg" },
  ];

  return (
    <PageLayout 
      title="About Ruvo" 
      description="We're on a mission to create AI companions that understand human emotions and provide meaningful support."
    >
      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-bold mb-4">Our Story</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-600 mb-4">
                Founded in 2024, Ruvo was born from a simple observation: as our digital lives expand, our emotional connections often diminish. We saw an opportunity to create technology that could bridge this gap, providing emotional support and companionship through artificial intelligence.
              </p>
              <p className="text-gray-600">
                Our team of AI researchers, psychologists, and developers work together to create an AI companion that truly understands human emotions. We believe that technology should enhance our emotional wellbeing, not detract from it.
              </p>
            </div>
            <div className="bg-gradient-to-br from-ruvo-100 to-ruvo-200 p-6 rounded-2xl">
              <h3 className="font-semibold mb-2 text-ruvo-600">Our Mission</h3>
              <p className="italic">
                "To create AI companions that understand human emotions and provide meaningful support, helping people lead happier, more fulfilled lives in the digital age."
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center">
                    <Avatar className="h-24 w-24 mb-4">
                      <AvatarImage src={member.image} alt={member.name} />
                      <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <h3 className="font-semibold text-lg">{member.name}</h3>
                    <p className="text-gray-500 text-sm">{member.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2 text-ruvo-500">Empathy First</h3>
                <p className="text-gray-600">
                  We believe in designing technology that truly understands human emotions and responds with genuine empathy.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2 text-ruvo-500">Privacy & Trust</h3>
                <p className="text-gray-600">
                  Your conversations with Ruvo are private. We believe in transparent data practices and giving users control.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2 text-ruvo-500">Constant Improvement</h3>
                <p className="text-gray-600">
                  We're committed to the ongoing improvement of our AI to provide increasingly meaningful interactions.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default About;
