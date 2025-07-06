import React from "react";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { toast } = useToast();
  
  const handleSocialClick = (platform: string) => {
    if (platform === "Instagram") {
      window.open("https://www.instagram.com/ruvo.ai", "_blank");
    } else {
      toast({
        title: `${platform} coming soon`,
        description: `Follow us on ${platform} for updates about Ruvo.`,
      });
    }
  };
  
  const navigateTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  
  return (
    <footer className="relative overflow-hidden bg-black">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      
      <div className="relative z-10 py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="mb-6">
                <Link to="/" className="flex items-center group">
                  <div className="w-10 h-10 flex items-center justify-center mr-3 group-hover:scale-110 transition-all duration-300">
                    <img 
                      src="/lovable-uploads/aa075d0b-00d3-4c46-a600-501aec587b42.png" 
                      alt="Ruvo Logo" 
                      className="h-6 w-auto brightness-0 invert" 
                    />
                  </div>
                  <span className="text-2xl font-bold text-white group-hover:text-orange-300 transition-all duration-300">
                    Ruvo
                  </span>
                </Link>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Your emotional AI companion, designed to understand and support you with empathy and intelligence.
              </p>
              <div className="flex space-x-4">
                <button 
                  onClick={() => handleSocialClick("LinkedIn")}
                  className="p-3 rounded-xl bg-white/5 text-gray-400 hover:text-orange-400 hover:bg-white/10 border border-white/10 hover:border-orange-400/30 transition-all duration-300 hover:scale-110"
                  aria-label="LinkedIn"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </button>
                <button 
                  onClick={() => handleSocialClick("Twitter")}
                  className="p-3 rounded-xl bg-white/5 text-gray-400 hover:text-orange-400 hover:bg-white/10 border border-white/10 hover:border-orange-400/30 transition-all duration-300 hover:scale-110"
                  aria-label="Twitter"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </button>
                <button 
                  onClick={() => handleSocialClick("Instagram")}
                  className="p-3 rounded-xl bg-white/5 text-gray-400 hover:text-orange-400 hover:bg-white/10 border border-white/10 hover:border-orange-400/30 transition-all duration-300 hover:scale-110"
                  aria-label="Visit Ruvo on Instagram"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </button>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-6 text-white">Company</h4>
              <ul className="space-y-3">
                <li><Link to="/about" className="text-gray-400 hover:text-orange-400 transition-colors duration-300 hover:translate-x-1 inline-block">About Us</Link></li>
                <li><Link to="/careers" className="text-gray-400 hover:text-orange-400 transition-colors duration-300 hover:translate-x-1 inline-block">Careers</Link></li>
                <li><Link to="/blog" className="text-gray-400 hover:text-orange-400 transition-colors duration-300 hover:translate-x-1 inline-block">Blog</Link></li>
                <li><Link to="/press" className="text-gray-400 hover:text-orange-400 transition-colors duration-300 hover:translate-x-1 inline-block">Press</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-6 text-white">Support</h4>
              <ul className="space-y-3">
                <li><Link to="/help" className="text-gray-400 hover:text-orange-400 transition-colors duration-300 hover:translate-x-1 inline-block">Help Center</Link></li>
                <li><Link to="/faqs" className="text-gray-400 hover:text-orange-400 transition-colors duration-300 hover:translate-x-1 inline-block">FAQs</Link></li>
                <li><Link to="/contact" className="text-gray-400 hover:text-orange-400 transition-colors duration-300 hover:translate-x-1 inline-block">Contact Us</Link></li>
                <li><Link to="/privacy" className="text-gray-400 hover:text-orange-400 transition-colors duration-300 hover:translate-x-1 inline-block">Privacy</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-6 text-white">Legal</h4>
              <ul className="space-y-3">
                <li><Link to="/terms" className="text-gray-400 hover:text-orange-400 transition-colors duration-300 hover:translate-x-1 inline-block">Terms of Service</Link></li>
                <li><Link to="/privacy-policy" className="text-gray-400 hover:text-orange-400 transition-colors duration-300 hover:translate-x-1 inline-block">Privacy Policy</Link></li>
                <li><Link to="/cookies" className="text-gray-400 hover:text-orange-400 transition-colors duration-300 hover:translate-x-1 inline-block">Cookie Policy</Link></li>
                <li><Link to="/data-processing" className="text-gray-400 hover:text-orange-400 transition-colors duration-300 hover:translate-x-1 inline-block">Data Processing</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/20">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-500 text-sm mb-4 md:mb-0">&copy; {currentYear} Ruvo AI. All rights reserved.</p>
              <div className="flex space-x-8">
                <Link to="/privacy-policy" className="text-gray-500 text-sm hover:text-orange-400 transition-colors duration-300">Privacy Policy</Link>
                <Link to="/terms" className="text-gray-500 text-sm hover:text-orange-400 transition-colors duration-300">Terms of Service</Link>
                <Link to="/contact" className="text-gray-500 text-sm hover:text-orange-400 transition-colors duration-300">Contact</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
