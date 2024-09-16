const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");

/**
 * @swagger
 * /api/comments/post/{postId}:
 *   get:
 *     summary: Récupérer tous les commentaires d'un article de blog
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de l'article de blog
 *     responses:
 *       200:
 *         description: Liste des commentaires récupérée avec succès
 *       500:
 *         description: Erreur serveur
 */
router.get("/post/:postId", commentController.getCommentsByPost);

/**
 * @swagger
 * /api/comments:
 *   post:
 *     summary: Créer un nouveau commentaire
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *               author_id:
 *                 type: string
 *               post_id:
 *                 type: string
 *     responses:
 *       201:
 *         description: Commentaire créé avec succès
 *       400:
 *         description: Erreur de validation des données
 */
router.post("/", commentController.createComment);

/**
 * @swagger
 * /api/comments/{id}:
 *   delete:
 *     summary: Supprimer un commentaire par ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du commentaire
 *     responses:
 *       204:
 *         description: Commentaire supprimé avec succès
 *       404:
 *         description: Commentaire non trouvé
 */
router.delete("/:id", commentController.deleteComment);

module.exports = router;
