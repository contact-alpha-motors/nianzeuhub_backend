import type { TalentProfile } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';

type TalentCardProps = {
  talent: TalentProfile;
};

const TalentCard = ({ talent }: TalentCardProps) => {
  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <CardHeader className="p-0">
        <Link href={`/profile/${talent.id}`} className="block">
          <div className="aspect-square relative">
            <Image
              src={talent.photoUrl}
              alt={`Portrait de ${talent.name}`}
              fill
              className="object-cover"
              data-ai-hint={talent.photoHint}
            />
          </div>
        </Link>
      </CardHeader>
      <CardContent className="p-4 flex-grow flex flex-col">
        <Link href={`/profile/${talent.id}`}>
          <h3 className="font-bold text-lg font-headline truncate">{talent.name}</h3>
        </Link>
        <p className="text-sm text-muted-foreground truncate">{talent.title}</p>
        <div className="flex items-center text-sm text-muted-foreground mt-2">
          <MapPin className="h-4 w-4 mr-1 shrink-0" />
          <span>{talent.location}</span>
        </div>
        <div className="mt-4 flex flex-wrap gap-2 flex-grow items-end">
          {talent.skills.slice(0, 3).map((skill) => (
            <Badge key={skill} variant="secondary">
              {skill}
            </Badge>
          ))}
          {talent.skills.length > 3 && (
            <Badge variant="outline">+{talent.skills.length - 3}</Badge>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full" variant="outline">
          <Link href={`/profile/${talent.id}`}>Voir le profil</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TalentCard;
