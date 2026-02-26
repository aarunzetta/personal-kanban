import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Low",
    },
    column: {
      type: String,
      enum: ["Backlog", "To Do", "In Progress", "Done"],
      default: "Backlog",
    },
    order: {
      type: Number,
      default: 0,
    },
    dueDate: {
      type: Date,
      default: null,
    },
    estimatedHours: {
      type: Number,
      default: 0,
      min: 0,
    },
    actualHours: {
      type: Number,
      default: 0,
      min: 0,
    },
    timeTracking: [
      {
        date: {
          type: Date,
          default: Date.now,
        },
        hours: {
          type: Number,
          required: true,
          min: 0,
        },
        description: {
          type: String,
          default: "",
        },
      },
    ],
  },
  { timestamps: true },
);

const Task = mongoose.model("Task", taskSchema);
export default Task;
