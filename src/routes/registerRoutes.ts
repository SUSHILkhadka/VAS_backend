import {Router} from 'express';
import * as userController from '../controllers/userController';

const router=Router();
router.post('/', userController.createUser); //for registerring or creating new user.
export default router;