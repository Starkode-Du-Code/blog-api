const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Récupérer toutes les catégories
 *     responses:
 *       200:
 *         description: Liste des catégories récupérée avec succès
 *       500:
 *         description: Erreur serveur
 */
router.get("/", categoryController.getAllCategories);

/**
 * @swagger
 * /api/categories:
 *   post:
 *     summary: Créer une nouvelle catégorie
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Catégorie créée avec succès
 *       400:
 *         description: Erreur de validation des données
 */
router.post("/", categoryController.createCategory);

/**
 * @swagger
 * /api/categories/{id}:
 *   delete:
 *     summary: Supprimer une catégorie par ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la catégorie
 *     responses:
 *       204:
 *         description: Catégorie supprimée avec succès
 *       404:
 *         description: Catégorie non trouvée
 */
router.delete("/:id", categoryController.deleteCategory);

module.exports = router;
