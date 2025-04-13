
import React from "react";
import PageLayout from "@/components/PageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MessageSquare, BookOpen, FileQuestion, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const Help = () => {
  const helpCategories = [
    {
      title: "Getting Started",
      icon: <BookOpen className="h-5 w-5" />,
      description: "Learn the basics of using Ruvo AI companion",
      articles: ["Setting up your account", "First conversation guide", "Voice settings"]
    },
    {
      title: "Features & Capabilities",
      icon: <FileQuestion className="h-5 w-5" />,
      description: "Discover what Ruvo can do for you",
      articles: ["Voice conversations", "Memory features", "Emotional support"]
    },
    {
      title: "Troubleshooting",
      icon: <MessageSquare className="h-5 w-5" />,
      description: "Solve common issues and problems",
      articles: ["Connection problems", "Voice recognition issues", "App performance"]
    },
    {
      title: "Account & Billing",
      icon: <Clock className="h-5 w-5" />,
      description: "Manage your subscription and account",
      articles: ["Subscription options", "Payment methods", "Cancel subscription"]
    }
  ];

  return (
    <PageLayout 
      title="Help Center" 
      description="Find answers to your questions about using Ruvo."
    >
      <div className="space-y-12">
        <section>
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input 
                placeholder="Search for help articles..." 
                className="pl-10 py-6 text-lg" 
              />
              <Button className="absolute right-1 top-1/2 transform -translate-y-1/2">
                Search
              </Button>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">Help Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {helpCategories.map((category, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-ruvo-100 p-3 rounded-lg text-ruvo-600">
                      {category.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">{category.title}</h3>
                      <p className="text-gray-600 text-sm mb-3">{category.description}</p>
                      <ul className="space-y-1">
                        {category.articles.map((article, i) => (
                          <li key={i}>
                            <Link to="#" className="text-ruvo-500 hover:underline text-sm">
                              {article}
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <Link to="#" className="text-xs text-gray-500 hover:text-ruvo-500 mt-2 inline-block">
                        View all articles →
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">Popular Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {["How to change your voice preferences", "Understanding Ruvo's memory features", "Troubleshooting connection issues", "Setting up daily check-ins", "Privacy and data settings explained", "How to export your conversation history"].map((article, index) => (
              <Card key={index} className="hover:border-ruvo-300 transition-colors">
                <CardContent className="p-4">
                  <Link to="#" className="text-gray-800 hover:text-ruvo-500">
                    {article}
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="bg-ruvo-50 p-8 rounded-2xl">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Still need help?</h2>
            <p className="text-gray-600 mb-6">Our support team is ready to assist you with any questions.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="default" asChild>
                <Link to="/contact">Contact Support</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/faqs">View FAQs</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default Help;
