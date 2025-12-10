const OrderModel = require("../database/models/Order");
const axios = require("axios");
const { BOOKS_SERVICE_URL } = require("../../const");

exports.createOrder = async (req, res) => {
  const { bookId, quantity } = req.body;
  const userId = req.userId;
  if (!userId || !bookId || !quantity || quantity <= 0) {
    return res.status(400).json({
      message: "Wszystkie pola (userId, bookId, quantity > 0) są wymagane.",
    });
  }

  try {
    // check if book with give id exsits
    const bookResponse = await axios.get(`${BOOKS_SERVICE_URL}books/${bookId}`);
    const newOrder = await OrderModel.create({ userId, bookId, quantity });
    res.status(201).json({
      id: newOrder.id,
      message: "Zamówienie dodane pomyślnie.",
    });
  } catch (error) {
    console.error("Błąd przy tworzeniu zamówienia:", error.message);
    if (error.response && error.response.status === 404) {
      return res.status(404).json({
        message: `Błąd: Książka o ID ${bookId} nie istnieje (Sprawdzenie w Serwisie Książek).`,
      });
    }
    res.status(500).json({ message: "Wewnętrzny błąd serwera." });
  }
};

exports.getUserOrders = async (req, res) => {
  const userId = req.params.userId;

  try {
    const orders = await OrderModel.findAll({
      where: { userId: userId },
    });

    if (orders.length === 0) {
      return res.status(404).json({
        message: `Nie znaleziono zamówień dla użytkownika o ID ${userId}.`,
      });
    }

    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Błąd serwera podczas pobierania zamówień." });
  }
};

exports.updateOrderPartial = async (req, res) => {
  const orderId = req.params.orderId;
  const { quantity } = req.body;
  if (!quantity || quantity <= 0) {
    return res.status(400).json({
      message: "Pole 'quantity' musi być liczbą całkowitą większą od 0.",
    });
  }

  try {
    const [affectedRows] = await OrderModel.update(
      { quantity: quantity },
      { where: { id: orderId } }
    );

    if (affectedRows === 0) {
      return res.status(404).json({
        message: `Zamówienie o ID ${orderId} nie zostało znalezione.`,
      });
    }
    res.status(200).json({ message: "Zamówienie zaktualizowane pomyślnie." });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Błąd serwera podczas aktualizacji zamówienia." });
  }
};

exports.deleteOrder = async (req, res) => {
  const orderId = req.params.orderId;

  try {
    const result = await OrderModel.destroy({
      where: { id: orderId },
    });

    if (result === 0) {
      return res.status(404).json({
        message: `Nie znaleziono zamówienia o ID ${orderId} do usunięcia.`,
      });
    }
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Błąd serwera podczas usuwania zamówienia." });
  }
};
