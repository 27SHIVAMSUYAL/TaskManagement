const express = require("express");
const router = express.Router();
const authValidator = require("../middlewares/authValidator");
const {
  addTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
  markTaskComplete,
} = require("../controllers/taskController");

// Routes with Authentication
router.post("/add", authValidator, addTask);  // Add Task
router.get("/getall", authValidator, getAllTasks);  // Get All Tasks
router.get("/:id", authValidator, getTaskById);  // Get Single Task by ID
router.put("/:id", authValidator, updateTask);  // Update Task
router.put("/complete/:id", authValidator, markTaskComplete);  // Mark Complete
router.delete("/:id", authValidator, deleteTask);  // Delete Task

module.exports = router;
