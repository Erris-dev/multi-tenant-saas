import { Router } from "express";
import { registerUserController, loginUserController, googleAuthController, googleAuthCallbackController } from "../controllers/authController";
import { authLimiter } from "../middleware/rateLimiter";

const router = Router();

router.get("/google/callback", googleAuthCallbackController);
router.post("/register", authLimiter, registerUserController);
router.post("/login", authLimiter, loginUserController);
router.post("/google-auth", authLimiter, googleAuthController);

export default router;