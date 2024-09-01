import db from "../config/db.js";

const Book = {
  async getBooks(id) {
    const books = [];
    const res = await db.query('SELECT * FROM books WHERE user_id=$1', [id]);
    res.rows.forEach((book) => {
      books.push({
        title: book.name,
        notes: book.notes,
        read: book.hasRead ? 'Yes' : 'No',
        rating: book.rating,
        isbn: book.isbn
      });
    })
    return books;
  },

  async insertBook(book, userId) {
    try {
      await db.query('INSERT INTO books (isbn,name,rating,notes,hasRead,user_id) VALUES($1,$2,$3,$4,$5,$6)', [book.isbn, book.name, book.rating, book.notes, book.hasRead, userId]);
    } catch (e) {
      console.error("Book couldn't be added", e.stack);
    }
  },

  async getBookByISBN(isbn) {
    try {
      return await db.query('SELECT * FROM books WHERE isbn=$1', [isbn]);
    } catch (e) {
      console.error("Couldn't get the book: ", e.stack);
    }
  },


  async updateBook(user_id, book) {
    try {
      await db.query('UPDATE books SET rating=$1, notes=$2, hasRead=$3 WHERE user_id=$4 and isbn=$5', [book.rating, book.notes, book.hasRead, user_id, book.isbn])
    } catch (e) {
      console.error("couldn't upate book", e.stack);
    }
  },

  async deleteBook(isbn,user_id) {
    try {
      await db.query('DELETE FROM books WHERE isbn=$1 and user_id=$2',[isbn,user_id])
    } catch (e) {
      console.error("Couldn't delete book from db ", e.stack);
    }
  },
}

export default Book