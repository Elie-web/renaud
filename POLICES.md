# Polices : quel numéro = quelle police

Mémo de correspondance, à garder. Si Renaud revient un jour en disant
« finalement je préfère la 4 », c'est ici qu'on retrouve de quoi il parle.

## ⚠ Le choix actuel : Relicta (l'ancienne V6 du sélecteur de versions)

Renaud a dit « j'ai choisi la 6 » en parlant de la **V6 du sélecteur de
versions**, pas du n°6 de la page ci-dessous. Vérifié sur capture : c'est bien la
sans élégante contrastée, Relicta. Elle est aujourd'hui appliquée à tout le site
(`--f-serif` / `--f-sc` dans `src/index.css`), avec Inter en texte courant.

**Relicta est sous licence usage personnel** : © 2025 Jehoo Creative, dessinée
par Anwar Patihan (behance.net/jehoocreative). Le fichier vient de DaFont et ne
peut pas partir sur un site client facturé en l'état. Avant mise en ligne, il
faut soit **acheter la licence commerciale** auprès de Jehoo Creative, soit lui
substituer une police libre au rendu proche. Tant qu'on est en brouillon, ça ne
pose pas de problème.

Seules deux graisses ont été livrées : Light (300-400) et UltraboldItalic. Le
site n'utilise que la Light — d'où l'absence de tout `font-weight` au-dessus de
400 dans le CSS, et les accents de titre marqués par la couleur plutôt que par
l'italique.

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

## Décision en attente : acheter Relicta ou lui trouver une jumelle libre

Renaud (WhatsApp, 22/07/2026) : « cool si tu trouves une police qui ressemble
gratuit, sinon je mets le prix ». Les deux voies restent ouvertes :

- **Acheter la licence web** chez Jehoo Creative (~60 €, une fois). Bonus non
  négligeable : ça livre la **vraie graisse**, et on peut alors supprimer le
  `-webkit-text-stroke` d'`index.css`.
- **Substituer une libre au rendu proche**, à choisir dans le tableau plus haut.

Tant qu'on n'a que la Light, les titres sont épaissis optiquement par un contour
(`--title-stroke` dans `index.css`). Ce contour est un pis-aller : c'est lui qui
créait les petites amorces sur les lettres que Renaud a appelées du « relief »
(vocal du 23/07/2026). La dose a été abaissée de 0.038em à 0.022em, mais **le
vrai correctif est d'obtenir la famille complète**.
