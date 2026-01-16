### CONTEXTE PROJET WASTE4GOOD 💚

WASTE4GOOD est une association qui sensibilise aux ramassages des déchets sauvages (mégots de cigarette, plastiques d’emballages, etc).
L’objectif est de développer une application avec :

# une vue association

- qui permet de créer les comptes des bénévoles
- qui permet de suivre les statistiques globales des collectes

# une vue bénévole

- qui permet d’enregistrer les collectes selon les lieux de collecte et le type de collecte
- qui permet de dépenser ses points récoltés grâce aux collectes

# 🎯 Objectifs

✅ fait ❌ pas fait 💙 BONUS

## Fonctionnalités BACK-END

✅ Développer un back-end
✅ Mettre en place un CRUD
✅ Mettre en place une base de données
✅ Savoir concevoir le schéma d’une base de données relationnelles
✅ Savoir écrire des requêtes SQL
✅ Savoir utiliser un SGDBR
[ ] Savoir chiffrer un mot de passe
[ ] Comprendre la configuration de son app
✅ L’utilité du package.json

## Fonctionnalités FRONT-END

[ ] Développer en mobile-first
✅ Mettre en place un site interactif
✅ Savoir GET/ POST / PUT ou PATCH / DELETE des données
✅ Adopter un framework [NEXT.JS, EXPRES.JS]
✅ Savoir utiliser un gestionnaire de paquets
✅ Savoir créer des composants
✅ Savoir utiliser des props
✅ Savoir utiliser des states
[ ] BONUS : Savoir utiliser des hooks 🪝

# 💙 BONUS+

✅ (Niveau 1+) Déployer son back-end en production avec Vercel (solution gratuite)
[ ] (Niveau 1+) Développer l’authentification
[ ] (Niveau 2) Mettre en place un middleware
[ ] (Niveau 1) Intégrer des règles d’accessibilité et d’éco-conception
[ ] (Niveau 1) Utiliser un framework CSS tel que Tailwind

### VUES FRONT-END

# 🌱 1. Vue BENEVOLE : Gestion de compte et connexion

Pouvoir se connecter à l’application avec un login et password fourni par l’association

- NIVEAU 1 : tous les bénévoles ont le même identifiant et mot de passe
- NIVEAU 2 : chaque bénévole a ses propres identifiants
  💙 [BONUS] : Pouvoir éditer son profil
- Modifier ses identifiants
- Modifier son mot de passe

# 🌱 2. Vue BENEVOLE : Gestion des collectes de déchets

Pouvoir enregistrer une collecte (bénévole responsable, date, lieu)

- Le.la bénévole responsable est la personne connectée à l’application
- La date saisie par défaut est celle du jour. Il sera possible à l’utilisateur.trice de la modifier
- Pour éviter tout problème de saisie, la localisation sera une liste déroulante - La liste des villes sera stockée en base. On créera une route en back-end pour les récupérer.
- Un enregistrement correspond à l’association des informations suivantes : - Bénévole - Date - Lieu - Déchets collectés - Quantité

# ⚙️ 3. Vue ASSOCIATION : Gestion des bénévoles

✅ Développer une page qui permet de lister tous les bénévoles
Il sera possible de :
✅ - Filtrer les bénévoles par localisation

- 💙 [BONUS] : Retrouver un bénévole au travers d’une recherche par nom
  Développer les fonctionnalités suivante :
  ✅ - Pouvoir ajouter un compte bénévole
  ✅ - Pouvoir modifier un compte bénévole
  ✅ - Pouvoir supprimer un compte bénévole

# ⚙️ 4. Vue ASSOCIATION : Tableau de bord

Développer une vue qui permet à l’association de suivre les statistiques des collectes
✅ - Voir le total de déchets collectés
❌ - Filtrer par date (mois, année)
✅ - Filtrer par lieu (ville ou région)

### 💙 Les BONUS 💪

# 💙 [BONUS] Gamification : dépense des points collectés

Pour encourager les bénévoles dans leurs actions, l’association a décidé de mettre en place un système de points qui, au cumulé, permet de débloquer des dons qu’iels peuvent faire auprès d’associations.

Chaque bénévole cumule des points par rapport à ses collectes
ces points peuvent être transformés en dons pour des associations

## Ressources

# Visuels : Canva

# Icones : LUCIDE : https://lucide.dev/icons/
