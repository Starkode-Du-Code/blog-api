const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json()); // Pour permettre l'utilisation de JSON dans les requêtes

// Swagger
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Configuration de Swagger
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Blog API",
      version: "1.0.0",
      description: "API pour gérer les articles, utilisateurs et catégories",
    },
    servers: [{ url: "http://localhost:5000" }],
  },
  apis: ["./routes/*.js"], // Indique le chemin vers tes fichiers de routes pour générer la doc
};

// Génération de la documentation Swagger
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Importer les routes
const postRoutes = require("./routes/posts");
const userRoutes = require("./routes/users");
const categoryRoutes = require("./routes/categories"); // Si tu as créé ces routes
const commentRoutes = require("./routes/comments"); // Si tu as créé ces routes

// Utiliser les routes
app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);
// app.use("/api/categories", categoryRoutes); // Décommente si ces routes existent
// app.use("/api/comments", commentRoutes); // Décommente si ces routes existent

// Route de base
app.get("/", (req, res) => {
  res.send("API de Blog est opérationnelle");
});

// Middleware pour capturer les erreurs de syntaxe JSON mal formé
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({ message: "Requête JSON mal formée" });
  }
  next(err);
});

// Middleware pour les routes non trouvées (404)
app.use((req, res, next) => {
  res.status(404).json({ message: "Ressource non trouvée" });
});

// Middleware de gestion des erreurs global
app.use((err, req, res, next) => {
  console.error(err.stack);

  // Gestion des erreurs avec un message explicite pour les erreurs connues
  const status = err.status || 500;
  const message = err.message || "Erreur serveur";

  res.status(status).json({
    status: status,
    message: message,
  });
});

// Connexion à MongoDB
mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log("Connecté à MongoDB"))
  .catch((err) => console.error("Erreur de connexion à MongoDB:", err));

// Démarrer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Le serveur tourne sur le port ${PORT}`);
});
