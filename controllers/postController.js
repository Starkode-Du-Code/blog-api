// controllers/postController.js
const Post = require("../models/Post"); // Assure-toi que ce chemin est correct
const Joi = require("joi"); // Optionnel : pour la validation des données

// Validation schema pour la création et la mise à jour d'un post (optionnel)
const postSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  author_id: Joi.string().length(24).required(), // ObjectId de MongoDB
  categories: Joi.array().items(Joi.string()),
  tags: Joi.array().items(Joi.string()),
});

// Récupérer tous les articles avec pagination et recherche
exports.getAllPosts = async (req, res, next) => {
  const { page = 1, limit = 10, search = "", category, tag } = req.query;

  try {
    // Construire la requête avec recherche par titre, catégorie et tags
    const query = { title: { $regex: search, $options: "i" } };
    if (category) query.categories = category;
    if (tag) query.tags = tag;

    // Récupérer les articles avec pagination et filtre
    const posts = await Post.find(query)
      .populate("author_id", "username email")
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));

    // Compter le nombre total d'articles correspondant à la requête
    const totalPosts = await Post.countDocuments(query);

    // Retourner les résultats avec la pagination
    res.json({
      totalPosts,
      totalPages: Math.ceil(totalPosts / limit),
      currentPage: parseInt(page),
      posts,
    });
  } catch (err) {
    next(err); // Passer l'erreur au middleware de gestion des erreurs
  }
};

// Créer un nouvel article
exports.createPost = async (req, res, next) => {
  // Optionnel : Valider les données de la requête
  const { error } = postSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const newPost = new Post(req.body);
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    next(err);
  }
};

// Récupérer un article par ID
exports.getPostById = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "author_id",
      "username email"
    );
    if (!post) {
      const error = new Error("Article non trouvé");
      error.status = 404;
      return next(error);
    }
    res.json(post);
  } catch (err) {
    next(err);
  }
};

// Mettre à jour un article
exports.updatePost = async (req, res, next) => {
  // Optionnel : Valider les données de la requête
  const { error } = postSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).populate("author_id", "username email");
    if (!post) {
      const error = new Error("Article non trouvé");
      error.status = 404;
      return next(error);
    }
    res.json(post);
  } catch (err) {
    next(err);
  }
};

// Supprimer un article
exports.deletePost = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      const error = new Error("Article non trouvé");
      error.status = 404;
      return next(error);
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
