# Achard Créa — où en est le projet

Document unique de suivi. Mis à jour le **23 octobre 2026**.
Si tu ne dois lire qu'une chose avant de reprendre le dossier, c'est ce fichier.

- **En ligne** : https://achard-créa.fr (forme technique `xn--achard-cra-j7a.fr`)
- **Préproduction** : https://achardebenisteries.vercel.app
- **Dépôt** : github.com/Elie-web/renaud (branche `main`)
- **Projet Vercel** : `achard_ebenisteries`, **relié à GitHub** : chaque
  `git push` sur `main` part en production, sans validation. Constaté le
  06/10/2026 (alias `git-main` sur les déploiements). ⚠ Ne pousser que ce qui
  peut être en ligne.
- **Client** : Renaud Achard de Leluardière, micro-entreprise, SIRET 920 208 907 00013.
  Siège 242 chemin des Combes, 74170 Saint-Gervais-les-Bains. Atelier 371 route de
  la Vigne, 74700 Sallanches. Tél 06 34 08 46 90.

---

## Réponse courte : où en est le site ?

**Le site est en ligne, la police est payée, le code est terminé.** Visio de
clôture avec Renaud le 06/10/2026 : il valide le site (« franchement, il y a
rien à redire »).

Il reste trois branchements, tous prêts côté code, qui attendent une valeur ou
un compte. Voir « Ce qui RESTE » : le formulaire, Instagram (identifiant puis
flux), et la galerie Sanity.

---

## Visio du 06/10/2026 : ce qu'il a demandé, ce qui est fait

| Demande | État |
|---|---|
| Mettre la police achetée | ✅ Relicta Regular, contour supprimé partout. Voir `POLICES.md` |
| Centrer « Achard Créa / Ébéniste · sur mesure » à côté du logo | ✅ Les deux lignes sont centrées l'une sous l'autre (`Nav.jsx`) |
| Email affiché : son Gmail, pas de boîte pro pour l'instant | ✅ `renaud.achard@gmail.com`, confirmée par écrit par Elie, posée partout |
| Mettre son Instagram | ✅ `@woody_woodien`, posé le 23/10/2026 (contact, pied de page, `sameAs`, `llms.txt`) |
| Une section qui affiche ses derniers posts Instagram | ⏳ `Instagram.jsx` écrit et testé, **flux Behold à créer** |
| Brancher le formulaire sur sa boîte mail | ⏳ Code Web3Forms écrit et testé, **clé à créer** |
| Galerie où il met ses photos et vidéos | ✅ **Branchée le 23/10/2026**, https://achard-crea.sanity.studio. **Les vidéos aussi**, voir plus bas |
| Domaine en punycode quand on copie le lien | Accepté par Renaud, rien à faire. Changer de domaine serait payant |

> ✅ **L'adresse Gmail a été confirmée par écrit** : `renaud.achard@gmail.com`.
> La transcription de la visio hésitait entre « renaud.hachard » et
> « reno.char ». Elle est dans `src/lib/coordonnees.js`, le JSON-LD, le repli
> sans JavaScript, les deux pages légales, la 404 et `llms.txt`.

### Les vidéos : finalement dans Sanity, pas sur Instagram (23/10/2026)

**Décision d'Elie : pas de troisième compte pour Renaud.** La section Instagram
« derniers posts » est abandonnée (elle imposait un compte Behold et la
connexion de son Instagram). Les vidéos vont donc dans la galerie Sanity, avec
des garde-fous, parce que Sanity ne transcode pas.

- Champ **Vidéo** facultatif sur chaque pièce. La photo reste obligatoire : elle
  sert d'image d'attente et c'est elle que Google référence.
- Le studio **avertit** si le fichier est un `.mov` ou dépasse 50 Mo.
- Sur le site : **5 Mo ou moins** → la vidéo se lance seule, en boucle et muette.
  **Au-dessus** → la photo s'affiche avec un bouton Lecture, et **rien n'est
  téléchargé avant le clic** (`preload="none"`, vérifié à 0 octet).
- Si le navigateur ne sait pas lire le fichier, on retombe sur la photo.
- La notice de Renaud explique tout ça (`studio/NOTICE-RENAUD.md`).

⚠ Le point faible reste le format : un iPhone mal réglé produit du HEVC que
Windows ne lit pas. Le réglage « Le plus compatible » est dans sa notice, et le
studio l'avertit, mais rien ne l'empêche d'envoyer un fichier illisible. Si ça
arrive, la page ne casse pas, elle affiche la photo.

