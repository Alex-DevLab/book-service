import {Router} from 'express';
import {findPublishersByAuthor} from "../controller/publisher.controller.js";

const router = Router();

router.get('/publishers/author/:author', findPublishersByAuthor);

export default router;