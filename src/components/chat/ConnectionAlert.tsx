
import React from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

interface ConnectionAlertProps {
  fallbackMode: boolean;
  darkMode: boolean;
}

export const ConnectionAlert: React.FC<ConnectionAlertProps> = ({
  fallbackMode,
  darkMode
}) => {
  if (!fallbackMode) return null;
  
  return (
    <Alert className={cn(
      "m-2 py-2",
      darkMode ? "bg-amber-900/20 border-amber-800/50" : "bg-yellow-50 border-yellow-200"
    )}>
      <AlertDescription className={cn(
        "text-xs",
        darkMode ? "text-amber-200" : "text-yellow-800"
      )}>
        Running in demo mode. Can't chat more due to limit. Your messages will receive simulated responses.
      </AlertDescription>
    </Alert>
  );
};
