
import React from "react";
import PageLayout from "@/components/PageLayout";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const Blog = () => {
  const blogPosts = [
    {
      title: "The Evolution of Emotional AI: From Recognition to Understanding",
      excerpt: "How AI is advancing from simply recognizing emotions to truly understanding the complexities of human feelings.",
      author: "Sarah Johnson",
      authorRole: "Chief AI Officer",
      date: "April 10, 2025",
      image: "/placeholder.svg",
      category: "AI Research"
    },
    {
      title: "Building Trust with AI Companions: The Ruvo Approach",
      excerpt: "A look at how we design our AI to build meaningful, trust-based relationships with users.",
      author: "Alex Miller",
      authorRole: "CEO & Founder",
      date: "April 5, 2025",
      image: "/placeholder.svg",
      category: "Product Insights"
    },
    {
      title: "Voice Technology and Emotional Connection: The Science Behind It",
      excerpt: "Exploring how voice interfaces create stronger emotional bonds between humans and AI.",
      author: "David Chen",
      authorRole: "CTO",
      date: "March 28, 2025",
      image: "/placeholder.svg",
      category: "Technology"
    },
    {
      title: "Measuring Emotional Wellbeing: How Ruvo Helps Track Your Journey",
      excerpt: "An overview of the tools and insights Ruvo provides to help users understand their emotional health.",
      author: "Melissa Patel",
      authorRole: "Head of Psychology",
      date: "March 20, 2025",
      image: "/placeholder.svg",
      category: "Mental Health"
    }
  ];

  return (
    <PageLayout 
      title="Ruvo Blog" 
      description="Insights on emotional AI, mental wellbeing, and the technology that brings them together."
    >
      <div className="space-y-12">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogPosts.map((post, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="h-48 bg-gray-100">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover" 
                />
              </div>
              <CardContent className="pt-6">
                <Badge variant="secondary" className="mb-3">
                  {post.category}
                </Badge>
                <h3 className="text-xl font-semibold mb-2">
                  <Link to="#" className="hover:text-ruvo-500 transition-colors">
                    {post.title}
                  </Link>
                </h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage src="/placeholder.svg" alt={post.author} />
                    <AvatarFallback>{post.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-sm">{post.author}</p>
                    <p className="text-xs text-gray-500">{post.date}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link to="#" className="text-ruvo-500 hover:underline text-sm font-medium">
                  Read more →
                </Link>
              </CardFooter>
            </Card>
          ))}
        </section>

        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Categories</h2>
            <Link to="#" className="text-ruvo-500 hover:underline">View all</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["AI Research", "Product Insights", "Mental Health", "Technology", "User Stories", "Company News", "Tips & Guides", "Industry Trends"].map((category, index) => (
              <Link to="#" key={index}>
                <div className="bg-gray-50 hover:bg-ruvo-50 border border-gray-100 rounded-lg p-4 text-center transition-colors">
                  {category}
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default Blog;
