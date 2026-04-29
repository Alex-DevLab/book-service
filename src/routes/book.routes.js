import {Router} from 'express';
import {addBook, findBookByISBN, removeBook} from "../controller/book.controller.js";

const router = Router();
router.post('/book', addBook);
router.get('/book/:isbn', findBookByISBN);
router.delete('/book/:isbn', removeBook);

export default router;