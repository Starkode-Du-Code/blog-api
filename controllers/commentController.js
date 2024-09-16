// controllers/commentController.js
const Comment = require("../models/Comment");

// Récupérer tous les commentaires pour un article
exports.getCommentsByPost = async (req, res) => {
  try {
    const comments = await Comment.find({
      post_id: req.params.postId,
    }).populate("author_id", "username email");
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Créer un nouveau commentaire
exports.createComment = async (req, res) => {
  try {
    const newComment = new Comment(req.body);
    await newComment.save();
    res.status(201).json(newComment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Supprimer un commentaire
exports.deleteComment = async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
