import express from "express";
import fetchBook from '../utils/fetchBook.js';

const router = express.Router();

router.post('/search', async (req, res) => {
  const isbn = req.body.isbn;
  let data = await fetchBook(isbn);
  if(data) {
    res.render('home', {book: data});
  }
  else {
    res.render('home',{error: 'Book not found', direction:""})
  }
})

export default router;