import express from "express";
import {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  addTimeEntry,
} from "../controllers/taskController.js";

const router = express.Router();

router.get("/", getAllTasks);
router.post("/", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);
router.post("/:id/time", addTimeEntry);

export default router;
