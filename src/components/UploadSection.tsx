import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, File, Video, X, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AnnotationViewer } from "./AnnotationViewer";

interface UploadedFile {
  file: File;
  id: string;
  preview?: string;
  type: 'image' | 'video';
}

interface APIResponse {
  num_detections: number;
  predictions: Array<{
    bbox: [number, number, number, number];
    class: number;
    confidence: number;
  }>;
}

export const UploadSection = () => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [apiResponse, setApiResponse] = useState<APIResponse | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;

    const newFiles: UploadedFile[] = [];
    
    Array.from(files).forEach((file) => {
      const isImage = file.type.startsWith('image/');
      const isVideo = file.type.startsWith('video/');
      
      if (!isImage && !isVideo) {
        toast({
          title: "Invalid file type",
          description: "Please upload only images or videos",
          variant: "destructive"
        });
        return;
      }

      const uploadedFile: UploadedFile = {
        file,
        id: Math.random().toString(36).substr(2, 9),
        type: isImage ? 'image' : 'video'
      };

      if (isImage) {
        const reader = new FileReader();
        reader.onload = (e) => {
          uploadedFile.preview = e.target?.result as string;
          setUploadedFiles(prev => [...prev, uploadedFile]);
        };
        reader.readAsDataURL(file);
      } else {
        newFiles.push(uploadedFile);
      }
    });

    if (newFiles.length > 0) {
      setUploadedFiles(prev => [...prev, ...newFiles]);
    }

    toast({
      title: "Files uploaded successfully",
      description: `${files.length} file(s) ready for processing`
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const removeFile = (id: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== id));
  };

  const processFiles = async () => {
    if (uploadedFiles.length === 0) {
      toast({
        title: "No files selected",
        description: "Please upload files before processing",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    setApiResponse(null);
    setProcessedImage(null);

    toast({
      title: "Processing started",
      description: "Your files are being analyzed for hail damage..."
    });

    // This would connect to the backend API
    // For now, we'll simulate processing with sample API response
    setTimeout(() => {
      const firstImageFile = uploadedFiles.find(f => f.type === 'image');
      if (firstImageFile?.preview) {
        setProcessedImage(firstImageFile.preview);
        
        // Sample API response matching your backend format
        const sampleResponse: APIResponse = {
          num_detections: 14,
          predictions: [
            {"bbox": [473.6, 604.1, 569.4, 694.7], "class": 0, "confidence": 0.93},
            {"bbox": [329.2, 372.8, 402.6, 433.6], "class": 0, "confidence": 0.93},
            {"bbox": [513.0, 463.5, 593.3, 531.1], "class": 0, "confidence": 0.90},
            {"bbox": [73.3, 332.3, 137.1, 387.7], "class": 0, "confidence": 0.89},
            {"bbox": [300.9, 473.1, 381.9, 549.0], "class": 0, "confidence": 0.89}
          ]
        };
        
        setApiResponse(sampleResponse);
      }

      setIsProcessing(false);
      toast({
        title: "Analysis complete",
        description: "Hail damage detection finished! View results below."
      });
    }, 3000);
  };

  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-gradient">Upload Your Footage</h2>
          <p className="text-xl text-muted-foreground">
            Drag and drop your drone inspection images or videos to begin analysis
          </p>
        </div>

        {/* Upload area */}
        <Card className={`p-8 border-2 border-dashed transition-all duration-300 ${
          isDragging ? 'border-vibranium bg-vibranium/5' : 'border-border'
        }`}>
          <div
            className="text-center"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Upload className="mx-auto h-12 w-12 text-vibranium mb-4" />
            <p className="text-lg font-medium mb-2">Drop files here or click to browse</p>
            <p className="text-muted-foreground mb-6">
              Supports JPG, PNG, MP4, MOV, AVI files up to 100MB each
            </p>
            
            <Button 
              onClick={() => fileInputRef.current?.click()}
              variant="outline"
              size="lg"
            >
              Choose Files
            </Button>
            
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*,video/*"
              onChange={(e) => handleFileSelect(e.target.files)}
              className="hidden"
            />
          </div>
        </Card>

        {/* File list */}
        {uploadedFiles.length > 0 && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Uploaded Files ({uploadedFiles.length})</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {uploadedFiles.map((file) => (
                <Card key={file.id} className="p-4 relative group">
                  <button
                    onClick={() => removeFile(file.id)}
                    className="absolute top-2 right-2 p-1 rounded-full bg-destructive text-destructive-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  
                  {file.preview ? (
                    <img 
                      src={file.preview} 
                      alt="Preview"
                      className="w-full h-32 object-cover rounded mb-2"
                    />
                  ) : (
                    <div className="w-full h-32 bg-muted rounded mb-2 flex items-center justify-center">
                      {file.type === 'video' ? (
                        <Video className="h-8 w-8 text-muted-foreground" />
                      ) : (
                        <File className="h-8 w-8 text-muted-foreground" />
                      )}
                    </div>
                  )}
                  
                  <p className="text-sm font-medium truncate">{file.file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(file.file.size / 1024 / 1024).toFixed(1)} MB
                  </p>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <Button 
                onClick={processFiles} 
                disabled={isProcessing}
                size="lg" 
                className="vibranium-glow"
              >
                <Zap className="mr-2 h-5 w-5" />
                {isProcessing ? "Analyzing..." : "Analyze for Hail Damage"}
              </Button>
            </div>
          </div>
        )}

        {/* Results Section */}
        {processedImage && apiResponse && (
          <div className="mt-16">
            <AnnotationViewer 
              originalImage={processedImage} 
              apiResponse={apiResponse}
            />
          </div>
        )}
      </div>
    </section>
  );
};