import { Router } from 'express';
import registerRouter from './registerRoutes';
import loginRouter from './loginRoutes';
import patientRouter from './patientRoutes';
import userRouter from './userRoutes';
import appointmentRouter from './appointmentRoutes';
import vaccineRouter from './vaccineRoutes';
// import authenticate from '../middlewares/authenticate';

const router = Router();
router.use('/register', registerRouter);
router.use('/login', loginRouter);

// router.use(authenticate)
router.use('/patient', patientRouter);
router.use('/users', userRouter);
router.use('/appointment', appointmentRouter);
router.use('/vaccine', vaccineRouter);
export default router;
