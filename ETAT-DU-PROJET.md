# Achard Créa — où en est le projet

Document unique de suivi. Mis à jour le **16 septembre 2026**.
Si tu ne dois lire qu'une chose avant de reprendre le dossier, c'est ce fichier.

- **En ligne** : https://achard-créa.fr (forme technique `xn--achard-cra-j7a.fr`)
- **Préproduction** : https://achardebenisteries.vercel.app
- **Dépôt** : github.com/Elie-web/renaud (branche `main`)
- **Projet Vercel** : `achard_ebenisteries` — ⚠ **pas relié à GitHub**, le
  déploiement est manuel : `vercel --prod` depuis la racine du dossier.
- **Client** : Renaud Achard de Leluardière, micro-entreprise, SIRET 920 208 907 00013.
  Siège 242 chemin des Combes, 74170 Saint-Gervais-les-Bains. Atelier 371 route de
  la Vigne, 74700 Sallanches. Tél 06 34 08 46 90.

---

## Réponse courte : où en est le site ?

**Le site est en ligne sur le domaine du client, et le code est terminé.**
Il ne reste aucune tâche de développement bloquante.

Ce qui reste dépend de Renaud : la boîte mail, la licence de la police, le
médiateur, et les liens Google Business / Instagram. Plus un branchement de
compte côté Elie pour la galerie.

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
- ⚠️ **L'email reste à créer.** `contact@achard-créa.fr` est affiché sur le site mais
  **aucune boîte n'existe**. Gandi ne fournit plus de boîte gratuite : il faut soit en
  acheter une, soit poser une simple redirection vers l'adresse personnelle de Renaud.
  Tant que ce n'est pas fait, les messages se perdent. Le lien `mailto:` pointe sur le
  punycode pour que même les vieux clients mail le comprennent.

**2. Acheter la licence Relicta.** (~60 €, une fois, Jehoo Creative)

La police des titres est en licence usage personnel. Elle ne peut pas partir sur
un site client facturé. Décision déjà prise et fermée : **on paie**, la
substitution libre a été essayée et rejetée. Voir `POLICES.md`.
Bonus : la licence livre la vraie graisse, ce qui permettra de supprimer le
`-webkit-text-stroke` qui sert aujourd'hui de pis-aller.

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

**5. Brancher le formulaire de contact.** Il est en `mailto:` : il ouvre la
messagerie du visiteur. Ceux qui n'ont pas de client mail configuré (une bonne
partie des visiteurs mobiles) ne peuvent pas envoyer. Piste évoquée : Google Sheets.

**6. Créer la fiche Google Business**, puis renseigner `sameAs` dans le JSON-LD
d'`index.html` (Instagram + fiche Google). Sans `sameAs`, Google ne relie pas le
site à l'entité qu'il connaît déjà. C'est le meilleur rapport effort/effet SEO
local du dossier. Un commentaire dans le fichier explique où et comment.

**7. Ouvrir le compte Sanity** pour que Renaud gère ses photos seul (~40 min en
comptant le déploiement du studio et les origines CORS). Le code est prêt et testé,
la notice aussi. ⚠ Ne pas sauter l'étape CORS : sans elle la galerie ne se met
jamais à jour, en silence.

**8. Relier le projet Vercel à GitHub**, pour que `git push` déploie. Aujourd'hui
c'est manuel, et la préprod avait 3 semaines de retard sans que ça se voie.

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
