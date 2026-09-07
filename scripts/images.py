"""
Génère les variantes d'images du site.

    python scripts/images.py

Chaque emplacement de la page a une largeur d'affichage connue. Ce script produit
une variante calibrée sur cette largeur (x2 pour les écrans à haute densité) au
lieu de servir la photo d'origine. C'est ce qui a fait passer le poids de la page
de 4,0 Mo à 2,2 Mo : une vignette de 92x66 px n'a pas besoin d'une photo de
1350x1800.

Les originaux ne sont JAMAIS modifiés. Le script écrit des fichiers `-suffixe.webp`
à côté, et réécrit ceux qui existent déjà.

Dépendance : Pillow  (pip install Pillow)

── Ajouter une photo de réalisation ────────────────────────────────────────────
1. déposer le fichier dans src/assets/realisations/<famille>/
2. ajouter son chemin dans STAGE ci-dessous (la grande photo ET la vignette sont
   générées ensemble)
3. relancer le script
4. l'importer dans src/lib/realisations.js
"""
from PIL import Image
import os
import sys

RACINE = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
A = os.path.join(RACINE, 'src', 'assets')

# ── Pièces des Réalisations ─────────────────────────────────────────────────
# Chacune produit deux fichiers : `-stage` (grande photo, cadre de ~690 px) et
# `-thumb` (vignette de l'index, 92x66 px).
STAGE = [
    'realisations/cuisine/cuisine-chene-fonce-03.webp',
    'realisations/meuble/table-basse-jeu-01.webp',
    'realisations/meuble/commode-chene-cuir-01.webp',
    'realisations/agencement/bibliotheque-sur-mesure-01.webp',
    'realisations/meuble/console-marqueterie-01.webp',
    'realisations/agencement/meuble-tasseaux-retroeclaire-02.webp',
    'realisations/meuble/chevet-vague-rendu-04.webp',
    'realisations/meuble/table-appoint-marqueterie-01.webp',
    'realisations/objet/boite-noyer-02.webp',
]

# ── Cartes de la vitrine Savoir-faire (330 px d'affichage) ──────────────────
CARTES = [
    'realisations/cuisine/cuisine-ilot-chene-01.webp',
    'realisations/meuble/commode-chene-cuir-01.webp',
    'realisations/agencement/bibliotheque-sur-mesure-01.webp',
    'realisations/objet/boite-noyer-02.webp',
]

# ── Visuels des 4 étapes du Processus (cadre de 360 px) ────────────────────
MOCKUPS = [
    'atelier/rencontre-client-atelier.webp',
    'atelier/assemblage-structure-console.webp',
    'realisations/meuble/table-basse-jeu-rendu-01.webp',
    'realisations/cuisine/cuisine-ilot-chene-01.webp',
]

# ── Photos d'ambiance à largeur intermédiaire ──────────────────────────────
MOYENNES = [
    ('atelier/renaud-portrait-mesure-plateau.webp', 1000),  # portrait À propos
    ('atelier/gabarit-metal-angle.webp', 800),              # photo Engagements
]

# (suffixe, largeur cible, qualité)
RECETTES = {
    'stage':  (1400, 80),
    'thumb':  (220, 82),
    'card':   (700, 82),
    'mockup': (760, 82),
    'med':    (None, 82),   # largeur fournie au cas par cas
}


def variante(rel, suffixe, largeur, qualite):
    src = os.path.join(A, rel)
    if not os.path.exists(src):
        print(f'  ABSENT : {rel}')
        return 0, 0
    dst = f'{os.path.splitext(src)[0]}-{suffixe}.webp'
    im = Image.open(src).convert('RGB')
    if max(im.size) > largeur:
        r = largeur / max(im.size)
        im = im.resize((round(im.width * r), round(im.height * r)), Image.LANCZOS)
    im.save(dst, 'WEBP', quality=qualite, method=6)
    return os.path.getsize(src), os.path.getsize(dst)


def main():
    taches = []
    for rel in STAGE:
        taches.append((rel, 'stage', *RECETTES['stage']))
        taches.append((rel, 'thumb', *RECETTES['thumb']))
    for rel in CARTES:
        taches.append((rel, 'card', *RECETTES['card']))
    for rel in MOCKUPS:
        taches.append((rel, 'mockup', *RECETTES['mockup']))
    for rel, largeur in MOYENNES:
        taches.append((rel, 'med', largeur, RECETTES['med'][1]))

    avant = apres = 0
    for rel, suffixe, largeur, qualite in taches:
        a, b = variante(rel, suffixe, largeur, qualite)
        avant += a
        apres += b
        if b:
            print(f'{a // 1024:>5} Ko -> {b // 1024:>4} Ko  {os.path.basename(rel)} [{suffixe}]')

    if not avant:
        print('Rien à faire.')
        return
    print(f'\n{len(taches)} variantes. {avant // 1024} Ko -> {apres // 1024} Ko '
          f'({100 - apres * 100 // avant} % de moins)')
    print('\nLa boîte en noyer est réencodée un cran plus bas (photo très détaillée,')
    print('elle pesait 273 Ko en stage à qualité normale).')
    # Cette photo est la plus lourde du lot : on la reprend à 72 au lieu de 80.
    variante('realisations/objet/boite-noyer-02.webp', 'stage', 1400, 72)


if __name__ == '__main__':
    sys.exit(main())
