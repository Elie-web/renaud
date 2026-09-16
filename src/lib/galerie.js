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
//  - Si un CMS est configuré (variable d'environnement ci-dessous), le site
//    interroge Sanity en arrière-plan et remplace la liste dès qu'il a répondu.
//  - Si le CMS est injoignable, mal configuré, ou vide : on garde la liste en dur.
//    Aucune page blanche possible.
//
//  Aucune dépendance ajoutée : on interroge l'API de Sanity avec un simple fetch,
//  et on fabrique les URL d'images à la main (pas besoin de @sanity/image-url).
//
//  ── Pourquoi Sanity seul, et plus Cloudinary ───────────────────────────────
//  La première version stockait les médias sur Cloudinary pour les optimiser.
//  C'était inutile : le CDN d'images de Sanity fait déjà le redimensionnement,
//  la conversion automatique en WebP/AVIF et la compression, sans surcoût et
//  sans limite de transformations sur le plan gratuit. Retirer Cloudinary
//  supprime un compte à créer, un plugin, et une fenêtre d'envoi de plus pour
//  Renaud : il glisse sa photo directement dans le studio.
//  Seule la VIDÉO justifiait Cloudinary (Sanity ne transcode pas). Il n'y a
//  aucune vidéo sur le site aujourd'hui ; le jour où il en veut vraiment, on
//  rebranche Cloudinary uniquement pour ça.
//
//  ── Configuration ──────────────────────────────────────────────────────────
//  Créer un fichier `.env` à la racine (voir `.env.example`) :
//     VITE_SANITY_PROJECT_ID=xxxxxxxx
//     VITE_SANITY_DATASET=production
//  Tant que ces variables sont absentes, ce fichier ne fait tout simplement rien.
//
//  ⚠ Ne pas oublier d'autoriser l'origine du site dans Sanity (CORS), sinon le
//  navigateur bloque la requête, l'erreur est avalée en silence et la galerie ne
//  se met JAMAIS à jour. Voir l'étape dédiée dans studio/README.md.
// ─────────────────────────────────────────────────────────────────────────────

const PROJET = import.meta.env.VITE_SANITY_PROJECT_ID
const DATASET = import.meta.env.VITE_SANITY_DATASET || 'production'

export const cmsConfigure = Boolean(PROJET)

// On interroge `apicdn` et non `api` : c'est le cache mondial de Sanity, gratuit
// et bien plus rapide. Les données publiées y sont à jour en quelques secondes.
//
// `photo.asset->_id` donne la référence du fichier, `photo.hotspot` le point que
// Renaud a désigné comme important sur la photo (voir plus bas).
const REQUETE = `*[_type == "galerie"][0].pieces[]{
  titre, categorie, matiere,
  "photoId": photo.asset->_id,
  "hotspot": photo.hotspot
}`

/**
 * Décompose la référence d'un fichier Sanity.
 * Elle a toujours la forme `image-<identifiant>-<largeur>x<hauteur>-<extension>`,
 * par exemple `image-a1b2c3-3024x4032-jpg`, et l'URL attend `<identifiant>-<largeur>x<hauteur>.<extension>`.
 */
function refVersFichier(ref) {
  if (typeof ref !== 'string') return null
  const m = ref.match(/^image-([a-f0-9]+)-(\d+x\d+)-(\w+)$/)
  if (!m) return null
  return `${m[1]}-${m[2]}.${m[3]}`
}

/**
 * Construit une URL d'image Sanity.
 * `auto=format` = le meilleur format que sait lire le navigateur (WebP, AVIF).
 * `q` = compression. `fit=max` ne rogne pas et n'agrandit jamais.
 *
 * Quand on demande un cadrage fixe (`h` fourni), on rogne SUR LE POINT D'INTÉRÊT
 * que Renaud a placé dans le studio, et non bêtement au centre. C'est ce qui
 * évite une vignette qui coupe le meuble en deux quand la photo est décentrée
 * ou prise en portrait. Sans point d'intérêt défini, `crop=entropy` laisse
 * Sanity choisir la zone la plus riche de l'image.
 */
function urlImage(fichier, { largeur, hauteur, hotspot, qualite = 75 }) {
  if (!fichier) return null
  const p = new URLSearchParams({ w: String(largeur), auto: 'format', q: String(qualite) })
  if (hauteur) {
    p.set('h', String(hauteur))
    p.set('fit', 'crop')
    if (hotspot && typeof hotspot.x === 'number' && typeof hotspot.y === 'number') {
      p.set('crop', 'focalpoint')
      p.set('fp-x', hotspot.x.toFixed(3))
      p.set('fp-y', hotspot.y.toFixed(3))
    } else {
      p.set('crop', 'entropy')
    }
  } else {
    p.set('fit', 'max')
  }
  return `https://cdn.sanity.io/images/${PROJET}/${DATASET}/${fichier}?${p}`
}

/** Convertit une pièce du CMS vers la forme attendue par le composant. */
function normaliser(p) {
  const fichier = refVersFichier(p.photoId)
  if (!fichier) return null // une pièce sans photo exploitable n'est pas affichable

  return {
    cat: p.categorie || '',
    title: p.titre || '',
    meta: p.matiere || '',
    // Grand visuel : pas de rognage, le cadre du composant s'en charge en CSS.
    img: urlImage(fichier, { largeur: 1400, hotspot: p.hotspot }),
    // Vignette : cadrage 4/3 fixe. 560 px de large parce que sur mobile la
    // vignette passe en pleine largeur (elle fait 92 px seulement sur desktop).
    thumb: urlImage(fichier, { largeur: 560, hauteur: 420, hotspot: p.hotspot, qualite: 70 }),
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
