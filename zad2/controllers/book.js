const Book = require('../models/Book');

const getBooksList = (request, response) => {
    const userId = request.session.userId;
    const books = Book.getAll();
    response.render("books", { title: "Books", userId, books });
};

module.exports = { getBooksList };
