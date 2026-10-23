/**
 * Importe les 9 réalisations écrites en dur dans le studio Sanity.
 *
 * POURQUOI : tant que le studio est vide, le site sert la liste en dur de
 * `src/lib/realisations.js`. Mais dès qu'UNE pièce y est publiée, le site
 * bascule entièrement sur le CMS et les 9 autres disparaissent. C'est le
 * comportement voulu (jamais de doublon, jamais de galerie vide), mais ça
 * transforme la première photo de Renaud en suppression accidentelle des 9
 * autres. Importer les 9 une bonne fois rend l'ajout d'une pièce ADDITIF,
 * ce qui est ce que n'importe qui attend.
 *
 * Les photos envoyées sont les ORIGINAUX (1800 px), pas les variantes
 * `-stage` ni `-thumb` : le CDN de Sanity fabrique lui-même toutes les tailles,
 * autant lui donner la meilleure source.
 *
 * À LANCER DEPUIS `studio/` :
 *     npx sanity exec scripts/importer-realisations.mjs --with-user-token
 *
 * Le script est idempotent : il remplace le document `galerie` en entier.
 * Le relancer remet exactement ces 9 pièces, ni plus ni moins.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createRequire } from 'node:module'

// `sanity/cli` est publié en CommonJS : en module ES, Node ne sait pas détecter
// ses exports nommés et refuse `import { getCliClient } from 'sanity/cli'`.
// On passe donc par `require`, qui n'a pas ce problème.
const { getCliClient } = createRequire(import.meta.url)('sanity/cli')

const ICI = path.dirname(fileURLToPath(import.meta.url))
const RACINE = path.resolve(ICI, '..', '..', 'src', 'assets', 'realisations')

// Les donnees vivent dans `realisations.json` et PAS dans ce fichier.
//
// ⚠ Raison : `sanity exec` passe le script dans son bundler, qui le lit en
// latin-1. Un « chêne » ecrit ici ressort « chÃªne » dans Sanity. Le JSON, lui,
// est lu a l'execution avec `fs.readFileSync(..., 'utf8')`, donc sans
// reinterpretation. Ce fichier reste volontairement sans accent dans le code.
const PIECES = JSON.parse(fs.readFileSync(path.join(ICI, 'realisations.json'), 'utf8'))

const client = getCliClient({ apiVersion: '2024-01-01' })

const pieces = []
for (const { categorie, titre, matiere, photo: relatif } of PIECES) {
  const chemin = path.join(RACINE, relatif)
  if (!fs.existsSync(chemin)) throw new Error(`Photo introuvable : ${chemin}`)

  const asset = await client.assets.upload('image', fs.createReadStream(chemin), {
    filename: path.basename(relatif),
  })
  console.log(`envoyée  ${titre}  (${asset._id})`)

  pieces.push({
    _type: 'piece',
    _key: path.basename(relatif, '.webp').replace(/[^a-z0-9]+/gi, '-'),
    titre,
    categorie,
    matiere,
    photo: { _type: 'image', asset: { _type: 'reference', _ref: asset._id } },
  })
}

await client.createOrReplace({ _id: 'galerie', _type: 'galerie', pieces })
console.log(`\n${pieces.length} pièces publiées dans le studio.`)
