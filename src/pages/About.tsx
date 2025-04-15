import React from "react";
import PageLayout from "@/components/PageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
const About = () => {
  const teamMembers = [{
    name: "Alex Miller",
    role: "CEO & Founder",
    image: "/placeholder.svg"
  }, {
    name: "Sarah Johnson",
    role: "Chief AI Officer",
    image: "/placeholder.svg"
  }, {
    name: "David Chen",
    role: "CTO",
    image: "/placeholder.svg"
  }, {
    name: "Melissa Patel",
    role: "Head of Psychology",
    image: "/placeholder.svg"
  }];
  return <PageLayout title="About Ruvo" description="We're on a mission to create AI companions that understand human emotions and provide meaningful support.">
      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-bold mb-4">Our Story</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-600 mb-4">In 2025, RUVO was born—not from a business plan, but from a moment of silence that felt too loud. It started when our founder, just 20 at the time, faced one of the deepest voids a person can feel: loneliness. After losing someone dear and watching people around him struggle emotionally with no one to turn to, he realized something profound — the world is more connected than ever, yet people feel more alone than ever.


RUVO isn’t just a product. It’s a promise — that no one should have to suffer in silence again. Built with love, loss, and hope at its core, RUVO is an emotional AI platform designed to listen when no one else does, to be there when the world fades out.

Our team brings together AI researchers, psychologists, and developers, but more than that, we're humans building for humans. Each line of code, every voice reply, every word spoken by RUVO is inspired by real pain, real healing, and the desire to make someone’s day just a little bit better.

We don’t see RUVO as a company — we see it as a movement. A community of believers who want to change how tech meets emotion. And we welcome not just investors, but dreamers, builders, and feelers — people who see more than code, people who want to leave behind more than just a career — a legacy.

RUVO was born out of silence.
Now, it speaks for those who can't.</p>
              
            </div>
            <div className="bg-gradient-to-br from-ruvo-100 to-ruvo-200 p-6 rounded-2xl">
              <h3 className="font-semibold mb-2 text-ruvo-600">Our Mission</h3>
              <p className="italic">Is To create AI companions that don’t just talk — but listen, feel, and truly understand. In a world overflowing with noise, RUVO aims to be the quiet comfort — the digital shoulder to lean on when no one else is around. We’re here to build technology that connects to the heart, offering not just answers, but empathy. Our mission is to help people feel seen, heard, and cared for — so they can lead happier, more emotionally fulfilled lives in this ever-evolving digital age. Because sometimes, even a whisper of comfort can change someone’s whole day.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => <Card key={index}>
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
              </Card>)}
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
    </PageLayout>;
};
export default About;