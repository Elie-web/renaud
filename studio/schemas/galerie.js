/**
 * LA page que voit Renaud. Un seul document, une seule liste.
 *
 * On a délibérément choisi UNE liste dans UN document, plutôt qu'un document par
 * pièce : c'est ce qui donne le glisser-déposer pour réordonner, sans plugin et
 * sans champ « position » à comprendre. Renaud attrape une ligne et la déplace.
 *
 * Ce choix tient tant qu'on reste sous la centaine de pièces. Très au-delà, il
 * faudrait passer à un document par pièce (et là, le plugin
 * `@sanity/orderable-document-list` pour garder le tri à la souris).
 */
export default {
  name: 'galerie',
  title: 'Réalisations',
  type: 'document',
  fields: [
    {
      name: 'pieces',
      title: 'Vos pièces',
      description:
        "Ajoutez, supprimez, et faites glisser les lignes pour changer l'ordre. " +
        "L'ordre de cette liste est l'ordre affiché sur le site. " +
        'Les changements apparaissent en ligne quelques secondes après « Publier ».',
      type: 'array',
      of: [{ type: 'piece' }],
    },
  ],
  preview: {
    select: { pieces: 'pieces' },
    prepare({ pieces }) {
      const n = pieces?.length || 0
      return {
        title: 'Réalisations',
        subtitle: n === 0 ? 'Aucune pièce' : `${n} pièce${n > 1 ? 's' : ''}`,
      }
    },
  },
}
