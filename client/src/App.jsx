import { useState, useEffect } from "react";
import Board from "./components/Board";
import AddTaskModal from "./components/AddTaskModal";
import { fetchTasks, createTask, updateTask, deleteTask } from "./api/tasks";

const COLUMNS = ["Backlog", "To Do", "In Progress", "Done"];

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  // Load all tasks from the backend on mount
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const res = await fetchTasks();
      setTasks(res.data);
    } catch (err) {
      console.error("Failed to load tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (taskData) => {
    try {
      const res = await createTask(taskData);
      setTasks((prev) => [...prev, res.data]);
      setShowAddModal(false);
    } catch (err) {
      console.error("Failed to create task:", err);
    }
  };

  const handleEditTask = async (id, updatedData) => {
    try {
      const res = await updateTask(id, updatedData);
      setTasks((prev) => prev.map((t) => (t._id === id ? res.data : t)));
    } catch (err) {
      console.error("Failed to update task:", err);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      console.error("Failed to delete task:", err);
    }
  };

  // Called after a drag ends — updates the task's column in DB
  const handleDragEnd = async (result) => {
    const { destination, source, draggableId } = result;

    // Dropped outside a valid column
    if (!destination) return;

    // Dropped in the same spot
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const newColumn = destination.droppableId;

    // Optimistically update UI first for snappy feel
    setTasks((prev) =>
      prev.map((t) =>
        t._id === draggableId ? { ...t, column: newColumn } : t,
      ),
    );

    // Then persist to backend
    try {
      await updateTask(draggableId, { column: newColumn });
    } catch (err) {
      console.error("Failed to move task:", err);
      loadTasks(); // revert on failure
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <p className="text-white text-xl">Loading board...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white tracking-tight">
          Kanban By Aaron
        </h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          + Add Task
        </button>
      </header>

      {/* Board */}
      <main className="p-6">
        <Board
          columns={COLUMNS}
          tasks={tasks}
          onDragEnd={handleDragEnd}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
        />
      </main>

      {/* Add Task Modal */}
      {showAddModal && (
        <AddTaskModal
          columns={COLUMNS}
          onAdd={handleAddTask}
          onClose={() => setShowAddModal(false)}
        />
      )}
    </div>
  );
}

export default App;
