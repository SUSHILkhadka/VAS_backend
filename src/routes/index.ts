import { Router } from 'express';
import userRouter from './userRoutes';
import appointmentRouter from './appointmentRoutes';

const router = Router();
router.use('/users', userRouter);
router.use('/appointment', appointmentRouter);

export default router;
