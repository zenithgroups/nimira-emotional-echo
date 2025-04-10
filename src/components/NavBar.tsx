
import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scrolling effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Handle navigation click to scroll to the section
  const navigateTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <header
      className={cn(
        "fixed w-full top-0 z-50 transition-all duration-300 py-4",
        scrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      )}
    >
      <nav className="container-custom flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <button 
            onClick={() => navigateTo("home")}
            className="text-2xl font-bold text-ruvo-500 hover:text-ruvo-400 transition-colors"
          >
            Ruvo
          </button>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-8">
          <li>
            <button
              onClick={() => navigateTo("home")}
              className="text-foreground hover:text-ruvo-400 transition-colors"
            >
              Home
            </button>
          </li>
          <li>
            <button
              onClick={() => navigateTo("features")}
              className="text-foreground hover:text-ruvo-400 transition-colors"
            >
              Features
            </button>
          </li>
          <li>
            <button
              onClick={() => navigateTo("about")}
              className="text-foreground hover:text-ruvo-400 transition-colors"
            >
              About
            </button>
          </li>
          <li>
            <button
              onClick={() => navigateTo("join-beta")}
              className="gradient-button"
            >
              Join Beta
            </button>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-foreground hover:text-ruvo-400 transition-colors"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white absolute top-full left-0 right-0 shadow-lg py-4 px-4 glass animate-fade-in">
          <ul className="space-y-4">
            <li>
              <button
                onClick={() => navigateTo("home")}
                className="block w-full text-left text-foreground hover:text-ruvo-400 transition-colors py-2"
              >
                Home
              </button>
            </li>
            <li>
              <button
                onClick={() => navigateTo("features")}
                className="block w-full text-left text-foreground hover:text-ruvo-400 transition-colors py-2"
              >
                Features
              </button>
            </li>
            <li>
              <button
                onClick={() => navigateTo("about")}
                className="block w-full text-left text-foreground hover:text-ruvo-400 transition-colors py-2"
              >
                About
              </button>
            </li>
            <li>
              <button
                onClick={() => navigateTo("join-beta")}
                className="gradient-button w-full"
              >
                Join Beta
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default NavBar;
