const jwt = require("jsonwebtoken");

const { JWT_SECRET } = require("../../const");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "Brak tokenu autoryzacji. Wymagane zalogowanie.",
    });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Nieprawidłowy format tokenu (oczekiwano Bearer).",
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token autoryzacji wygasł." });
    }
    return res
      .status(401)
      .json({ message: "Nieprawidłowy token autoryzacji." });
  }
};

module.exports = {
  verifyToken,
};
