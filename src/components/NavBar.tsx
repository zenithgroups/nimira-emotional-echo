
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
      "sticky top-0 z-50 w-full backdrop-blur-xl border-b transition-all duration-300",
      darkMode 
        ? "bg-slate-900/90 border-slate-700/50" 
        : "bg-white/90 border-slate-200/50 shadow-lg"
    )}>
      <div className="container px-4 mx-auto max-w-7xl flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center hover:opacity-80 transition-all duration-300 group" onClick={() => closeMenu()}>
            <div className="w-10 h-10 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300">
              <img 
                src="/lovable-uploads/aa075d0b-00d3-4c46-a600-501aec587b42.png" 
                alt="Ruvo Logo" 
                className={cn(
                  "h-8 w-auto transition-all duration-300",
                  darkMode ? "filter brightness-0 invert" : "filter brightness-0"
                )}
              />
            </div>
            <span className={cn(
              "text-2xl font-bold transition-all duration-300",
              darkMode ? "text-white" : "text-slate-900"
            )}>
              Ruvo
            </span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <button 
            onClick={() => scrollToSection("home")} 
            className={cn(
              "text-sm font-medium transition-all duration-300 hover:scale-105",
              darkMode ? "text-slate-300 hover:text-white" : "text-slate-700 hover:text-ruvo-600"
            )}
          >
            Home
          </button>
          <button 
            onClick={() => scrollToSection("about")} 
            className={cn(
              "text-sm font-medium transition-all duration-300 hover:scale-105",
              darkMode ? "text-slate-300 hover:text-white" : "text-slate-700 hover:text-ruvo-600"
            )}
          >
            About
          </button>
          <button 
            onClick={() => scrollToSection("features")} 
            className={cn(
              "text-sm font-medium transition-all duration-300 hover:scale-105",
              darkMode ? "text-slate-300 hover:text-white" : "text-slate-700 hover:text-ruvo-600"
            )}
          >
            Features
          </button>
          <button 
            onClick={() => scrollToSection("how-it-works")} 
            className={cn(
              "text-sm font-medium transition-all duration-300 hover:scale-105",
              darkMode ? "text-slate-300 hover:text-white" : "text-slate-700 hover:text-ruvo-600"
            )}
          >
            How It Works
          </button>
          <Link to="/contact">
            <Button 
              variant="outline" 
              size="sm" 
              className={cn(
                "ml-2 border-2 transition-all duration-300 hover:scale-105",
                darkMode 
                  ? "border-slate-600 text-slate-300 hover:bg-slate-800 hover:border-slate-500"
                  : "border-ruvo-300 text-ruvo-600 hover:bg-ruvo-50 hover:border-ruvo-500"
              )}
            >
              Contact Us
            </Button>
          </Link>
          <Button 
            size="sm" 
            className="bg-gradient-to-r from-ruvo-600 to-purple-600 hover:from-ruvo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-0"
          >
            Get Started
          </Button>
        </nav>

        <div className="md:hidden">
          <button 
            onClick={toggleMenu} 
            className={cn(
              "p-2 rounded-md focus:outline-none transition-all duration-300 hover:scale-110",
              darkMode ? "hover:bg-slate-800 text-slate-300" : "hover:bg-ruvo-50 text-slate-700"
            )}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className={cn(
          "md:hidden border-t backdrop-blur-xl transition-all duration-300",
          darkMode 
            ? "bg-slate-900/90 border-slate-800" 
            : "bg-white/90 border-slate-200"
        )}>
          <div className="container-custom py-4 space-y-2">
            <button 
              onClick={() => scrollToSection("home")} 
              className={cn(
                "block w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-all duration-300",
                darkMode 
                  ? "text-slate-300 hover:bg-slate-800 hover:text-white"
                  : "text-slate-700 hover:bg-ruvo-50 hover:text-ruvo-600"
              )}
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection("about")} 
              className={cn(
                "block w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-all duration-300",
                darkMode 
                  ? "text-slate-300 hover:bg-slate-800 hover:text-white"
                  : "text-slate-700 hover:bg-ruvo-50 hover:text-ruvo-600"
              )}
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection("features")} 
              className={cn(
                "block w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-all duration-300",
                darkMode 
                  ? "text-slate-300 hover:bg-slate-800 hover:text-white"
                  : "text-slate-700 hover:bg-ruvo-50 hover:text-ruvo-600"
              )}
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection("how-it-works")} 
              className={cn(
                "block w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-all duration-300",
                darkMode 
                  ? "text-slate-300 hover:bg-slate-800 hover:text-white"
                  : "text-slate-700 hover:bg-ruvo-50 hover:text-ruvo-600"
              )}
            >
              How It Works
            </button>
            <Link 
              to="/contact" 
              className={cn(
                "block px-3 py-2 rounded-md text-sm font-medium transition-all duration-300",
                darkMode 
                  ? "text-slate-300 hover:bg-slate-800 hover:text-white"
                  : "text-slate-700 hover:bg-ruvo-50 hover:text-ruvo-600"
              )}
              onClick={closeMenu}
            >
              Contact Us
            </Link>
            <Button 
              className="w-full mt-2 text-sm bg-gradient-to-r from-ruvo-600 to-purple-600 hover:from-ruvo-700 hover:to-purple-700 text-white shadow-lg transition-all duration-300" 
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
