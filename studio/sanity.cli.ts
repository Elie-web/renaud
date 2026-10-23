import { defineCliConfig } from 'sanity/cli'

// Configuration lue UNIQUEMENT par la ligne de commande (`sanity cors`,
// `sanity deploy`…). À ne pas confondre avec `sanity.config.js`, qui configure
// le studio lui-même. Sans ce fichier, toutes les commandes échouent sur
// « sanity.cli.js does not contain a project identifier ».
//
// ⚠ Extension `.ts` et pas `.js`, bien que le reste du studio soit en
// JavaScript. Ce paquet est en `"type": "module"` et la ligne de commande
// compile sa config en CommonJS avant de l'évaluer : un fichier `.js` est alors
// refusé par Node (« require is not defined in ES module scope »), et `.cjs`
// n'est pas cherché par la ligne de commande. Le `.ts` passe par son
// transpileur et ne pose pas le problème.
//
// L'identifiant est repris de `studio/.env`, avec la valeur en clair en repli :
// ce n'est pas un secret (il part déjà dans le code envoyé au navigateur), et
// le repli évite que les commandes cassent si le .env manque.
export default defineCliConfig({
  // Sous-domaine du studio en ligne : https://achard-crea.sanity.studio
  // C'est l'adresse donnée à Renaud. Le fixer ici évite que `sanity deploy`
  // le redemande à chaque fois, et qu'un déploiement parte sur un autre nom.
  studioHost: 'achard-crea',

  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'e74r8e4d',
    dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  },
})