### Archive : pourquoi on avait d'abord mis les vidéos sur Instagram

Renaud veut pouvoir ajouter des vidéos. Sanity stocke les fichiers mais ne les
convertit pas : une vidéo d'iPhone (HEVC, `.mov`) ne se lit pas dans Chrome ni
Firefox sous Windows, et pèse des dizaines de Mo. Il faudrait rebrancher
Cloudinary rien que pour ça (voir `src/lib/galerie.js`).

La section Instagram règle le problème sans rien ajouter : ses Reels arrivent sur
le site avec leur vignette, et le clic ouvre la vidéo sur Instagram. Il poste une
fois, ça sort aux deux endroits, ce qui est exactement ce qu'il a décrit. **La
galerie Sanity reste pour les photos** des réalisations finies.

---

## Ce qui est FAIT

### Design et contenu

- Direction artistique « Atelier lumineux » : papier chaud, accent argile, aucune
  dorure. Trois tours de retours client absorbés (juin 2026).
- **Renaud a choisi la V1** (vocal du 13/08/2026). Les 6 autres mises en page ont
  été sorties du dépôt, sauvegardées dans `_brouillon/` (non versionné).
- Site **une seule page**, avec ancres de navigation. C'est ce qui a été facturé.
- Sections en place : Hero, Services, Réalisations, Métier, ImageBand, Processus,
  Engagements, FAQ, Contact, Footer, CTA flottant, bouton WhatsApp.
- **Vraies photos du client** intégrées et rangées par famille dans
  `src/assets/photos/` puis `src/assets/realisations/`, converties en WebP 1800 px.
- Textes repris sur ses retours vocaux : « je » partout, plus aucune mention de
  garantie, process en 4 étapes, création en 2019, CAP mentionné.
- Aucun em dash dans tout le site (texte, alt, méta, JSON-LD, commentaires).

### Technique

- React 18 + Vite + Framer Motion. Build propre en ~8 s.
- Police des titres **auto-hébergée** en woff2 (33 Ko) et préchargée ; une seule
  famille distante (Inter). Les 7 familles du panneau « Personnaliser » ne sont
  plus chargées par les visiteurs.
