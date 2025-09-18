import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Check, Crown, Zap } from "lucide-react";

export const AuthSection = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate auth process
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <section className="py-20 px-6 bg-wakanda-surface">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-gradient">Join the Future</h2>
          <p className="text-xl text-muted-foreground">
            Choose your plan and start analyzing drone footage with AI precision
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pricing Plans */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold mb-6">Choose Your Plan</h3>
            
            {/* Subscription Plan */}
            <Card className="p-6 border-vibranium/30 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-vibranium text-wakanda-dark px-3 py-1 text-sm font-medium">
                POPULAR
              </div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="text-xl font-bold flex items-center gap-2">
                    <Crown className="h-5 w-5 text-vibranium" />
                    Pro Subscription
                  </h4>
                  <p className="text-muted-foreground">Unlimited analysis reports</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-vibranium">$49</div>
                  <div className="text-sm text-muted-foreground">/month</div>
                </div>
              </div>
              
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-vibranium" />
                  <span>Unlimited report generation</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-vibranium" />
                  <span>Advanced AI analysis</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-vibranium" />
                  <span>Priority processing</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-vibranium" />
                  <span>Detailed insurance reports</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-vibranium" />
                  <span>API access</span>
                </li>
              </ul>
              
              <Button className="w-full vibranium-glow" size="lg">
                Start Pro Trial
              </Button>
            </Card>

            {/* Pay-per-report Plan */}
            <Card className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="text-xl font-bold flex items-center gap-2">
                    <Zap className="h-5 w-5 text-accent" />
                    Pay-per-Report
                  </h4>
                  <p className="text-muted-foreground">Perfect for occasional use</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-accent">$15</div>
                  <div className="text-sm text-muted-foreground">/report</div>
                </div>
              </div>
              
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-accent" />
                  <span>Single report generation</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-accent" />
                  <span>AI hail damage detection</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-accent" />
                  <span>Downloadable results</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-accent" />
                  <span>Standard processing</span>
                </li>
              </ul>
              
              <Button variant="outline" className="w-full" size="lg">
                Buy Single Report
              </Button>
            </Card>
          </div>

          {/* Auth Form */}
          <Card className="p-6">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login" className="space-y-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="pilot@example.com"
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input 
                      id="password" 
                      type="password" 
                      placeholder="••••••••"
                      required 
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isLoading}
                    size="lg"
                  >
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="signup" className="space-y-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input 
                        id="firstName" 
                        placeholder="John"
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input 
                        id="lastName" 
                        placeholder="Pilot"
                        required 
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signupEmail">Email</Label>
                    <Input 
                      id="signupEmail" 
                      type="email" 
                      placeholder="pilot@example.com"
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signupPassword">Password</Label>
                    <Input 
                      id="signupPassword" 
                      type="password" 
                      placeholder="••••••••"
                      required 
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input 
                      id="confirmPassword" 
                      type="password" 
                      placeholder="••••••••"
                      required 
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full vibranium-glow" 
                    disabled={isLoading}
                    size="lg"
                  >
                    {isLoading ? "Creating account..." : "Create Account"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-6 p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground text-center">
                <strong>Note:</strong> Full authentication requires backend integration. 
                Connect to Supabase for complete functionality.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};