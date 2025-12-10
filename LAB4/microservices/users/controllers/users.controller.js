const UserModel = require("../database/models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { JWT_SECRET } = require("../../const");
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

exports.registerUser = async (req, res) => {
  const { email, password } = req.body;

  // Walidacja danych
  if (!email || !password || password.length < 6) {
    return res.status(400).json({
      message: "Email i hasło (min. 6 znaków) są wymagane.",
    });
  }

  try {
    // Sprawdzenie, czy użytkownik o tym emailu już istnieje
    const existingUser = await UserModel.findOne({ where: { email } });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "Użytkownik o podanym adresie email już istnieje." });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);
    const newUser = await UserModel.create({ email, password: passwordHash });

    // Zwraca id nowego użytkownika
    res.status(201).json({
      id: newUser.id,
      message: "Rejestracja pomyślna.",
    });
  } catch (error) {
    console.error("Błąd rejestracji:", error);
    res
      .status(500)
      .json({ message: "Wewnętrzny błąd serwera podczas rejestracji." });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email i hasło są wymagane." });
  }

  try {
    const user = await UserModel.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: "Uzytkownik nie istnieje" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Nieprawidłowe dane logowania." });
    }

    const token = generateToken(user.id);

    res.status(200).json({
      message: "Logowanie pomyślne.",
      userId: user.id,
      token: token,
    });
  } catch (error) {
    console.error("Błąd logowania:", error);
    res
      .status(500)
      .json({ message: "Wewnętrzny błąd serwera podczas logowania." });
  }
};
