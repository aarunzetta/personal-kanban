import { useState } from "react";
import { Draggable } from "@hello-pangea/dnd";
import EditTaskModal from "./EditTaskModal";

const PRIORITY_STYLES = {
  Low: "bg-green-900 text-green-300 border border-green-700",
  Medium: "bg-yellow-900 text-yellow-300 border border-yellow-700",
  High: "bg-red-900 text-red-300 border border-red-700",
};

const formatDate = (dateString) => {
  if (!dateString) return null;
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year:
      date.getFullYear() !== new Date().getFullYear() ? "numeric" : undefined,
  });
};

const isOverdue = (dueDate) => {
  if (!dueDate) return false;
  return new Date(dueDate) < new Date().setHours(0, 0, 0, 0);
};

function TaskCard({ task, index, onEdit, onDelete }) {
  const [showEditModal, setShowEditModal] = useState(false);

  const handleEdit = (updatedData) => {
    onEdit(task._id, updatedData);
    setShowEditModal(false);
  };

  return (
    <>
      <Draggable draggableId={task._id} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={`bg-gray-700 rounded-lg p-3 border border-gray-600 cursor-grab active:cursor-grabbing transition-shadow ${
              snapshot.isDragging
                ? "shadow-2xl rotate-1 border-blue-500"
                : "hover:border-gray-500"
            }`}
          >
            {/* Priority Badge */}
            <div className="flex items-center justify-between mb-2">
              <span
                className={`text-xs font-semibold px-2 py-0.5 rounded-full ${PRIORITY_STYLES[task.priority]}`}
              >
                {task.priority}
              </span>

              {/* Action Buttons */}
              <div className="flex gap-1">
                <button
                  onClick={() => setShowEditModal(true)}
                  className="text-gray-400 hover:text-blue-400 text-xs px-1.5 py-0.5 rounded transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(task._id)}
                  className="text-gray-400 hover:text-red-400 text-xs px-1.5 py-0.5 rounded transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>

            {/* Title */}
            <h3 className="text-white text-sm font-medium leading-snug mb-1">
              {task.title}
            </h3>

            {/* Description */}
            {task.description && (
              <p className="text-gray-400 text-xs leading-relaxed line-clamp-2">
                {task.description}
              </p>
            )}

            {/* Due Date */}
            {task.dueDate && (
              <div className="flex items-center gap-1 mt-2">
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    isOverdue(task.dueDate)
                      ? "bg-red-900 text-red-300 border border-red-700"
                      : "bg-blue-900 text-blue-300 border border-blue-700"
                  }`}
                >
                  📅 {formatDate(task.dueDate)}
                  {isOverdue(task.dueDate) && " (Overdue)"}
                </span>
              </div>
            )}

            {/* Time Tracking */}
            {(task.estimatedHours > 0 || task.actualHours > 0) && (
              <div className="flex items-center gap-2 mt-2 text-xs text-gray-400">
                {task.estimatedHours > 0 && (
                  <span className="bg-gray-600 px-2 py-0.5 rounded">
                    Est: {task.estimatedHours}h
                  </span>
                )}
                {task.actualHours > 0 && (
                  <span className="bg-gray-600 px-2 py-0.5 rounded">
                    Actual: {task.actualHours}h
                  </span>
                )}
              </div>
            )}
          </div>
        )}
      </Draggable>

      {showEditModal && (
        <EditTaskModal
          task={task}
          columns={["Backlog", "To Do", "In Progress", "Done"]}
          onSave={handleEdit}
          onClose={() => setShowEditModal(false)}
        />
      )}
    </>
  );
}

export default TaskCard;
