import { Router } from 'express';
import * as vaccineController from '../controllers/vaccineController';

const router = Router();
router.post('/', vaccineController.createVaccine);
router.put('/:vaccineId', vaccineController.updateVaccine);
router.delete('/:vaccineId', vaccineController.deleteVaccine);

export default router;
