import type { TalentProfile } from './types';

export const talentProfiles: TalentProfile[] = [
  {
    id: '1',
    name: 'Alice Dubois',
    photoUrl: 'https://picsum.photos/seed/1/400/400',
    photoHint: 'woman portrait',
    title: 'Graphiste senior',
    location: 'Paris, France',
    availability: 'freelance',
    experienceLevel: 'senior',
    bio: "Graphiste passionnée avec plus de 10 ans d'expérience en branding et médias numériques. Je transforme des idées complexes en designs beaux et intuitifs. À la recherche de projets freelance passionnants.",
    skills: ['Design UI/UX', 'Branding', 'Suite Adobe Creative', 'Figma', 'Illustration'],
    portfolio: [
      { id: 'p1', type: 'image', title: 'Identité de marque pour une startup', description: 'Package de branding complet.', url: 'https://picsum.photos/seed/9/600/400', thumbnailUrl: 'https://picsum.photos/seed/9/600/400' },
      { id: 'p2', type: 'link', title: 'Projet Web Interactif', description: 'Un projet pour un musée.', url: '#', thumbnailUrl: 'https://picsum.photos/seed/10/600/400' }
    ],
    experience: [
      { id: 'e1', title: 'Designer principale', company: 'Agence Créative', startDate: '2018', endDate: 'Présent', description: 'Direction de projets de design pour de grands clients.' }
    ],
    certifications: [
      { id: 'c1', name: 'Professionnel UX Certifié', issuingOrganization: 'Nielsen Norman Group', dateAwarded: '2020' }
    ],
    rate: 80,
    contact: { email: 'alice.d@example.com', useInternalForm: true },
    stats: { views: 1450, contacts: 52 }
  },
  {
    id: '2',
    name: 'Bob Martin',
    photoUrl: 'https://picsum.photos/seed/2/400/400',
    photoHint: 'man portrait',
    title: 'Développeur Full Stack Python',
    location: 'Lyon, France',
    availability: 'immediate',
    experienceLevel: 'intermediate',
    bio: "Ingénieur logiciel spécialisé en Python (Django, Flask) et React. J'aime construire des applications web évolutives et résoudre des problèmes complexes. Disponible pour un poste à temps plein.",
    skills: ['Python', 'Django', 'React', 'PostgreSQL', 'Docker', 'AWS'],
    portfolio: [
      { id: 'p3', type: 'link', title: 'Plateforme E-commerce', description: 'Construite avec Django et React.', url: '#', thumbnailUrl: 'https://picsum.photos/seed/11/600/400' }
    ],
    experience: [
      { id: 'e2', title: 'Développeur logiciel', company: 'Tech Solutions Inc.', startDate: '2020', endDate: '2023', description: 'Développement et maintenance d\'applications web.' }
    ],
    certifications: [],
    contact: { email: 'bob.m@example.com', whatsapp: '+33612345678', useInternalForm: false },
    stats: { views: 980, contacts: 25 }
  },
  {
    id: '3',
    name: 'Chloé Perrin',
    photoUrl: 'https://picsum.photos/seed/3/400/400',
    photoHint: 'woman professional',
    title: 'Spécialiste Marketing & SEO',
    location: 'Marseille, France',
    availability: '1-week',
    experienceLevel: 'intermediate',
    bio: 'Spécialiste du marketing axée sur les données, avec un accent sur le SEO et la stratégie de contenu. Bilan prouvé de l\'augmentation du trafic organique et de l\'amélioration des taux de conversion.',
    skills: ['SEO', 'Marketing de contenu', 'Google Analytics', 'SEM', 'Médias sociaux'],
    portfolio: [],
    experience: [
      { id: 'e3', title: 'Marketeur numérique', company: 'Growth Co.', startDate: '2019', endDate: 'Présent', description: 'Gestion des stratégies SEO et de contenu pour les clients B2B.' }
    ],
    certifications: [
      { id: 'c2', name: 'Certifié Google Analytics', issuingOrganization: 'Google', dateAwarded: '2022' }
    ],
    rate: 55,
    contact: { email: 'chloe.p@example.com', useInternalForm: true },
    stats: { views: 1230, contacts: 41 }
  },
  {
    id: '4',
    name: 'David Moreau',
    photoUrl: 'https://picsum.photos/seed/4/400/400',
    photoHint: 'man professional',
    title: 'Ingénieur automobile junior',
    location: 'Toulouse, France',
    availability: 'full-time',
    experienceLevel: 'junior',
    bio: "Jeune diplômé en ingénierie passionné par l'industrie automobile. Désireux d'appliquer mes compétences en conception mécanique et en simulation de systèmes dans un rôle stimulant.",
    skills: ['CATIA', 'MATLAB', 'Simulink', 'Conception mécanique', 'Ingénierie automobile'],
    portfolio: [],
    experience: [
      { id: 'e4', title: 'Stagiaire en ingénierie', company: 'Auto Innovations', startDate: '2022', endDate: '2023', description: 'Aide à la conception d\'un nouveau système de suspension.' }
    ],
    certifications: [],
    contact: { email: 'david.m@example.com', useInternalForm: true },
    stats: { views: 560, contacts: 15 }
  },
  {
    id: '5',
    name: 'Eva Girard',
    photoUrl: 'https://picsum.photos/seed/5/400/400',
    photoHint: 'person creative',
    title: 'Artiste créative & Illustratrice',
    location: 'Bordeaux, France',
    availability: 'freelance',
    experienceLevel: 'senior',
    bio: "Une artiste qui peint avec des pixels et des rêves. Mon travail explore l'intersection de la nature et de la technologie. Ouverte aux commandes et aux collaborations.",
    skills: ['Peinture numérique', 'Illustration', 'Conception de personnages', 'Procreate', 'Photoshop'],
    portfolio: [
       { id: 'p4', type: 'image', title: 'Série d\'œuvres numériques', description: 'Une collection d\'illustrations récentes.', url: 'https://picsum.photos/seed/12/600/400', thumbnailUrl: 'https://picsum.photos/seed/12/600/400' }
    ],
    experience: [],
    certifications: [],
    rate: 70,
    contact: { email: 'eva.g@example.com', useInternalForm: true },
    stats: { views: 2100, contacts: 88 }
  },
    {
    id: '6',
    name: 'Frank Leblanc',
    photoUrl: 'https://picsum.photos/seed/6/400/400',
    photoHint: 'person writing',
    title: 'Rédacteur Freelance',
    location: 'Lille, France',
    availability: 'freelance',
    experienceLevel: 'intermediate',
    bio: "Créer des mots qui vendent. J'aide les entreprises à communiquer avec leur public grâce à des textes de site web, des articles de blog et des campagnes par e-mail percutants.",
    skills: ['Copywriting', 'Stratégie de contenu', 'Blogging', 'Email Marketing', 'Ton de voix'],
    portfolio: [],
    experience: [
      { id: 'e5', title: 'Rédacteur indépendant', company: 'Indépendant', startDate: '2019', endDate: 'Présent', description: 'Travail avec divers clients dans les secteurs de la technologie et du e-commerce.' }
    ],
    certifications: [],
    rate: 60,
    contact: { email: 'frank.l@example.com', useInternalForm: true },
    stats: { views: 850, contacts: 30 }
  },
  {
    id: '7',
    name: 'Grace Petit',
    photoUrl: 'https://picsum.photos/seed/7/400/400',
    photoHint: 'woman tech',
    title: 'Data Scientist',
    location: 'Nantes, France',
    availability: '1-week',
    experienceLevel: 'senior',
    bio: "Je trouve des histoires dans les données. Expérimentée en apprentissage automatique, analyse statistique et visualisation de données pour orienter les décisions commerciales.",
    skills: ['Machine Learning', 'Python', 'R', 'SQL', 'Tableau', 'Visualisation de données'],
    portfolio: [],
    experience: [
      { id: 'e6', title: 'Data Scientist Senior', company: 'Data Insights Corp.', startDate: '2017', endDate: 'Présent', description: 'Création de modèles prédictifs et de produits de données.' }
    ],
    certifications: [],
    contact: { email: 'grace.p@example.com', useInternalForm: true },
    stats: { views: 1300, contacts: 45 }
  },
  {
    id: '8',
    name: 'Hugo Marchand',
    photoUrl: 'https://picsum.photos/seed/8/400/400',
    photoHint: 'man business',
    title: 'Chef de projet Agile',
    location: 'Strasbourg, France',
    availability: 'immediate',
    experienceLevel: 'senior',
    bio: "Scrum Master certifié avec un don pour livrer des projets complexes à temps et dans le respect du budget. Je favorise la collaboration et permets aux équipes de donner le meilleur d'elles-mêmes.",
    skills: ['Méthodologies Agile', 'Scrum', 'Jira', 'Gestion de projet', 'Leadership d\'équipe'],
    portfolio: [],
    experience: [
      { id: 'e7', title: 'Chef de projet', company: 'Software House', startDate: '2016', endDate: '2023', description: 'Gestion de plusieurs équipes de développement logiciel.' }
    ],
    certifications: [
      { id: 'c3', name: 'Certified ScrumMaster (CSM)', issuingOrganization: 'Scrum Alliance', dateAwarded: '2018' }
    ],
    rate: 90,
    contact: { email: 'hugo.m@example.com', whatsapp: '+33712345678', useInternalForm: false },
    stats: { views: 1150, contacts: 38 }
  }
];
