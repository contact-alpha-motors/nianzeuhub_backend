'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import type { TalentProfile } from '@/lib/types';
import SkillSuggest from '@/components/talent/SkillSuggest';
import { Badge } from '../ui/badge';
import { X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const profileFormSchema = z.object({
  name: z.string().min(2, 'Le nom doit comporter au moins 2 caractères.'),
  title: z.string().min(5, 'Le titre doit comporter au moins 5 caractères.'),
  location: z.string().min(2, 'La localisation est requise.'),
  bio: z.string().max(500, 'La bio ne doit pas dépasser 500 caractères.').min(10, "La bio doit comporter au moins 10 caractères."),
  rate: z.coerce.number().optional(),
  experienceLevel: z.enum(['junior', 'intermediate', 'senior']),
  availability: z.enum(['immediate', '1-week', 'freelance', 'full-time']),
  skills: z.array(z.string()).min(1, 'Au moins une compétence est requise.'),
  email: z.string().email(),
  whatsapp: z.string().optional(),
  useInternalForm: z.boolean(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export default function ProfileForm({ profile }: { profile: TalentProfile }) {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: profile.name,
      title: profile.title,
      location: profile.location,
      bio: profile.bio,
      rate: profile.rate,
      experienceLevel: profile.experienceLevel,
      availability: profile.availability,
      skills: profile.skills,
      email: profile.contact.email,
      whatsapp: profile.contact.whatsapp,
      useInternalForm: profile.contact.useInternalForm,
    },
    mode: 'onChange',
  });
  
  const description = form.watch('bio');

  function onSubmit(data: ProfileFormValues) {
    console.log(data);
    toast({
        title: "Profil mis à jour",
        description: "Vos modifications ont été enregistrées avec succès.",
    })
  }
  
  const addSkill = (skill: string) => {
    const currentSkills = form.getValues('skills');
    if (skill && !currentSkills.includes(skill)) {
      form.setValue('skills', [...currentSkills, skill]);
    }
  };

  const removeSkill = (skillToRemove: string) => {
    const currentSkills = form.getValues('skills');
    form.setValue('skills', currentSkills.filter(skill => skill !== skillToRemove));
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Informations personnelles</CardTitle>
            <CardDescription>Mettez à jour vos informations de profil public.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom complet</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Titre professionnel</FormLabel>
                    <FormControl>
                      <Input placeholder="ex: Développeur logiciel senior" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Localisation</FormLabel>
                  <FormControl>
                    <Input placeholder="Paris, France" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mini-Bio</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Parlez-nous un peu de vous" className="resize-y min-h-[100px]" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Détails professionnels</CardTitle>
            <CardDescription>Définissez votre tarif, votre niveau d'expérience et votre disponibilité.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               <FormField
                  control={form.control}
                  name="rate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Taux horaire (€)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="ex: 75" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
               <FormField
                  control={form.control}
                  name="experienceLevel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Niveau d'expérience</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger><SelectValue placeholder="Sélectionnez un niveau" /></SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="junior">Junior</SelectItem>
                          <SelectItem value="intermediate">Intermédiaire</SelectItem>
                          <SelectItem value="senior">Senior</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="availability"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Disponibilité</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                           <SelectTrigger><SelectValue placeholder="Sélectionnez une disponibilité" /></SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="immediate">Immédiate</SelectItem>
                          <SelectItem value="1-week">Dans 1 semaine</SelectItem>
                          <SelectItem value="freelance">Freelance</SelectItem>
                          <SelectItem value="full-time">Plein temps</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
             </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Compétences</CardTitle>
            <CardDescription>Listez vos compétences. Utilisez notre assistant IA pour des suggestions basées sur votre bio.</CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="skills"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                     <SkillSuggest onSkillAdd={addSkill} profileDescription={description} />
                  </FormControl>
                  <div className="space-x-2 space-y-2 pt-4">
                    {field.value.map(skill => (
                      <Badge key={skill} variant="secondary" className="text-base py-1 pl-3 pr-2">
                        {skill}
                        <button type="button" onClick={() => removeSkill(skill)} className="ml-2 rounded-full hover:bg-destructive/20 p-0.5">
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Coordonnées</CardTitle>
            <CardDescription>Comment les recruteurs peuvent-ils vous contacter ?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email de contact</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="votre.email@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="whatsapp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Numéro WhatsApp (Optionnel)</FormLabel>
                    <FormControl>
                      <Input placeholder="+33612345678" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="useInternalForm"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Autoriser le contact via le formulaire interne</FormLabel>
                    <FormDescription>
                      Les recruteurs peuvent vous contacter via un formulaire sur votre page de profil.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit">Enregistrer les modifications</Button>
        </div>
      </form>
    </Form>
  );
}
