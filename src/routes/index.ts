import { Router } from 'express';
import registerRouter from './registerRoutes';
import loginRouter from './loginRoutes';
import tokenRouter from './tokenRoutes';
import logoutRouter from './logoutRoutes';
import patientRouter from './patientRoutes';
import userRouter from './userRoutes';
import appointmentRouter from './appointmentRoutes';
import vaccineRouter from './vaccineRoutes';
import uploadRouter from './uploadRouter';
import authenticate from '../middlewares/authenticate';

const router = Router();
router.use('/register', registerRouter);
router.use('/login', loginRouter);
router.use('/token', tokenRouter);
router.use('/upload', uploadRouter);
router.use(authenticate)
router.use('/logout', logoutRouter);
router.use('/patient', patientRouter);
router.use('/users', userRouter);
router.use('/appointment', appointmentRouter);
router.use('/vaccine', vaccineRouter);
export default router;
