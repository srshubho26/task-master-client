import { useDroppable } from "@dnd-kit/core";
import { rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";

const Droppable = ({ id, items, itemsIds, openModal }) => {

  const { setNodeRef } = useDroppable({ id });

  return (
    <SortableContext id={id} items={itemsIds} strategy={rectSortingStrategy}>
      <div ref={setNodeRef} className="px-5 py-2 neomorphism-outset min-w-64">
        <h3 className="text-2xl font-semibold mb-2">{id}</h3>
        {itemsIds.map((item) => {
          const _item = items.find(el=>el._id===item);
          const title = _item?.title;
          return <SortableItem key={item} id={item} title={title} openModal={()=>openModal(_item)} />
        })}
      </div>
    </SortableContext>
  );
};

export default Droppable;
