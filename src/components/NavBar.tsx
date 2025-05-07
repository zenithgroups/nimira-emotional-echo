
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NavBar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const scrollToSection = (id: string) => {
    closeMenu();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container-custom flex h-14 sm:h-16 items-center justify-between">
        <div className="flex items-center">
          <Link 
            to="/" 
            className="flex items-center hover:opacity-90 transition-opacity"
            onClick={() => closeMenu()}
          >
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-ruvo-400 to-ruvo-500 flex items-center justify-center overflow-hidden">
              <img 
                src="/lovable-uploads/aa075d0b-00d3-4c46-a600-501aec587b42.png" 
                alt="Ruvo Logo" 
                className="h-full w-full object-contain p-1" 
              />
            </div>
            <span className="text-xl sm:text-2xl font-bold text-ruvo-500 hover:text-ruvo-400 transition-colors ml-2">Ruvo</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <button 
            onClick={() => scrollToSection("home")} 
            className="text-sm font-medium text-gray-600 hover:text-ruvo-500 transition-colors"
          >
            Home
          </button>
          <button 
            onClick={() => scrollToSection("about")} 
            className="text-sm font-medium text-gray-600 hover:text-ruvo-500 transition-colors"
          >
            About
          </button>
          <button 
            onClick={() => scrollToSection("features")} 
            className="text-sm font-medium text-gray-600 hover:text-ruvo-500 transition-colors"
          >
            Features
          </button>
          <button 
            onClick={() => scrollToSection("how-it-works")} 
            className="text-sm font-medium text-gray-600 hover:text-ruvo-500 transition-colors"
          >
            How It Works
          </button>
          <Link to="/contact">
            <Button variant="outline" size="sm" className="ml-2">
              Contact Us
            </Button>
          </Link>
          <Button size="sm" className="bg-ruvo-500 hover:bg-ruvo-600 text-white">
            Get Started
          </Button>
        </nav>

        <div className="md:hidden">
          <button 
            onClick={toggleMenu}
            className="p-2 rounded-md text-gray-500 hover:text-ruvo-500 hover:bg-gray-100 focus:outline-none"
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="container-custom py-4 space-y-2">
            <button 
              onClick={() => scrollToSection("home")} 
              className="block w-full text-left px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-ruvo-500"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection("about")} 
              className="block w-full text-left px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-ruvo-500"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection("features")} 
              className="block w-full text-left px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-ruvo-500"
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection("how-it-works")} 
              className="block w-full text-left px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-ruvo-500"
            >
              How It Works
            </button>
            <Link 
              to="/contact" 
              className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-ruvo-500"
              onClick={closeMenu}
            >
              Contact Us
            </Link>
            <Button 
              className="w-full bg-ruvo-500 hover:bg-ruvo-600 text-white mt-2 text-sm" 
              onClick={closeMenu}
              size="sm"
            >
              Get Started
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default NavBar;
