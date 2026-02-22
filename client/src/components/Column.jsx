import { Droppable } from "@hello-pangea/dnd";
import TaskCard from "./TaskCard";

// Each column gets a distinct accent color
const COLUMN_STYLES = {
  Backlog: {
    header: "text-gray-400",
    border: "border-gray-600",
    count: "bg-gray-700",
  },
  "To Do": {
    header: "text-blue-400",
    border: "border-blue-800",
    count: "bg-blue-900",
  },
  "In Progress": {
    header: "text-yellow-400",
    border: "border-yellow-800",
    count: "bg-yellow-900",
  },
  Done: {
    header: "text-green-400",
    border: "border-green-800",
    count: "bg-green-900",
  },
};

function Column({ columnName, tasks, onEdit, onDelete }) {
  const style = COLUMN_STYLES[columnName];

  return (
    <div
      className={`flex-shrink-0 w-72 bg-gray-800 rounded-xl border ${style.border} flex flex-col`}
    >
      {/* Column Header */}
      <div className="px-4 py-3 flex items-center justify-between border-b border-gray-700">
        <h2
          className={`font-semibold text-sm uppercase tracking-wider ${style.header}`}
        >
          {columnName}
        </h2>
        <span
          className={`text-xs font-bold px-2 py-0.5 rounded-full ${style.count} ${style.header}`}
        >
          {tasks.length}
        </span>
      </div>

      {/* Droppable Area */}
      <Droppable droppableId={columnName}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex-1 p-3 flex flex-col gap-2 min-h-32 transition-colors rounded-b-xl ${
              snapshot.isDraggingOver ? "bg-gray-700" : ""
            }`}
          >
            {tasks.length === 0 && !snapshot.isDraggingOver && (
              <p className="text-gray-600 text-xs text-center mt-4">
                No tasks here
              </p>
            )}

            {tasks.map((task, index) => (
              <TaskCard
                key={task._id}
                task={task}
                index={index}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default Column;
