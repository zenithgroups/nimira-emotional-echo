
import React from "react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-50 py-12 border-t border-gray-100">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="mb-4">
              <h3 className="text-2xl font-bold text-nimira-500">Nimira</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Your emotional AI companion, designed to understand and support you.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-nimira-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-nimira-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-nimira-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><a href="#about" className="text-gray-600 hover:text-nimira-400">About Us</a></li>
              <li><a href="#" className="text-gray-600 hover:text-nimira-400">Careers</a></li>
              <li><a href="#" className="text-gray-600 hover:text-nimira-400">Blog</a></li>
              <li><a href="#" className="text-gray-600 hover:text-nimira-400">Press</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-nimira-400">Help Center</a></li>
              <li><a href="#" className="text-gray-600 hover:text-nimira-400">FAQs</a></li>
              <li><a href="#" className="text-gray-600 hover:text-nimira-400">Contact Us</a></li>
              <li><a href="#" className="text-gray-600 hover:text-nimira-400">Privacy</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-nimira-400">Terms of Service</a></li>
              <li><a href="#" className="text-gray-600 hover:text-nimira-400">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-600 hover:text-nimira-400">Cookie Policy</a></li>
              <li><a href="#" className="text-gray-600 hover:text-nimira-400">Data Processing</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">&copy; {currentYear} Nimira AI. All rights reserved.</p>
            <div className="mt-4 md:mt-0">
              <ul className="flex space-x-6">
                <li><a href="#" className="text-gray-500 text-sm hover:text-nimira-400">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-500 text-sm hover:text-nimira-400">Terms of Service</a></li>
                <li><a href="#" className="text-gray-500 text-sm hover:text-nimira-400">Contact</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
