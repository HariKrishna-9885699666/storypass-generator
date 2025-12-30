const substitutions: Record<string, string> = {
  'a': '@',
  'i': '!',
  'o': '0',
  'A': '4',
};

export const storyToPassword = (story: string): string => {
  // Remove spaces and keep punctuation
  const words = story.split(' ');
  let password = '';
  
  for (let w = 0; w < words.length; w++) {
    const word = words[w];
    let processedWord = '';
    
    for (let i = 0; i < word.length; i++) {
      const char = word[i];
      
      // Apply substitution
      if (substitutions[char]) {
        processedWord += substitutions[char];
      } else if (substitutions[char.toLowerCase()] && i > 0) {
        // Substitute lowercase in middle of word
        processedWord += substitutions[char.toLowerCase()];
      } else {
        // Capitalize first letter of words (CamelCase)
        if (i === 0 && w > 0 && char.match(/[a-z]/)) {
          processedWord += char.toUpperCase();
        } else {
          processedWord += char;
        }
      }
    }
    
    password += processedWord;
  }
  
  return password;
};

export const calculateStrength = (password: string): { score: number; label: string; color: string } => {
  let score = 0;
  
  if (password.length >= 12) score += 1;
  if (password.length >= 16) score += 1;
  if (password.length >= 20) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) score += 1;
  
  if (score <= 2) return { score: 25, label: 'Weak', color: 'bg-destructive' };
  if (score <= 4) return { score: 50, label: 'Fair', color: 'bg-warning' };
  if (score <= 5) return { score: 75, label: 'Good', color: 'bg-accent' };
  return { score: 100, label: 'Strong', color: 'bg-success' };
};
