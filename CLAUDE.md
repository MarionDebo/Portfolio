# CLAUDE.md — Portfolio PM · Astro

## Contexte projet

Portfolio personnel d'un **Product Manager spécialisé en AI-native**. Le site est construit avec **Astro** et le design est généré via Claude. L'objectif est de positionner le PM comme une référence à l'intersection du product management et de l'intelligence artificielle.

---

## Stack technique

- **Framework** : [Astro](https://astro.build/) (dernière version stable)
- **Rendu** : SSG (Static Site Generation) par défaut — SSR uniquement si nécessaire (formulaire de contact, etc.)
- **Styling** : CSS custom via fichiers `.css` dans `src/styles/` — ne pas utiliser Tailwind sauf demande explicite
- **Composants** : `.astro` en priorité ; React/Svelte uniquement si interactivité client requise (directive `client:load` / `client:visible`)
- **Images** : composant `<Image />` d'`astro:assets` pour l'optimisation automatique
- **Typographie & assets** : polices chargées via `@fontsource` ou `<link>` Google Fonts dans `<head>`
- **Déploiement cible** : Vercel ou Netlify (adapter `astro.config.mjs` si besoin)

---

## Architecture des fichiers

```
/
├── public/
│   └── favicon.svg
├── docs/
│   └── design/          # RÉFÉRENCE design (handoff) : maquettes, screenshots, specs.
│                        # Archive figée, hors build — ≠ design system (qui vit dans le code).
├── src/
│   ├── assets/
│   │   └── images/      # images optimisées par Astro, rangées par usage
│   │       ├── portraits/     # portrait-marion.jpg
│   │       ├── testimonials/  # avatars des recommandations
│   │       ├── projects/      # captures d'études de cas
│   │       ├── badges/        # certifications / formations
│   │       └── about/         # photos My Story (group-photo, etc.)
│   ├── components/      # composants réutilisables (.astro), groupés par rôle
│   │   ├── ui/          # primitives : Button, Tag, SectionHeader
│   │   ├── layout/      # Nav, Footer
│   │   └── sections/    # blocs de page : Hero, ProjectCard, BrowserMock, PhoneMock, GithubGraph
│   ├── layouts/
│   │   └── BaseLayout.astro   # layout racine (head, nav, footer)
│   ├── pages/
│   │   ├── index.astro            # Home
│   │   ├── ai-expertise.astro     # AI Expertise
│   │   ├── work.astro             # Work (grille de projets)
│   │   ├── my-story.astro         # My Story
│   │   └── portfolio/[slug].astro # page détail d'étude de cas
│   ├── styles/         # CSS scindé, importé via global.css :
│   │   ├── global.css   # point d'entrée — @import des 3 fichiers ci-dessous
│   │   ├── tokens.css   # variables CSS (couleurs, typo, espacements…) = design system
│   │   ├── reset.css    # reset & éléments de base
│   │   └── base.css     # utilitaires partagés, focus, scrollbar, animations
│   └── content/         # collections Astro Content (Markdown/MDX)
│       └── portfolio/   # études de cas en .md
├── astro.config.mjs
├── package.json
└── CLAUDE.md
```

> **Design system ≠ design handoff.** Le *design system* vivant = `src/styles/tokens.css` (tokens)
> + `src/components/` (composants). On le fait évoluer ici. Le *handoff* dans `docs/design/` est la
> référence d'entrée figée (maquettes & specs) — on la consulte, on ne la modifie pas.

---

## Pages & contenu

### `/` — Page d'accueil
- Hero avec accroche positionnante (PM × AI × Analytics)
- Proposition de valeur claire en 1 ou 2 phrases
- Navigation rapide vers les 3 autres sections
- Ton : direct, expert, sans jargon inutile

### `/ai-expertise` — AI Expertise
- Domaines de compétence AI : embedded analytics, LLM intégration produit, AI-native UX, data storytelling
- Frameworks et approches produit utilisés (ex : Jobs-to-be-done, product-led growth, etc.)
- Outils maîtrisés (ex : dbt, Metabase, Superset, OpenAI API, LangChain, etc.) — à affiner avec le vrai contenu
- Possibilité d'ajouter des blocs "insight" ou citations issues de l'expérience terrain

### `/portfolio` — Portfolio
- Grille de projets / études de cas produit
- Chaque carte : titre, contexte, impact, tags (AI / Data / B2B SaaS / etc.)
- Clic → page de détail ou modal (à définir)
- Contenu géré via Astro Content Collections (fichiers `.mdx` dans `src/content/portfolio/`)

### `/my-story` — My Story
- Parcours chronologique ou narratif (pas un simple CV)
- Moments clés : décisions, pivots, apprentissages
- Ton : humain, authentique, incarné
- Photo, pas de liste à puces sèche
- Kind Words from Teammates: 3 Recommandations de collègues

---

## Navigation

- Barre de navigation persistante (composant `Nav.astro`) avec les 4 liens
- Lien actif mis en évidence via `Astro.url.pathname`
- Navigation responsive (menu burger sur mobile)

---

## Conventions de code

- **Nommage** : PascalCase pour les composants `.astro`, kebab-case pour les fichiers de pages et styles
- **Variables CSS** : définies dans `global.css` sous `:root {}` — toujours utiliser des variables pour couleurs, espacements, typographie
- **Pas de JS inline** dans les templates sauf pour la logique Astro (`---` frontmatter)
- **Accessibilité** : attributs `alt` sur toutes les images, landmarks ARIA (`<main>`, `<nav>`, `<footer>`), contraste suffisant
- **Performance** : lazy-loading natif sur les images hors viewport, pas de dépendances inutiles côté client

---

## Ton éditorial & voix

- **Langue** : Anglais (site international)
- **Ton** : expert mais accessible, confiant sans arrogance, curieux, orienté impact
- **À éviter** : buzzwords vides ("passionate about", "results-driven"), listes interminables, jargon sans contexte
- **À privilégier** : chiffres concrets, récits de décisions produit, point de vue affirmé sur l'AI en produit

---

## Commandes utiles

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Build de production
npm run build

# Prévisualiser le build
npm run preview
```

---

## Notes pour Claude Code

- Toujours travailler depuis la racine du projet
- Ne pas modifier les fichiers de design générés par Claude Design sans instruction explicite
- Si une page nécessite des données dynamiques, privilégier les Astro Content Collections plutôt qu'un fetch client-side
- Pour toute nouvelle page, créer le fichier dans `src/pages/` et mettre à jour `Nav.astro`
- Les métadonnées SEO (title, description, og:image) sont gérées dans `BaseLayout.astro` via des props
