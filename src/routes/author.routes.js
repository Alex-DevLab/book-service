import {Router} from 'express';
import {findBookAuthorsByISBN, removeAuthor} from "../controller/author.controller.js";

const router = Router();

router.get('/authors/book/:isbn', findBookAuthorsByISBN);
router.delete('/author/:author', removeAuthor);

export default router;