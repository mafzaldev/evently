import React from "react";
import { useNavigate } from "react-router-dom";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Event } from "../lib/types";
import { GripVertical } from "lucide-react";

interface Props {
  event: Event;
}

const SortableEventCard: React.FC<Props> = ({ event }) => {
  const navigate = useNavigate();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: event.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: "grab",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white rounded shadow p-4 mb-3 flex flex-col transition-all duration-200"
      aria-label={`Event: ${event.name}`}
    >
      <div
        className="flex justify-between select-none"
        {...attributes}
        {...listeners}
      >
        <div>
          <div className="font-semibold text-lg">{event.name}</div>
          <div className="text-sm text-gray-600">
            {event.date} | {event.location}
          </div>
        </div>
        <GripVertical
          className="cursor-grab text-gray-400 select-none"
          aria-label="drag-handle"
        />
      </div>

      <button
        onClick={() => navigate(`/register/${event.id}`)}
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Register
      </button>
    </div>
  );
};

export default SortableEventCard;
