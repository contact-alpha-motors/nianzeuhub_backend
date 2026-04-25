import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { talentProfiles } from '@/lib/data';
import TalentCard from '@/components/talent/TalentCard';
import { Filter, Search } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function SearchPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  // Dans une vraie application, vous récupéreriez et filtreriez les données en fonction de searchParams
  const talents = talentProfiles;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold font-headline mb-6 flex items-center">
                <Filter className="w-5 h-5 mr-2" />
                Filtres
              </h2>
              <div className="space-y-6">
                <div>
                  <Label htmlFor="search-keyword">Mot-clé</Label>
                  <div className="relative mt-2">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input id="search-keyword" placeholder="ex: 'Python'" className="pl-10"/>
                  </div>
                </div>
                <div>
                  <Label htmlFor="domain">Domaine</Label>
                  <Select>
                    <SelectTrigger id="domain" className="mt-2">
                      <SelectValue placeholder="Tous les domaines" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="it">IT & Développement</SelectItem>
                      <SelectItem value="art">Art & Design</SelectItem>
                      <SelectItem value="engineering">Ingénierie</SelectItem>
                      <SelectItem value="sales">Ventes & Marketing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="level">Niveau</Label>
                  <Select>
                    <SelectTrigger id="level" className="mt-2">
                      <SelectValue placeholder="Tous niveaux" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="junior">Junior</SelectItem>
                      <SelectItem value="intermediate">Intermédiaire</SelectItem>
                      <SelectItem value="senior">Senior</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="availability">Disponibilité</Label>
                  <Select>
                    <SelectTrigger id="availability" className="mt-2">
                      <SelectValue placeholder="Toute disponibilité" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">Immédiate</SelectItem>
                      <SelectItem value="1-week">Sous 1 semaine</SelectItem>
                      <SelectItem value="freelance">Freelance</SelectItem>
                      <SelectItem value="full-time">CDI</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                 <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">Appliquer les filtres</Button>
              </div>
            </CardContent>
          </Card>
        </aside>

        <main className="lg:col-span-3">
          <h1 className="text-3xl font-bold font-headline mb-6">
            Affichage de {talents.length} talents
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {talents.map((talent) => (
              <TalentCard key={talent.id} talent={talent} />
            ))}
          </div>
          <div className="mt-12 text-center">
              <Button variant="outline">Charger plus</Button>
          </div>
        </main>
      </div>
    </div>
  );
}
