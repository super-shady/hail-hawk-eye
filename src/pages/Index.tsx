import { HeroSection } from "@/components/HeroSection";
import { UploadSection } from "@/components/UploadSection";
import { DeveloperSettings } from "@/components/DeveloperSettings";
import { PWAInstallPrompt } from "@/components/PWAInstallPrompt";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-vibranium to-accent rounded-lg"></div>
              <span className="text-2xl font-bold text-gradient">HailVision</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#upload" className="text-foreground/80 hover:text-vibranium transition-colors">Upload</a>
              <a href="#developer" className="text-foreground/80 hover:text-vibranium transition-colors">API</a>
              <button className="px-4 py-2 rounded-lg bg-vibranium text-wakanda-dark font-medium hover:bg-vibranium-glow transition-colors">
                Sign In
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main>
        <HeroSection />
        
        <div id="upload">
          <UploadSection />
        </div>

        <div id="developer">
          <DeveloperSettings />
        </div>
      </main>

      {/* Footer */}
      <footer className="py-16 border-t border-border bg-wakanda-dark">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-vibranium to-accent rounded-lg"></div>
                <span className="text-2xl font-bold text-gradient">HailVision Pro</span>
              </div>
              <p className="text-muted-foreground mb-4 max-w-md">
                The future of drone roof inspection is here. Powered by advanced AI and built for professionals.
              </p>
              <div className="flex space-x-4">
                <div className="w-6 h-6 bg-vibranium/20 rounded"></div>
                <div className="w-6 h-6 bg-vibranium/20 rounded"></div>
                <div className="w-6 h-6 bg-vibranium/20 rounded"></div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-vibranium">Product</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-vibranium transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-vibranium transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-vibranium transition-colors">API Docs</a></li>
                <li><a href="#" className="hover:text-vibranium transition-colors">Integrations</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-vibranium">Company</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-vibranium transition-colors">About</a></li>
                <li><a href="#" className="hover:text-vibranium transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-vibranium transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-vibranium transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-border text-center text-muted-foreground">
            <p>&copy; 2024 HailVision Pro. Built with Wakandan technology.</p>
          </div>
        </div>
      </footer>

      {/* PWA Install Prompt */}
      <PWAInstallPrompt />
    </div>
  );
};

export default Index;