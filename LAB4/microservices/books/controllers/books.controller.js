const BookModel = require("../database/models/Book");

exports.getAllBooks = async (req, res) => {
  try {
    const books = await BookModel.findAll(); // Sequelize: Znajdź wszystkie rekordy
    res.status(200).json(books);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Błąd serwera podczas pobierania książek." });
  }
};

exports.createBook = async (req, res) => {
  const { title, author, year } = req.body;

  // Walidacja danych
  if (!title || !author || !year) {
    return res
      .status(400)
      .json({ message: "Wszystkie pola (title, author, year) są wymagane." });
  }

  try {
    const newBook = await BookModel.create({ title, author, year }); // Sequelize: Wstaw nowy rekord

    // Zwracamy id nowo utworzonego zasobu, zgodnie z wymaganiami lab
    res
      .status(201)
      .json({ id: newBook.id, message: "Książka dodana pomyślnie." });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Błąd serwera podczas tworzenia książki." });
  }
};

exports.getBookById = async (req, res) => {
  const bookId = req.params.bookId; // Pobieranie ID z URL
  try {
    const book = await BookModel.findByPk(bookId); // Sequelize: Znajdź po Primary Key (PK)

    if (!book) {
      return res
        .status(404)
        .json({ message: `Książka o ID ${bookId} nie została znaleziona.` });
    }

    res.status(200).json(book);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Błąd serwera podczas pobierania książki." });
  }
};

exports.deleteBook = async (req, res) => {
  const bookId = req.params.bookId;

  try {
    const result = await BookModel.destroy({
      where: { id: bookId }, // Sequelize: Usuń rekord pasujący do warunku
    });

    if (result === 0) {
      // result === 0 oznacza, że żaden wiersz nie został usunięty (bo nie istniał)
      return res.status(404).json({
        message: `Nie znaleziono książki o ID ${bookId} do usunięcia.`,
      });
    }

    // 204 No Content - standardowa odpowiedź REST na udane usunięcie
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Błąd serwera podczas usuwania książki." });
  }
};
