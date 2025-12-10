const express = require("express");
const router = express.Router();
const bookController = require("../controllers/books.controller");
const { verifyToken } = require("../../shared/middleware/auth.middleware");

router.get("/books", bookController.getAllBooks);

router.get("/books/:bookId", bookController.getBookById);

router.post("/books", verifyToken, bookController.createBook);

router.delete("/books/:bookId", verifyToken, bookController.deleteBook);

module.exports = router;
