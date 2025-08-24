import { Router } from "express";
import {
  createTaskController,
  updateTaskController,
} from "../controllers/taskController";
import { authCheck } from "../middleware/authMiddleware";
import { createLimiter } from "../middleware/rateLimiter";
import { tenantCheck } from "../middleware/tenantMiddleware";

const router = Router();

// Create routes
router.post(
  "/create/:projectId",
  createLimiter,
  authCheck,
  tenantCheck,
  createTaskController
);

// Update routes
router.patch("/update/:taskId", createLimiter, authCheck, updateTaskController);

export default router;
