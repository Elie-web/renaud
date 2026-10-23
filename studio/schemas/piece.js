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
    {
      name: 'video',
      title: 'Vidéo (facultatif)',
      type: 'file',
      options: { accept: 'video/mp4,video/quicktime' },
      description:
        "Facultatif. Si vous en mettez une, c'est elle qui s'affiche en grand à " +
        'la place de la photo, mais la photo reste obligatoire : elle sert ' +
        "d'image d'attente. ⚠ Réglez d'abord votre iPhone sur Réglages > " +
        'Appareil photo > Formats > « Le plus compatible », sinon la vidéo ne se ' +
        "lira pas sur les ordinateurs Windows. Visez moins d'une minute.",
      validation: (Rule) =>
        Rule.custom(async (value, context) => {
          const ref = value?.asset?._ref
          if (!ref) return true
          // On va chercher le fichier envoyé pour contrôler son format et son
          // poids. Ce sont des AVERTISSEMENTS et pas des erreurs : mieux vaut
          // une vidéo lourde en ligne qu'un blocage que Renaud ne saurait pas
          // lever tout seul.
          const asset = await context
            .getClient({ apiVersion: '2024-01-01' })
            .fetch('*[_id == $ref][0]{extension, size, mimeType}', { ref })
          if (!asset) return true

          const mo = asset.size / (1024 * 1024)
          if (asset.extension && asset.extension.toLowerCase() === 'mov') {
            return 'Cette vidéo est un fichier .mov : elle risque de ne pas se lire sur Windows. Réglez votre iPhone sur « Le plus compatible » et refilmez, ou demandez à Elie de la convertir.'
          }
          if (mo > 50) {
            return `Cette vidéo pèse ${Math.round(mo)} Mo. Au-dessus de 50 Mo elle sera longue à charger pour vos visiteurs : raccourcissez-la.`
          }
          return true
        }).warning(),
    },
  ],
  preview: {
    select: { title: 'titre', subtitle: 'matiere', media: 'photo' },
  },
}
