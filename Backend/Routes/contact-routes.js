import  createContact  from '../Controller/contact-controller.js';
import { Router } from 'express';

const router = Router();
router.post('/', createContact);

export default router;
