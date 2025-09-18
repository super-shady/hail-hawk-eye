import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, Smartphone, X } from "lucide-react";
import { usePWA } from "@/hooks/usePWA";
import { useState } from "react";

export const PWAInstallPrompt = () => {
  const { canInstall, installApp, isOnline } = usePWA();
  const [isVisible, setIsVisible] = useState(true);

  if (!canInstall || !isVisible) {
    return null;
  }

  return (
    <Card className="fixed bottom-4 right-4 p-4 max-w-sm bg-card border-vibranium/30 shadow-lg z-50">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <Smartphone className="h-5 w-5 text-vibranium" />
          <h4 className="font-semibold">Install HailVision</h4>
        </div>
        <button 
          onClick={() => setIsVisible(false)}
          className="text-muted-foreground hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      
      <p className="text-sm text-muted-foreground mb-3">
        Install our PWA for offline access and faster performance in the field.
      </p>
      
      <div className="flex gap-2">
        <Button onClick={installApp} size="sm" className="flex-1">
          <Download className="h-4 w-4 mr-2" />
          Install
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setIsVisible(false)}
        >
          Later
        </Button>
      </div>
      
      {!isOnline && (
        <div className="mt-2 text-xs text-destructive">
          You're offline - some features may be limited
        </div>
      )}
    </Card>
  );
};