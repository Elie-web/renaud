# Studio Achard Créa — mise en route

Interface où Renaud gère ses réalisations. À installer une seule fois.

⚠ **Ce dossier n'a pas encore été exécuté.** Il a été écrit sans les identifiants
des deux comptes, qui n'existaient pas au moment de l'écriture. Le premier
`npm run dev` est donc aussi le premier test réel : prévoir de le faire avant de
donner l'adresse à Renaud.

## 1. Créer les deux comptes (Elie, 10 minutes)

**Sanity** — https://www.sanity.io, connexion avec Google.
Créer un projet nommé `Achard Créa`, dataset `production`, visibilité **public**
(le site lit les données sans clé ; rien de confidentiel n'y est stocké).
Noter le **Project ID**, visible dans les réglages du projet.

**Cloudinary** — https://cloudinary.com, plan gratuit.
Noter le **Cloud name**, en haut du tableau de bord.
Puis Settings → Upload → Upload presets → créer un preset en mode **Unsigned**,
et noter son nom.

## 2. Configurer

Créer `studio/.env` :

```
SANITY_STUDIO_PROJECT_ID=le-project-id
SANITY_STUDIO_DATASET=production
SANITY_STUDIO_CLOUDINARY_CLOUD_NAME=le-cloud-name
SANITY_STUDIO_CLOUDINARY_UPLOAD_PRESET=le-nom-du-preset
```

Et à la racine du site, `.env` (voir `.env.example`) :

```
VITE_SANITY_PROJECT_ID=le-project-id
VITE_SANITY_DATASET=production
VITE_CLOUDINARY_CLOUD=le-cloud-name
```

## 2 bis. Autoriser le site à lire les données (CORS) — NE PAS SAUTER

Sans cette étape, le navigateur bloque la requête, **le code avale l'erreur en
silence** et la galerie ne se met jamais à jour : le site continue d'afficher les
pièces en dur, sans le moindre message d'erreur. C'est le piège classique de
Sanity, et il coûte une heure à diagnostiquer.

Dans https://sanity.io/manage → le projet → **API** → **CORS origins**,
ajouter, sans cocher « Allow credentials » (le dataset est public, aucun jeton
n'est envoyé) :

- `http://localhost:5173` — le site en développement
- `https://achardebenisteries.vercel.app` — la préproduction
- `https://achard-crea.fr` — le domaine définitif, dès qu'il est réservé

Pour vérifier que c'est bon : ouvrir le site, console du navigateur, aucune
erreur `CORS` ne doit apparaître et la galerie doit se recharger.

## 3. Installer et tester en local

```bash
cd studio
npm install
npm run dev
```

Le studio s'ouvre sur http://localhost:3333. Vérifier :

- une seule entrée « Réalisations » dans le menu de gauche
- le bouton d'ajout d'une pièce ouvre bien la fenêtre Cloudinary
- une photo envoyée s'affiche dans l'aperçu de la ligne
- les lignes se déplacent au glisser-déposer

## 4. Mettre le studio en ligne

```bash
npm run deploy
```

Sanity demande un nom de sous-domaine, par exemple `achard-crea`.
L'adresse devient **https://achard-crea.sanity.studio**, c'est celle à donner
à Renaud.

## 5. Donner l'accès à Renaud

Dans les réglages du projet Sanity, inviter son adresse email en rôle
**Editor**. Il se connecte avec Google ou par lien email, sans mot de passe à
retenir.

Lui envoyer ensuite `NOTICE-RENAUD.md`, écrite pour lui.

## 6. Reprendre les 9 pièces existantes

À la première ouverture, la liste du studio est vide et **le site continue
d'afficher les 9 pièces écrites en dur** dans `src/lib/realisations.js`. C'est
voulu : rien ne casse tant que le CMS n'est pas rempli.

Recopier les 9 pièces dans le studio (titres et matières sont dans
`realisations.js`, photos dans `src/assets/realisations/`). Dès qu'au moins une
pièce est publiée, le site bascule sur la liste du CMS.

Garder la liste en dur en l'état : elle reste le filet de sécurité si Sanity est
injoignable, et c'est elle que lisent les moteurs de recherche dans le HTML.

## Comment ça marche, en deux lignes

Sanity garde le texte et l'ordre. Cloudinary garde les photos et les vidéos, et
les optimise tout seul : une photo de 8 Mo sortie d'un téléphone est servie
autour de 200 Ko, une vidéo est ré-encodée pour le web. C'est ce point qui a
motivé les deux services plutôt qu'un seul : sans Cloudinary, un fichier brut de
70 Mo partirait tel quel sur le site.

Renaud, lui, ne voit que le studio.
