
import React from "react";
import PageLayout from "@/components/PageLayout";

const Terms = () => {
  return (
    <PageLayout 
      title="Terms of Service" 
      description="Please read these terms carefully before using Ruvo."
    >
      <div className="prose prose-gray max-w-4xl mx-auto">
        <p className="text-sm text-gray-500 mb-8">Last updated: April 13, 2025</p>
        
        <section className="mb-8">
          <h2>1. Introduction</h2>
          <p>
            Welcome to Ruvo. These Terms of Service ("Terms") govern your use of the Ruvo website, mobile applications, and services operated by Ruvo AI, Inc.
          </p>
          <p>
            By using our services, you agree to be bound by these Terms. If you disagree with any part of these terms, you may not access our services.
          </p>
        </section>
        
        <section className="mb-8">
          <h2>2. Using Our Services</h2>
          <p>
            You must follow any policies made available to you within the services. You may use our services only as permitted by law. We may suspend or stop providing our services to you if you do not comply with our terms or policies or if we are investigating suspected misconduct.
          </p>
          
          <h3>2.1 User Accounts</h3>
          <p>
            To access certain features of our services, you may be required to create a user account. You are responsible for safeguarding your account and for all activities that occur under your account.
          </p>
          
          <h3>2.2 Age Restrictions</h3>
          <p>
            You must be at least 13 years old to use our services. If you are under 18, you must have your parent or legal guardian's permission to use our services.
          </p>
        </section>
        
        <section className="mb-8">
          <h2>3. Privacy & Data Protection</h2>
          <p>
            Our privacy practices are outlined in our Privacy Policy, which explains how we collect, use, and protect your personal information.
          </p>
          <p>
            By using our services, you acknowledge and agree that we may process your information as described in our Privacy Policy.
          </p>
        </section>
        
        <section className="mb-8">
          <h2>4. Content & Intellectual Property</h2>
          <p>
            Our services and their contents, features, and functionality are owned by Ruvo AI, Inc. and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
          </p>
          <p>
            You retain ownership of any content you submit, post, or display on or through our services. By submitting content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, adapt, publish, translate, and distribute such content.
          </p>
        </section>
        
        <section className="mb-8">
          <h2>5. Subscriptions & Payments</h2>
          <p>
            Some of our services may require payment. By subscribing to a paid service, you agree to pay all fees associated with the subscription plan you choose.
          </p>
          <p>
            We may change our fees at any time. We'll notify you of any fee changes before they become effective. Your continued use of our services after the fee change becomes effective constitutes your agreement to pay the modified fees.
          </p>
        </section>
        
        <section className="mb-8">
          <h2>6. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by applicable law, Ruvo AI, Inc. and its affiliates, officers, employees, agents, partners, and licensors will not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
          </p>
        </section>
        
        <section className="mb-8">
          <h2>7. Changes to These Terms</h2>
          <p>
            We may modify these Terms at any time by posting the modified terms on our website. Your continued use of our services after any modifications indicates your acceptance of the modified Terms.
          </p>
        </section>
        
        <section className="mb-8">
          <h2>8. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of the United States of America and the State of California, without regard to its conflict of law provisions.
          </p>
        </section>
        
        <section className="mb-8">
          <h2>9. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at <a href="mailto:legal@ruvo.ai" className="text-ruvo-500">legal@ruvo.ai</a>.
          </p>
        </section>
      </div>
    </PageLayout>
  );
};

export default Terms;
