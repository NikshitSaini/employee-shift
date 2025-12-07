import express from "express";
import { auth } from "../middleware/auth.js";
import { requireRole } from "../middleware/role.js";
import { getEmployees } from "../controllers/employeeController.js";

const router = express.Router();

router.get("/", auth, requireRole("admin"), getEmployees);

export default router;
