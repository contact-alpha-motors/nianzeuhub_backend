export type PortfolioItem = {
  id: string;
  type: 'image' | 'pdf' | 'video' | 'link';
  title: string;
  description: string;
  url: string;
  thumbnailUrl: string;
};

export type Experience = {
  id: string;
  title: string;
  company: string;
  startDate: string;
  endDate: string | 'Present';
  description: string;
};

export type Certification = {
  id: string;
  name: string;
  issuingOrganization: string;
  dateAwarded: string;
};

export type Contact = {
  email: string;
  whatsapp?: string;
  useInternalForm: boolean;
};

export type TalentProfile = {
  id: string;
  name: string;
  photoUrl: string;
  photoHint: string;
  title: string;
  location: string;
  availability: 'immediate' | '1-week' | 'freelance' | 'full-time';
  experienceLevel: 'junior' | 'intermediate' | 'senior';
  bio: string;
  skills: string[];
  portfolio: PortfolioItem[];
  experience: Experience[];
  certifications: Certification[];
  rate?: number;
  contact: Contact;
  stats: {
    views: number;
    contacts: number;
  };
};
