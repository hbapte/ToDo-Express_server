import express from "express";
import { registerController } from "../modules/user/controllers/registerController";
import loginController from "../modules/user/controllers/loginController";
import verifyEmailController from "../modules/user/controllers/verifyEmailController";
import { requestNewVerificationLinkController } from "../modules/user/controllers/requestNewVerificationLinkController";

const authRouter = express.Router();

authRouter.post("/register", registerController);
authRouter.post("/login" , loginController)
authRouter.get("/verify", verifyEmailController);
authRouter.post("/request-new-verification-link", requestNewVerificationLinkController);



export default authRouter;
