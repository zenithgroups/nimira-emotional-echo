
import React from "react";
import PageLayout from "@/components/PageLayout";

const DataProcessing = () => {
  return (
    <PageLayout 
      title="Data Processing Agreement" 
      description="Information about how we process and handle data."
    >
      <div className="prose prose-gray max-w-4xl mx-auto">
        <p className="text-sm text-gray-500 mb-8">Last updated: April 13, 2025</p>
        
        <section className="mb-8">
          <h2>1. Introduction</h2>
          <p>
            This Data Processing Agreement ("DPA") forms part of the Terms of Service between you and Ruvo AI, Inc. ("we", "us", "our") governing your use of the Ruvo AI services ("Service"). This DPA reflects our commitment to protect your personal data in accordance with applicable privacy laws, including the General Data Protection Regulation (GDPR).
          </p>
        </section>
        
        <section className="mb-8">
          <h2>2. Definitions</h2>
          <p>
            In this DPA, the following terms shall have the meanings set out below:
          </p>
          <ul>
            <li><strong>Personal Data</strong>: any information relating to an identified or identifiable natural person.</li>
            <li><strong>Processing</strong>: any operation performed on Personal Data, such as collection, recording, organization, structuring, storage, adaptation, retrieval, use, disclosure, dissemination, or otherwise making available.</li>
            <li><strong>Data Controller</strong>: the entity which determines the purposes and means of the Processing of Personal Data.</li>
            <li><strong>Data Processor</strong>: the entity which Processes Personal Data on behalf of the Data Controller.</li>
            <li><strong>Data Subject</strong>: the individual to whom Personal Data relates.</li>
          </ul>
        </section>
        
        <section className="mb-8">
          <h2>3. Processing of Personal Data</h2>
          
          <h3>3.1 Roles of the Parties</h3>
          <p>
            For the purposes of this DPA, you are the Data Controller and we are the Data Processor. We will only Process Personal Data on your behalf and in accordance with your documented instructions.
          </p>
          
          <h3>3.2 Details of Processing</h3>
          <p>
            We will Process Personal Data as necessary to provide the Service, as further specified in the Terms of Service and this DPA.
          </p>
          <p>
            The Processing will include the following operations:
          </p>
          <ul>
            <li>Collecting and storing user account information</li>
            <li>Processing conversation data to provide AI responses</li>
            <li>Analyzing usage patterns to improve the Service</li>
            <li>Generating insights and recommendations based on user interactions</li>
          </ul>
          
          <h3>3.3 Duration of Processing</h3>
          <p>
            We will Process Personal Data for the duration of the Service provision, unless otherwise agreed in writing.
          </p>
        </section>
        
        <section className="mb-8">
          <h2>4. Our Obligations</h2>
          <p>
            We shall:
          </p>
          <ul>
            <li>Process Personal Data only on your documented instructions</li>
            <li>Ensure that persons authorized to Process the Personal Data have committed themselves to confidentiality</li>
            <li>Implement appropriate technical and organizational measures to ensure a level of security appropriate to the risk</li>
            <li>Assist you, as Data Controller, in responding to requests from Data Subjects</li>
            <li>Assist you in ensuring compliance with obligations under applicable data protection laws</li>
            <li>Delete or return all Personal Data to you after the end of the provision of services</li>
            <li>Make available to you all information necessary to demonstrate compliance with this DPA</li>
          </ul>
        </section>
        
        <section className="mb-8">
          <h2>5. Subprocessors</h2>
          <p>
            We may use subprocessors to Process Personal Data as part of providing the Service. We will ensure that any subprocessor we engage will provide at least the same level of data protection as set out in this DPA.
          </p>
          <p>
            We will inform you of any intended changes concerning the addition or replacement of subprocessors, giving you the opportunity to object to such changes.
          </p>
        </section>
        
        <section className="mb-8">
          <h2>6. International Data Transfers</h2>
          <p>
            We may transfer Personal Data to countries outside the European Economic Area (EEA) only if adequate safeguards are in place, such as Standard Contractual Clauses approved by the European Commission, Binding Corporate Rules, or other legally recognized mechanisms for ensuring adequate protection.
          </p>
        </section>
        
        <section className="mb-8">
          <h2>7. Data Subject Rights</h2>
          <p>
            We will assist you in fulfilling your obligation to respond to requests by Data Subjects to exercise their rights under applicable data protection laws, including rights of access, rectification, erasure, data portability, and objection to Processing.
          </p>
        </section>
        
        <section className="mb-8">
          <h2>8. Data Breach Notification</h2>
          <p>
            We will notify you without undue delay after becoming aware of a personal data breach affecting the Personal Data Processed under this DPA. The notification will include information required under applicable data protection laws to help you fulfill any reporting obligations.
          </p>
        </section>
        
        <section className="mb-8">
          <h2>9. Changes to This DPA</h2>
          <p>
            We may update this DPA from time to time to reflect changes in our practices or applicable laws. We will provide notice of any material changes to this DPA.
          </p>
        </section>
        
        <section className="mb-8">
          <h2>10. Contact Us</h2>
          <p>
            If you have any questions about this DPA, please contact our Data Protection Officer at <a href="mailto:dpo@ruvo.ai" className="text-ruvo-500">dpo@ruvo.ai</a>.
          </p>
        </section>
      </div>
    </PageLayout>
  );
};

export default DataProcessing;
