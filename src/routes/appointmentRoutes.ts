import { Router } from 'express';
import * as appointmentController from '../controllers/appointmentController';

const router = Router();
router.get('/', appointmentController.getAllAppointments); // probably not necessary for frontend
router.get('/:appointmentId', appointmentController.getAppointment); // when logged in we pass this userId, to fetch name, email from storage.
router.post('/', appointmentController.createAppointment); //for registerring or creating new user.
router.put('/:appointmentId', appointmentController.updateAppointment); // for changing name and editing of userId ,update user.
router.delete('/:appointmentId', appointmentController.deleteAppointment);

export default router;
