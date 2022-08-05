import { Router } from 'express';
import userRouter from './userRoutes';
import appointmentRouter from './appointmentRoutes';
import vaccineRouter from './vaccineRoutes';

const router = Router();
router.use('/users', userRouter);
router.use('/appointment', appointmentRouter);
router.use('/vaccine', vaccineRouter);

export default router;