- Image du hero préchargée en `fetchpriority="high"` (c'est le LCP).
- Panneau « Personnaliser » chargé en `lazy`, visible seulement en `npm run dev`
  ou via `…/#perso` en ligne. Invisible pour un visiteur.
- Icônes aux bonnes tailles (l'ancien favicon unique était un PNG de 1394 px).

### SEO / GEO

- Title, meta description, canonical, hreflang, Open Graph, Twitter Card.
- **JSON-LD en `@graph`** : LocalBusiness + HomeAndConstructionBusiness, Person
  (signaux E-E-A-T : diplômes), WebSite, WebPage, FAQPage.
- `areaServed` couvre les 10 communes de la zone.
- `robots.txt` qui autorise nommément les crawlers IA (GPTBot, ClaudeBot,
  PerplexityBot, etc.), `sitemap.xml`, `llms.txt` complet.
- **Pas d'`aggregateRating`** : volontaire, tant qu'il n'y a pas de vrais avis.

### Juridique (fait le 07/09/2026, commit `43b18cf`)

- **Mentions légales** complètes : statut, SIRET, siège, atelier, hébergeur,
  assurance professionnelle (assureur et couverture géographique seulement — le
  numéro de contrat n'est pas exigé et n'a rien à faire en ligne).
- **Politique de confidentialité** : responsable du traitement identifié (exigé
  par l'article 13 du RGPD, il manquait), hébergeur nommé, transfert hors UE encadré.
- **JSON-LD, meta geo et llms.txt** : l'adresse déclarée était « Chamonix-Mont-Blanc
  74400 », où l'entreprise n'a aucun local. Corrigée en Sallanches, SIRET ajouté.

### Finition et qualité (passe du 16/09/2026, mesurée dans le navigateur)

**Accessibilité.** Les 9 sections ont un nom accessible. L'accordéon FAQ garde
ses panneaux montés (ils n'existaient pas quand ils étaient repliés, donc les
boutons désignaient un identifiant absent). Le carrousel a un vrai `tabpanel`
associé à ses onglets, plus la navigation aux flèches, Début et Fin. Le menu
mobile annonce son état, se ferme à Échap, prend le focus et le rend au bouton.
Le formulaire a l'autocomplétion. Le logo de la nav est décoratif, son texte
était déjà dans le même lien.

**Contraste.** Trois échecs réels au seuil AA corrigés : deux opacités qui
écrasaient des couleurs déjà secondaires, et le surtitre de catégorie sur photo
(argile foncée, 11 px, seul des trois libellés sans ombre portée, sur un voile
à 61 % seulement). Nouveau jeton `--c-or-clair`. **Plus aucun échec sur la page.**

**Partage social.** `og.jpg` dédié en 1200x630 : le WebP n'est que partiellement
géré par WhatsApp et LinkedIn, et le 3:2 du hero n'est pas le 1,91:1 attendu.
Trois variantes 16:9 / 4:3 / 1:1 déclarées dans le JSON-LD, comme Google le
recommande pour les résultats enrichis.

**En-têtes.** Vercel servait tout en `max-age=0`, y compris les fichiers hachés
par Vite dont le nom porte déjà une empreinte : chaque visiteur qui revenait
revalidait tout. Corrigé, plus les en-têtes de sécurité usuels.

**Page 404** à la marque du site, au lieu de la page générique de Vercel.

**Repli sans JavaScript** : il affirmait encore que l'atelier est à Chamonix.
Corrigé, et il renvoie maintenant vers les pages légales.

**Mesures :** CLS à 0, 495 Ko au total, DOM prêt en 256 ms, zéro erreur de
console, zéro lien interne cassé sur les 4 pages, 24 images toutes avec alt,
un seul h1 et aucun saut de niveau de titre.

### Passe légale du 06/10/2026

**Pas de CGV sur le site, et c'est normal.** Rien ne se vend en ligne : aucune
loi n'impose de CGV sur un site vitrine. Ce qui compte pour Renaud, c'est son
**devis**, qui doit porter ses conditions (acompte, délais, paiement). Si on lui
en rédige un jour, c'est un document à joindre à ses devis, pas une page.

Corrigé dans les pages légales :
- **Inter venait de Google Fonts**, donc chaque visite envoyait l'adresse IP du
  visiteur à Google, et la politique de confidentialité ne le disait pas. Inter
  est maintenant auto-hébergée. Plus aucune requête vers un tiers au chargement.
- **Base légale** : la politique citait consentement ET intérêt légitime pour
  le même traitement. Remplacé par l'article 6.1.b (demande de devis).
- **Droits** : ajout de la portabilité, des directives post-mortem et du délai
  de réponse d'un mois. « Saisir la CNIL » devient « adresser une réclamation ».
- **Mentions légales** : une note de travail était visible (« Le numéro à faire
  figurer est le SIRET ci-dessus »). Remplacée par la mention RNE + SIREN.
  Ajout des crédits typographiques (Relicta sous licence commerciale, Inter OFL).
- Paragraphes Web3Forms et Behold **prêts en commentaire**, à activer avec leur
  service (voir plus bas).

Toujours non réglé, et c'est la décision de Renaud : le **médiateur de la
consommation** (voir plus bas, ne pas relancer).

### Prêt mais pas branché

- **CMS galerie** : **Sanity seul** (Cloudinary retiré le 16/09/2026, inutile pour
  les images). Le champ photo a un **hotspot** : Renaud pose un cercle sur ce qu'il
  ne faut pas couper, les vignettes sont rognées dessus. Le code est écrit et
  **testé**, et se dégrade proprement : sans variables d'environnement, le site
  affiche les 9 pièces en dur et ne casse jamais. Notice client rédigée
  (`studio/NOTICE-RENAUD.md`). Il manque **la création du compte** (~5 min).

---

## Ce qui RESTE

### 🔴 Bloquants — le site ne peut pas être mis en ligne sans ça

~~**1. Réserver le domaine.**~~ ✅ **FAIT le 16/09/2026.**

Renaud a pris **achard-créa.fr**, avec l'accent. Sa forme ASCII est
`xn--achard-cra-j7a.fr`. Le site est en ligne dessus, HTTPS actif, `www` redirige
vers la racine en 308.

- DNS chez Gandi : `A @ 76.76.21.21` et `A www 76.76.21.21`. L'enregistrement de
  parking de Gandi (217.70.184.38) a été supprimé, il entrait en conflit. Le CNAME
  `www` vers webredir.vip.gandi.net a été remplacé. **MX, SPF, DKIM et SRV intacts.**
  Un instantané de la zone a été sauvegardé chez Gandi avant modification.
- Le code a basculé : punycode partout où une machine lit l'adresse (canonical,
  hreflang, OG, JSON-LD, sitemap, robots), forme accentuée dans le texte affiché.
- ✅ **L'email : Renaud garde son Gmail** (visio du 06/10/2026, « l'email pro,
  c'est pas obligé »). `contact@achard-créa.fr` n'a jamais existé et ne doit plus
  apparaître. S'il veut un jour une adresse sur son domaine, une simple
  redirection Gandi suffit, et on change `EMAIL` dans `src/lib/coordonnees.js`
  plus les pages statiques listées en tête de ce fichier-là.

~~**2. Acheter la licence Relicta.**~~ ✅ **FAIT le 06/10/2026.** Renaud a payé
et envoyé Light + Regular. Les titres sont en Regular, le contour est supprimé.
Voir `POLICES.md`.

**3. Médiateur de la consommation.** (50 à 500 €/an) — **refusé pour l'instant
par Renaud, 17/09/2026.**

Il estime ne pas être concerné tant qu'il ne vend pas d'objets. C'est inexact et
le lui a été dit : l'article L. 612-1 s'applique dès qu'on contracte avec un
particulier, **pour un bien comme pour un service**, et une cuisine posée chez un
client en est un. Vérifié sur Légifrance, amende jusqu'à 3 000 € (L. 641-1),
aucune dispense selon la taille. La décision lui appartient, ne pas relancer.

**Le site n'affiche plus de champ en attente** : la section a été retirée de
l'affichage, son contenu et la marche à suivre restent en commentaire dans
`public/mentions-legales.html`. C'est cosmétique, pas une mise en conformité.

### ✅ Tranché le 07/09/2026 — l'atelier est situé à Sallanches

Le site plaçait l'atelier « dans la vallée de Chamonix ». Il est à Sallanches.
Seules les phrases qui **situent** l'atelier ont changé ; Chamonix reste partout
où il s'agit de la **zone desservie**, ce qui est vrai et reste la cible.
Title, meta description, og, JSON-LD, textes visibles et alt sont alignés.
Commit `60e47fd`, revert en une commande si besoin.

### 🟡 Important, mais ne bloque pas la mise en ligne

Toutes les valeurs se posent dans **`src/lib/coordonnees.js`**, le seul fichier
à toucher côté React. Une valeur vide désactive proprement ce qui en dépend.

~~**5. Le formulaire : Web3Forms.**~~ ✅ **BRANCHÉ le 25/10/2026.**

- Clé `8df06091-4651-4b05-83f7-d2e89feb9f7a`, posée dans `src/lib/coordonnees.js`.
  Elle est **publique par conception** et part dans le code du navigateur.
- Compte Web3Forms **d'Elie** (elie@elieageron.com), formule gratuite,
  250 envois/mois. Formulaire nommé « site renaud ».
- Réglages faits : objet par défaut « Demande de devis - site achard-créa.fr »,
  expéditeur « Site Achard Créa », filtre anti-spam actif, **pas de captcha**
  (le site n'en envoie pas, l'activer casserait le formulaire), conservation
  des demandes **3 ans**, ce qui correspond à ce qu'annonce la politique de
  confidentialité. Le texte d'intro des emails reste en anglais : c'est une
  option payante, jugée cosmétique.
- Politique de confidentialité basculée : le paragraphe décrit Web3Forms et
  non plus le `mailto:`.
- Envoi de test réel effectué depuis le formulaire : accepté par l'API.

✅ **Destinataire basculé sur Renaud le 28/10/2026.** Il a validé son adresse
(`renaud.achard@gmail.com` est « verified » dans Linked Emails), et c'est elle
qui est désormais seule dans Recipient Emails. Vérifié après rechargement de la
page, puis par un envoi réel depuis le site en ligne, accepté par l'API.

⚠ Le gratuit n'autorise **qu'un seul destinataire** (1/1) et le CC est payant :
Elie ne reçoit donc plus rien. Pour qu'il revoie passer les demandes, il faudrait
soit repasser son adresse en destinataire (et Renaud ne recevrait plus), soit
payer. Le compte Web3Forms reste au nom d'Elie : **si un jour il ferme ce compte,
le formulaire de Renaud s'arrête.** À transférer si la relation se termine.

**6. Instagram : identifiant puis flux Behold.**
1. Récupérer son identifiant, le poser dans `INSTAGRAM`. Le lien apparaît dans
   le contact (5e tuile) et le pied de page. L'ajouter aussi à la main dans
   `sameAs` d'`index.html` et dans `public/llms.txt`.
2. Sur behold.so, **Renaud** connecte son compte Instagram (c'est son mot de
   passe), crée un flux de type JSON, et envoie l'adresse
   `https://feeds.behold.so/…`. Si Behold refuse le compte, il faut le passer en
   compte professionnel « Créateur » dans les réglages Instagram : gratuit, une
   minute, rien ne change pour ses abonnés.
3. La poser dans `BEHOLD_FEED`. La section « L'atelier, au jour le jour »
   apparaît entre la bande photo de l'atelier et le processus.
4. Dans `public/confidentialite.html`, décommenter le paragraphe Behold.

Formule gratuite de Behold : 6 publications, mise à jour une fois par jour,
1 200 affichages par mois. Le flux n'est demandé qu'à l'approche de la section,
donc un visiteur qui ne descend pas ne consomme rien. Au delà du quota, la
grille disparaît et il reste le bouton vers son compte.

**6 bis. Fiche Google Business.** Toujours à créer, puis à ajouter dans
`sameAs`. C'est le meilleur rapport effort/effet SEO local du dossier.

~~**7. Ouvrir le compte Sanity.**~~ ✅ **FAIT le 23/10/2026.**

- Projet Sanity `e74r8e4d`, dataset `production` (public, lecture seule).
- **Studio en ligne : https://achard-crea.sanity.studio** — c'est l'adresse de
  Renaud. Il se connecte avec son Gmail, invité en rôle **Editor**.
- Les 3 origines CORS sont posées (localhost:5173, la préprod, le domaine).
- **Variables déclarées chez Vercel** (`VITE_SANITY_PROJECT_ID`,
  `VITE_SANITY_DATASET`) : sans elles le build de production ignore le CMS.
- Il a fallu créer `studio/sanity.cli.ts`, qui n'existait pas : sans lui toutes
  les commandes `sanity` échouent. En `.ts` et pas `.js` à cause du
  `"type": "module"` du paquet, voir le commentaire en tête du fichier.

- ✅ **Les 9 pièces ont été importées dans le studio** par
  `studio/scripts/importer-realisations.mjs`. C'était nécessaire, pas cosmétique :
  dès qu'UNE pièce est publiée, le site bascule entièrement sur le CMS. Sans
  import préalable, la première photo de Renaud aurait fait disparaître les 9
  autres. Maintenant, ajouter une pièce est additif.
- ✅ **Politique de confidentialité à jour** : paragraphe sur `cdn.sanity.io`.

⚠ **Les photos n'ont pas de point d'intérêt** (hotspot) : les vignettes sont
donc cadrées par `crop=entropy`, Sanity choisit seul. Pour reprendre la main,
ouvrir une pièce dans le studio, cliquer la photo et déplacer le cercle.

~~**8. Relier le projet Vercel à GitHub.**~~ ✅ Fait : constaté le 06/10/2026,
un `git push` a déclenché un déploiement en production.

### ⚪ À signaler à Renaud — hors site

- Son attestation AXA porte encore **son ancienne adresse à Bayonne**
  (20 av. Louise Darracq). À faire corriger chez son agent.
- C'est une **RC professionnelle, pas une décennale**. S'il pose de l'agencement
  fixe ou des escaliers, la décennale peut être exigée. À vérifier avec lui.

---

## Décisions déjà tranchées — ne pas les rouvrir

| Sujet | Décision | Quand |
|---|---|---|
| Police des titres | Relicta, on achète la licence. Pas de substitution libre. | 13/08/2026 |
| Mise en page | V1. Les 6 autres sont sorties du dépôt. | 13/08/2026 |
| Témoignages | Retirés tant qu'il n'y a pas de vrais avis. Composant gardé en brouillon. | 13/08/2026 |
| `aggregateRating` | Hors du JSON-LD tant qu'il n'y a pas de vrais avis. | 13/08/2026 |
| Dépôt git de 494 Mo | Laissé tel quel. Les vidéos ne partent pas dans le build. | 13/08/2026 |
| Nombre de pages | Une seule page. C'est ce qui a été facturé. | 08/06/2026 |
| Nom | « Achard Créa » (remplace « Achard Ébénisterie »). | 08/06/2026 |
