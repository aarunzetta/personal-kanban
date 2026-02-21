import { Droppable } from "@hello-pangea/dnd";
import TaskCard from "./TaskCard";

export default function Column({ columnName, tasks, onEdit, onDelete }) {
  return (
    <div>
      <div>
        <h2>Column</h2>
        <span>0</span>
      </div>

      <Droppable droppableId={columnName}>
        {(provided, snapshot) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {tasks.length === 0 && !snapshot.isDraggingOver && (
              <p>No tasks here</p>
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
