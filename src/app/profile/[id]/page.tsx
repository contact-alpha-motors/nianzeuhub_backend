import { talentProfiles } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { MapPin, Briefcase, Calendar, Award, Mail, MessageCircle, ExternalLink, Globe } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage({ params }: { params: { id: string } }) {
  const talent = talentProfiles.find((p) => p.id === params.id);

  if (!talent) {
    notFound();
  }

  const getWhatsAppLink = (phone?: string) => {
    if (!phone) return null;
    const cleanedPhone = phone.replace(/[^0-9]/g, '');
    return `https://wa.me/${cleanedPhone}`;
  }

  return (
    <div className="bg-secondary/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column (Main Info) */}
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardContent className="p-6 flex flex-col sm:flex-row gap-6">
                <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden shrink-0 mx-auto sm:mx-0 border-4 border-primary/50 shadow-lg">
                  <Image
                    src={talent.photoUrl}
                    alt={`Portrait de ${talent.name}`}
                    fill
                    className="object-cover"
                    data-ai-hint={talent.photoHint}
                  />
                </div>
                <div className="text-center sm:text-left">
                  <h1 className="text-3xl font-bold font-headline">{talent.name}</h1>
                  <p className="text-lg text-primary">{talent.title}</p>
                  <div className="flex items-center text-muted-foreground mt-2 justify-center sm:justify-start">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{talent.location}</span>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2 justify-center sm:justify-start">
                    {talent.skills.map((skill) => (
                      <Badge key={skill} variant="default">{skill}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>À propos de moi</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground whitespace-pre-line">{talent.bio}</p>
              </CardContent>
            </Card>

            {talent.portfolio.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Portfolio</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {talent.portfolio.map((item) => (
                    <a href={item.url} key={item.id} target="_blank" rel="noopener noreferrer" className="group block border rounded-lg overflow-hidden relative shadow-sm hover:shadow-xl transition-shadow">
                       <Image src={item.thumbnailUrl} alt={item.title} width={600} height={400} className="object-cover aspect-video transition-transform duration-300 group-hover:scale-105" data-ai-hint="portfolio item"/>
                       <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                         <h4 className="font-bold text-white">{item.title}</h4>
                         <p className="text-sm text-white/80">{item.description}</p>
                         <ExternalLink className="w-4 h-4 text-white mt-2"/>
                       </div>
                    </a>
                  ))}
                </CardContent>
              </Card>
            )}

            {talent.experience.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Expérience professionnelle</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {talent.experience.map((exp, index) => (
                    <div key={exp.id} className="relative pl-6">
                      <div className="absolute left-0 top-1 h-full border-l-2"></div>
                      <div className="absolute left-[-5px] top-1 w-3 h-3 rounded-full bg-primary"></div>
                      <p className="font-semibold">{exp.title}</p>
                      <p className="text-sm text-muted-foreground">{exp.company}</p>
                      <p className="text-xs text-muted-foreground">{exp.startDate} - {exp.endDate}</p>
                      <p className="mt-2 text-sm">{exp.description}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {talent.certifications.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Certifications</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {talent.certifications.map((cert) => (
                    <div key={cert.id} className="flex items-start gap-4">
                      <div className="p-2 bg-accent/20 rounded-full">
                        <Award className="w-5 h-5 text-accent-foreground" />
                      </div>
                      <div>
                        <p className="font-semibold">{cert.name}</p>
                        <p className="text-sm text-muted-foreground">{cert.issuingOrganization} - {cert.dateAwarded}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column (Contact & Details) */}
          <div className="lg:col-span-1 space-y-8">
            <Card>
              <CardContent className="p-6">
                <Button className="w-full" size="lg">
                  <Mail className="mr-2 h-5 w-5" /> Contacter {talent.name.split(' ')[0]}
                </Button>
                {talent.contact.whatsapp && (
                    <Button asChild className="w-full mt-2" variant="outline">
                       <a href={getWhatsAppLink(talent.contact.whatsapp) || '#'} target="_blank" rel="noopener noreferrer">
                         <MessageCircle className="mr-2 h-5 w-5"/> WhatsApp
                       </a>
                    </Button>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 space-y-4">
                 <div className="flex items-center">
                  <Briefcase className="w-5 h-5 mr-3 text-muted-foreground" />
                  <div>
                    <span className="text-sm text-muted-foreground">Niveau</span>
                    <p className="font-medium capitalize">{talent.experienceLevel}</p>
                  </div>
                 </div>
                 <Separator/>
                 <div className="flex items-center">
                  <Calendar className="w-5 h-5 mr-3 text-muted-foreground" />
                  <div>
                    <span className="text-sm text-muted-foreground">Disponibilité</span>
                    <p className="font-medium capitalize">{talent.availability}</p>
                  </div>
                 </div>
                 {talent.rate && (
                  <>
                    <Separator/>
                    <div className="flex items-center">
                      <Globe className="w-5 h-5 mr-3 text-muted-foreground" />
                      <div>
                        <span className="text-sm text-muted-foreground">Taux horaire</span>
                        <p className="font-medium">€{talent.rate} / heure</p>
                      </div>
                    </div>
                  </>
                 )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
