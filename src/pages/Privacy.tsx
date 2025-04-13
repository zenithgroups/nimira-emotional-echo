
import React from "react";
import PageLayout from "@/components/PageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Shield, Lock, Eye } from "lucide-react";

const Privacy = () => {
  return (
    <PageLayout 
      title="Privacy Center" 
      description="Learn about how we protect your data and respect your privacy."
    >
      <div className="space-y-12">
        <section>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <Shield className="h-12 w-12 text-ruvo-500 mb-4" />
                  <h3 className="font-semibold text-lg mb-2">Your Data is Protected</h3>
                  <p className="text-gray-600 text-sm">
                    We use industry-standard encryption and security practices to keep your conversations and personal information safe.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <Lock className="h-12 w-12 text-ruvo-500 mb-4" />
                  <h3 className="font-semibold text-lg mb-2">You Own Your Data</h3>
                  <p className="text-gray-600 text-sm">
                    Your conversations and data belong to you. You can export or delete your data at any time from your account settings.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <Eye className="h-12 w-12 text-ruvo-500 mb-4" />
                  <h3 className="font-semibold text-lg mb-2">Transparency</h3>
                  <p className="text-gray-600 text-sm">
                    We're clear about what data we collect, how we use it, and who has access to it. No surprises.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <div className="bg-ruvo-50 p-8 rounded-2xl">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold mb-4">Privacy Documents</h2>
              <p className="text-gray-600 mb-6">
                We've created detailed documents that explain our privacy practices, cookie usage, and data processing procedures.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Button variant="outline" asChild className="justify-start bg-white">
                  <Link to="/privacy-policy">
                    Privacy Policy
                  </Link>
                </Button>
                
                <Button variant="outline" asChild className="justify-start bg-white">
                  <Link to="/cookies">
                    Cookie Policy
                  </Link>
                </Button>
                
                <Button variant="outline" asChild className="justify-start bg-white">
                  <Link to="/data-processing">
                    Data Processing
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">Privacy FAQs</h2>
          <div className="grid grid-cols-1 gap-4">
            {[
              {
                q: "How is my conversation data stored?",
                a: "Your conversations are encrypted and stored securely on our servers. You can delete individual messages or your entire conversation history at any time."
              },
              {
                q: "Does Ruvo share my data with third parties?",
                a: "We do not sell your data to third parties. We may share limited data with service providers who help us operate our platform, but they're bound by strict confidentiality agreements."
              },
              {
                q: "How long do you keep my data?",
                a: "We keep your data for as long as you have an account with us. You can delete your data at any time, and if you delete your account, we'll remove your personal data from our systems."
              },
              {
                q: "How does Ruvo use my data?",
                a: "We use your data to provide and improve our services. This includes training our AI models to better understand and respond to user needs, but always in a way that protects your privacy."
              },
              {
                q: "Is Ruvo GDPR compliant?",
                a: "Yes, Ruvo complies with GDPR regulations. We provide tools for data access, portability, and deletion to respect your rights under GDPR."
              }
            ].map((faq, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2">{faq.q}</h3>
                  <p className="text-gray-600">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="text-center">
          <h2 className="text-2xl font-bold mb-4">Have More Questions About Privacy?</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            We take your privacy seriously and are happy to answer any questions you may have about how we handle your data.
          </p>
          <Button asChild>
            <Link to="/contact">Contact Our Privacy Team</Link>
          </Button>
        </section>
      </div>
    </PageLayout>
  );
};

export default Privacy;
