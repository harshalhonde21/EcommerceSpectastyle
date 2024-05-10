import express from 'express';
import { getVisitCount, incrementVisitCount } from '../Controller/visit-count-controller.js';

const router = express.Router();

router.get('/', getVisitCount);
router.post('/increment', incrementVisitCount);

export default router;
