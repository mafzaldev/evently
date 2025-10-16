import React from "react";
import { useNavigate } from "react-router-dom";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Event } from "@/lib/interfaces";
import { GripVertical, CalendarDays, MapPin } from "lucide-react";

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
    opacity: isDragging ? 0.6 : 1,
    cursor: "grab",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`
        bg-white rounded-2xl shadow-sm border border-gray-100
        p-5 mb-4 flex flex-col gap-3
        transition-all duration-200 select-none
        hover:shadow-md hover:scale-[1.01]
        ${isDragging ? "ring-2 ring-blue-400" : ""}
      `}
      aria-label={`Event: ${event.name}`}
    >
      <div
        className="flex justify-between items-start"
        {...attributes}
        {...listeners}
      >
        <div className="flex flex-col gap-1">
          <h3 className="font-semibold text-lg text-gray-800 leading-tight">
            {event.name}
          </h3>
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3 text-sm text-gray-600 mt-2">
            <span className="flex items-center gap-1.5">
              <CalendarDays size={16} className="text-blue-500" />
              {event.date}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin size={16} className="text-rose-500" />
              {event.location}
            </span>
          </div>
        </div>
        <GripVertical
          className="text-gray-400 hover:text-gray-500 cursor-grab"
          aria-label="drag-handle"
        />
      </div>

      <button
        onClick={() => navigate(`/register/${event.id}`)}
        className="
          mt-2 self-end px-5 py-2.5
          bg-blue-600 text-white text-sm font-medium rounded-lg
          hover:bg-blue-700 active:scale-[0.98]
          transition-all duration-150 cursor-pointer
        "
      >
        Register
      </button>
    </div>
  );
};

export default SortableEventCard;
