
import React from "react";
import PageLayout from "@/components/PageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { MessageSquare, Mail, Phone } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Contact = () => {
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent",
      description: "We've received your message and will respond shortly.",
    });
  };

  return (
    <PageLayout 
      title="Contact Us" 
      description="We're here to help. Reach out with any questions, feedback, or support needs."
    >
      <div className="space-y-12">
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-ruvo-100 rounded-full flex items-center justify-center text-ruvo-500 mb-4">
                <MessageSquare size={24} />
              </div>
              <h3 className="font-semibold mb-2">Chat Support</h3>
              <p className="text-gray-600 text-sm mb-4">
                Chat with our support team in real-time during business hours.
              </p>
              <Button variant="outline" className="w-full">
                Start Chat
              </Button>
              <div className="text-xs text-gray-500 mt-3">
                Available 9AM-6PM ET, Monday-Friday
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-ruvo-100 rounded-full flex items-center justify-center text-ruvo-500 mb-4">
                <Mail size={24} />
              </div>
              <h3 className="font-semibold mb-2">Email Support</h3>
              <p className="text-gray-600 text-sm mb-4">
                Send us an email and we'll get back to you within 24 hours.
              </p>
              <a 
                href="mailto:support@ruvo.ai" 
                className="text-ruvo-500 hover:underline font-medium"
              >
                support@ruvo.ai
              </a>
              <div className="text-xs text-gray-500 mt-3">
                For general inquiries and support
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-ruvo-100 rounded-full flex items-center justify-center text-ruvo-500 mb-4">
                <Phone size={24} />
              </div>
              <h3 className="font-semibold mb-2">Phone Support</h3>
              <p className="text-gray-600 text-sm mb-4">
                For premium users, get direct phone support from our team.
              </p>
              <div className="text-ruvo-500 font-medium">
                +1 (555) 123-4567
              </div>
              <div className="text-xs text-gray-500 mt-3">
                Premium users only, 9AM-5PM ET
              </div>
            </CardContent>
          </Card>
        </section>

        <section>
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="Your name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Your email address" required />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Inquiry</SelectItem>
                      <SelectItem value="support">Technical Support</SelectItem>
                      <SelectItem value="billing">Billing Question</SelectItem>
                      <SelectItem value="feedback">Feedback</SelectItem>
                      <SelectItem value="partnership">Partnership Opportunity</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" placeholder="How can we help you?" rows={5} required />
                </div>
                
                <Button type="submit" className="w-full">Send Message</Button>
              </form>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                q: "How quickly will I receive a response?",
                a: "We aim to respond to all inquiries within 24 hours during business days."
              },
              {
                q: "Is phone support available for all users?",
                a: "Phone support is currently available only for premium subscription users."
              },
              {
                q: "How do I report a bug?",
                a: "You can report bugs through this contact form by selecting 'Technical Support' as the subject."
              },
              {
                q: "Can I request a feature?",
                a: "Yes! We love hearing your ideas. Please use the 'Feedback' subject when submitting feature requests."
              }
            ].map((faq, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-1">{faq.q}</h3>
                  <p className="text-sm text-gray-600">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default Contact;
