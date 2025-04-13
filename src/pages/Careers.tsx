
import React from "react";
import PageLayout from "@/components/PageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Careers = () => {
  const jobOpenings = [
    { 
      title: "AI Research Scientist", 
      department: "Engineering", 
      location: "Remote", 
      type: "Full-time",
      description: "Work on cutting-edge AI models to improve emotional intelligence capabilities."
    },
    { 
      title: "Senior Full-Stack Developer", 
      department: "Engineering", 
      location: "New York, NY", 
      type: "Full-time",
      description: "Build and maintain the core platform that powers our AI companion."
    },
    { 
      title: "UX/UI Designer", 
      department: "Design", 
      location: "Remote", 
      type: "Full-time",
      description: "Create intuitive, engaging interfaces for our AI companion application."
    },
    { 
      title: "Content Marketing Specialist", 
      department: "Marketing", 
      location: "Remote", 
      type: "Full-time",
      description: "Develop content strategy that communicates the value of emotional AI."
    },
    { 
      title: "Psychology Consultant", 
      department: "Research", 
      location: "Remote", 
      type: "Part-time",
      description: "Provide expertise on human emotions to improve our AI models."
    }
  ];

  return (
    <PageLayout 
      title="Join Our Team" 
      description="Help us build the future of emotional AI and make a meaningful impact on people's lives."
    >
      <div className="space-y-12">
        <section>
          <div className="bg-gradient-to-br from-ruvo-100 to-ruvo-200 p-8 rounded-2xl">
            <h2 className="text-2xl font-bold mb-4">Why Work at Ruvo?</h2>
            <div className="grid md:grid-cols-3 gap-6 mt-6">
              <div className="bg-white/70 p-5 rounded-xl">
                <h3 className="font-semibold text-ruvo-500 mb-2">Meaningful Impact</h3>
                <p className="text-gray-600">
                  Your work will directly help people improve their emotional wellbeing and find support.
                </p>
              </div>
              <div className="bg-white/70 p-5 rounded-xl">
                <h3 className="font-semibold text-ruvo-500 mb-2">Cutting-edge Technology</h3>
                <p className="text-gray-600">
                  Work with the latest advancements in AI, machine learning, and natural language processing.
                </p>
              </div>
              <div className="bg-white/70 p-5 rounded-xl">
                <h3 className="font-semibold text-ruvo-500 mb-2">Flexible Work Environment</h3>
                <p className="text-gray-600">
                  We offer remote-first positions with flexible hours and a healthy work-life balance.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">Current Openings</h2>
          <Tabs defaultValue="all">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="engineering">Engineering</TabsTrigger>
              <TabsTrigger value="design">Design</TabsTrigger>
              <TabsTrigger value="marketing">Marketing</TabsTrigger>
              <TabsTrigger value="research">Research</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-4">
              {jobOpenings.map((job, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                      <div>
                        <h3 className="font-semibold text-lg">{job.title}</h3>
                        <div className="text-sm text-gray-500">
                          {job.department} · {job.location} · {job.type}
                        </div>
                        <p className="mt-2 text-gray-600">{job.description}</p>
                      </div>
                      <Button className="mt-4 md:mt-0">Apply Now</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="engineering" className="space-y-4">
              {jobOpenings.filter(job => job.department === "Engineering").map((job, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                      <div>
                        <h3 className="font-semibold text-lg">{job.title}</h3>
                        <div className="text-sm text-gray-500">
                          {job.department} · {job.location} · {job.type}
                        </div>
                        <p className="mt-2 text-gray-600">{job.description}</p>
                      </div>
                      <Button className="mt-4 md:mt-0">Apply Now</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            
            {/* Additional tabs would be implemented similarly */}
          </Tabs>
        </section>
      </div>
    </PageLayout>
  );
};

export default Careers;
