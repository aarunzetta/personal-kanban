import Task from "../models/Task.js";

export const getAllTask = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ column: 1, order: 1 });
    req.status(200).json(tasks);
  } catch (error) {
    req.status(500).json({ message: "Failed to fetch tasks", error });
  }
};

export const createTask = async (req, res) => {
  try {
    const { title, description, priority, column } = req.body;
    const task = new Task({ title, description, priority, column });
    const savedTask = await task.save();
    req.status(201).json(savedTask);
  } catch (error) {
    res.status(400).json({ message: "Failed to create task", error });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const updateTask = await Task.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true },
    );
    if (!updateTask) return res.status(404).json({ message: "Task not found" });
    res.status(200).json(updateTask);
  } catch (error) {
    res.status(400).json({ message: "Failed to update task", error });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Task.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Task not found" });
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete task", error });
  }
};
