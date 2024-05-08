import express from 'express';
import authRouter from './authRoutes';
import taskRoutes from "./taskRoutes";

const router = express.Router();

router.use("/tasks", taskRoutes);
router.use('/auth', authRouter);

export default router;

