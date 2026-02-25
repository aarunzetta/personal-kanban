import Task from "../models/Task.js";

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ column: 1, order: 1 });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tasks", error });
  }
};

export const createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      priority,
      column,
      dueDate,
      estimatedHours,
      actualHours,
      timeTracking,
    } = req.body;
    const task = new Task({
      title,
      description,
      priority,
      column,
      dueDate,
      estimatedHours,
      actualHours,
      timeTracking,
    });
    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(400).json({ message: "Failed to create task", error });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true },
    );
    if (!updatedTask)
      return res.status(404).json({ message: "Task not found" });
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: "Failed to update task", error });
  }
};

export const addTimeEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const { hours, description } = req.body;

    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    const timeEntry = {
      date: new Date(),
      hours,
      description,
    };

    task.timeTracking.push(timeEntry);
    task.actualHours += hours;

    const updatedTask = await task.save();
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: "Failed to add time entry", error });
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
