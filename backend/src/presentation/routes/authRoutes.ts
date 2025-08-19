import { Router } from "express";
import { registerUserController, loginUserController } from "../controllers/authController";

const router = Router();

router.post("/register", registerUserController);
router.post("/login", loginUserController);

export default router;