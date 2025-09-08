import express from 'express'
import { getPublishedImages, getUSer, loginUSer, registerUSer } from '../controllers/userController.js';
import { protect } from '../middlewares/auth.js';

const userRouter = express.Router();

userRouter.post('/register', registerUSer)
userRouter.post('/login', loginUSer)
userRouter.get('/data', protect, getUSer)
userRouter.get('/getPublishedImages', protect, getPublishedImages)

export default userRouter;
