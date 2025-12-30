import { useState } from "react";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ThemeInputProps {
  onGenerate: (story: string) => void;
  isLoading: boolean;
}

const storyExamples = [
  "3 aliens ate pizza on Mars!",
  "5 ninjas stole cookies at midnight!",
  "7 dragons burned tacos in Tokyo!",
  "2 robots built rockets on the moon!",
];

export const ThemeInput = ({ onGenerate, isLoading }: ThemeInputProps) => {
  const [story, setStory] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (story.trim()) {
      onGenerate(story.trim());
    }
  };

  const handleExampleClick = (example: string) => {
    setStory(example);
    onGenerate(example);
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="flex gap-3">
        <Input
          value={story}
          onChange={(e) => setStory(e.target.value)}
          placeholder="Enter your memorable story..."
          className="flex-1 h-12 bg-secondary border-border/50 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
          disabled={isLoading}
        />
        <Button 
          type="submit" 
          disabled={!story.trim() || isLoading}
          className="h-12 px-6 bg-gradient-primary hover:opacity-90 transition-opacity glow-effect"
        >
          <Sparkles className="w-5 h-5 mr-2" />
          Convert
        </Button>
      </form>

      <div className="space-y-3">
        <p className="text-sm text-muted-foreground">Try an example:</p>
        <div className="flex flex-wrap gap-2">
          {storyExamples.map((example) => (
            <button
              key={example}
              onClick={() => handleExampleClick(example)}
              className="px-3 py-1.5 text-sm rounded-full bg-secondary hover:bg-secondary/80 text-secondary-foreground border border-border/30 hover:border-primary/50 transition-all duration-200 hover:scale-105"
              disabled={isLoading}
            >
              {example}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
