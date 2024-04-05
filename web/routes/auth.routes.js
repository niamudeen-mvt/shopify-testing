import { Router } from "express";
import * as authControllers from "../controllers/auth.controller.js";
import verifyToken from "../middleware/auth.middleware.js";
import {
  validateRegisterSchema,
  validateLoginSchema,
} from "../middleware/validtion.middleware.js";

const authRouter = Router();

authRouter
  .route("/register")
  .post(validateRegisterSchema, authControllers.register);
authRouter.route("/login").post(validateLoginSchema, authControllers.login);
authRouter.route("/refresh-token").post(authControllers.refreshToken);
authRouter.route("/user").get(verifyToken, authControllers.userDetails);
authRouter
  .route("/store/verification")
  .post(verifyToken, authControllers.verifyStoreCredentials);
authRouter
  .route("/store/configuration")
  .post(authControllers.getStoreConfiguration);
authRouter.route("/user/update").patch(verifyToken, authControllers.updateUser);

export default authRouter;
