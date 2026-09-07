# Achard Créa — où en est le projet

Document unique de suivi. Mis à jour le **7 septembre 2026**.
Si tu ne dois lire qu'une chose avant de reprendre le dossier, c'est ce fichier.

- **Préproduction** : https://achardebenisteries.vercel.app
- **Dépôt** : github.com/Elie-web/renaud (branche `main`)
- **Projet Vercel** : `achard_ebenisteries` — ⚠ **pas relié à GitHub**, le
  déploiement est manuel : `vercel --prod` depuis la racine du dossier.
- **Client** : Renaud Achard de Leluardière, micro-entreprise, SIRET 920 208 907 00013.
  Siège 242 chemin des Combes, 74170 Saint-Gervais-les-Bains. Atelier 371 route de
  la Vigne, 74700 Sallanches. Tél 06 34 08 46 90.

---

## Réponse courte : le site est-il prêt à être mis en ligne et indexé ?

**Non — mais ce qui reste ne relève presque plus du code.** Il reste trois achats
(environ 100 € au total), une décision de positionnement, et un branchement.

Le code, lui, est terminé : design validé par le client, contenu réel, SEO
technique, performance, accessibilité, données structurées, pages légales.

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

### Prêt mais pas branché

- **CMS galerie** : Sanity (textes et ordre) + Cloudinary (médias optimisés). Le
  code est écrit et se dégrade proprement — sans variables d'environnement, le
  site affiche la liste en dur et ne casse jamais. La notice client est rédigée
  (`studio/NOTICE-RENAUD.md`). Il manque **la création des deux comptes**.

---

## Ce qui RESTE

### 🔴 Bloquants — le site ne peut pas être mis en ligne sans ça

**1. Réserver le domaine `achard-crea.fr` et créer la boîte mail.** (~15 €/an)

Vérifié au DNS le 07/09/2026 : le domaine **n'existe pas** (NXDOMAIN, aucun MX).
Or `contact@achard-crea.fr` est affiché dans le hero, la section contact, le
footer, les mentions légales et le JSON-LD, et c'est la cible du formulaire.
**En l'état, tout message envoyé par un visiteur part dans le vide.**
Le canonical, le sitemap, l'Open Graph et le schema pointent tous sur ce domaine :
tant qu'il n'existe pas, rien ne peut être indexé correctement.

**2. Acheter la licence Relicta.** (~60 €, une fois, Jehoo Creative)

La police des titres est en licence usage personnel. Elle ne peut pas partir sur
un site client facturé. Décision déjà prise et fermée : **on paie**, la
substitution libre a été essayée et rejetée. Voir `POLICES.md`.
Bonus : la licence livre la vraie graisse, ce qui permettra de supprimer le
`-webkit-text-stroke` qui sert aujourd'hui de pis-aller.

**3. Adhérer à un médiateur de la consommation.** (~25-40 €/an)

Article L.616-1 du code de la consommation, obligatoire pour un artisan qui vend
à des particuliers. C'est le **seul champ « à compléter » qui reste** sur
l'ensemble du site (dans les mentions légales).

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

**7. Ouvrir les comptes Sanity et Cloudinary** pour que Renaud gère ses photos
seul. Le code est prêt, la notice aussi.

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
