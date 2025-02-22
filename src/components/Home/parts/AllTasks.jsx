import { useCallback, useEffect, useState } from "react";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  MouseSensor,
  useSensor,
  useSensors
} from "@dnd-kit/core";

import Droppable from "./Droppable";
import { arrayMove, insertAtIndex, removeAtIndex } from "./utils/array";
import useAxiosWithCredentials from "../../../hooks/useAxiosWithCredentials";
import EditModal from "../../reusuable/EditModal";
import AddTaskForm from "../parts/AddTaskForm";


function AllTasks() {
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosWithCredentials();
  const [editTask, setEditTask] = useState(null);

  const [allItems, setAllItems] = useState([]);

  const [itemsIds, setItemsIds] = useState({})

  const loadTasks = useCallback(()=>{
    const load = async () => {
      const res = await axiosSecure("/tasks");
      const data = res.data;
      const groups = ['To Do', 'In Progress', 'Done'];
      const storeIds = {};
  
      groups.forEach(group => {
        storeIds[group] = data.filter(el => el.cat === group).map(el => el._id);
      })
  
      setAllItems(data);
      setItemsIds(storeIds);
  
      setLoading(false);
    } 
    load();
  }, [axiosSecure]);

  useEffect(loadTasks, [loadTasks]);

  const sensors = useSensors(
    useSensor(TouchSensor),
    useSensor(MouseSensor),
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  const handleDragOver = ({ over, active }) => {
    const overId = over?.id;
    if (!overId) {
      return;
    }

    const activeContainer = active.data.current.sortable.containerId;
    const overContainer = over.data.current?.sortable.containerId;

    if (!overContainer) {
      return;
    }

    if (activeContainer !== overContainer) {
      setItemsIds((items) => {
        const activeIndex = active.data.current.sortable.index;
        const overIndex = over.data.current?.sortable.index || 0;

        return moveBetweenContainers(
          items,
          activeContainer,
          activeIndex,
          overContainer,
          overIndex,
          active.id
        );
      });
    }
  };

  const handleDragEnd = async ({ active, over }) => {
    if (!over) {
      return;
    }

    const overContainer = over.data.current?.sortable.containerId || over.id;
    const overIndex = over.data.current?.sortable.index || 0;
    const activeContainer = active.data.current.sortable.containerId;
    const activeIndex = active.data.current.sortable.index;
    if (active.id !== over.id) {

      setItemsIds((items) => {
        let newItems;
        if (activeContainer === overContainer) {
          newItems = {
            ...items,
            [overContainer]: arrayMove(
              items[overContainer],
              activeIndex,
              overIndex
            )
          };
        } else {
          newItems = moveBetweenContainers(
            items,
            activeContainer,
            activeIndex,
            overContainer,
            overIndex,
            active.id
          );
        }

        return newItems;
      });
    }

    await axiosSecure.put("/tasks", { targetCat: overContainer, overIndex, active_id: active.id });
  };

  const moveBetweenContainers = (
    items,
    activeContainer,
    activeIndex,
    overContainer,
    overIndex,
    item
  ) => {
    return {
      ...items,
      [activeContainer]: removeAtIndex(items[activeContainer], activeIndex),
      [overContainer]: insertAtIndex(items[overContainer], overIndex, item)
    };
  };


  return (<>{!loading &&
    <DndContext
      sensors={sensors}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
    >
            <AddTaskForm refetch={loadTasks} />
      <div className="flex flex-wrap gap-2">
        {Object.keys(itemsIds).map((group) => (
          <Droppable id={group} itemsIds={itemsIds[group]} items={allItems} key={group} openModal={(task) => {
            document.getElementById('my_modal_1').showModal();
            setEditTask(task);
            }} />))}
      </div>

      <EditModal editTask={editTask} setEditTask={setEditTask} refetch={loadTasks} />
    </DndContext>
  }</>);
}

export default AllTasks;