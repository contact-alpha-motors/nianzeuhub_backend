import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function PortfolioPage() {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Portfolio</CardTitle>
          <CardDescription>Gérez les éléments de votre portfolio ici.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>La fonctionnalité de modification du portfolio est en cours de construction.</p>
        </CardContent>
      </Card>
    </div>
  );
}
