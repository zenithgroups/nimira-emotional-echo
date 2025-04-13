
import React from "react";
import PageLayout from "@/components/PageLayout";

const PrivacyPolicy = () => {
  return (
    <PageLayout 
      title="Privacy Policy" 
      description="Learn how we collect, use, and protect your personal information."
    >
      <div className="prose prose-gray max-w-4xl mx-auto">
        <p className="text-sm text-gray-500 mb-8">Last updated: April 13, 2025</p>
        
        <section className="mb-8">
          <h2>1. Introduction</h2>
          <p>
            At Ruvo, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website, mobile application, and services.
          </p>
          <p>
            Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy, please do not access our services.
          </p>
        </section>
        
        <section className="mb-8">
          <h2>2. Information We Collect</h2>
          
          <h3>2.1 Personal Information</h3>
          <p>
            We may collect personal information that you voluntarily provide to us when you register for our services, express interest in obtaining information about us or our products, or otherwise contact us. This information may include:
          </p>
          <ul>
            <li>Name and contact information</li>
            <li>Account credentials</li>
            <li>Payment information</li>
            <li>Correspondence with us</li>
          </ul>
          
          <h3>2.2 Conversation Data</h3>
          <p>
            When you interact with Ruvo, we collect and store the content of your conversations to provide and improve our services. This includes:
          </p>
          <ul>
            <li>Text messages you send to Ruvo</li>
            <li>Voice recordings (if you use voice features)</li>
            <li>Information about your emotional states and preferences you share</li>
          </ul>
          
          <h3>2.3 Automatically Collected Information</h3>
          <p>
            When you access our services, we may automatically collect certain information, including:
          </p>
          <ul>
            <li>Device information (type, operating system, browser)</li>
            <li>IP address and location information</li>
            <li>Usage data and interaction patterns</li>
            <li>Cookies and similar technologies</li>
          </ul>
        </section>
        
        <section className="mb-8">
          <h2>3. How We Use Your Information</h2>
          <p>
            We use your information for various purposes, including:
          </p>
          <ul>
            <li>Providing and maintaining our services</li>
            <li>Personalizing your experience with Ruvo</li>
            <li>Improving our AI models and algorithms</li>
            <li>Processing transactions and managing your account</li>
            <li>Communicating with you about updates and offers</li>
            <li>Enforcing our terms, conditions, and policies</li>
            <li>Protecting our services from abuse and illegal activities</li>
          </ul>
        </section>
        
        <section className="mb-8">
          <h2>4. Sharing Your Information</h2>
          <p>
            We may share your information with:
          </p>
          <ul>
            <li>Service providers who help us operate our business</li>
            <li>Business partners with your consent</li>
            <li>Legal authorities when required by law</li>
            <li>Other parties in connection with a corporate transaction</li>
          </ul>
          <p>
            <strong>We do not sell your personal information to third parties.</strong>
          </p>
        </section>
        
        <section className="mb-8">
          <h2>5. Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your information from unauthorized access, disclosure, alteration, and destruction. However, no method of transmission over the Internet or electronic storage is 100% secure.
          </p>
        </section>
        
        <section className="mb-8">
          <h2>6. Your Privacy Rights</h2>
          <p>
            Depending on your location, you may have certain rights regarding your personal information, including:
          </p>
          <ul>
            <li>Access to your personal information</li>
            <li>Correction of inaccurate information</li>
            <li>Deletion of your personal information</li>
            <li>Restriction or objection to processing</li>
            <li>Data portability</li>
            <li>Withdrawal of consent</li>
          </ul>
          <p>
            To exercise these rights, please contact us using the information provided below.
          </p>
        </section>
        
        <section className="mb-8">
          <h2>7. Children's Privacy</h2>
          <p>
            Our services are not intended for individuals under the age of 13. We do not knowingly collect personal information from children under 13. If we learn that we have collected personal information from a child under 13, we will promptly delete that information.
          </p>
        </section>
        
        <section className="mb-8">
          <h2>8. Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
          </p>
        </section>
        
        <section className="mb-8">
          <h2>9. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at <a href="mailto:privacy@ruvo.ai" className="text-ruvo-500">privacy@ruvo.ai</a>.
          </p>
        </section>
      </div>
    </PageLayout>
  );
};

export default PrivacyPolicy;
