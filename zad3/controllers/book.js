const Book = require('../models/Book');
const User = require('../models/User');

const getBookDetails = (request, response) => {
    const userId = request.session.userId;
    const bookId = parseInt(request.params.id);
    const book = Book.getAll().find(book => book.id === bookId);
    const didUserBorrowTheBook = User.getAll().find(user => user.id === userId)?.findBorrowedBookById(bookId);
    response.render('book-details', { title: 'Book Details', book, didUserBorrowTheBook });
};

const postBookBorrow = (request, response) => {
    const userId = request.session.userId;
    const bookId = parseInt(request.params.id);
    const book = Book.getAll().find(book => book.id === bookId);

    if (!book || !User.getAll().find(user => user.id === userId)) {
        response.redirect('/not-found');
        return;
    }

    if (!book.available) {
        response.redirect('/not-found');
        return;
    }

    book.borrow();
    const user = User.getAll().find(user => user.id === userId);
    user.borrowBook(book);
    response.redirect('/books/borrow/success');
};

const getBookBorrowSuccess = (request, response) => {
    response.render('success', { title: 'Success', message: 'Book borrowed successfully' });
};

const postBookReturn = (request, response) => {
    const userId = request.session.userId;
    const bookId = parseInt(request.params.id);
    const book = Book.getAll().find(book => book.id === bookId);

    if (!book || !User.getAll().find(user => user.id === userId)) {
        response.redirect('/not-found');
        return;
    }

    book.returnBook();
    const user = User.getAll().find(user => user.id === userId);
    user.returnBook(bookId);
    response.redirect('/books/return/success');
};

const getBookReturnSuccess = (request, response) => {
    response.render('success', { title: 'Success', message: 'Book returned successfully' });
};

module.exports = {
    getBookDetails,
    postBookBorrow,
    getBookBorrowSuccess,
    postBookReturn,
    getBookReturnSuccess
};

