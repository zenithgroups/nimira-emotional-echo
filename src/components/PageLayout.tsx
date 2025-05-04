
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
          <div className="flex items-center gap-3 mb-6">
            <img 
              src="/lovable-uploads/aa075d0b-00d3-4c46-a600-501aec587b42.png" 
              alt="Ruvo Logo" 
              className="h-10 w-auto" 
            />
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-pixel tracking-tight text-gradient">{title}</h1>
          </div>
          {description && <p className="text-lg text-gray-600 mb-8">{description}</p>}
        </div>
        <div className="mt-8">{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default PageLayout;
