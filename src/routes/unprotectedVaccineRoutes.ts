import { Router } from 'express';
import * as vaccineController from '../controllers/vaccineController';

const router = Router();
router.get('/', vaccineController.getAllVaccines);

export default router;
