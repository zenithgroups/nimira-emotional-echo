
import React, { ReactNode } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

interface PageLayoutProps {
  children: ReactNode;
  title: string;
  description?: string;
}

const PageLayout: React.FC<PageLayoutProps> = ({ 
  children, 
  title, 
  description 
}) => {
  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <div className="container-custom py-12 md:py-20">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gradient">{title}</h1>
          {description && <p className="text-lg text-gray-600 mb-8">{description}</p>}
        </div>
        <div className="mt-8">{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default PageLayout;
