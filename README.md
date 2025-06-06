# New Life Next

Ce projet est une application web développée avec [Next.js](https://nextjs.org) pour gérer et visualiser des données personnelles.

## Prérequis

Avant de commencer, assurez-vous d'avoir installé les outils suivants sur votre machine :

- [Node.js](https://nodejs.org/) (version 18.17.0 ou supérieure)
- [npm](https://www.npmjs.com/) (généralement installé avec Node.js)
- [Git](https://git-scm.com/) pour cloner le dépôt

## Installation

1. Clonez le dépôt :
   ```bash
   git clone <url-du-dépôt>
   cd new-life-next
   ```

2. Installez les dépendances :
   ```bash
   npm install
   ```

3. Configuration de Supabase (base de données) :
   - Créez un compte sur [Supabase](https://supabase.com/) si vous n'en avez pas déjà un
   - Créez un nouveau projet dans Supabase
   - Récupérez votre URL Supabase et votre clé API anonyme
   - Créez un fichier `.env.local` à la racine du projet avec les variables suivantes :
     ```
     NEXT_PUBLIC_SUPABASE_URL=votre-url-supabase
     NEXT_PUBLIC_SUPABASE_ANON_KEY=votre-clé-api-anonyme
     ```

## Lancement du projet en développement

Pour lancer le serveur de développement :

```bash
npm run dev
```

L'application sera accessible à l'adresse [http://localhost:3000](http://localhost:3000).

Le serveur de développement utilise Turbopack pour des performances optimales. Si vous rencontrez des problèmes, vous pouvez désactiver Turbopack en modifiant la commande `dev` dans `package.json` :
```json
"dev": "next dev"
```

## Structure du projet

- `/app` - Contient les pages et composants de l'application (structure App Router de Next.js)
- `/app/components` - Composants réutilisables
- `/app/login` - Page de connexion
- `/app/profil` - Page de profil utilisateur
- `/public` - Fichiers statiques (images, etc.)

## Scripts disponibles

- `npm run dev` - Lance le serveur de développement
- `npm run build` - Compile l'application pour la production
- `npm run start` - Lance l'application compilée
- `npm run lint` - Vérifie le code avec ESLint

## Dépendances principales

- Next.js 15.3.2 - Framework React
- React 19.0.0 - Bibliothèque UI
- Supabase - Base de données et authentification
- Chart.js - Visualisation de données
- Radix UI - Composants UI accessibles

## Déploiement

### Déploiement sur Vercel

La façon la plus simple de déployer cette application Next.js est d'utiliser la [plateforme Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

1. Créez un compte sur [Vercel](https://vercel.com/)
2. Importez votre dépôt GitHub/GitLab/Bitbucket
3. Configurez les variables d'environnement (NEXT_PUBLIC_SUPABASE_URL et NEXT_PUBLIC_SUPABASE_ANON_KEY)
4. Déployez

### Déploiement sur Netlify

Le projet est également configuré pour fonctionner avec Netlify :

1. Créez un compte sur [Netlify](https://www.netlify.com/)
2. Importez votre dépôt
3. Configurez les paramètres de build :
   - Commande de build : `npm run build`
   - Répertoire de publication : `.next`
4. Configurez les variables d'environnement
5. Déployez

## Ressources supplémentaires

- [Documentation Next.js](https://nextjs.org/docs)
- [Documentation Supabase](https://supabase.com/docs)
- [Documentation Chart.js](https://www.chartjs.org/docs/latest/)
- [Documentation Radix UI](https://www.radix-ui.com/docs)
