/**
 * Une pièce de l'atelier : ce que Renaud remplit pour chaque réalisation.
 *
 * Tous les libellés sont en français et formulés pour quelqu'un qui ne connaît
 * rien au web. Pas de jargon, pas de champ technique visible.
 */
export default {
  name: 'piece',
  title: 'Pièce',
  type: 'object',
  fields: [
    {
      name: 'titre',
      title: 'Nom de la pièce',
      type: 'string',
      description: 'Par exemple : Table basse réversible',
      validation: (Rule) => Rule.required().warning('Donnez un nom à la pièce.'),
    },
    {
      name: 'categorie',
      title: 'Type de pièce',
      type: 'string',
      description: "S'affiche en petit au-dessus du nom.",
      options: {
        list: [
          { title: 'Cuisine', value: 'Cuisine' },
          { title: 'Meuble', value: 'Meuble' },
          { title: 'Table', value: 'Table' },
          { title: 'Table basse', value: 'Table basse' },
          { title: 'Console', value: 'Console' },
          { title: 'Aménagement', value: 'Aménagement' },
          { title: 'Mobilier', value: 'Mobilier' },
          { title: 'Objet', value: 'Objet' },
          { title: 'Escalier', value: 'Escalier' },
          { title: 'Extérieur', value: 'Extérieur' },
        ],
      },
    },
    {
      name: 'matiere',
      title: 'Bois et détails',
      type: 'string',
      description: 'Par exemple : Noyer massif, plateau jeux de société',
    },
    {
      name: 'photo',
      title: 'Photo',
      type: 'image',
      // `hotspot` ajoute l'éditeur de point d'intérêt : Renaud déplace un cercle
      // sur la partie importante de la photo, et TOUS les recadrages du site le
      // respectent (la grande image comme la petite vignette). C'est ce qui
      // évite une vignette qui coupe le meuble quand la photo est décentrée ou
      // prise en portrait. Sans lui, le rognage se ferait au centre, à l'aveugle.
      options: { hotspot: true },
      description:
        'Glissez votre photo ici. Peu importe son poids, elle est optimisée ' +
        'automatiquement. Cadrez ensuite le cercle sur la partie à ne pas couper.',
      validation: (Rule) => Rule.required().warning('Il faut une photo.'),
    },
  ],
  preview: {
    select: { title: 'titre', subtitle: 'matiere', media: 'photo' },
  },
}
