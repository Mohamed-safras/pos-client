import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import StatsOverview from "./StatsOverview";
import type { Widget } from "hooks/useCustomWidget";

export function SortableWidget({ widget }: { widget: Widget }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: widget.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <StatsOverview
        name={widget.name}
        quantity={widget.value}
        className={widget.className}
        icon={widget.icon}
      />
    </div>
  );
}
