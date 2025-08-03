import React, { useState } from "react";
import PageLayout from "@/components/PageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import TrueFocus from "@/components/misc/TrueFocus";
import { motion } from "framer-motion";
const About = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const teamMembers = [
    {
      name: "Tharun Raj",
      role: "Founder & CEO",
      image: "/lovable-uploads/e71e166c-04d8-40d0-a9d1-92b058c6bab9.png",
      bio: "Visionary entrepreneur passionate about creating technology that fosters meaningful human connections.",
    },
    {
      name: "Sarah Johnson",
      role: "Chief AI Officer",
      image: "/placeholder.svg",
      bio: "Expert in emotional AI with a background in psychology and machine learning.",
    },
    {
      name: "David Chen",
      role: "CTO",
      image: "/placeholder.svg",
      bio: "Tech innovator with expertise in building scalable AI systems.",
    },
    {
      name: "Melissa Patel",
      role: "Head of Psychology",
      image: "/placeholder.svg",
      bio: "Licensed therapist specializing in digital wellness and emotional intelligence.",
    },
  ];
  return (
    <PageLayout
      title="About RUVO"
      description="We're on a mission to create AI companions that understand human emotions and provide meaningful support."
    >
      <div className="space-y-16">
        <section className="relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-ruvo-200/30 rounded-full blur-3xl -z-10 opacity-70"></div>
          <div className="absolute bottom-20 left-10 w-40 h-40 bg-ruvo-300/20 rounded-full blur-2xl -z-10 opacity-60"></div>

          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2 text-ruvo-600 flex items-center">
                <TrueFocus
                  sentence="Our Story"
                  manualMode={false}
                  blurAmount={3}
                  borderColor="#7E69AB"
                  pauseBetweenAnimations={3}
                />
              </h2>
              <Separator className="w-24 h-1 bg-gradient-to-r from-ruvo-300 to-ruvo-400" />
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.5,
                }}
              >
                <Collapsible
                  open={isExpanded}
                  onOpenChange={setIsExpanded}
                  className="space-y-4"
                >
                  <div className="prose prose-sm sm:prose max-w-none text-gray-600">
                    <p className="mb-4">
                      In 2025, RUVO was born—not from a business plan, but
                      from an uncomfortable silence that felt too loud.
                      It began when our founder, then just
                      20 years old, encountered one of life's deepest voids:
                      loneliness. After
                      losing a loved one and seeing individuals around
                      him emotionally struggle with no one to confide in,
                      he came to understand something powerful — the world is
                      more connected than ever, and yet
                      people have ever felt lonelier.
                    </p>

                    <CollapsibleContent>
                      <p className="mb-4">
                        RUVO is not a product. It's a commitment — that no
                        one needs to endure in
                        silence anymore. Constructed of love, loss, and hope,
                        RUVO is an emotional AI platform that will listen
                        when others won't, that will be there when the
                        world recedes.
                      </p>

                      <p className="mb-4">
                        Our team combines AI researchers, psychologists, and
                        developers, but first and foremost, we're
                        humans creating for humans. Every line of
                        code, each voice response, each sentence uttered by
                        RUVO comes from real pain, real healing, and
                        the need to brighten someone's day just a little bit.
                      </p>

                      <p>
                        We don't look at RUVO as a company — we look at it as a
                        movement. A community of believers
                        who are passionate about changing the
                        way tech intersects with emotion. And
                        we invite, not only investors, but dreamers, builders,
                        and feelers — people who see beyond the code, people
                        who wish to leave behind more than just a career — a
                        legacy.
                      </p>
                    </CollapsibleContent>
                  </div>

                  <CollapsibleTrigger asChild>
                    <Button
                      variant="link"
                      className="text-ruvo-500 hover:text-ruvo-600 p-0 h-auto mt-2"
                    >
                      {isExpanded ? "Read Less" : "Read More..."}
                    </Button>
                  </CollapsibleTrigger>
                </Collapsible>
              </motion.div>

              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.5,
                  delay: 0.2,
                }}
                className="bg-gradient-to-br from-ruvo-100 to-ruvo-200 p-6 rounded-2xl shadow-lg relative overflow-hidden"
              >
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-ruvo-200/50 rounded-full blur-xl"></div>
                <div className="absolute -left-5 -bottom-5 w-20 h-20 bg-ruvo-300/30 rounded-full blur-lg"></div>
                <div className="relative glass p-6 rounded-xl">
                  <h3 className="font-semibold mb-4 text-ruvo-600 text-xl">
                    Our Mission
                  </h3>
                  <p className="italic text-gray-700">
                    To create AI companions that don't just talk — but listen,
                    feel, and truly understand. In a world overflowing with
                    noise, RUVO aims to be the quiet comfort — the digital
                    shoulder to lean on when no one else is around. We're here
                    to build technology that connects to the heart, offering not
                    just answers, but empathy.
                  </p>
                  <div className="mt-4 text-right">
                    <p className="text-ruvo-500 font-medium">
                      RUVO was born out of silence.
                      <br />
                      Now, it speaks for those who can't.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section>
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2 text-ruvo-600">
              Meet Our Team
            </h2>
            <Separator className="w-24 h-1 bg-gradient-to-r from-ruvo-300 to-ruvo-400" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.1,
                }}
              >
                <Card className="overflow-hidden transition-all duration-300 hover:shadow-md border-ruvo-100 hover:border-ruvo-300">
                  <CardContent className="p-0">
                    <div className="p-6 text-center">
                      <Avatar className="w-24 h-24 mx-auto mb-4 border-2 border-ruvo-200 shadow-md">
                        <AvatarImage
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover"
                          style={{
                            objectFit: "cover",
                            objectPosition: "center",
                          }}
                        />
                        <AvatarFallback className="bg-ruvo-100 text-ruvo-500 text-lg">
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <h3 className="font-semibold mb-1 text-ruvo-600">
                        {member.name}
                      </h3>
                      <p className="text-sm text-gray-500 mb-3">
                        {member.role}
                      </p>
                      <p className="text-sm text-gray-600 italic">
                        {member.bio}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        <section>
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2 text-ruvo-600">
              Our Values
            </h2>
            <Separator className="w-24 h-1 bg-gradient-to-r from-ruvo-300 to-ruvo-400" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.3,
                delay: 0.1,
              }}
            >
              <Card className="h-full border-ruvo-100 hover:border-ruvo-300 transition-all duration-300">
                <CardContent className="pt-6 h-full flex flex-col">
                  <h3 className="font-semibold mb-2 text-ruvo-500">
                    Empathy First
                  </h3>
                  <p className="text-gray-600 flex-grow">
                    We believe in designing technology that truly understands
                    human emotions and responds with genuine empathy.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.3,
                delay: 0.2,
              }}
            >
              <Card className="h-full border-ruvo-100 hover:border-ruvo-300 transition-all duration-300">
                <CardContent className="pt-6 h-full flex flex-col">
                  <h3 className="font-semibold mb-2 text-ruvo-500">
                    Privacy & Trust
                  </h3>
                  <p className="text-gray-600 flex-grow">
                    Your conversations with RUVO are private. We believe in
                    transparent data practices and giving users control.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.3,
                delay: 0.3,
              }}
            >
              <Card className="h-full border-ruvo-100 hover:border-ruvo-300 transition-all duration-300">
                <CardContent className="pt-6 h-full flex flex-col">
                  <h3 className="font-semibold mb-2 text-ruvo-500">
                    Constant Improvement
                  </h3>
                  <p className="text-gray-600 flex-grow">
                    We're committed to the ongoing improvement of our AI to
                    provide increasingly meaningful interactions.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
};
export default About;
