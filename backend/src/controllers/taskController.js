const Task = require("../models/taskModel");
const redis = require("../utils/redisClient"); // Import Redis client

// ✅ Add Task
const addTask = async (req, res) => {
    try {
        const { title, description, priority, deadline } = req.body;

        const newTask = await Task.create({
            user: req.user.id,
            title,
            description,
            priority,
            deadline,
        });

        console.log("Task Added:", newTask);

        // ✅ Clear cache after adding a task
        await redis.del(`tasks:${req.user.id}`);

        res.status(201).json({ message: "Task Added", task: newTask });
    } catch (error) {
        console.error("Task Creation Failed:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// ✅ Get All Tasks
const getAllTasks = async (req, res) => {
    try {
        const cacheKey = `tasks:${req.user.id}`;
        const cachedTasks = await redis.get(cacheKey);

        if (cachedTasks) {
            console.log("Fetched Tasks from Cache");
            return res.status(200).json({ tasks: JSON.parse(cachedTasks) });
        }

        const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 });
        console.log("Fetched Tasks from Database for User:", req.user.id);

        // ✅ Store tasks in Redis with expiration time
        await redis.set(cacheKey, JSON.stringify(tasks), { EX: 3600 });

        res.status(200).json({ tasks });
    } catch (error) {
        console.error("Failed to Fetch Tasks:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// ✅ Get Single Task
const getTaskById = async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.id, user: req.user.id });

        if (!task) {
            return res.status(404).json({ message: "Task Not Found" });
        }

        res.status(200).json({ task });
    } catch (error) {
        console.error("Error Fetching Task:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// ✅ Update Task
const updateTask = async (req, res) => {
    try {
        const { title, description, priority, deadline, isComplete } = req.body;

        const updatedTask = await Task.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id },
            { title, description, priority, deadline, isComplete },
            { new: true }
        );

        if (!updatedTask) {
            return res.status(404).json({ message: "Task Not Found" });
        }

        console.log("Task Updated:", updatedTask);

        // ✅ Clear cache after updating task
        await redis.del(`tasks:${req.user.id}`);

        res.status(200).json({ message: "Task Updated", task: updatedTask });
    } catch (error) {
        console.error("Error Updating Task:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// ✅ Delete Task
const deleteTask = async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id });

        if (!task) {
            return res.status(404).json({ message: "Task Not Found" });
        }

        console.log("Task Deleted:", req.params.id);

        // ✅ Clear cache after deleting task
        await redis.del(`tasks:${req.user.id}`);

        res.status(200).json({ message: "Task Deleted" });
    } catch (error) {
        console.error("Error Deleting Task:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// ✅ Mark Task as Complete
const markTaskComplete = async (req, res) => {
    try {
        const updatedTask = await Task.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id },
            { isComplete: true },
            { new: true }
        );

        if (!updatedTask) {
            console.log("Task Completion Failed: Task Not Found");
            return res.status(404).json({ message: "Task Not Found" });
        }

        console.log("Task Marked as Complete:", updatedTask);

        // ✅ Clear cache after marking task as complete
        await redis.del(`tasks:${req.user.id}`);

        res.status(200).json({ message: "Task Marked as Complete", task: updatedTask });
    } catch (error) {
        console.error("Task Completion Failed:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// ✅ Export all functions
module.exports = { 
    addTask, 
    getAllTasks, 
    getTaskById, 
    updateTask, 
    deleteTask, 
    markTaskComplete 
};
