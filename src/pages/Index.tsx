
import React, { useEffect } from "react";
import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import ProductFeaturesSection from "@/components/ProductFeaturesSection";
import BetaSignupSection from "@/components/BetaSignupSection";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";

const Index = () => {
  // Add a refresh effect to ensure the latest version is loaded
  useEffect(() => {
    const timestamp = new Date().getTime();
    console.log(`Page loaded at timestamp: ${timestamp}`);
    
    // Force reload if there's a version mismatch
    const currentVersion = timestamp;
    const storedVersion = localStorage.getItem('appVersion');
    
    if (!storedVersion || parseInt(storedVersion) < currentVersion - 3600000) { // 1 hour difference
      localStorage.setItem('appVersion', currentVersion.toString());
      // Add a small delay to see the console log before refresh
      setTimeout(() => {
        console.log('Refreshing to get latest version...');
        window.location.reload();
      }, 500);
    } else {
      localStorage.setItem('appVersion', currentVersion.toString());
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <HeroSection />
      <HowItWorksSection />
      <ProductFeaturesSection />
      <BetaSignupSection />
      <AboutSection />
      <Footer />
    </div>
  );
};

export default Index;
