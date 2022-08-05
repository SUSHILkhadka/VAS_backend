import { Router } from 'express';
import * as vaccineController from '../controllers/vaccineController';

const router = Router();
router.get('/', vaccineController.getAllVaccines); // probably not necessary for frontend
router.get('/:vaccineId', vaccineController.getVaccine); // when logged in we pass this userId, to fetch name, email from storage.
router.post('/', vaccineController.createVaccine); //for registerring or creating new user.
router.put('/:vaccineId', vaccineController.updateVaccine); // for changing name and editing of userId ,update user.
router.delete('/:vaccineId', vaccineController.deleteVaccine);

export default router;
