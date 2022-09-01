import { Router } from 'express';
import * as appointmentController from '../controllers/appointmentController';

const router = Router();
router.get('/:patientId', appointmentController.getAllAppointmentsByPatientId);
router.post('/', appointmentController.createAppointment);

export default router;
