import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { cloudinarySchemaPlugin, cloudinaryAssetSourcePlugin } from 'sanity-plugin-cloudinary'

import galerie from './schemas/galerie'
import piece from './schemas/piece'

// Renseignés dans studio/.env (voir studio/README.md).
const projectId = process.env.SANITY_STUDIO_PROJECT_ID
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'

export default defineConfig({
  name: 'achard-crea',
  title: 'Achard Créa',

  projectId,
  dataset,

  plugins: [
    structureTool({
      // Renaud ne doit voir QU'UNE entrée, qui ouvre directement sa liste.
      // Sans ça, Sanity affiche une arborescence « Content / Galerie / le
      // document », soit trois clics et deux écrans avant d'arriver aux pièces.
      structure: (S) =>
        S.list()
          .title('Le site')
          .items([
            S.listItem()
              .title('Réalisations')
              .child(
                S.document().schemaType('galerie').documentId('galerie').title('Réalisations')
              ),
          ]),
    }),
    // Les deux plugins Cloudinary vont ensemble : le premier déclare le type de
    // champ `cloudinary.asset`, le second ajoute le bouton d'envoi qui ouvre la
    // fenêtre Cloudinary depuis le studio. Renaud n'a donc jamais à se connecter
    // à Cloudinary lui-même.
    cloudinarySchemaPlugin(),
    cloudinaryAssetSourcePlugin(),
  ],

  schema: {
    types: [galerie, piece],
    // Un seul document possible : on retire « Créer » pour que Renaud ne puisse
    // pas fabriquer une deuxième galerie que le site n'irait jamais lire.
    templates: (prev) => prev.filter((t) => t.schemaType !== 'galerie'),
  },

  document: {
    // Pas de suppression ni de duplication du document unique.
    actions: (prev, { schemaType }) =>
      schemaType === 'galerie'
        ? prev.filter(({ action }) => !['delete', 'duplicate', 'unpublish'].includes(action))
        : prev,
  },
})
