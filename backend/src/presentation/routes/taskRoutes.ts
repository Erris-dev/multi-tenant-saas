import { Router } from "express";
import { createTaskController, updateTaskController } from "../controllers/taskController";
import { authCheck } from "../middleware/authMiddleware";
import { tenantCheck } from "../middleware/tenantMiddleware";

const router = Router();

router.post('/create/:projectId', authCheck, tenantCheck, createTaskController);
router.patch('/update/:taskId', authCheck, updateTaskController );

export default router;