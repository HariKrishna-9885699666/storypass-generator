import { useState } from "react";
import { Copy, Check, RefreshCw, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
// Removed floating user icon and dialog imports
import { toast } from "sonner";

interface PasswordDisplayProps {
  password: string;
  strength: { score: number; label: string; color: string };
  onRegenerate: () => void;
}

export const PasswordDisplay = ({ password, strength, onRegenerate }: PasswordDisplayProps) => {
  const [copied, setCopied] = useState(false);
  const [visible, setVisible] = useState(true);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(password);
    setCopied(true);
    toast.success("Password copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <div className="story-card rounded-xl p-6 space-y-4 animate-fade-in" style={{ animationDelay: "0.1s" }}>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-muted-foreground">
            Generated Password
          </span>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setVisible(!visible)}
              className="h-8 w-8 text-muted-foreground hover:text-foreground"
            >
              {visible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onRegenerate}
              className="h-8 w-8 text-muted-foreground hover:text-foreground"
            >
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-glow opacity-50 group-hover:opacity-100 transition-opacity blur-xl" />
          <div className="relative bg-muted/50 rounded-lg p-4 border border-border/50">
            <code className={`password-text text-primary break-all ${!visible ? 'blur-sm select-none' : ''}`}>
              {password}
            </code>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Strength:</span>
            <span className={`font-medium ${
              strength.label === 'Strong' ? 'text-success' : 
              strength.label === 'Good' ? 'text-accent' : 
              strength.label === 'Fair' ? 'text-warning' : 'text-destructive'
            }`}>
              {strength.label}
            </span>
          </div>
          <Progress 
            value={strength.score} 
            className="h-2 bg-muted"
          />
        </div>

        <div className="flex gap-3">
          <Button
            onClick={handleCopy}
            className="flex-1 h-11 bg-gradient-primary hover:opacity-90 transition-opacity glow-effect"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-2" />
                Copy Password
              </>
            )}
          </Button>
        </div>

        <p className="text-xs text-muted-foreground text-center">
          {password.length} characters • Mix of letters, numbers & symbols
        </p>
      </div>

    </>
  );
};
