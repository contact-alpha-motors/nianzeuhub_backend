import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, MapPin, Users, Briefcase, Clock, Star } from 'lucide-react';
import { talentProfiles } from '@/lib/data';
import TalentCard from '@/components/talent/TalentCard';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';

export default function Home() {
  const featuredTalents = talentProfiles.slice(0, 4);
  const popularTalents = talentProfiles.slice(4, 8);

  const categories = [
    { name: 'IT & Développement', icon: <Briefcase className="w-8 h-8 text-primary" /> },
    { name: 'Art & Design', icon: <Star className="w-8 h-8 text-primary" /> },
    { name: 'Ingénierie', icon: <Users className="w-8 h-8 text-primary" /> },
    { name: 'Ventes & Marketing', icon: <Clock className="w-8 h-8 text-primary" /> },
  ];

  return (
    <div className="bg-background">
      <section className="py-20 md:py-32 bg-secondary/50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold font-headline mb-4 tracking-tight">
            Trouvez le talent parfait
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Explorez notre communauté de professionnels qualifiés. Prêts à donner vie à vos idées.
          </p>
          <div className="max-w-4xl mx-auto bg-card p-4 rounded-lg shadow-lg border">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-2 items-center">
              <div className="md:col-span-2 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Quel talent recherchez-vous ?"
                  className="pl-10 w-full"
                />
              </div>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Domaine" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="it">IT & Développement</SelectItem>
                  <SelectItem value="art">Art & Design</SelectItem>
                  <SelectItem value="engineering">Ingénierie</SelectItem>
                  <SelectItem value="sales">Ventes & Marketing</SelectItem>
                </SelectContent>
              </Select>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input placeholder="Ville / pays" className="pl-10" />
              </div>
              <Button asChild size="lg" className="w-full">
                <Link href="/search">
                  <Search className="mr-2 h-5 w-5" />
                  Rechercher
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10 font-headline">
            Talents en vedette
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredTalents.map((talent) => (
              <TalentCard key={talent.id} talent={talent} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-secondary/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10 font-headline">
            Parcourir par catégorie
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category) => (
              <Card key={category.name} className="group hover:shadow-xl transition-shadow duration-300">
                <Link href="/search" className="block p-6 text-center">
                  <div className="flex justify-center mb-4">{category.icon}</div>
                  <h3 className="font-semibold text-lg">{category.name}</h3>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10 font-headline">
            Talents populaires
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {popularTalents.map((talent) => (
              <TalentCard key={talent.id} talent={talent} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
