import { Router } from "express";
import { registerUserController, loginUserController } from "../controllers/authController";
import { authLimiter } from "../middleware/rateLimiter";

const router = Router();

router.post("/register", authLimiter, registerUserController);
router.post("/login", authLimiter, loginUserController);

export default router;