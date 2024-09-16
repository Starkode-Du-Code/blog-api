// models/Post.js
const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Référence à l'utilisateur (l'auteur)
    required: true,
  },
  categories: [String], // Liste de catégories pour l'article
  tags: [String], // Liste de tags
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment", // Référence aux commentaires
    },
  ], // Liste de commentaires liés à l'article
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Post", PostSchema);
