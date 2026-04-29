import {Router} from 'express';
import {
    addBook,
    findBookByISBN,
    findBooksByAuthor, findBooksByPublisher,
    removeBook,
    updateBookTitle
} from "../controller/book.controller.js";

const router = Router();
router.post('/book', addBook);
router.get('/book/:isbn', findBookByISBN);
router.delete('/book/:isbn', removeBook);
router.patch('/book/:isbn/title/:title', updateBookTitle);
router.get('/books/author/:author', findBooksByAuthor);
router.get('/books/publisher/:publisher', findBooksByPublisher);

export default router;