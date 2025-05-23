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
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className={cn(
      "sticky top-0 z-40 w-full border-b backdrop-blur supports-[backdrop-filter]:bg-background/60",
      darkMode ? "border-slate-700/40 bg-slate-900/95" : "border-border/40 bg-white/60"
    )}>
      <div className="container px-4 mx-auto max-w-7xl flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link 
            to="/" 
            className="flex items-center hover:opacity-90 transition-opacity"
            onClick={() => closeMenu()}
          >
            <img 
              src="/lovable-uploads/aa075d0b-00d3-4c46-a600-501aec587b42.png" 
              alt="Ruvo Logo" 
              className={darkMode ? "h-8 w-auto invert" : "h-8 w-auto"} 
            />
            <span className={cn(
              "text-xl sm:text-2xl font-bold transition-colors ml-2",
              darkMode ? "text-white" : "text-ruvo-500"
            )}>
              Ruvo
            </span>
          </Link>
        </div>

        <nav className={cn(
          "hidden md:flex items-center gap-6",
          "text-black"
        )}>
          <button 
            onClick={() => scrollToSection("home")} 
            className="text-sm font-medium transition-colors text-black hover:text-ruvo-500"
          >
            Home
          </button>
          <button 
            onClick={() => scrollToSection("about")} 
            className="text-sm font-medium transition-colors text-black hover:text-ruvo-500"
          >
            About
          </button>
          <button 
            onClick={() => scrollToSection("features")} 
            className="text-sm font-medium transition-colors text-black hover:text-ruvo-500"
          >
            Features
          </button>
          <button 
            onClick={() => scrollToSection("how-it-works")} 
            className="text-sm font-medium transition-colors text-black hover:text-ruvo-500"
          >
            How It Works
          </button>
          <Link to="/contact">
            <Button 
              variant="outline" 
              size="sm" 
              className="ml-2 border-gray-300 text-black"
            >
              Contact Us
            </Button>
          </Link>
          <Button 
            size="sm" 
            className="bg-ruvo-500 hover:bg-ruvo-600 text-white"
          >
            Get Started
          </Button>
        </nav>

        <div className="md:hidden">
          <button 
            onClick={toggleMenu}
            className="p-2 rounded-md hover:bg-gray-100 focus:outline-none text-black"
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
        <div className={cn(
          "md:hidden border-t",
          darkMode ? "bg-slate-900 border-slate-800" : "bg-white/80 backdrop-blur border-gray-200"
        )}>
          <div className="container-custom py-4 space-y-2">
            <button 
              onClick={() => scrollToSection("home")} 
              className={cn(
                "block w-full text-left px-3 py-2 rounded-md text-sm font-medium",
                darkMode ? 
                  "text-white hover:bg-gray-800 hover:text-white" : 
                  "text-black hover:bg-gray-200 hover:text-ruvo-500"
              )}
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection("about")} 
              className={cn(
                "block w-full text-left px-3 py-2 rounded-md text-sm font-medium",
                darkMode ? 
                  "text-white hover:bg-gray-800 hover:text-white" : 
                  "text-black hover:bg-gray-200 hover:text-ruvo-500"
              )}
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection("features")} 
              className={cn(
                "block w-full text-left px-3 py-2 rounded-md text-sm font-medium",
                darkMode ? 
                  "text-white hover:bg-gray-800 hover:text-white" : 
                  "text-black hover:bg-gray-200 hover:text-ruvo-500"
              )}
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection("how-it-works")} 
              className={cn(
                "block w-full text-left px-3 py-2 rounded-md text-sm font-medium",
                darkMode ? 
                  "text-white hover:bg-gray-800 hover:text-white" : 
                  "text-black hover:bg-gray-200 hover:text-ruvo-500"
              )}
            >
              How It Works
            </button>
            <Link 
              to="/contact" 
              className={cn(
                "block px-3 py-2 rounded-md text-sm font-medium",
                darkMode ? 
                  "text-white hover:bg-gray-800 hover:text-white" : 
                  "text-black hover:bg-gray-200 hover:text-ruvo-500"
              )}
              onClick={closeMenu}
            >
              Contact Us
            </Link>
            <Button 
              className={cn(
                "w-full mt-2 text-sm text-white",
                darkMode ? "bg-ruvo-400 hover:bg-ruvo-300" : "bg-ruvo-500 hover:bg-ruvo-600"
              )}
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
