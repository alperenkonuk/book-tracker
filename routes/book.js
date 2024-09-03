import express from 'express';
import bookController from "../controllers/bookController.js";

const router = express.Router();

router.get('/', bookController.listAllBooks);

router.post('/edit/:isbn', bookController.editBook);

router.get('/cancel', bookController.cancelEditing);

router.post('/save', bookController.updateBook, bookController.listAllBooks);

router.post('/confirm', bookController.hasRead, bookController.addBook);

router.post('/editNew', bookController.editNewBook);

router.post('/delete/:isbn', bookController.deleteBook);

export default router;