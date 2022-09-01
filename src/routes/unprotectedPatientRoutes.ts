import { Router } from 'express';
import * as patientController from '../controllers/patientController';

const router = Router();
router.post('/', patientController.createPatient);
export default router;
