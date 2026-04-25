'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Loader2 } from 'lucide-react';
import { suggestSkillTags } from '@/ai/flows/skill-tag-suggestion';

interface SkillSuggestProps {
  onSkillAdd: (skill: string) => void;
  profileDescription: string;
}

export default function SkillSuggest({ onSkillAdd, profileDescription }: SkillSuggestProps) {
  const [inputValue, setInputValue] = useState('');
  const [suggestedTags, setSuggestedTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleAddSkill = () => {
    if (inputValue.trim()) {
      onSkillAdd(inputValue.trim());
      setInputValue('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  const handleGetSuggestions = async () => {
    if (!profileDescription) {
        setError("Veuillez d'abord rédiger une biographie pour obtenir des suggestions de l'IA.");
        return;
    }
    setIsLoading(true);
    setError(null);
    setSuggestedTags([]);
    try {
      const result = await suggestSkillTags({
        profileDescription,
        portfolioContent: '', // Le contenu du portfolio peut être ajouté plus tard
      });
      setSuggestedTags(result.suggestedTags);
    } catch (e) {
      console.error(e);
      setError('Échec de la récupération des suggestions. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleAddSuggestedTag = (tag: string) => {
    onSkillAdd(tag);
    setSuggestedTags(currentTags => currentTags.filter(t => t !== tag));
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="Saisissez une compétence et appuyez sur Entrée"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <Button type="button" onClick={handleAddSkill}>
          Ajouter
        </Button>
      </div>
      <div>
        <Button type="button" variant="outline" onClick={handleGetSuggestions} disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Sparkles className="mr-2 h-4 w-4 text-accent-foreground" />
          )}
          Suggérer des compétences avec l'IA
        </Button>
      </div>
       {error && <p className="text-sm text-destructive">{error}</p>}
      {suggestedTags.length > 0 && (
         <div>
            <p className="text-sm font-medium mb-2">Suggestions de l'IA (cliquez pour ajouter):</p>
            <div className="flex flex-wrap gap-2">
            {suggestedTags.map(tag => (
                <Badge
                key={tag}
                variant="outline"
                onClick={() => handleAddSuggestedTag(tag)}
                className="cursor-pointer hover:bg-accent hover:text-accent-foreground text-base py-1"
                >
                {tag}
                </Badge>
            ))}
            </div>
         </div>
      )}
    </div>
  );
}
