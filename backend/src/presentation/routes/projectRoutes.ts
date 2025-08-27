import { Router } from "express";
import {
  createProjectController,
  updateProjectController,
  getAllProjectOfUser,
  getSingleProjectController,
} from "../controllers/projectController";
import { createLimiter } from "../middleware/rateLimiter";
import { authCheck } from "../middleware/authMiddleware";
import { tenantCheck } from "../middleware/tenantMiddleware";

const router = Router();

// Get Routes
router.get("/", authCheck, tenantCheck, getAllProjectOfUser);
router.get("/:projectId", authCheck, tenantCheck, getSingleProjectController);

// Create Routes
router.post(
  "/create",
  createLimiter,
  authCheck,
  tenantCheck,
  createProjectController
);

// Update Routes
router.patch(
  "/update/:projectId",
  createLimiter,
  authCheck,
  tenantCheck,
  updateProjectController
);

export default router;
