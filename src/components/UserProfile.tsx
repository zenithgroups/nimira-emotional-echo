import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { User, Settings, LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface UserProfileProps {
  variant?: 'dropdown' | 'full';
}

const UserProfile: React.FC<UserProfileProps> = ({ variant = 'dropdown' }) => {
  const { user, profile, signOut, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Form state
  const [fullName, setFullName] = useState(profile?.full_name || '');
  const [age, setAge] = useState(profile?.age?.toString() || '');
  const [nickname, setNickname] = useState(profile?.nickname || '');

  React.useEffect(() => {
    if (profile) {
      setFullName(profile.full_name);
      setAge(profile.age?.toString() || '');
      setNickname(profile.nickname || '');
    }
  }, [profile]);

  const handleSignOut = async () => {
    await signOut();
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (!fullName.trim()) {
      setError('Full name is required');
      setLoading(false);
      return;
    }

    const updates = {
      full_name: fullName.trim(),
      age: age ? parseInt(age) : null,
      nickname: nickname.trim() || null
    };

    const { error } = await updateProfile(updates);

    if (error) {
      setError(error.message);
    } else {
      setSuccess('Profile updated successfully!');
      setIsEditing(false);
    }

    setLoading(false);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (!user || !profile) {
    return null;
  }

  if (variant === 'dropdown') {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-10 w-10 rounded-full">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-blue-600 text-white">
                {getInitials(profile.full_name)}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{profile.full_name}</p>
              {profile.nickname && (
                <p className="text-xs leading-none text-muted-foreground">
                  "{profile.nickname}"
                </p>
              )}
              <p className="text-xs leading-none text-muted-foreground">
                {user.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setIsEditing(!isEditing)}>
            <Settings className="mr-2 h-4 w-4" />
            <span>Profile Settings</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleSignOut}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="w-5 h-5" />
          Profile Settings
        </CardTitle>
        <CardDescription>
          Manage your account information and preferences
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {error && (
          <Alert className="border-red-500 bg-red-500/10">
            <AlertDescription className="text-red-400">{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="border-green-500 bg-green-500/10">
            <AlertDescription className="text-green-400">{success}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium">Email</Label>
            <p className="text-sm text-muted-foreground mt-1">{user.email}</p>
          </div>

          {isEditing ? (
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div>
                <Label htmlFor="edit-fullname">Full Name *</Label>
                <Input
                  id="edit-fullname"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-age">Age</Label>
                  <Input
                    id="edit-age"
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="Your age"
                    min="1"
                    max="120"
                  />
                </div>
                <div>
                  <Label htmlFor="edit-nickname">Nickname</Label>
                  <Input
                    id="edit-nickname"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    placeholder="Your nickname"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button type="submit" disabled={loading}>
                  {loading ? 'Saving...' : 'Save Changes'}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsEditing(false)}
                  disabled={loading}
                >
                  Cancel
                </Button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Full Name</Label>
                <p className="text-sm mt-1">{profile.full_name}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Age</Label>
                  <p className="text-sm mt-1">{profile.age || 'Not specified'}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Nickname</Label>
                  <p className="text-sm mt-1">{profile.nickname || 'Not specified'}</p>
                </div>
              </div>

              <Button onClick={() => setIsEditing(true)}>
                Edit Profile
              </Button>
            </div>
          )}
        </div>

        <div className="pt-4 border-t">
          <Button variant="destructive" onClick={handleSignOut}>
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfile;