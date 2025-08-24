import { Router } from "express";
import {
  createProjectController,
  updateProjectController,
  getAllProjectOfUser,
  getSingleProjectController,
} from "../controllers/projectController";
import { authCheck } from "../middleware/authMiddleware";
import { tenantCheck } from "../middleware/tenantMiddleware";

const router = Router();

router.get("/", authCheck, tenantCheck, getAllProjectOfUser);
router.get("/:projectId", authCheck, tenantCheck, getSingleProjectController);
router.post("/create", authCheck, tenantCheck, createProjectController);
router.patch(
  "/update/:projectId",
  authCheck,
  tenantCheck,
  updateProjectController
);

export default router;
