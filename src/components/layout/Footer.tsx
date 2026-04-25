import Link from 'next/link';
import { Briefcase, Twitter, Github, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-secondary/50 border-t">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Briefcase className="h-7 w-7 text-primary" />
              <span className="text-xl font-bold tracking-tight font-headline">NianzeuHub</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Connecter les talents et les opportunités.
            </p>
          </div>
          <div className="grid grid-cols-2 md:col-span-3 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-semibold mb-3">Pour les talents</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/signup" className="text-muted-foreground hover:text-primary">Créer un profil</Link></li>
                <li><Link href="/dashboard" className="text-muted-foreground hover:text-primary">Tableau de bord</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-primary">Comment ça marche</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Pour les recruteurs</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/search" className="text-muted-foreground hover:text-primary">Chercher des talents</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-primary">Tarifs</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-primary">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Entreprise</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="text-muted-foreground hover:text-primary">À propos</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-primary">Contact</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-primary">Politique de confidentialité</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} NianzeuHub. Tous droits réservés.
          </p>
          <div className="flex items-center gap-4 mt-4 sm:mt-0">
            <Link href="#" aria-label="Twitter"><Twitter className="h-5 w-5 text-muted-foreground hover:text-primary" /></Link>
            <Link href="#" aria-label="GitHub"><Github className="h-5 w-5 text-muted-foreground hover:text-primary" /></Link>
            <Link href="#" aria-label="LinkedIn"><Linkedin className="h-5 w-5 text-muted-foreground hover:text-primary" /></Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
