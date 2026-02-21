import { DragDropContext } from "@hello-pangea/dnd";
import Column from "./Column";

export default function Board({ columns, tasks, onDragEnd, onEdit, onDelete }) {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div>
        {columns.map((columnName) => (
          <Column
            key={columnName}
            columnName={columnName}
            tasks={tasks.filter((t) => t.column === columnName)}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </DragDropContext>
  );
}
