// models/Comment.js
const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  post_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post", // Référence à l'article
    required: true,
  },
  author_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Référence à l'utilisateur (l'auteur du commentaire)
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Comment", CommentSchema);
