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
      type: 'cloudinary.asset',
      description:
        'Glissez votre photo. Peu importe son poids, elle est optimisée automatiquement.',
      validation: (Rule) => Rule.required().warning('Il faut une photo.'),
    },
    {
      name: 'video',
      title: 'Vidéo (facultatif)',
      type: 'cloudinary.asset',
      description:
        "Si vous en ajoutez une, elle remplace la photo et tourne en boucle, sans son. " +
        "La photo reste utile : c'est elle qui s'affiche pendant le chargement.",
    },
  ],
  preview: {
    select: { title: 'titre', subtitle: 'matiere', media: 'photo' },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Sans nom',
        subtitle,
        // Le plugin Cloudinary ne fournit pas d'aperçu natif : on pose l'URL.
        media: media?.secure_url
          ? { asset: { url: media.secure_url } }
          : undefined,
      }
    },
  },
}
