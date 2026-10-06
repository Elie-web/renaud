// ─────────────────────────────────────────────────────────────────────────────
//  COORDONNÉES ET SERVICES EXTÉRIEURS : la seule source pour les composants.
//
//  Chaque valeur vide désactive proprement ce qui en dépend, sans rien casser :
//    - INSTAGRAM vide      → aucun lien Instagram nulle part
//    - BEHOLD_FEED vide    → pas de section « Sur Instagram »
//    - WEB3FORMS_CLE vide  → le formulaire ouvre la messagerie du visiteur
//                            (l'ancien fonctionnement, `mailto:`)
//
//  Aucune de ces valeurs n'est un secret : elles finissent dans le code envoyé
//  au navigateur, et c'est prévu ainsi par les deux services.
//
//  ⚠ Les pages statiques recopient l'email et l'Instagram EN DUR, parce qu'elles
//  ne passent pas par React. Les changer aussi dans :
//    index.html (JSON-LD `email` et `sameAs`, repli <noscript>),
//    public/mentions-legales.html, public/confidentialite.html,
//    public/404.html, public/llms.txt
// ─────────────────────────────────────────────────────────────────────────────

/* Email affiché aux visiteurs. Renaud a choisi son Gmail en visio le
   06/10/2026 : « l'email pro, c'est pas obligé ». S'il crée un jour une boîte
   sur son domaine, c'est ici qu'on la change.
   `contact@achard-créa.fr` n'a jamais existé : les messages s'y perdaient. */
export const EMAIL = 'contact@achard-créa.fr'

/* Identifiant Instagram, sans le @. */
export const INSTAGRAM = ''
export const INSTAGRAM_URL = INSTAGRAM ? `https://www.instagram.com/${INSTAGRAM}/` : ''

/* Flux Instagram, fourni par Behold (behold.so), formule gratuite :
   6 publications, mise à jour une fois par jour, 1 200 affichages par mois.
   Renaud connecte son compte sur behold.so, crée un flux « JSON », et l'adresse
   donnée a la forme https://feeds.behold.so/XXXXXXXXXXXX
   Pas de clé API Instagram à gérer : Behold s'en charge et la renouvelle. */
export const BEHOLD_FEED = ''

/* Envoi du formulaire, par Web3Forms (web3forms.com), formule gratuite.
   La clé se crée sur la page d'accueil de web3forms.com en tapant l'adresse
   qui doit RECEVOIR les demandes : elle arrive par email à cette adresse.
   Les messages partent donc chez Renaud, pas chez Elie. */
export const WEB3FORMS_CLE = ''

/* Lien `mailto:`. Le domaine accentué est écrit en punycode pour que les
   vieux logiciels de messagerie le comprennent. */
export const EMAIL_LIEN = `mailto:${EMAIL.replace('achard-créa.fr', 'xn--achard-cra-j7a.fr')}`
