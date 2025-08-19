import { Router } from "express";
import { createProjectController, updateProjectController } from "../controllers/projectController";
import { authCheck } from "../middleware/authMiddleware";
import { tenantCheck } from "../middleware/tenantMiddleware";

const router = Router();

router.post('/create', authCheck, tenantCheck, createProjectController);
router.patch('/update/:projectId', authCheck, tenantCheck, updateProjectController);

export default router;