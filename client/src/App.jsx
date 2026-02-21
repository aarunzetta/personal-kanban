import { useState, useEffect } from "react";
import { fetchTasks, createTask, updateTask, deleteTask } from "./api/tasks";
import Board from "./components/Board";

const COLUMNS = ["Backlog", "To Do", "In Progress", "Done"];

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

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
      loadTasks();
    }

    if (loading) {
      return (
        <div>
          <p>Loading board...</p>
        </div>
      );
    }
  };
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 border-b border-gray-700 px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white tracking-tight">
          Personal Kanban by Aaron
        </h1>
        <button>+ Add Task</button>
      </header>

      <main>
        <Board
          columns={COLUMNS}
          tasks={tasks}
          onDragEnd={handleDragEnd}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
        />
      </main>
    </div>
  );
}

export default App;
