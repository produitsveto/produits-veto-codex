# Produits-veto.com - Home page

Prototype front de la nouvelle home Produits-veto.com, construit comme une page statique rendue depuis des donnees JavaScript. Le HTML final contient le contenu SEO, le JSON-LD, les liens internes et les sections principales ; le JavaScript client ne sert qu'aux interactions.

## Fichiers principaux

- `src/data/home-data.mjs` : donnees mockees Strapi et Medusa pour la home.
- `src/render/home.mjs` : rendu HTML des composants et schema.org.
- `src/styles.css` : design system, layout responsive, composants UI.
- `src/app.js` : menu mobile, mega-menu, recherche locale, panier simule, newsletter.
- `scripts/build.mjs` : genere `index.html`.

## Lancer localement

Sans dependance externe :

```bash
node scripts/build.mjs
python -m http.server 4173
```

Puis ouvrir `http://localhost:4173`.

## Branchement futur

Strapi doit remplacer les blocs editoriaux de `home-data.mjs` : hero, rassurance, categories editoriales, articles, FAQ, SEO, footer et campagnes. Medusa doit remplacer les rails produits : prix, variantes, stock, promotions, marques, collections et disponibilite. Cloudflare Workers peut ensuite gerer le cache edge, les variations pays/langue/canal, les redirections, la purge par tag et les experimentations marketing.
