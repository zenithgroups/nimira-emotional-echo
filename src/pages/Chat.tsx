import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare, ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import ChatInterface from "@/components/ChatInterface";
// Import App.css is already handled in the main.tsx file

const ChatPage: React.FC = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  return <div className="min-h-screen bg-gradient-to-br from-white to-ruvo-50 flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white shadow-sm">
        <div className="container-custom py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-ruvo-500 hover:text-ruvo-600 transition-colors">
            <ChevronLeft size={20} />
            <span className="font-medium">Back to Home</span>
          </Link>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-ruvo-300 to-ruvo-400 flex items-center justify-center text-white font-medium">
              R
            </div>
            <h1 className="text-xl font-bold text-ruvo-600">Ruvo - Your Emotional Companion</h1>
          </div>
          
          <Button variant="ghost" size="sm" className="text-gray-500">
            <MessageSquare size={18} className="mr-1" />
            New Chat
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container-custom max-w-4xl mx-auto py-6">
        <div className="mb-6 text-center">
          
          
        </div>
        
        {/* Chat interface wrapper */}
        <div className="h-[calc(100vh-220px)]">
          <ChatInterface selectedVoiceIndex={0} onSpeakingChange={setIsSpeaking} />
        </div>
      </main>
    </div>;
};
export default ChatPage;