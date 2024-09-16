const jwt = require("jsonwebtoken");

exports.authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Accès refusé, token manquant" });
  }

  const token = authHeader.split(" ")[1]; // Le token est après "Bearer "

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Stocker les infos du token dans req.user
    next(); // Passer au middleware suivant
  } catch (err) {
    return res.status(401).json({ message: "Token invalide" });
  }
};
