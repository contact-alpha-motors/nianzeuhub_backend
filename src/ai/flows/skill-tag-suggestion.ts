'use server';

/**
 * @fileOverview This file defines a Genkit flow for suggesting relevant skill tags based on a user's profile information and portfolio content.
 *
 * It exports:
 * - `suggestSkillTags`: An asynchronous function that takes a profile description and portfolio content as input and returns a list of suggested skill tags.
 * - `SkillTagSuggestionInput`: The TypeScript type definition for the input to the `suggestSkillTags` function.
 * - `SkillTagSuggestionOutput`: The TypeScript type definition for the output of the `suggestSkillTags` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Define the input schema for the skill tag suggestion flow
const SkillTagSuggestionInputSchema = z.object({
  profileDescription: z
    .string()
    .describe('A description of the talent profile, including skills and experience.'),
  portfolioContent: z
    .string()
    .describe('The content of the talent portfolio, including project descriptions and links.'),
});
export type SkillTagSuggestionInput = z.infer<typeof SkillTagSuggestionInputSchema>;

// Define the output schema for the skill tag suggestion flow
const SkillTagSuggestionOutputSchema = z.object({
  suggestedTags: z
    .array(z.string())
    .describe('A list of suggested skill tags relevant to the profile and portfolio.'),
});
export type SkillTagSuggestionOutput = z.infer<typeof SkillTagSuggestionOutputSchema>;

/**
 * Suggests relevant skill tags based on the provided profile description and portfolio content.
 * @param input The input containing the profile description and portfolio content.
 * @returns A list of suggested skill tags.
 */
export async function suggestSkillTags(input: SkillTagSuggestionInput): Promise<SkillTagSuggestionOutput> {
  return skillTagSuggestionFlow(input);
}

// Define the prompt for generating skill tag suggestions
const skillTagSuggestionPrompt = ai.definePrompt({
  name: 'skillTagSuggestionPrompt',
  input: {schema: SkillTagSuggestionInputSchema},
  output: {schema: SkillTagSuggestionOutputSchema},
  prompt: `You are an AI assistant that suggests relevant skill tags for talent profiles.

  Given the following profile description and portfolio content, suggest a list of skill tags that accurately represent the talent's skills and expertise.

  Profile Description: {{{profileDescription}}}
  Portfolio Content: {{{portfolioContent}}}

  Suggested Skill Tags:`,
});

// Define the Genkit flow for skill tag suggestion
const skillTagSuggestionFlow = ai.defineFlow(
  {
    name: 'skillTagSuggestionFlow',
    inputSchema: SkillTagSuggestionInputSchema,
    outputSchema: SkillTagSuggestionOutputSchema,
  },
  async input => {
    const {output} = await skillTagSuggestionPrompt(input);
    return output!;
  }
);
