# Studio Achard Créa — mise en route

Interface où Renaud gère ses réalisations. À installer une seule fois.

⚠ **Ce dossier n'a pas encore été exécuté.** Il a été écrit sans les identifiants
du compte, qui n'existait pas au moment de l'écriture. Le premier `npm run dev`
est donc aussi le premier test réel : prévoir de le faire avant de donner
l'adresse à Renaud.

La logique de lecture côté site (`src/lib/galerie.js`) est testée, elle : réponse
Sanity réaliste en entrée, URL d'images valides en sortie, pièces sans photo ou à
référence cassée écartées, et les quatre modes de panne retombent sur la liste
en dur.

## 1. Créer le compte (Elie, 5 minutes)

**Sanity** — https://www.sanity.io, connexion avec Google.
Créer un projet nommé `Achard Créa`, dataset `production`, visibilité **public**
(le site lit les données sans clé ; rien de confidentiel n'y est stocké).
Noter le **Project ID**, visible dans les réglages du projet.

C'est tout. Un seul compte.

> **Pourquoi plus de Cloudinary ?** La première version stockait les médias sur
> Cloudinary pour les optimiser. C'était inutile : le CDN d'images de Sanity fait
> déjà le redimensionnement, la conversion automatique en WebP/AVIF et la
> compression, sans surcoût ni limite de transformations sur le plan gratuit.
> Cloudinary n'était vraiment justifié que pour la **vidéo**, dont le site ne se
> sert pas. Le retirer supprime un compte, un plugin, et une fenêtre d'envoi de
> plus pour Renaud.

## 2. Configurer

À la racine du site, créer `.env` (voir `.env.example`) :

```
VITE_SANITY_PROJECT_ID=le-project-id
VITE_SANITY_DATASET=production
```

Et `studio/.env` :

```
SANITY_STUDIO_PROJECT_ID=le-project-id
SANITY_STUDIO_DATASET=production
```

## 3. Autoriser le site à lire les données (CORS) — NE PAS SAUTER

Sans cette étape, le navigateur bloque la requête, **le code avale l'erreur en
silence** et la galerie ne se met jamais à jour : le site continue d'afficher les
pièces en dur, sans le moindre message d'erreur. C'est le piège classique de
Sanity, et il coûte une heure à diagnostiquer.

Dans https://sanity.io/manage → le projet → **API** → **CORS origins**,
ajouter, sans cocher « Allow credentials » (le dataset est public, aucun jeton
n'est envoyé) :

- `http://localhost:5173` — le site en développement
- `https://achardebenisteries.vercel.app` — la préproduction
- `https://xn--achard-cra-j7a.fr` — le domaine définitif

Pour vérifier que c'est bon : ouvrir le site, console du navigateur, aucune
erreur `CORS` ne doit apparaître et la galerie doit se recharger.

## 4. Installer et tester en local

```bash
cd studio
npm install
npm run dev
```

Le studio s'ouvre sur http://localhost:3333. Vérifier :

- une seule entrée « Réalisations » dans le menu de gauche
- une photo se dépose par glisser-déposer dans le champ Photo
- en cliquant sur la photo déposée, **l'éditeur de point d'intérêt** s'ouvre
  (un cercle déplaçable). C'est lui qui pilote le cadrage des vignettes du site.
- les lignes se déplacent au glisser-déposer

## 5. Mettre le studio en ligne

```bash
npm run deploy
```

Sanity demande un nom de sous-domaine, par exemple `achard-crea`.
L'adresse devient **https://achard-crea.sanity.studio**, c'est celle à donner
à Renaud.

## 6. Donner l'accès à Renaud

Dans les réglages du projet Sanity, inviter son adresse email en rôle
**Editor**. Il se connecte avec Google ou par lien email, sans mot de passe à
retenir.

Lui envoyer ensuite `NOTICE-RENAUD.md`, écrite pour lui.

## 7. Reprendre les 9 pièces existantes

À la première ouverture, la liste du studio est vide et **le site continue
d'afficher les 9 pièces écrites en dur** dans `src/lib/realisations.js`. C'est
voulu : rien ne casse tant que le CMS n'est pas rempli.

Recopier les 9 pièces dans le studio (titres et matières sont dans
`realisations.js`, photos dans `src/assets/realisations/`). Dès qu'au moins une
pièce est publiée, le site bascule sur la liste du CMS.

Garder la liste en dur en l'état : elle reste le filet de sécurité si Sanity est
injoignable, et c'est elle que lisent les moteurs de recherche dans le HTML.

## Comment ça marche, en deux lignes

Sanity garde le texte, l'ordre, les photos et leur point d'intérêt. Son CDN sert
chaque image à la bonne taille et dans le meilleur format que sait lire le
navigateur : une photo de 8 Mo sortie d'un téléphone arrive autour de 100 Ko.

Le site demande deux versions de chaque photo : la grande sans rognage, et une
vignette en 4/3 **rognée sur le point d'intérêt** que Renaud a placé. Sans point
d'intérêt défini, Sanity choisit tout seul la zone la plus riche de l'image
(`crop=entropy`).

## Points de vigilance

**HEIC.** La documentation de Sanity est ambiguë : la page des assets annonce
HEIF supporté, celle du type image ne liste que JPG, PNG, GIF, TIFF et SVG à
l'envoi. Les iPhone produisent du HEIC par défaut. La notice de Renaud lui
demande donc de passer son appareil photo en « Le plus compatible », ce qui règle
la question sans rien avoir à tester.

**Vidéo.** Le champ a été retiré : Sanity ne transcode pas la vidéo sur le plan
gratuit, et déposer un fichier brut de 70 Mo serait pire que tout. Le composant
`Realisations.jsx` sait toujours afficher une vidéo pour les pièces écrites en
dur. Si Renaud en veut vraiment un jour, rebrancher Cloudinary **uniquement**
pour ça.
