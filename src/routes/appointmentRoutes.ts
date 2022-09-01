import { Router } from 'express';
import * as appointmentController from '../controllers/appointmentController';

const router = Router();
router.get('/', appointmentController.getAllAppointments);
router.put('/:appointmentId', appointmentController.updateAppointment);
router.delete('/:appointmentId', appointmentController.deleteAppointment);

export default router;
