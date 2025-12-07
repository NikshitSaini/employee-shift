import express from "express";
import { auth } from "../middleware/auth.js";
import { requireRole } from "../middleware/role.js";
import {
  createShift,
  getShifts,
  deleteShift,
} from "../controllers/shiftController.js";

const router = express.Router();

router.post("/", auth, requireRole("admin"), createShift);
router.get("/", auth, getShifts);
router.delete("/:id", auth, requireRole("admin"), deleteShift);

export default router;
