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
    const isDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setDarkMode(isDarkMode);

    // Add listener for changes in color scheme preference
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      setDarkMode(e.matches);
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
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
        behavior: "smooth",
      });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl border-b border-white/10 bg-black/95 transition-all duration-300">
      <div className="container px-4 w-full px-4 sm:px-8 flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link
            to="/"
            className="flex items-center hover:opacity-80 transition-all duration-300 group"
            onClick={() => closeMenu()}
          >
            <div className="w-10 h-10 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300">
              <img
                src="/lovable-uploads/aa075d0b-00d3-4c46-a600-501aec587b42.png"
                alt="EMVO Logo"
                className={cn(
                  "h-8 w-auto transition-all duration-300",
                  darkMode ? "brightness-0 invert" : "brightness-0"
                )}
              />
            </div>
            <span className="text-2xl font-bold text-white transition-all duration-300">
              EMVO
            </span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <button
            onClick={() => scrollToSection("home")}
            className="text-sm font-medium text-gray-300 hover:text-blue-300 transition-all duration-300 hover:scale-105"
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection("about")}
            className="text-sm font-medium text-gray-300 hover:text-blue-300 transition-all duration-300 hover:scale-105"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection("features")}
            className="text-sm font-medium text-gray-300 hover:text-blue-300 transition-all duration-300 hover:scale-105"
          >
            Features
          </button>
          <button
            onClick={() => scrollToSection("how-it-works")}
            className="text-sm font-medium text-gray-300 hover:text-blue-300 transition-all duration-300 hover:scale-105"
          >
            How It Works
          </button>
          <Link to="/contact">
            <Button
              variant="outline"
              size="sm"
              className="ml-2 border border-blue-400/30 text-gray-300 hover:bg-blue-500/20 hover:border-amber-400/50 hover:text-white transition-all duration-300 hover:scale-105"
            >
              Contact Us
            </Button>
          </Link>
          <Link to="/chat">
            <Button
              size="sm"
              className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 border-0"
            >
              Get Started
            </Button>
          </Link>
        </nav>

        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="p-2 rounded-md focus:outline-none transition-all duration-300 hover:scale-110 hover:bg-blue-800/50 text-gray-300"
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
        <div className="md:hidden border-t border-blue-400/20 backdrop-blur-xl bg-blue-950/95 transition-all duration-300">
          <div className="container-custom py-4 space-y-2">
            <button
              onClick={() => scrollToSection("home")}
              className="block w-full text-left px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-blue-800/50 hover:text-blue-300 transition-all duration-300"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="block w-full text-left px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-blue-800/50 hover:text-blue-300 transition-all duration-300"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("features")}
              className="block w-full text-left px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-blue-800/50 hover:text-blue-300 transition-all duration-300"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection("how-it-works")}
              className="block w-full text-left px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-blue-800/50 hover:text-blue-300 transition-all duration-300"
            >
              How It Works
            </button>
            <Link
              to="/contact"
              className="block px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-blue-800/50 hover:text-blue-300 transition-all duration-300"
              onClick={closeMenu}
            >
              Contact Us
            </Link>
            <Link to="/chat" onClick={closeMenu}>
              <Button
                className="w-full mt-2 text-sm bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-md transition-all duration-300"
                size="sm"
              >
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default NavBar;
