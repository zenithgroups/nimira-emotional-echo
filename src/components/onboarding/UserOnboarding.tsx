import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Heart, Users, Sparkles } from 'lucide-react';

interface UserData {
  name: string;
  age: string;
  nickname?: string;
}

interface UserOnboardingProps {
  onComplete: (userData: UserData) => void;
  darkMode: boolean;
}

export const UserOnboarding: React.FC<UserOnboardingProps> = ({
  onComplete,
  darkMode
}) => {
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState<UserData>({
    name: '',
    age: '',
    nickname: ''
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const validateStep = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!userData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!userData.age.trim()) {
      newErrors.age = 'Age is required';
    } else if (isNaN(Number(userData.age)) || Number(userData.age) < 1 || Number(userData.age) > 120) {
      newErrors.age = 'Please enter a valid age';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep(2);
    }
  };

  const handleComplete = () => {
    if (validateStep()) {
      onComplete(userData);
    }
  };

  const updateField = (field: keyof UserData, value: string) => {
    setUserData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className={cn(
      "fixed inset-0 z-50 flex items-center justify-center transition-all duration-500",
      "backdrop-blur-xl",
      darkMode 
        ? "bg-gradient-to-br from-black/90 via-slate-900/90 to-black/90" 
        : "bg-gradient-to-br from-white/90 via-gray-50/90 to-white/90"
    )}>
      {/* Ambient particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className={cn(
              "absolute w-1 h-1 rounded-full opacity-20 animate-pulse",
              darkMode ? "bg-violet-400" : "bg-violet-600"
            )}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <Card className={cn(
        "w-full max-w-md mx-4 relative backdrop-blur-2xl border-white/10 shadow-2xl",
        darkMode 
          ? "bg-gradient-to-br from-slate-900/95 via-slate-800/90 to-slate-900/95 text-white" 
          : "bg-gradient-to-br from-white/95 via-gray-50/90 to-white/95"
      )}>
        <CardHeader className="text-center pb-2">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-500 to-orange-400 flex items-center justify-center">
              {step === 1 ? <Users size={32} className="text-white" /> : <Heart size={32} className="text-white" />}
            </div>
          </div>
          <CardTitle className={cn(
            "text-2xl font-bold mb-2",
            darkMode ? "text-white" : "text-gray-900"
          )}>
            {step === 1 ? "Let's get to know you" : "Almost there!"}
          </CardTitle>
          <CardDescription className={cn(
            "text-sm",
            darkMode ? "text-slate-300" : "text-gray-600"
          )}>
            {step === 1 
              ? "Tell us a bit about yourself to personalize your experience" 
              : "Add a nickname so I know how to address you (optional)"
            }
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {step === 1 ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="name" className={cn(
                  "text-sm font-medium",
                  darkMode ? "text-slate-200" : "text-gray-700"
                )}>
                  What's your name? *
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your first name"
                  value={userData.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  className={cn(
                    "h-12 rounded-xl transition-all duration-300",
                    "border-2 focus:border-violet-400/50 focus:ring-4 focus:ring-violet-400/10",
                    darkMode 
                      ? "bg-slate-800/80 backdrop-blur-xl border-slate-600/50 text-white placeholder:text-slate-400" 
                      : "bg-white/80 backdrop-blur-xl border-gray-300/50 text-gray-900 placeholder:text-gray-500",
                    errors.name ? "border-red-500" : ""
                  )}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="age" className={cn(
                  "text-sm font-medium",
                  darkMode ? "text-slate-200" : "text-gray-700"
                )}>
                  How old are you? *
                </Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="Enter your age"
                  value={userData.age}
                  onChange={(e) => updateField('age', e.target.value)}
                  className={cn(
                    "h-12 rounded-xl transition-all duration-300",
                    "border-2 focus:border-violet-400/50 focus:ring-4 focus:ring-violet-400/10",
                    darkMode 
                      ? "bg-slate-800/80 backdrop-blur-xl border-slate-600/50 text-white placeholder:text-slate-400" 
                      : "bg-white/80 backdrop-blur-xl border-gray-300/50 text-gray-900 placeholder:text-gray-500",
                    errors.age ? "border-red-500" : ""
                  )}
                />
                {errors.age && (
                  <p className="text-red-500 text-xs mt-1">{errors.age}</p>
                )}
              </div>

              <Button
                onClick={handleNext}
                className={cn(
                  "w-full h-12 rounded-xl transition-all duration-300 hover:scale-105",
                  "bg-gradient-to-r from-violet-500 to-orange-400 text-white border-0",
                  "hover:from-violet-600 hover:to-orange-500 hover:shadow-lg",
                  "shadow-lg backdrop-blur-sm"
                )}
              >
                Continue
              </Button>
            </>
          ) : (
            <>
              <div className="space-y-2">
                <Label htmlFor="nickname" className={cn(
                  "text-sm font-medium",
                  darkMode ? "text-slate-200" : "text-gray-700"
                )}>
                  What should I call you?
                </Label>
                <Input
                  id="nickname"
                  type="text"
                  placeholder="Nickname, pet name, or leave blank"
                  value={userData.nickname}
                  onChange={(e) => updateField('nickname', e.target.value)}
                  className={cn(
                    "h-12 rounded-xl transition-all duration-300",
                    "border-2 focus:border-violet-400/50 focus:ring-4 focus:ring-violet-400/10",
                    darkMode 
                      ? "bg-slate-800/80 backdrop-blur-xl border-slate-600/50 text-white placeholder:text-slate-400" 
                      : "bg-white/80 backdrop-blur-xl border-gray-300/50 text-gray-900 placeholder:text-gray-500"
                  )}
                />
                <p className={cn(
                  "text-xs",
                  darkMode ? "text-slate-400" : "text-gray-500"
                )}>
                  This is optional - I can just use your name if you prefer
                </p>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setStep(1)}
                  className={cn(
                    "flex-1 h-12 rounded-xl transition-all duration-300",
                    darkMode 
                      ? "border-slate-600 text-slate-300 hover:bg-slate-800" 
                      : "border-gray-300 text-gray-700 hover:bg-gray-100"
                  )}
                >
                  Back
                </Button>
                <Button
                  onClick={handleComplete}
                  className={cn(
                    "flex-1 h-12 rounded-xl transition-all duration-300 hover:scale-105",
                    "bg-gradient-to-r from-violet-500 to-orange-400 text-white border-0",
                    "hover:from-violet-600 hover:to-orange-500 hover:shadow-lg",
                    "shadow-lg backdrop-blur-sm"
                  )}
                >
                  <Sparkles size={16} className="mr-2" />
                  Start Chatting
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};