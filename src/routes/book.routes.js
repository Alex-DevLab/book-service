import { Router } from 'express';
import {addBook} from "../controller/book.controller.js";

const router = Router();
router.post('/book',addBook);

export default router;