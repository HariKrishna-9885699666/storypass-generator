import { useState, useCallback } from "react";
import { ThemeInput } from "./ThemeInput";
// Removed StoryDisplay import
import { PasswordDisplay } from "./PasswordDisplay";
import { Dialog, DialogTrigger, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { UserProfileFab } from "./UserProfileFab";
import { storyToPassword, calculateStrength } from "@/lib/passwordGenerator";
import { KeyRound, Shield, Brain } from "lucide-react";

interface GeneratedData {
  story: string;
  password: string;
  strength: { score: number; label: string; color: string };
}

export const PasswordGenerator = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<GeneratedData | null>(null);
  const [currentTheme, setCurrentTheme] = useState("");

  const generate = useCallback((story: string) => {
    setIsLoading(true);
    setCurrentTheme(story);
    
    // Brief loading for UX
    setTimeout(() => {
      const password = storyToPassword(story);
      const strength = calculateStrength(password);
      
      setData({ story, password, strength });
      setIsLoading(false);
    }, 200);
  }, []);

  const regenerate = useCallback(() => {
    if (currentTheme) {
      generate(currentTheme);
    }
  }, [currentTheme, generate]);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "1s" }} />
      
      <div className="relative z-10 container max-w-2xl mx-auto px-4 py-12 md:py-20">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-primary mb-6 animate-float">
            <KeyRound className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Story</span>
            <span className="text-foreground">Pass</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            Turn your memorable stories into strong passwords. Easy to remember, hard to crack.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            { icon: Brain, label: "Memorable" },
            { icon: Shield, label: "Secure" },
            { icon: KeyRound, label: "Unique" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-2 p-3 rounded-lg bg-secondary/30">
              <Icon className="w-5 h-5 text-primary" />
              <span className="text-xs text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>

        {/* Example */}
        <div className="mb-8 p-4 rounded-lg bg-muted/30 border border-border/30">
          <p className="text-sm text-muted-foreground text-center font-mono">
            <span className="text-foreground">"3 aliens ate pizza on Mars!"</span>
            <span className="mx-2 text-primary">→</span>
            <span className="text-primary">3@l!ensAtePzz@0nM4rs!</span>
          </p>
        </div>

        {/* Main content */}
        <div className="space-y-6">
          <ThemeInput onGenerate={generate} isLoading={isLoading} />
          
          {isLoading && (
            <div className="space-y-4">
              <div className="story-card rounded-xl p-6">
                <div className="shimmer h-6 w-32 rounded mb-4" />
                <div className="shimmer h-8 w-full rounded mb-2" />
                <div className="shimmer h-8 w-3/4 rounded" />
              </div>
              <div className="story-card rounded-xl p-6">
                <div className="shimmer h-6 w-40 rounded mb-4" />
                <div className="shimmer h-12 w-full rounded" />
              </div>
            </div>
          )}

          {data && !isLoading && (
            <div className="space-y-4">
              <PasswordDisplay 
                password={data.password} 
                strength={data.strength}
                onRegenerate={regenerate}
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground mt-12">
          Your passwords are generated locally and never stored or transmitted.
        </p>
      </div>

      {/* Floating User Icon and Dialog (always visible) */}
      <UserProfileFab />
    </div>
  );
};
