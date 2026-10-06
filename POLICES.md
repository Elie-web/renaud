# Polices : quel numéro = quelle police

Mémo de correspondance, à garder. Si Renaud revient un jour en disant
« finalement je préfère la 4 », c'est ici qu'on retrouve de quoi il parle.

## Le choix actuel : Relicta, licence commerciale ACHETÉE (octobre 2026)

Les titres du site sont en **Relicta Regular**, auto-hébergée
(`public/fonts/Relicta-Regular.woff2`, 33 Ko), avec **Inter** en texte courant,
auto-hébergée elle aussi (`public/fonts/Inter-latin.woff2`, 48 Ko, variable).

**Renaud a acheté la licence commerciale** chez Jehoo Creative et a envoyé les
fichiers le 06/10/2026 : `Relicta-Light.otf` et `Relicta-Regular.otf`. Les
originaux OTF ne sont pas dans le dépôt, seulement leurs WOFF2.
⚠ Les zips ne contenaient **aucun document de licence**. La preuve d'achat est
le reçu de Renaud : lui demander de le garder.

Deux graisses, pas plus : Light (300) et Regular (400). La Light achetée est
identique au fichier DaFont utilisé jusque là (même version 1.000, mêmes 585
glyphes) : l'achat n'a rien changé au dessin, il a apporté la Regular et le
droit de s'en servir.

### Le contour a été supprimé

Tant qu'on n'avait que la Light, les titres étaient épaissis par un
`-webkit-text-stroke: 0.022em`. C'est lui qui créait les petites amorces sur les
lettres que Renaud appelait du « relief » (vocal du 23/07/2026).

Mesuré dans les fichiers, le fût du « l » fait **70 unités en Light, environ 92
avec l'ancien contour, et 96 en Regular**. La Regular donne donc le même gris
que ce que le contour simulait, dessiné par le créateur. Le contour a été retiré
du site, des pages légales et de la 404. **Ne pas le remettre.**

La Regular est un peu plus large (chasse du « H » : 656 → 673). Vérifié en
capture à 1440 et 390 px : aucun titre ne change de nombre de lignes.

### Substitution libre : essayée, écartée

Le 13/08/2026, Relicta a été remplacée par **Josefin Sans** (SIL OFL, libre en
usage commercial) pour supprimer le problème de licence. **Elie a rejeté le rendu
et fait marche arrière le jour même.**

⚠ **Ne pas retenter une substitution sans validation visuelle d'Elie.** Le sujet
est tranché : c'est Relicta, on paie.

Pour mémoire, si la question revenait, voici ce que la recherche avait donné.
22 polices libres comparées, en deux temps :

1. Comparaison des métriques (x-height / hauteur de capitale, rondeur du « o »,
   largeurs de o/H/O). Ça faisait remonter des géométriques monolinéaires du type
   Outfit, Lexend, Urbanist.
2. **Rendu visuel des échantillons**, qui invalidait le premier tri : Relicta a
   des pleins et déliés et des fûts légèrement évasés, qu'aucune monolinéaire ne
   reproduit. La bonne famille est celle des géométriques d'affichage à x-height
   basse, façon Art déco.

Finalistes : **Josefin Sans** (testée, rejetée), **Poiret One** (plus proche du
caractère décoratif mais une seule graisse, tracé plus fin, registre « boutique
de mode » plutôt qu'artisan), **Gruppo** (plus plate, un peu techno).

Les fichiers de l'essai sont conservés dans
`_brouillon/polices-inutilisees/JosefinSans-var.woff2`.

## Page envoyée au client : `/polices.html` (20 propositions)

Le client voit des cartes numérotées 01 à 20 et répond par un numéro.
Ce n'est **pas** cette numérotation qu'il a utilisée pour son choix, mais elle
reste la référence si on doit lui reproposer une police libre de droits.

| N° | Titres | Texte courant |
|----|--------|---------------|
| 01 | Fraunces | DM Sans | (police d'origine du site, laissée pour comparer) |
| 02 | Cormorant Garamond | Mulish |
| 03 | EB Garamond | Inter |
| 04 | Lora | Inter |
| 05 | Spectral | DM Sans |
| **06** | **Newsreader** | **DM Sans** | **← choisi par Renaud (vocal du 13/07/2026)** |
| 07 | Source Serif 4 | IBM Plex Sans |
| 08 | Crimson Pro | Work Sans |
| 09 | Playfair Display | Mulish |
| 10 | Bodoni Moda | Inter |
| 11 | Libre Caslon Text | Inter |
| 12 | Marcellus | Jost |
| 13 | Gilda Display | Work Sans |
| 14 | Cardo | Inter |
| 15 | Bitter | Inter |
| 16 | PT Serif | PT Sans |
| 17 | Frank Ruhl Libre | Inter |
| 18 | Italiana | Jost |
| 19 | Cormorant | Jost |
| 20 | Tenor Sans | Work Sans |

Toutes sont sur Google Fonts : licence libre, utilisables en commercial.

Pour changer de police, il suffit de reprendre les deux lignes correspondantes
dans `src/index.css` (`--f-serif` / `--f-sc` pour les titres, `--f-sans` pour le
texte) et de charger la bonne famille dans le `<link>` Google Fonts d'`index.html`.

## Ne pas confondre : les versions brouillon V1 à V7

Le sélecteur en bas de page (`#v1` … `#v7`) a **sa propre numérotation**, sans
rapport avec la page ci-dessus. Avant le choix de Renaud, chaque version portait
une police différente (celles qu'il avait envoyées via DaFont) :

| Version | Police qu'elle portait |
|---------|----------------------|
| V1 | Fraunces (référence) |
| V2 | Quicksand |
| V3 | Lekton |
| V4 | Katas |
| V5 | Nisaba |
| V6 | Relicta |
| V7 | Daniel Sans |

Depuis le choix de la police, les 7 versions partagent toutes la **même** police
et ne servent plus qu'à comparer des **organisations de sections, des mises en
page et des couleurs** différentes.

⚠ **Licence :** Daniel Sans est en **usage personnel uniquement**. Relicta
l'était aussi, jusqu'à l'achat de la licence par Renaud en octobre 2026.
Quicksand, Lekton, Katas et Nisaba sont OK.

## Décision PRISE et APPLIQUÉE : licence Relicta achetée

Renaud (WhatsApp, 22/07/2026) : « cool si tu trouves une police qui ressemble
gratuit, sinon je mets le prix ». La voie gratuite a été essayée le 13/08/2026
(Josefin Sans) et rejetée par Elie le jour même. Renaud a payé la licence et
envoyé les fichiers le 06/10/2026. Le sujet est clos.
