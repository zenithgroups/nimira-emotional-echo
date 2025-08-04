import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import UserProfile from '@/components/UserProfile';

const Profile = () => {
  const { user, profile } = useAuth();

  if (!user || !profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
        <div className="text-center text-white">
          <p>Please sign in to view your profile.</p>
          <Link to="/auth">
            <Button className="mt-4">Sign In</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4">
      <div className="container max-w-4xl mx-auto py-8">
        <div className="mb-6">
          <Link 
            to="/" 
            className="inline-flex items-center text-white hover:text-blue-300 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          
          <div className="text-white mb-8">
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, {profile.nickname || profile.full_name}!
            </h1>
            <p className="text-slate-300">
              Manage your account settings and preferences below.
            </p>
          </div>
        </div>

        <div className="grid gap-6">
          <UserProfile variant="full" />
          
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
            <h3 className="text-xl font-semibold text-white mb-4">Account Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-300">
              <div>
                <p className="text-sm font-medium text-slate-400">Email Address</p>
                <p>{user.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-400">Account Created</p>
                <p>{new Date(profile.created_at).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-400">Last Updated</p>
                <p>{new Date(profile.updated_at).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-400">User ID</p>
                <p className="font-mono text-xs">{user.id}</p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link to="/chat">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Start Chatting with RUVO
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;