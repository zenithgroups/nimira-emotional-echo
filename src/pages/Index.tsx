
import React from "react";
import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import ProductFeaturesSection from "@/components/ProductFeaturesSection";
import BetaSignupSection from "@/components/BetaSignupSection";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";

const Index = () => {
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
