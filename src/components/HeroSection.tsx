import { Button } from "@/components/ui/button";
import { Upload, Shield, Zap } from "lucide-react";
import heroImage from "@/assets/hero-drone.jpg";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Futuristic drone over damaged roof"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background"></div>
      </div>

      {/* Geometric patterns */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-vibranium/30 rotate-45 animate-pulse-slow"></div>
        <div className="absolute bottom-1/3 right-1/4 w-24 h-24 border border-accent/20 rotate-12 animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
        <h1 className="text-6xl md:text-8xl font-bold mb-6 text-gradient animate-glow">
          HailVision Pro
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
          AI-powered hail damage detection for drone pilots. Upload roof inspection footage and receive 
          precise annotated reports for insurance claims.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button variant="default" size="lg" className="vibranium-glow">
            <Upload className="mr-2 h-5 w-5" />
            Start Analysis
          </Button>
          <Button variant="outline" size="lg">
            View Features
          </Button>
        </div>

        {/* Feature highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="text-center group">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-card border border-vibranium/30 flex items-center justify-center group-hover:vibranium-glow transition-all duration-300">
              <Upload className="h-8 w-8 text-vibranium" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Smart Upload</h3>
            <p className="text-muted-foreground">Upload images or videos from your drone flights</p>
          </div>

          <div className="text-center group">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-card border border-vibranium/30 flex items-center justify-center group-hover:vibranium-glow transition-all duration-300">
              <Zap className="h-8 w-8 text-vibranium" />
            </div>
            <h3 className="text-xl font-semibold mb-2">AI Detection</h3>
            <p className="text-muted-foreground">Advanced computer vision identifies and measures hail damage</p>
          </div>

          <div className="text-center group">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-card border border-vibranium/30 flex items-center justify-center group-hover:vibranium-glow transition-all duration-300">
              <Shield className="h-8 w-8 text-vibranium" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Insurance Reports</h3>
            <p className="text-muted-foreground">Generate professional reports for insurance claims</p>
          </div>
        </div>
      </div>
    </section>
  );
};