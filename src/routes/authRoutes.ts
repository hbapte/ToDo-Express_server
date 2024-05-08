import express from "express";
import { registerController } from "../modules/user/controllers/registerController";
import loginController from "../modules/user/controllers/loginController";
import verifyEmailController from "../modules/user/controllers/verifyEmailController";

const authRouter = express.Router();

authRouter.post("/register", registerController);
authRouter.post("/login" , loginController)
authRouter.get("/verify", verifyEmailController);


export default authRouter;
