# API Blog — INF222 EC1 TAF1

API REST backend pour la gestion d'un blog simple, développée avec **Node.js / Express** et **SQLite**.

---

## Technologies utilisées

| Technologie       | Rôle                        |
|-------------------|-----------------------------|
| Node.js           | Environnement d'exécution   |
| Express.js        | Framework Web               |
| SQLite3           | Base de données             |
| Swagger UI        | Documentation interactive   |

---

## Structure du projet

```
blog-api/
├── server.js                    # Point d'entrée
├── package.json
├── swagger.json                 # Documentation Swagger
├── routes/
│   └── articles.js              # Définition des routes
├── controllers/
│   └── articlesController.js    # Logique métier
├── models/
│   └── database.js              # Connexion et init SQLite
└── data/
    └── blog.db                  # Fichier base de données (auto-créé)
```

---

## Installation et démarrage

```bash
# 1. Cloner le dépôt
git clone https://github.com/VOTRE_USERNAME/blog-api-inf222.git
cd blog-api-inf222

# 2. Installer les dépendances
npm install

# 3. Démarrer le serveur
npm start

# Ou en mode développement (redémarrage automatique)
npm run dev
```

Le serveur tourne sur : **http://localhost:3000**  
Documentation Swagger : **http://localhost:3000/api-docs**

---

## Endpoints de l'API

### Créer un article
**POST** `/api/articles`

```json
{
  "titre": "Introduction à Node.js",
  "contenu": "Node.js est un environnement d'exécution JavaScript côté serveur...",
  "auteur": "ange"
  "date": "2026-03-19",
  "categorie": "Technologie",
  "tags": ["nodejs", "backend", "web"]
}
```

**Réponse 201 :**
```json
{ "message": "Article créé avec succès.", "id": 1 }
```

---

### Récupérer tous les articles
**GET** `/api/articles`

Filtres optionnels :
- `?categorie=Technologie`
- `?auteur= ange`
- `?date=2026-03-19`
- Combinés : `?categorie=Tech&auteur=Charles`

**Réponse 200 :**
```json
{
  "articles": [
    {
      "id": 1,
      "titre": "Introduction à Node.js",
      "auteur": "ange",
      "date": "2026-03-19",
      "categorie": "Technologie",
      "tags": ["nodejs", "backend"]
    }
  ]
}
```

---

### Récupérer un article par ID
**GET** `/api/articles/:id`

```
GET /api/articles/1
```

**Réponse 200 :** toutes les informations de l'article  
**Réponse 404 :** `{ "erreur": "Article avec l'ID 1 introuvable." }`

---

### Modifier un article
**PUT** `/api/articles/:id`

```json
{
  "titre": "Nouveau titre",
  "contenu": "Contenu mis à jour...",
  "categorie": "Développement",
  "tags": ["express", "api"]
}
```

**Réponse 200 :** `{ "message": "Article 1 mis à jour avec succès." }`

---

### Supprimer un article
**DELETE** `/api/articles/:id`

```
DELETE /api/articles/1
```

**Réponse 200 :** `{ "message": "Article 1 supprimé avec succès." }`

---

### Rechercher des articles
**GET** `/api/articles/search?query=texte`

```
GET /api/articles/search?query=nodejs
```

Recherche dans le titre ET le contenu des articles.

---

## Codes HTTP utilisés

| Code | Signification              |
|------|----------------------------|
| 200  | OK                         |
| 201  | Création réussie           |
| 400  | Bad Request (données invalides) |
| 404  | Ressource non trouvée      |
| 500  | Erreur serveur interne     |

---

## Bonnes pratiques appliquées

- Validation des entrées (titre, auteur, contenu obligatoires)
- Séparation routes / contrôleurs / modèles
- Codes HTTP sémantiques
- Documentation Swagger intégrée
- Gestion des erreurs centralisée

---

## Auteur
 par  "Ane Tedongmo"

Projet réalisé dans le cadre du cours **INF222 – EC1 Développement Backend**  
Université de Yaoundé I
