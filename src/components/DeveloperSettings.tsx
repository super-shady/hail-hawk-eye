import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Settings, Save, TestTube, CheckCircle, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const DeveloperSettings = () => {
  const [endpoint, setEndpoint] = useState("https://api.hailvision.ai/v1/detect");
  const [apiKey, setApiKey] = useState("");
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const { toast } = useToast();

  const testConnection = async () => {
    setIsTestingConnection(true);
    
    try {
      // Simulate API connection test
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate random success/failure for demo
      const isSuccess = Math.random() > 0.3;
      
      if (isSuccess) {
        setConnectionStatus('success');
        toast({
          title: "Connection successful",
          description: "Backend endpoint is responding correctly"
        });
      } else {
        setConnectionStatus('error');
        toast({
          title: "Connection failed", 
          description: "Unable to reach backend endpoint",
          variant: "destructive"
        });
      }
    } catch (error) {
      setConnectionStatus('error');
      toast({
        title: "Connection error",
        description: "Failed to test backend connection",
        variant: "destructive"
      });
    } finally {
      setIsTestingConnection(false);
    }
  };

  const saveSettings = () => {
    // Save to localStorage for demo purposes
    localStorage.setItem('hailvision_endpoint', endpoint);
    localStorage.setItem('hailvision_api_key', apiKey);
    
    toast({
      title: "Settings saved",
      description: "Backend configuration has been updated"
    });
  };

  const getStatusBadge = () => {
    switch (connectionStatus) {
      case 'success':
        return <Badge className="bg-green-500"><CheckCircle className="h-3 w-3 mr-1" />Connected</Badge>;
      case 'error':
        return <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" />Failed</Badge>;
      default:
        return <Badge variant="outline">Untested</Badge>;
    }
  };

  return (
    <section className="py-20 px-6 bg-wakanda-elevated">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-gradient flex items-center justify-center gap-3">
            <Settings className="h-10 w-10" />
            Developer Settings
          </h2>
          <p className="text-xl text-muted-foreground">
            Configure your custom computer vision backend endpoint
          </p>
        </div>

        <Card className="p-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="endpoint" className="text-lg font-medium">
                  Backend Endpoint URL
                </Label>
                {getStatusBadge()}
              </div>
              <Input
                id="endpoint"
                value={endpoint}
                onChange={(e) => setEndpoint(e.target.value)}
                placeholder="https://your-api.com/v1/detect"
                className="text-base"
              />
              <p className="text-sm text-muted-foreground">
                Your computer vision API endpoint that processes images and returns bounding box data
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="apiKey" className="text-lg font-medium">
                API Key (Optional)
              </Label>
              <Input
                id="apiKey"
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="sk-your-secret-api-key"
                className="text-base"
              />
              <p className="text-sm text-muted-foreground">
                Authentication key for your backend service (if required)
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <h4 className="font-medium mb-2">Expected API Response Format:</h4>
              <pre className="text-xs text-muted-foreground overflow-x-auto">
{`{
  "num_detections": 14,
  "predictions": [
    {
      "bbox": [473.6, 604.1, 569.4, 694.7],
      "class": 0,
      "confidence": 0.93
    }
  ]
}`}
              </pre>
            </div>

            <div className="flex gap-4">
              <Button 
                onClick={testConnection}
                disabled={isTestingConnection || !endpoint}
                variant="outline"
                size="lg"
              >
                <TestTube className="h-4 w-4 mr-2" />
                {isTestingConnection ? "Testing..." : "Test Connection"}
              </Button>

              <Button 
                onClick={saveSettings}
                disabled={!endpoint}
                size="lg"
                className="vibranium-glow"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Settings
              </Button>
            </div>

            <div className="pt-6 border-t border-border">
              <h4 className="font-medium mb-3">Integration Guide:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <h5 className="font-medium text-vibranium">Request Format:</h5>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• POST request with image/video file</li>
                    <li>• Multipart form data or base64</li>
                    <li>• Optional metadata parameters</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h5 className="font-medium text-vibranium">Response Requirements:</h5>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Bounding boxes as [x1, y1, x2, y2]</li>
                    <li>• Confidence scores (0.0 - 1.0)</li>
                    <li>• Class labels (0 for hail damage)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};