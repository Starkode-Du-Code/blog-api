const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

/**
 * @swagger
 * /api/posts:
 *   get:
 *     summary: Récupérer tous les articles de blog
 *     responses:
 *       200:
 *         description: Liste des articles récupérée avec succès
 *       500:
 *         description: Erreur serveur
 */
router.get("/", postController.getAllPosts);

/**
 * @swagger
 * /api/posts:
 *   post:
 *     summary: Créer un nouvel article de blog
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               author_id:
 *                 type: string
 *               categories:
 *                 type: array
 *                 items:
 *                   type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Article créé avec succès
 *       400:
 *         description: Erreur de validation des données
 */
router.post("/", postController.createPost);

/**
 * @swagger
 * /api/posts/{id}:
 *   get:
 *     summary: Récupérer un article de blog par ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de l'article
 *     responses:
 *       200:
 *         description: Article récupéré avec succès
 *       404:
 *         description: Article non trouvé
 */
router.get("/:id", postController.getPostById);

/**
 * @swagger
 * /api/posts/{id}:
 *   put:
 *     summary: Mettre à jour un article de blog par ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de l'article
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Article mis à jour avec succès
 *       400:
 *         description: Erreur de validation des données
 *       404:
 *         description: Article non trouvé
 */
router.put("/:id", postController.updatePost);

/**
 * @swagger
 * /api/posts/{id}:
 *   delete:
 *     summary: Supprimer un article de blog par ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de l'article
 *     responses:
 *       204:
 *         description: Article supprimé avec succès
 *       404:
 *         description: Article non trouvé
 */
router.delete("/:id", postController.deletePost);

module.exports = router;
