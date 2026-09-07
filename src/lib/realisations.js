// ─────────────────────────────────────────────────────────────────────────────
//  LES PIÈCES MONTRÉES DANS « RÉALISATIONS »
//
//  C'est le SEUL fichier à toucher pour ajouter, retirer ou réordonner une pièce.
//  Le composant Realisations.jsx ne contient plus aucune donnée.
//
//  ── Ajouter une pièce ──────────────────────────────────────────────────────
//  1. Déposer la photo dans `src/assets/realisations/<famille>/`
//     (familles existantes : cuisine, meuble, agencement, objet, exterieur)
//  2. Générer les deux tailles utilisées par la page :
//        python scripts/images.py
//     Ça crée un `-stage.webp` (la grande photo) et un `-thumb.webp` (la vignette
//     de l'index). Sans ça, la page servirait la photo brute de 3 Mo.
//  3. Ajouter un objet dans la liste ci-dessous, avec les deux imports.
//
//  ── Ajouter une vidéo ──────────────────────────────────────────────────────
//  Une pièce peut porter un champ `video` en plus de `img`. Quand il est présent,
//  la grande zone joue la vidéo (en boucle, sans son) au lieu d'afficher la photo.
//  `img` reste obligatoire : c'est l'image affichée pendant le chargement, et
//  c'est elle que voient les moteurs de recherche.
//     video: monVideo,   // import depuis src/assets/videos/
//  ⚠ Passer la vidéo en MP4 H.264, largeur 1400 px max, sans piste audio :
//        ffmpeg -i source.mov -vf scale=1400:-2 -an -c:v libx264 -crf 26 sortie.mp4
//     Une vidéo de téléphone brute fait 15 à 70 Mo, ce qui est inservable sur une
//     page web. Après conversion on est autour de 2 Mo.
// ─────────────────────────────────────────────────────────────────────────────

// Grandes photos (variantes `-stage`, 1400 px)
import imgCuisine from '../assets/realisations/cuisine/cuisine-chene-fonce-03-stage.webp'
import imgTableJeu from '../assets/realisations/meuble/table-basse-jeu-01-stage.webp'
import imgCommode from '../assets/realisations/meuble/commode-chene-cuir-01-stage.webp'
import imgBibliotheque from '../assets/realisations/agencement/bibliotheque-sur-mesure-01-stage.webp'
import imgConsole from '../assets/realisations/meuble/console-marqueterie-01-stage.webp'
import imgTasseaux from '../assets/realisations/agencement/meuble-tasseaux-retroeclaire-02-stage.webp'
import imgChevet from '../assets/realisations/meuble/chevet-vague-rendu-04-stage.webp'
import imgAppoint from '../assets/realisations/meuble/table-appoint-marqueterie-01-stage.webp'
import imgBoite from '../assets/realisations/objet/boite-noyer-02-stage.webp'

// Vignettes de l'index (variantes `-thumb`, 220 px)
import thCuisine from '../assets/realisations/cuisine/cuisine-chene-fonce-03-thumb.webp'
import thTableJeu from '../assets/realisations/meuble/table-basse-jeu-01-thumb.webp'
import thCommode from '../assets/realisations/meuble/commode-chene-cuir-01-thumb.webp'
import thBibliotheque from '../assets/realisations/agencement/bibliotheque-sur-mesure-01-thumb.webp'
import thConsole from '../assets/realisations/meuble/console-marqueterie-01-thumb.webp'
import thTasseaux from '../assets/realisations/agencement/meuble-tasseaux-retroeclaire-02-thumb.webp'
import thChevet from '../assets/realisations/meuble/chevet-vague-rendu-04-thumb.webp'
import thAppoint from '../assets/realisations/meuble/table-appoint-marqueterie-01-thumb.webp'
import thBoite from '../assets/realisations/objet/boite-noyer-02-thumb.webp'

// L'ordre de cette liste est l'ordre affiché. La 2e pièce est celle qui s'ouvre
// par défaut (voir PIECE_OUVERTE plus bas) : c'est la table basse réversible,
// la plus belle de l'atelier.
export const REALISATIONS = [
  {
    cat: 'Cuisine',
    title: 'Cuisine en chêne foncé',
    meta: 'Chêne massif brossé, plan de travail clair',
    img: imgCuisine,
    thumb: thCuisine,
  },
  {
    cat: 'Table basse',
    title: 'Table basse réversible',
    meta: 'Noyer massif, plateau jeux de société',
    img: imgTableJeu,
    thumb: thTableJeu,
    // C'est cette pièce que Renaud a filmée pour Instagram. Dès qu'il envoie la
    // vidéo : la convertir (commande plus haut), la déposer dans
    // src/assets/videos/, l'importer et décommenter la ligne.
    // video: vidTableBasse,
  },
  {
    cat: 'Meuble',
    title: 'Commode à poignées cuir',
    meta: 'Chêne massif & cuir',
    img: imgCommode,
    thumb: thCommode,
  },
  {
    cat: 'Aménagement',
    title: 'Bibliothèque sur mesure',
    meta: 'Du sol au plafond, alcôves décalées',
    img: imgBibliotheque,
    thumb: thBibliotheque,
  },
  {
    cat: 'Console',
    title: 'Console marquetée',
    meta: 'Frêne & marqueterie',
    img: imgConsole,
    thumb: thConsole,
  },
  {
    cat: 'Aménagement',
    title: 'Meuble à tasseaux',
    meta: 'Tasseaux rétroéclairés, chêne',
    img: imgTasseaux,
    thumb: thTasseaux,
  },
  {
    cat: 'Mobilier',
    title: 'Chevet « vague & soleil »',
    meta: 'Frêne & laque',
    img: imgChevet,
    thumb: thChevet,
  },
  {
    cat: 'Table',
    title: "Table d'appoint marquetée",
    meta: 'Marqueterie sur frêne',
    img: imgAppoint,
    thumb: thAppoint,
  },
  {
    cat: 'Objet',
    title: 'Boîte à couvercle',
    meta: 'Noyer & chêne cérusé',
    img: imgBoite,
    thumb: thBoite,
  },
]

// Index de la pièce affichée à l'ouverture de la page.
export const PIECE_OUVERTE = 1
