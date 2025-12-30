import { BookOpen, ArrowRight } from "lucide-react";

interface StoryDisplayProps {
  story: string;
  password: string;
}

export const StoryDisplay = ({ story, password }: StoryDisplayProps) => {
  return (
    <div className="story-card rounded-xl p-6 animate-fade-in">
      <div className="flex items-center gap-2 mb-4">
        <BookOpen className="w-5 h-5 text-primary" />
        <span className="text-sm font-medium text-muted-foreground">
          Your memorable story
        </span>
      </div>
      
      {/* Transformation display */}
      <div className="space-y-4">
        <p className="text-xl md:text-2xl font-medium text-foreground leading-relaxed">
          "{story}"
        </p>
        
        <div className="flex items-center gap-3 py-2">
          <ArrowRight className="w-5 h-5 text-primary flex-shrink-0" />
          <code className="font-mono text-lg md:text-xl text-primary break-all">
            {password}
          </code>
        </div>
      </div>
      
      <p className="mt-4 text-sm text-muted-foreground">
        💡 Remember the story, recall your password!
      </p>
    </div>
  );
};
