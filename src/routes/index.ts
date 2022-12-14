import { Router } from 'express';
import registerRouter from './registerRoutes';
import loginRouter from './loginRoutes';
import tokenRouter from './tokenRoutes';
import logoutRouter from './logoutRoutes';
import patientRouter from './patientRoutes';
import unprotectedPatientRouter from './unprotectedPatientRoutes';
import userRouter from './userRoutes';
import appointmentRouter from './appointmentRoutes';
import unprotectedAppointmentRouter from './unprotectedAppointmentRoutes';
import vaccineRouter from './vaccineRoutes';
import unprotectedVaccineRouter from './unprotectedVaccineRoutes';
import uploadRouter from './uploadRouter';
import authenticate from '../middlewares/authenticate';

const router = Router();
router.use('/register', registerRouter);
router.use('/login', loginRouter);
router.use('/token', tokenRouter);
router.use('/upload', uploadRouter);
router.use('/patient', unprotectedPatientRouter);
router.use('/appointment', unprotectedAppointmentRouter);
router.use('/vaccine', unprotectedVaccineRouter);
router.use(authenticate);
router.use('/logout', logoutRouter);
router.use('/patient', patientRouter);
router.use('/users', userRouter);
router.use('/appointment', appointmentRouter);
router.use('/vaccine', vaccineRouter);
export default router;
