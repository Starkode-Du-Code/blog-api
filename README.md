# 📰 Blog API – Gestion complète d'un blog avec Node.js, Express, MongoDB & JWT

Ce projet consiste en la création d'une **API REST** pour un blog permettant de gérer des utilisateurs, des articles, des commentaires, et des catégories. Elle inclut des fonctionnalités telles que l'authentification avec **JWT**, la gestion des erreurs, et la documentation interactive avec **Swagger**.

---

## 🎯 Objectifs

- Créer une API REST complète pour gérer un blog avec **CRUD** pour les utilisateurs, les articles, les catégories, et les commentaires.
- Sécuriser certaines routes avec des tokens **JWT**.
- Gérer les validations des données avec **Joi**.
- Documenter l'API avec **Swagger**.
- Gérer les erreurs efficacement avec des messages cohérents et une gestion centralisée des erreurs.

---

## ⚙️ Prérequis

Avant de commencer, assurez-vous d'avoir installé les outils suivants :

- **Node.js** (v14+ recommandé) : [Télécharger Node.js](https://nodejs.org/)
- **MongoDB** : [Télécharger MongoDB](https://www.mongodb.com/try/download/community)
- **Postman** (facultatif, pour tester l'API) : [Télécharger Postman](https://www.postman.com/downloads/)
- **MongoDB Compass** (facultatif, pour gérer la base de données) : [Télécharger MongoDB Compass](https://www.mongodb.com/products/compass)

---

## 📂 Structure des dossiers

Voici la structure des dossiers de ce projet :
📦 blog-api
┣ 📂controllers # Contient les fichiers de contrôleurs
┣ 📂middleware # Contient le middleware JWT
┣ 📂models # Modèles Mongoose pour MongoDB
┣ 📂routes # Fichiers de gestion des routes
┣ 📜.env # Variables d'environnement (non inclus dans Git)
┣ 📜README.md # Ce fichier
┣ 📜server.js # Fichier principal de configuration du serveur
┗ 📜package.json # Fichier des dépendances

- **controllers** : Contient les fichiers pour la logique métier, tels que la gestion des utilisateurs, des articles, des catégories et des commentaires.
- **middleware** : Contient le middleware utilisé pour la gestion de l'authentification avec JWT.
- **models** : Contient les modèles Mongoose pour interagir avec MongoDB.
- **routes** : Contient les routes Express pour chaque ressource (utilisateurs, articles, etc.).
- **.env** : Contient les variables d'environnement comme la configuration MongoDB et le secret JWT.
- **server.js** : Fichier principal pour démarrer le serveur Express.
- **package.json** : Fichier contenant les dépendances et scripts du projet.
- **README.md** : Documentation du projet (ce fichier).

---

### ⚙️ Configuration initiale

- Installez les dépendances en exécutant `npm install`.Cela installera toutes les bibliothèques listées dans le fichier package.json, telles que Express, Mongoose, jsonwebtoken, bcrypt, Joi, et Swagger.

- Assurez-vous que MongoDB est en cours d'exécution.

- Créez un fichier `.env` à la racine du projet pour y stocker les informations de configuration sensibles, comme la connexion à MongoDB et le secret JWT.

Exemple de fichier .env :

```bash
DB_URI=mongodb://localhost:27017/blog
PORT=5000
JWT_SECRET=monsecretJWTsupersecurise
```

# Explications :

# DB_URI : l'URL de connexion à MongoDB.

# PORT : le port sur lequel le serveur tournera (par défaut 5000).

# JWT_SECRET : la clé secrète pour signer et vérifier les tokens JWT.

## 🚀 Lancer MongoDB & Démarrer le Serveur

### 4. Démarrer MongoDB 🛠️

Pour que votre API fonctionne, assurez-vous que **MongoDB** est en cours d'exécution. Si vous utilisez MongoDB localement, lancez-le avec la commande suivante dans votre terminal :

```bash
mongod
```

## 🚀 Démarrer le serveur Express 🖥️

### 5. Lancer le serveur Express

Une fois que **MongoDB** est en cours d'exécution, démarrez le serveur **Express** pour activer votre API.

Utilisez la commande suivante :

```bash
npm start
```

Si tout est configuré correctement, vous verrez le message suivant dans votre console :

```bash
Le serveur tourne sur le port 5000
Connecté à MongoDB

```

## 🌟 Votre API est maintenant opérationnelle !

Vous pouvez tester toutes les routes en utilisant Postman ou accéder à la documentation interactive Swagger à l'adresse suivante :

```bash
http://localhost:5000/api-docs
```

## 🔄 Tester l'API avec Postman et Swagger 🚀

### 6. Tester les routes avec Postman

Vous pouvez tester les routes de votre API via **Postman**. Voici un exemple pour tester la création d'un utilisateur :

- **Méthode** : POST
- **URL** : http://localhost:5000/api/users
- **Body** (choisir `raw` et `JSON` dans Postman) :

```json
{
  "username": "nouvel_utilisateur",
  "email": "nouvel_utilisateur@example.com",
  "password": "password123",
  "role": "author"
}
```

Si la requête est valide, vous recevrez une réponse avec les informations de l'utilisateur créé.

### 7. Accéder à la documentation Swagger

La documentation Swagger est générée automatiquement pour vous aider à explorer et tester votre API.

Pour y accéder, ouvrez votre navigateur et rendez-vous à l'adresse suivante ` http://localhost:5000/api-docs`

Vous y trouverez une interface complète pour tester les routes GET, POST, PUT, DELETE de votre API directement depuis le navigateur.

## 🔐 Sécurisation de l'API avec JWT

### 8. Authentification avec JSON Web Token (JWT)

Certaines routes de l'API sont protégées et nécessitent un **token JWT** pour y accéder.

#### 8.1. Connexion de l'utilisateur et génération du JWT

Pour obtenir un **token JWT**, un utilisateur doit se connecter avec son **email** et **mot de passe** via la route `/api/login`.

- **Méthode** : POST
- **URL** : http://localhost:5000/api/login
- **Body** (choisir `raw` et `JSON` dans Postman) :

```json
{
  "email": "nouvel_utilisateur@example.com",
  "password": "password123"
}
```

Si la connexion réussit, vous recevrez un token JWT comme réponse.

#### 8.2. Utiliser le token pour accéder aux routes protégées

Après avoir obtenu le token JWT, vous pouvez accéder aux routes protégées en ajoutant un en-tête Authorization dans vos requêtes.

Exemple d'en-tête dans Postman :

- Key : Authorization
- Value : Bearer <votre_token_jwt>

Toutes les routes qui nécessitent une authentification, comme la suppression ou la mise à jour d'un utilisateur, vérifieront automatiquement la validité du token.

## 📋 Documentation de l'API avec Swagger

### 9. Accéder à la documentation interactive 📝

L'API est entièrement documentée avec **Swagger**, ce qui permet de visualiser et de tester toutes les routes directement depuis votre navigateur.

- **URL de la documentation Swagger** :

```bash
http://localhost:5000/api-docs
```

Lorsque vous ouvrez cette URL, vous verrez un aperçu complet de toutes les routes disponibles (GET, POST, PUT, DELETE) pour les utilisateurs, articles, catégories, et commentaires.

### 10. Tester les routes de l'API avec Postman 🔍

Ajouter un utilisateur :

- Méthode : POST
- URL : http://localhost:5000/api/users
- Body (JSON) :

```json
{
  "username": "nouvel_utilisateur",
  "email": "nouvel_utilisateur@example.com",
  "password": "password123",
  "role": "author"
}
```

Connexion de l'utilisateur :

- Méthode : POST
- URL : http://localhost:5000/api/login
- Body (JSON) :

```json
{
  "email": "nouvel_utilisateur@example.com",
  "password": "password123"
}
```

Obtenir tous les articles :

- Méthode : GET
- URL : http://localhost:5000/api/posts

Ajouter un article (nécessite un token JWT) :

- Méthode : POST
- URL : http://localhost:5000/api/posts
- Authorization : Bearer <votre_token_jwt>
- Body (JSON) :

```json
{
  "title": "Mon premier article",
  "content": "Contenu de l'article...",
  "author_id": "ID_utilisateur",
  "categories": ["Tech"],
  "tags": ["API", "Node.js"]
}
```

Supprimer un article (nécessite un token JWT) :

- Méthode : DELETE
- URL : http://localhost:5000/api/posts/{id}

### 🌐 Conclusion

Vous avez maintenant une API REST complète pour un blog, dotée de fonctionnalités de gestion d'utilisateurs, articles, commentaires, catégories, et de la documentation interactive. 🚀

N'oubliez pas d'utiliser Postman ou Swagger pour tester chaque route et assurer une expérience optimale. Bonne chance dans vos futurs projets de développement ! 😎
