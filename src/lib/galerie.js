// ─────────────────────────────────────────────────────────────────────────────
//  BRANCHEMENT DE LA GALERIE SUR LE CMS
//
//  Principe : le site fonctionne TOUJOURS, CMS ou pas.
//
//  - Au chargement, la page affiche la liste écrite en dur dans `realisations.js`.
//    Elle est embarquée dans le bundle JS, donc affichée au premier rendu, sans
//    aucun aller-retour réseau. Un moteur qui exécute le JS (Google le fait) la
//    voit immédiatement, même si Sanity est en panne : le référencement de la
//    section ne dépend d'aucun service extérieur.
//  - Si un CMS est configuré (variables d'environnement ci-dessous), le site
//    interroge Sanity en arrière-plan et remplace la liste dès qu'il a répondu.
//  - Si le CMS est injoignable, mal configuré, ou vide : on garde la liste en dur.
//    Aucune page blanche possible.
//
//  Aucune dépendance ajoutée : on interroge l'API de Sanity avec un simple fetch.
//
//  ⚠ ÉTAT DE VÉRIFICATION (07/09/2026)
//  La transformation est testée : réponse Sanity réaliste en entrée, URLs
//  Cloudinary valides en sortie, pièce sans photo écartée, et les 4 modes de
//  panne (réseau coupé, HTTP 500, document absent, liste vide) renvoient bien
//  `null` pour retomber sur la liste en dur.
//  N'est PAS vérifié, faute de comptes : la forme exacte de l'objet rendu par
//  `sanity-plugin-cloudinary`, et l'autorisation CORS côté Sanity. Voir
//  l'étape 2 bis de studio/README.md.
//
//  ── Configuration ──────────────────────────────────────────────────────────
//  Créer un fichier `.env` à la racine (voir `.env.example`) :
//     VITE_SANITY_PROJECT_ID=xxxxxxxx
//     VITE_SANITY_DATASET=production
//     VITE_CLOUDINARY_CLOUD=xxxxxxxx
//  Tant que ces variables sont absentes, ce fichier ne fait tout simplement rien.
// ─────────────────────────────────────────────────────────────────────────────

const PROJET = import.meta.env.VITE_SANITY_PROJECT_ID
const DATASET = import.meta.env.VITE_SANITY_DATASET || 'production'
const CLOUD = import.meta.env.VITE_CLOUDINARY_CLOUD

export const cmsConfigure = Boolean(PROJET && CLOUD)

// On interroge `apicdn` et non `api` : c'est le cache mondial de Sanity, gratuit
// et bien plus rapide. Les données publiées y sont à jour en quelques secondes.
const REQUETE = `*[_type == "galerie"][0].pieces[]{
  titre, categorie, matiere, photo, video
}`

/**
 * Construit une URL Cloudinary optimisée.
 * `f_auto` = le meilleur format que sait lire le navigateur (WebP, AVIF).
 * `q_auto` = compression choisie automatiquement selon l'image.
 * `c_limit` = ne dépasse jamais la largeur demandée, et n'agrandit jamais.
 * C'est ce qui fait qu'une photo de 8 Mo sortie d'un téléphone est servie en
 * 200 Ko sans que personne ait rien à faire.
 */
function urlCloudinary(asset, { largeur, video = false }) {
  if (!asset) return null
  const id = asset.public_id
  // Le plugin Cloudinary stocke aussi une URL toute faite : filet de sécurité si
  // la forme de l'objet change côté Sanity.
  if (!id) return asset.secure_url || asset.url || null
  const type = video ? 'video' : 'image'
  // Mêmes transformations pour l'image et la vidéo : Cloudinary sait faire les
  // deux avec `f_auto`/`q_auto`. Seuls le segment d'URL et l'extension changent.
  const transformations = `f_auto,q_auto,w_${largeur},c_limit`
  const ext = video ? 'mp4' : (asset.format || 'jpg')
  return `https://res.cloudinary.com/${CLOUD}/${type}/upload/${transformations}/${id}.${ext}`
}

/** Convertit une pièce du CMS vers la forme attendue par le composant. */
function normaliser(p) {
  const photo = urlCloudinary(p.photo, { largeur: 1400 })
  if (!photo) return null // une pièce sans photo n'est pas affichable
  return {
    cat: p.categorie || '',
    title: p.titre || '',
    meta: p.matiere || '',
    img: photo,
    thumb: urlCloudinary(p.photo, { largeur: 220 }) || photo,
    video: urlCloudinary(p.video, { largeur: 1400, video: true }) || undefined,
  }
}

/**
 * Récupère les pièces publiées dans le CMS.
 * Renvoie `null` si rien n'est configuré, si la requête échoue, ou si le CMS ne
 * renvoie aucune pièce exploitable. Dans tous ces cas, l'appelant garde sa liste
 * en dur : c'est voulu, jamais de galerie vide.
 */
export async function chargerPieces({ signal } = {}) {
  if (!cmsConfigure) return null
  try {
    const url =
      `https://${PROJET}.apicdn.sanity.io/v2024-01-01/data/query/${DATASET}` +
      `?query=${encodeURIComponent(REQUETE)}`
    const rep = await fetch(url, { signal })
    if (!rep.ok) return null
    const { result } = await rep.json()
    if (!Array.isArray(result)) return null
    const pieces = result.map(normaliser).filter(Boolean)
    return pieces.length ? pieces : null
  } catch {
    // Réseau coupé, CMS en panne, réponse illisible : on ne casse rien.
    return null
  }
}
