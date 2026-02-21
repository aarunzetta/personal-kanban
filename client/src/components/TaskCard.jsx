import { Draggable } from "@hello-pangea/dnd";

export default function TaskCard({ task, index }) {
  return (
    <>
      <Draggable draggableId={task._id} index={index}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div>
              <span>{task.priority}</span>

              <div className="flex gap-1">
                <button>edit</button>
                <button>delete</button>
              </div>
            </div>

            <h3>task title</h3>

            <p>description....</p>
          </div>
        )}
      </Draggable>
    </>
  );
}
