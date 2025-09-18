import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Eye, EyeOff } from "lucide-react";

// Sample API response structure
interface Detection {
  bbox: [number, number, number, number]; // [x1, y1, x2, y2]
  class: number;
  confidence: number;
}

interface APIResponse {
  num_detections: number;
  predictions: Detection[];
}

// Hail size classifications based on bounding box dimensions
const getHailSize = (width: number, height: number) => {
  const avgDimension = (width + height) / 2;
  if (avgDimension < 25) return "Pea sized";
  if (avgDimension < 50) return "Marble sized";
  if (avgDimension < 75) return "Golf ball sized";
  if (avgDimension < 100) return "Tennis ball sized";
  return "Baseball sized";
};

const getHailColor = (size: string) => {
  switch (size) {
    case "Pea sized": return "bg-green-500";
    case "Marble sized": return "bg-yellow-500";
    case "Golf ball sized": return "bg-orange-500";
    case "Tennis ball sized": return "bg-red-500";
    case "Baseball sized": return "bg-purple-500";
    default: return "bg-vibranium";
  }
};

interface AnnotationViewerProps {
  originalImage: string;
  apiResponse?: APIResponse;
}

export const AnnotationViewer: React.FC<AnnotationViewerProps> = ({ 
  originalImage, 
  apiResponse 
}) => {
  const [showAnnotations, setShowAnnotations] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  if (!apiResponse) {
    return (
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4 text-gradient">Upload an Image to See Results</h2>
            <p className="text-xl text-muted-foreground">
              Process your drone footage to view AI-powered hail damage detection
            </p>
          </div>
        </div>
      </section>
    );
  }

  const data = apiResponse;

  useEffect(() => {
    drawAnnotations();
  }, [showAnnotations, data]);

  const drawAnnotations = () => {
    const canvas = canvasRef.current;
    const img = imageRef.current;
    
    if (!canvas || !img) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to match image
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;

    // Draw the original image
    ctx.drawImage(img, 0, 0);

    if (!showAnnotations) return;

    // Draw bounding boxes and labels
    data.predictions.forEach((detection, index) => {
      const [x1, y1, x2, y2] = detection.bbox;
      const width = x2 - x1;
      const height = y2 - y1;
      const hailSize = getHailSize(width, height);

      // Draw bounding box
      ctx.strokeStyle = '#a855f7'; // vibranium color
      ctx.lineWidth = 4; // Increased from 3 to 4
      ctx.strokeRect(x1, y1, width, height);

      // Draw semi-transparent fill
      ctx.fillStyle = 'rgba(168, 85, 247, 0.15)'; // Slightly more transparent
      ctx.fillRect(x1, y1, width, height);

      // Draw label background
      const labelText = `${hailSize} (${(detection.confidence * 100).toFixed(0)}%)`;
      ctx.font = 'bold 16px monospace'; // Increased font size and made bold
      const textMetrics = ctx.measureText(labelText);
      const labelHeight = 26; // Increased height for larger text
      
      ctx.fillStyle = 'rgba(168, 85, 247, 0.95)'; // More opaque background
      ctx.fillRect(x1, y1 - labelHeight, textMetrics.width + 12, labelHeight);

      // Draw label text
      ctx.fillStyle = '#ffffff';
      ctx.fillText(labelText, x1 + 6, y1 - 6);
    });
  };

  const downloadAnnotatedImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = 'annotated-inspection.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-gradient">Analysis Results</h2>
          <p className="text-xl text-muted-foreground">
            {data.num_detections} hail damage areas detected
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Original Image */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Original Image</h3>
            <div className="relative">
              <img 
                src={originalImage}
                alt="Original inspection"
                className="w-full h-auto rounded-lg"
              />
            </div>
          </Card>

          {/* Annotated Image */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Annotated Results</h3>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAnnotations(!showAnnotations)}
                >
                  {showAnnotations ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  {showAnnotations ? 'Hide' : 'Show'} Annotations
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={downloadAnnotatedImage}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
            <div className="relative">
              <img 
                ref={imageRef}
                src={originalImage}
                alt="Original for annotation"
                className="hidden"
                onLoad={drawAnnotations}
              />
              <canvas 
                ref={canvasRef}
                className="w-full h-auto rounded-lg border border-border"
              />
            </div>
          </Card>
        </div>

        {/* Detection Summary */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">Detection Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.predictions.map((detection, index) => {
              const [x1, y1, x2, y2] = detection.bbox;
              const width = x2 - x1;
              const height = y2 - y1;
              const hailSize = getHailSize(width, height);
              
              return (
                <div key={index} className="p-4 bg-muted rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Detection #{index + 1}</span>
                    <Badge className={getHailColor(hailSize)}>
                      {(detection.confidence * 100).toFixed(0)}%
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Size: {hailSize}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Dimensions: {width.toFixed(0)} × {height.toFixed(0)} px
                  </p>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </section>
  );
};