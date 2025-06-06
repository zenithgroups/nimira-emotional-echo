import React, { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NavBar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState<boolean>(false);

  // Effect to detect system color scheme preference
  useEffect(() => {
    // Check if user prefers dark mode
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(isDarkMode);

    // Add listener for changes in color scheme preference
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setDarkMode(e.matches);
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);
  
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
      element.scrollIntoView({
        behavior: "smooth"
      });
    }
  };

  return (
    <header className={cn(
      "sticky top-0 z-40 w-full backdrop-blur-md border-b transition-all duration-300",
      darkMode 
        ? "bg-slate-900/95 border-slate-700/40" 
        : "bg-white/95 border-ruvo-200/30 shadow-sm"
    )}>
      <div className="container px-4 mx-auto max-w-7xl flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center hover:opacity-90 transition-opacity" onClick={() => closeMenu()}>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-ruvo-400 to-ruvo-500 flex items-center justify-center mr-3 shadow-md">
              <img 
                src="/lovable-uploads/aa075d0b-00d3-4c46-a600-501aec587b42.png" 
                alt="Ruvo Logo" 
                className="h-5 w-auto filter brightness-0 invert" 
              />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-ruvo-500 to-ruvo-400 bg-clip-text text-transparent">
              Ruvo
            </span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <button 
            onClick={() => scrollToSection("home")} 
            className="text-sm font-medium transition-all duration-300 text-slate-700 hover:text-ruvo-500 hover:scale-105"
          >
            Home
          </button>
          <button 
            onClick={() => scrollToSection("about")} 
            className="text-sm font-medium transition-all duration-300 text-slate-700 hover:text-ruvo-500 hover:scale-105"
          >
            About
          </button>
          <button 
            onClick={() => scrollToSection("features")} 
            className="text-sm font-medium transition-all duration-300 text-slate-700 hover:text-ruvo-500 hover:scale-105"
          >
            Features
          </button>
          <button 
            onClick={() => scrollToSection("how-it-works")} 
            className="text-sm font-medium transition-all duration-300 text-slate-700 hover:text-ruvo-500 hover:scale-105"
          >
            How It Works
          </button>
          <Link to="/contact">
            <Button variant="outline" size="sm" className="ml-2 border-ruvo-300 text-ruvo-600 hover:bg-ruvo-50 hover:border-ruvo-400 transition-all duration-300">
              Contact Us
            </Button>
          </Link>
          <Button size="sm" className="bg-gradient-to-r from-ruvo-500 to-ruvo-400 hover:from-ruvo-600 hover:to-ruvo-500 text-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
            Get Started
          </Button>
        </nav>

        <div className="md:hidden">
          <button 
            onClick={toggleMenu} 
            className="p-2 rounded-md hover:bg-ruvo-50 focus:outline-none text-slate-700 transition-colors duration-300"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className={cn(
          "md:hidden border-t backdrop-blur-md transition-all duration-300",
          darkMode 
            ? "bg-slate-900/95 border-slate-800" 
            : "bg-white/95 border-ruvo-200/30"
        )}>
          <div className="container-custom py-4 space-y-2">
            <button 
              onClick={() => scrollToSection("home")} 
              className="block w-full text-left px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:bg-ruvo-50 hover:text-ruvo-500 transition-all duration-300"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection("about")} 
              className="block w-full text-left px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:bg-ruvo-50 hover:text-ruvo-500 transition-all duration-300"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection("features")} 
              className="block w-full text-left px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:bg-ruvo-50 hover:text-ruvo-500 transition-all duration-300"
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection("how-it-works")} 
              className="block w-full text-left px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:bg-ruvo-50 hover:text-ruvo-500 transition-all duration-300"
            >
              How It Works
            </button>
            <Link 
              to="/contact" 
              className="block px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:bg-ruvo-50 hover:text-ruvo-500 transition-all duration-300" 
              onClick={closeMenu}
            >
              Contact Us
            </Link>
            <Button 
              className="w-full mt-2 text-sm bg-gradient-to-r from-ruvo-500 to-ruvo-400 hover:from-ruvo-600 hover:to-ruvo-500 text-white shadow-md transition-all duration-300" 
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
