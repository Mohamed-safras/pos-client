import { useState } from "react";
import { PointerSensor, useSensor, useSensors } from "@dnd-kit/core";

import { arrayMove } from "@dnd-kit/sortable";

export type Widget = { id: string; [key: string]: any };

const useCustomWidget = (widgets: Widget[]) => {
  const [items, setItems] = useState<Widget[]>(widgets);
  const sensors = useSensors(useSensor(PointerSensor));

  function handleDragEnd(event: any) {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over?.id);
      setItems(arrayMove(items, oldIndex, newIndex));
    }
  }

  return {
    items,
    sensors,
    handleDragEnd,
  };
};

export default useCustomWidget;
