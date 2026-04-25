import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Briefcase } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-card/80 backdrop-blur-lg sticky top-0 z-40 border-b">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link href="/" className="flex items-center gap-2">
          <Briefcase className="h-7 w-7 text-primary" />
          <span className="text-xl font-bold tracking-tight font-headline">NianzeuHub</span>
        </Link>
        <nav className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/search">Trouver un Talent</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/login">Se connecter</Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard">Publier un profil</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
