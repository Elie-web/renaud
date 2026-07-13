// Les cuisines montrables de l'atelier. Chaque version brouillon en affiche une
// différente (champ `cuisine` dans VERSIONS, App.jsx) : Renaud voulait pouvoir
// comparer les photos en situation, pas côte à côte dans un dossier.
//
// cuisine-chene-rustique-01.webp est volontairement absente : c'est une photo
// d'AVANT travaux (cuisine d'origine, plan de travail encombré). Ne pas la
// remettre ici sans en faire un vrai avant/après.
import cheneFonceLarge from '../assets/realisations/cuisine/cuisine-chene-fonce-03.webp'
import cheneFoncePortrait from '../assets/realisations/cuisine/cuisine-chene-fonce-02.webp'
import cheneFonceDetail from '../assets/realisations/cuisine/cuisine-chene-fonce-01.webp'
import ilotChene from '../assets/realisations/cuisine/cuisine-ilot-chene-01.webp'

export const CUISINES = {
  // La préférée de Renaud (vocal du 13/07/2026) : chêne foncé, l'escabeau dans le champ.
  fonceLarge: {
    img: cheneFonceLarge,
    title: 'Cuisine en chêne foncé',
    meta: 'Chêne massif brossé, plan de travail clair',
  },
  foncePortrait: {
    img: cheneFoncePortrait,
    title: 'Cuisine en chêne foncé',
    meta: 'Façades pleine hauteur, poignées gorge',
  },
  fonceDetail: {
    img: cheneFonceDetail,
    title: 'Cuisine en chêne foncé',
    meta: 'Détail des tiroirs, poignées intégrées',
  },
  ilot: {
    img: ilotChene,
    title: 'Îlot central en chêne',
    meta: 'Chêne massif, plan de travail blanc',
  },
}

// Ce que voit le site quand aucune version ne dit le contraire.
export const CUISINE_DEFAUT = CUISINES.fonceLarge
