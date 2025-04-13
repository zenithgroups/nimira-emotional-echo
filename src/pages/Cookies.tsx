
import React from "react";
import PageLayout from "@/components/PageLayout";

const Cookies = () => {
  return (
    <PageLayout 
      title="Cookie Policy" 
      description="Learn how we use cookies and similar technologies."
    >
      <div className="prose prose-gray max-w-4xl mx-auto">
        <p className="text-sm text-gray-500 mb-8">Last updated: April 13, 2025</p>
        
        <section className="mb-8">
          <h2>1. Introduction</h2>
          <p>
            This Cookie Policy explains how Ruvo AI, Inc. ("we", "us", or "our") uses cookies and similar technologies to recognize you when you visit our website and use our services. It explains what these technologies are and why we use them, as well as your rights to control our use of them.
          </p>
        </section>
        
        <section className="mb-8">
          <h2>2. What Are Cookies?</h2>
          <p>
            Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners to make their websites work, or to work more efficiently, as well as to provide reporting information.
          </p>
          <p>
            Cookies set by the website owner (in this case, Ruvo AI, Inc.) are called "first-party cookies". Cookies set by parties other than the website owner are called "third-party cookies". Third-party cookies enable third-party features or functionality to be provided on or through the website (e.g., advertising, interactive content, and analytics).
          </p>
        </section>
        
        <section className="mb-8">
          <h2>3. Types of Cookies We Use</h2>
          
          <h3>3.1 Essential Cookies</h3>
          <p>
            These cookies are necessary for the website to function and cannot be switched off in our systems. They are usually only set in response to actions made by you which amount to a request for services, such as setting your privacy preferences, logging in, or filling in forms.
          </p>
          
          <h3>3.2 Performance Cookies</h3>
          <p>
            These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us to know which pages are the most and least popular and see how visitors move around the site.
          </p>
          
          <h3>3.3 Functional Cookies</h3>
          <p>
            These cookies enable the website to provide enhanced functionality and personalization. They may be set by us or by third-party providers whose services we have added to our pages.
          </p>
          
          <h3>3.4 Targeting Cookies</h3>
          <p>
            These cookies may be set through our site by our advertising partners. They may be used by those companies to build a profile of your interests and show you relevant advertisements on other sites.
          </p>
        </section>
        
        <section className="mb-8">
          <h2>4. How We Use Cookies</h2>
          <p>
            We use cookies for several reasons. Some cookies are required for technical reasons in order for our website to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies also enable us to track and target the interests of our users to enhance the experience on our website. Third parties may serve cookies through our website for advertising, analytics, and other purposes.
          </p>
        </section>
        
        <section className="mb-8">
          <h2>5. Your Choices Regarding Cookies</h2>
          <p>
            If you prefer to avoid the use of cookies on our website, you must first disable the use of cookies in your browser and then delete the cookies saved in your browser associated with this website. You may use this option for preventing the use of cookies at any time.
          </p>
          <p>
            If you do not accept our cookies, you may experience some inconvenience in your use of our website and some features may not function properly.
          </p>
        </section>
        
        <section className="mb-8">
          <h2>6. Changes to This Cookie Policy</h2>
          <p>
            We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal, or regulatory reasons. Please therefore revisit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.
          </p>
        </section>
        
        <section className="mb-8">
          <h2>7. Contact Us</h2>
          <p>
            If you have any questions about our use of cookies or other technologies, please contact us at <a href="mailto:privacy@ruvo.ai" className="text-ruvo-500">privacy@ruvo.ai</a>.
          </p>
        </section>
      </div>
    </PageLayout>
  );
};

export default Cookies;
