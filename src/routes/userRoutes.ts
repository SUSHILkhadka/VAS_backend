import { Router } from 'express';
import * as userController from '../controllers/userController';

const router = Router();
router.get('/', userController.getAllUsers); // probably not necessary for frontend
router.get('/:userId', userController.getUser); // when logged in we pass this userId, to fetch name, email from storage.
router.post('/', userController.createUser); //for registerring or creating new user.
router.put('/:userId', userController.updateUser); // for changing name and editing of userId ,update user.
router.delete('/:userId', userController.deleteUser);

export default router;
