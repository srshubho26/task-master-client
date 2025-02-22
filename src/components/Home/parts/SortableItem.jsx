import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import useAxiosWithCredentials from "../../../hooks/useAxiosWithCredentials";
import { useRef } from "react";

const SortableItem = (props) => {
  const axiosSecure = useAxiosWithCredentials();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id: props.id });
  
  const handleDelete = async()=>{
    await axiosSecure.delete(`/tasks/${props.id}`);
    document.getElementById("task"+props.id).className = "hidden";
  }

  const itemStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
    width: '100%',
    alignItems: "center",
    marginBottom: 5,
    userSelect: "none",
    cursor: "grab",
    boxSizing: "border-box"
  };

  return (
    <div id={"task"+props.id} className="neomorphism-outset h-8 flex justify-between items-center px-2 py-2" style={itemStyle} ref={setNodeRef} {...attributes} {...listeners}>
      <span>{props.title}</span>

      <div className="flex gap-1 text-lg">
        <button className="hover:text-prime" onClick={props.openModal}><FaRegEdit /></button>
        <button className="hover:text-prime" onClick={handleDelete}><MdDelete /></button>
      </div>
    </div>
  );
};

export default SortableItem;
