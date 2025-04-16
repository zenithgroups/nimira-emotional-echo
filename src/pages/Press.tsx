import React from "react";
import PageLayout from "@/components/PageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
const Press = () => {
  const pressReleases = [{
    title: "Ruvo Launches AI Companion with Premium Voice Technology",
    date: "April 12, 2025",
    excerpt: "Ruvo announces the launch of its emotional AI companion, featuring advanced natural language processing and premium voice technology."
  }, {
    title: "Ruvo Secures $5M in Seed Funding to Advance Emotional AI",
    date: "March 5, 2025",
    excerpt: "Leading venture capital firms invest in Ruvo's mission to create AI companions that understand human emotions."
  }, {
    title: "Ruvo Partners with Mental Health Professionals to Enhance AI Support",
    date: "February 20, 2025",
    excerpt: "New partnership brings psychological expertise to Ruvo's AI companion development."
  }];
  const mediaFeatures = [{
    source: "Tech Innovators",
    title: "The Top AI Startups to Watch in 2025",
    date: "April 8, 2025",
    logo: "/placeholder.svg"
  }, {
    source: "Future of AI Journal",
    title: "How Ruvo is Redefining Emotional Intelligence in AI",
    date: "March 15, 2025",
    logo: "/placeholder.svg"
  }, {
    source: "Digital Wellness Magazine",
    title: "AI Companions: The Next Frontier in Mental Health Support",
    date: "February 25, 2025",
    logo: "/placeholder.svg"
  }, {
    source: "Tech Today",
    title: "Interview with Ruvo Founder: The Vision Behind Emotional AI",
    date: "February 10, 2025",
    logo: "/placeholder.svg"
  }];
  return <PageLayout title="Press & Media" description="The latest news, press releases, and media coverage about Ruvo.">
      <div className="space-y-12">
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Press Releases</h2>
            <Button variant="outline">Media Kit</Button>
          </div>
          
          <div className="space-y-6">
            {pressReleases.map((release, index) => <Card key={index}>
                <CardContent className="p-6">
                  <div className="text-sm text-gray-500 mb-2">{release.date}</div>
                  <h3 className="text-xl font-semibold mb-2">{release.title}</h3>
                  <p className="text-gray-600 mb-4">{release.excerpt}</p>
                  <Link to="#" className="text-ruvo-500 hover:underline font-medium">
                    Read full release →
                  </Link>
                </CardContent>
              </Card>)}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">Media Coverage</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mediaFeatures.map((feature, index) => <Card key={index} className="flex overflow-hidden">
                <div className="w-1/3 bg-gray-100 flex items-center justify-center p-4">
                  <img src={feature.logo} alt={feature.source} className="max-h-16 max-w-full" />
                </div>
                <CardContent className="w-2/3 p-4">
                  <div className="text-sm font-medium mb-1">{feature.source}</div>
                  <h3 className="font-semibold mb-1 line-clamp-2">{feature.title}</h3>
                  <div className="text-xs text-gray-500">{feature.date}</div>
                </CardContent>
              </Card>)}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">Media Inquiries</h2>
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">Press Contact</h3>
                  <p className="text-gray-600">
                    For press inquiries, please contact our media relations team:
                  </p>
                  <p className="mt-2">
                    <strong></strong> <a href="mailto:press@ruvo.ai" className="text-ruvo-500 hover:underline">press@ruvo.ai</a>
                  </p>
                  <p>
                    <strong>Phone:</strong> +1 (555) 123-4567
                  </p>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">Brand Assets</h3>
                  <p className="text-gray-600 mb-4">
                    Download our latest logos, product screenshots, and brand guidelines.
                  </p>
                  <Button>Download Media Kit</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </PageLayout>;
};
export default Press;