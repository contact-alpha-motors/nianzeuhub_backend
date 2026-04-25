# ANALYSIS REPORT - Nianzeuhub

## 1. Cartographie du Frontend
- **Framework utilisé** : Next.js 15 (App Router), React 18
- **Styling & UI** : Tailwind CSS, Radix UI (shadcn/ui), Recharts (pour les graphiques du dashboard), Lucide React (icônes)
- **Structure des dossiers** :
  - `src/app/` : Contient les routes (pages principales).
  - `src/components/` : Composants réutilisables, séparés en `ui/` (éléments de base), `talent/` (composants liés aux talents, ex: `TalentCard`, `ProfileForm`), et `layout/`.
  - `src/lib/` : Utilitaires et fausses données actuelles (`data.ts`, `types.ts`).
- **Routes / Pages existantes** :
  - `/` : Page d'accueil (Home) avec mise en avant des talents et catégories.
  - `/search` : Page de recherche de talents avec filtres (mot-clé, domaine, niveau, disponibilité).
  - `/profile/[id]` : Page de profil public d'un talent avec ses détails (portfolio, expérience, certifications).
  - `/dashboard` : Tableau de bord personnel du talent affichant ses statistiques (vues, contacts).
  - `/dashboard/edit` : Formulaire d'édition du profil.
  - `/dashboard/portfolio` : Gestion du portfolio.
  - `/(auth)/login` : Page de connexion.
  - `/(auth)/signup` : Page d'inscription.

## 2. Extraction des besoins Backend
- **Données mockées actuelles (à remplacer par des API)** :
  - Les profils `TalentProfile` (identifiants, informations personnelles, portfolio, expériences, certifications, statistiques) dans `src/lib/data.ts`.
- **Formulaires et Actions utilisateur** :
  - Formulaire de recherche (filtres dynamiques) -> `GET` avec query params.
  - Formulaires d'authentification (login, register) -> `POST`.
  - Formulaire de mise à jour du profil (édition des infos de base, expériences, certifications, etc.) -> `PUT`/`PATCH`.
  - Boutons de contact (email/WhatsApp ou formulaire interne).
- **Logique d'authentification** : Actuellement absente du frontend. Elle devra être implémentée via JWT, stocké côté client (localStorage/cookies) et transmis via un intercepteur (Bearer).
- **Fichiers de config réseau** : Il n'y a pas encore d'instance de client HTTP (`axios` ou `fetch` wrapper). Nous devrons en créer un pour gérer la base URL, les tokens JWT et les erreurs.

## 3. Liste des routes API nécessaires
| Méthode | Path | Description | Authentification Requise |
|---|---|---|---|
| POST | `/api/auth/register` | Inscription d'un utilisateur | Non |
| POST | `/api/auth/login` | Connexion (retourne access + refresh tokens) | Non |
| POST | `/api/auth/refresh` | Renouvelle le token via refresh_token | Non |
| POST | `/api/auth/logout` | Déconnexion (invalide le refresh_token) | Oui |
| GET | `/api/auth/me` | Récupère le profil de l'utilisateur connecté | Oui |
| POST | `/api/auth/forgot-password` | Demande de réinitialisation de mot de passe | Non |
| POST | `/api/auth/reset-password` | Réinitialisation de mot de passe | Non |
| GET | `/api/talents` | Recherche/Liste de talents avec filtres | Non |
| GET | `/api/talents/{id}` | Détails publics d'un talent | Non |
| PUT | `/api/talents/me` | Met à jour le profil du talent connecté | Oui |
| POST | `/api/portfolio` | Ajoute un élément au portfolio | Oui |
| PUT | `/api/portfolio/{id}` | Modifie un élément du portfolio | Oui |
| DELETE | `/api/portfolio/{id}` | Supprime un élément du portfolio | Oui |
| POST | `/api/experience` | Ajoute une expérience professionnelle | Oui |
| PUT | `/api/experience/{id}` | Modifie une expérience | Oui |
| DELETE | `/api/experience/{id}` | Supprime une expérience | Oui |
| POST | `/api/certifications` | Ajoute une certification | Oui |
| PUT | `/api/certifications/{id}`| Modifie une certification | Oui |
| DELETE | `/api/certifications/{id}`| Supprime une certification | Oui |
| GET | `/api/stats/me` | Récupère les stats du dashboard (vues, contacts) | Oui |

## 4. Schéma de base de données (Supabase / PostgreSQL)
- **Table `users`** (Gérée par Supabase Auth principalement, mais on peut avoir un profil lié)
- **Table `profiles`**
  - `id` (uuid, PK, ref `auth.users.id`)
  - `role` (enum: admin, talent)
  - `name` (varchar)
  - `title` (varchar)
  - `location` (varchar)
  - `availability` (varchar)
  - `experience_level` (varchar)
  - `bio` (text)
  - `rate` (numeric)
  - `photo_url` (varchar)
  - `photo_hint` (varchar)
  - `contact_email` (varchar)
  - `contact_whatsapp` (varchar)
  - `use_internal_form` (boolean)
  - `skills` (text[]) -> _Tableau PostgreSQL pour stocker les compétences directement, ou table de liaison_
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)
- **Table `portfolio_items`**
  - `id` (uuid, PK)
  - `profile_id` (uuid, FK `profiles.id`)
  - `type` (varchar: image, pdf, video, link)
  - `title` (varchar)
  - `description` (text)
  - `url` (varchar)
  - `thumbnail_url` (varchar)
  - `created_at` (timestamptz)
- **Table `experiences`**
  - `id` (uuid, PK)
  - `profile_id` (uuid, FK `profiles.id`)
  - `title` (varchar)
  - `company` (varchar)
  - `start_date` (varchar)
  - `end_date` (varchar)
  - `description` (text)
  - `created_at` (timestamptz)
- **Table `certifications`**
  - `id` (uuid, PK)
  - `profile_id` (uuid, FK `profiles.id`)
  - `name` (varchar)
  - `issuing_organization` (varchar)
  - `date_awarded` (varchar)
  - `created_at` (timestamptz)
- **Table `profile_stats`**
  - `profile_id` (uuid, PK, FK `profiles.id`)
  - `total_views` (integer)
  - `total_contacts` (integer)
  - `search_appearances` (integer)
- **Table `monthly_stats`**
  - `id` (uuid, PK)
  - `profile_id` (uuid, FK `profiles.id`)
  - `month` (date)
  - `views` (integer)
  - `contacts` (integer)

## 5. Rôles Utilisateurs Identifiés
1. **Visiteur Anonyme** : Peut chercher des talents, voir les profils publics.
2. **Talent (Utilisateur connecté)** : Possède un profil, peut éditer ses informations, son portfolio, ses expériences, et consulter ses statistiques.
3. **Admin** (Non explicite dans le frontend actuel, mais à prévoir) : Gestion globale de la plateforme, suppression de comptes.

## 6. Plan d'implémentation (Prochaines Étapes)
- **Phase 1** : Configuration du projet backend FastAPI (structure, `requirements.txt`, `.env`).
- **Phase 2** : Implémentation du Core Backend (Auth JWT, middleware, rate limiting, logging).
- **Phase 3** : Création des routes métier, des services et des schémas Pydantic.
- **Phase 4** : Configuration de la DB Supabase (Migrations SQL, RLS, Seed data).
- **Phase 5** : Transformation du frontend en PWA (Manifest, Service Worker, Offline).
- **Phase 6** : Connexion Frontend ↔ Backend (Client API, remplacement du mock, états de chargement).
- **Phase 7 & 8** : Tests, documentation et déploiement.
