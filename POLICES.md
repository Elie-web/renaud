# Polices : quel numéro = quelle police

Mémo de correspondance, à garder. Si Renaud revient un jour en disant
« finalement je préfère la 4 », c'est ici qu'on retrouve de quoi il parle.

## ⚠ Le choix actuel : Relicta — licence commerciale À ACHETER

Les titres du site sont en **Relicta**, auto-hébergée
(`public/fonts/Relicta-Light.woff2`, 33 Ko), avec Inter en texte courant.

**Relicta est sous licence usage personnel** : © 2025 Jehoo Creative, dessinée
par Anwar Patihan (behance.net/jehoocreative). Le fichier vient de DaFont et ne
peut pas partir sur un site client facturé en l'état.

**Décision d'Elie (13/08/2026) : on garde Relicta et on fait acheter la licence
commerciale à Renaud** (~60 €). C'est le dernier point à régler côté droits avant
la mise en ligne.

Seules deux graisses ont été livrées : Light (300-400) et UltraboldItalic. Le
site n'utilise que la Light, d'où l'absence de tout `font-weight` au-dessus de
400 dans le CSS, l'épaississement optique par `--title-stroke: 0.022em`, et les
accents de titre marqués par la couleur plutôt que par l'italique.
Acheter la licence livre la famille complète et permet de supprimer ce contour.

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

⚠ **Licence :** Relicta et Daniel Sans sont en **usage personnel uniquement**.
Elles ne peuvent pas partir sur le site livré sans achat d'une licence
commerciale. Quicksand, Lekton, Katas et Nisaba sont OK.

## Décision PRISE : on achète la licence Relicta

Renaud (WhatsApp, 22/07/2026) : « cool si tu trouves une police qui ressemble
gratuit, sinon je mets le prix ». La voie « gratuite » a été essayée le 13/08/2026
(Josefin Sans) et **rejetée par Elie le jour même**. La décision est donc close :

**→ Acheter la licence web chez Jehoo Creative (~60 €, une fois), à faire payer
par Renaud.** Bonus non négligeable : ça livre la **vraie graisse**, et on peut
alors supprimer le `-webkit-text-stroke` d'`index.css`.

⚠ Ne pas rouvrir le sujet d'une substitution libre sans qu'Elie le demande.

Tant qu'on n'a que la Light, les titres sont épaissis optiquement par un contour
(`--title-stroke` dans `index.css`). Ce contour est un pis-aller : c'est lui qui
créait les petites amorces sur les lettres que Renaud a appelées du « relief »
(vocal du 23/07/2026). La dose a été abaissée de 0.038em à 0.022em, mais **le
vrai correctif est d'obtenir la famille complète**.
