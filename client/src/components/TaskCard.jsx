import { useState } from "react";
import { Draggable } from "@hello-pangea/dnd";
import EditTaskModal from "./EditTaskModal";

const PRIORITY_STYLES = {
  Low: "bg-green-900 text-green-300 border border-green-700",
  Medium: "bg-yellow-900 text-yellow-300 border border-yellow-700",
  High: "bg-red-900 text-red-300 border border-red-700",
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
                  ✏️
                </button>
                <button
                  onClick={() => onDelete(task._id)}
                  className="text-gray-400 hover:text-red-400 text-xs px-1.5 py-0.5 rounded transition-colors"
                >
                  🗑️
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
