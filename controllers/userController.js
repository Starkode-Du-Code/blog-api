const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Joi = require("joi");

// Validation schema pour la création et la mise à jour d'un utilisateur
const userSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid("author", "reader").required(),
});

// Validation schema pour la connexion
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

// Récupérer tous les utilisateurs
exports.getAllUsers = async (req, res, next) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const users = await User.find()
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));
    const totalUsers = await User.countDocuments();

    res.json({
      totalUsers,
      totalPages: Math.ceil(totalUsers / limit),
      currentPage: parseInt(page),
      users,
    });
  } catch (err) {
    next(err);
  }
};

// Créer un nouvel utilisateur avec hashage du mot de passe
exports.createUser = async (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    // Hash du mot de passe avec bcrypt
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      ...req.body,
      password: hashedPassword, // Stocker le mot de passe haché
    });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
};

// Connexion de l'utilisateur et génération du token JWT
exports.login = async (req, res, next) => {
  const { error } = loginSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    // Vérification si l'utilisateur existe
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res
        .status(400)
        .json({ message: "Email ou mot de passe incorrect" });

    // Vérification du mot de passe
    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordValid)
      return res
        .status(400)
        .json({ message: "Email ou mot de passe incorrect" });

    // Générer un token JWT
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET, // La clé secrète pour signer le token
      { expiresIn: "1h" } // Durée de validité du token
    );

    res.json({ token });
  } catch (err) {
    next(err);
  }
};

// Récupérer un utilisateur par ID
exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      const error = new Error("Utilisateur non trouvé");
      error.status = 404;
      return next(error);
    }
    res.json(user);
  } catch (err) {
    next(err);
  }
};

// Mettre à jour un utilisateur
exports.updateUser = async (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    // Hacher le mot de passe s'il est mis à jour
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) {
      const error = new Error("Utilisateur non trouvé");
      error.status = 404;
      return next(error);
    }
    res.json(user);
  } catch (err) {
    next(err);
  }
};

// Supprimer un utilisateur
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      const error = new Error("Utilisateur non trouvé");
      error.status = 404;
      return next(error);
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
