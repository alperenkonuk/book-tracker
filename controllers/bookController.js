import Book from "../models/Book.js";
import fetchBook from "../utils/fetchBook.js";

const bookController = {
  async listAllBooks(req, res) {
    if (!req.session.userId) {
      res.render(`login`, {error: "You must be logged in to view your books", direction: "login"});
    } else {
      try {
        let userId = req.session.userId;
        const books = await Book.getBooks(userId);
        res.render('books', {books: books, userId: req.session.userId})
      } catch (e) {
        console.error('Error getting books', e.stack);
        res.status(500).send('Error getting books')
      }
    }
  },

  async editNewBook(req, res) {
    if (!req.session.userId) {
      res.render('login', {error: "You must be logged in to add books to your library", direction: "login"});
    } else {
      try {
        const isbn = req.body.isbn;
        const book = await fetchBook(isbn)
        res.render('editNew', {book: book, userId: req.session.userId});
      } catch (e) {
        console.error("Couldn't load the edit page" + e.stack);
        res.redirect('/');
      }
    }
  },

  async hasRead(req, res, next) {
    req.body.read = req.body.read === 'on';
    next();
  },

  async addBook(req, res) {
    try {
      let userId = req.session.userId;
      const book = {
        isbn: req.body.isbn,
        notes: req.body.notes,
        rating: req.body.rating,
        hasRead: req.body.read,
        name: req.body.title
      }
      await Book.insertBook(book, userId);
      res.redirect('/books');
    } catch (e) {
      console.error('Error adding books.', e.stack);
      res.status(500).send('Error adding books.');
    }
  },

  async editBook(req, res) {
    if (!req.session.userId) {
      res.render('login', {err: "You must be logined to view this feature"});
    } else {
      try {
        const isbn = req.params.isbn;
        const a = await fetchBook(isbn);
        const response = await Book.getBookByISBN(isbn);
        const data = response.rows[0];
        const book = {
          isbn: isbn,
          url: a.url,
          title: data.name,
          rating: data.rating,
          hasRead: !data.hasRead,
          notes: data.notes,
        }
        res.render('edit', {book: book, userId: req.session.userId})
      } catch (e) {
        res.render('home', {error: "Edit page couldn't loaded."});
        console.error(`Error loading edit page:`);
      }
    }
  },

  async updateBook(req, res, next) {
    try {
      let userId = req.session.userId;
      const book = {
        isbn: req.body.isbn,
        notes: req.body.notes,
        rating: parseInt(req.body.rating),
        hasRead: req.body.read,
      }
      await Book.updateBook(userId, book);
      next();
    } catch (e) {
      console.error('Error updating book ',);
    }
  },

  async deleteBook(req, res) {
    try {
      let userId = req.session.userId;
      const book = {
        isbn: req.params.isbn,
      }
      await Book.deleteBook(book.isbn, userId);
      res.redirect('/books');
    } catch (e) {
      res.render('/books', {error: "Couldn't delete book"});
      console.error("Couldn't delete book",);
    }
  }
  ,

  cancelEditing(req, res) {
    res.redirect('/books')
  }
}

export default bookController