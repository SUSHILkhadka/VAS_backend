import { Router } from 'express';
import * as patientController from '../controllers/patientController';

const router = Router();
router.get('/', patientController.getAllPatients);
router.get('/:patientId', patientController.getPatient);
router.post('/', patientController.createPatient);
router.put('/:patientId', patientController.updatePatient);
router.delete('/:patientId', patientController.deletePatient);
export default router;
