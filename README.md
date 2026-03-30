![Badge pour Git](W4G-badge.svg)

### ♻️ PROJET WASTE4GOOD

**Ce projet a été repris de l'ancien projet école "Adaction".**

# 🎯 Objectifs

**WASTE4GOOD** est une association qui sensibilise aux ramassages des déchets sauvages (mégots de cigarette, plastiques d’emballages, etc).
L’objectif est de développer une application avec :

une vue association qui permet :

- de gérer les comptes des bénévoles
- de suivre les statistiques globales des collectes

une vue bénévole qui permet :

- de gérer son profil
- d’enregistrer les collectes selon les lieux de collecte et le type de collecte
- de transformer ses collectes en points
- de convertir les points en argent et les offrir aux associations

## STACK

- **Frontend** : JS / React / Next.js / TailwindCss / React Leaflet / Vercel (hébergement)
- **Backend** : Node.js / Express / bcrypt / Vercel (fonctions serverless pour l’API)
- **Base de données** : Neon / PostgreSQL

## Fonctionnalités BACK-END

- Mise en place d'un CRUD
- Mise en place d'une base de données relationnelle et des requêtes SQL
- Conception schéma d’une base de données relationnelles
- Chiffrage du mot de passe

## Fonctionnalités FRONT-END

- Mise en place d'un site interactif
- Déploiement du back-end en production avec Vercel
- Développement de l'authentification
- Utilisation d'un gestionnaire de paquets
- Utilisation de composants, props et hooks
- Savoir GET/ POST / PUT ou PATCH / DELETE des données
- Adopter un framework

### VUES FRONT-END

## Général

- Voir la localisation des bénévoles sur une carte

## 🌱 Vue BÉNÉVOLE

### Gestion de compte et de connexion

- Se connecter à l’application avec un login et password
- Éditer son profil

### Gestion des collectes de déchets & Gamification

- Enregistrer une collecte (bénévole responsable, date, lieu)
- GAMIFICATION : faire une donation à l'association de son choix grâce aux point cumulés à chaque collecte.
- Visualisation sur son dashboard des points offerts

## ⚙️ Vue ASSOCIATION

### page Gestion des bénévoles

- Liste de tous les bénévoles
- Filtrage des bénévoles par nom/prénom/localisation
- Ajout/modification/suppresion d'un bénévole
- Leaderboard :
  - Visualisation du nombre de collectes par bénévole
  - Visualistion des dons du bénévole

### Tableau de bord (Leaderboard)

Développer une vue qui permet à l’association de suivre les statistiques des collectes

- Voir le total de déchets collectés pour chaque bénévole
- Voir les dons des bénévoles

## Ressources

Visuels : Canva /
Photos : Freepik /
Modélisation : DrawSQL /
Icones : Lucide : https://lucide.dev/icons/
