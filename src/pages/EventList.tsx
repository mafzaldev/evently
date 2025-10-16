import React from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "@/store/store";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableEventCard from "./SortableEventCard";
import { setOrder } from "@/store/eventsSlice";
import { LoaderCircle } from "lucide-react";

const EventList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const events = useSelector((state: RootState) => state.events.events);
  const order = useSelector((state: RootState) => state.events.order);
  const loading = useSelector((state: RootState) => state.events.loading);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = order.indexOf(active.id);
      const newIndex = order.indexOf(over.id);
      const newOrder = arrayMove(order, oldIndex, newIndex);
      dispatch(setOrder(newOrder));
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Events</h1>
      {loading ? (
        <div className="flex justify-center items-center h-32">
          <LoaderCircle className="animate-spin" size={36} />
        </div>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={order} strategy={verticalListSortingStrategy}>
            <div role="list" aria-label="Event list">
              {order.map((id) => {
                const event = events.find((e) => e.id === id);
                return event ? (
                  <SortableEventCard key={event.id} event={event} />
                ) : null;
              })}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
};

export default EventList;
