import { useEffect, useRef, useState } from "react";
import Form from "./Form";
import useAxiosWithCredentials from "../../hooks/useAxiosWithCredentials";

const EditModal = ({editTask, setEditTask, refetch}) => {
    const [dueDate, setDueDate] = useState(new Date());
    const axiosSecure = useAxiosWithCredentials();
    const modalCloseRef = useRef();
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        if(editTask){
            setDueDate(new Date(editTask?.deadline));
        }
    }, [editTask])

    const handleUpdate = async e=>{
        e.preventDefault();
        const form = e.target;
        const title = form.title.value;
        const cat = form.cat.value;
        const desc =form.desc.value;
        const deadline = dueDate.getTime();
        setLoading(true);
        await axiosSecure.put(`/tasks/${editTask?._id}`, {title, cat, desc, deadline});
        await refetch();
        modalCloseRef.current.submit();
        setLoading(false);
    }

    return (<dialog id="my_modal_1" className="modal">
        <div className="modal-box bg-lite">
          <Form title="Edit Task" handleSubmit={handleUpdate} dueDate={dueDate} setDueDate={setDueDate} btnTxt="Update" formVals={editTask} loading={loading}/>
          <div className="modal-action">
            <form ref={modalCloseRef} method="dialog" onSubmit={()=>setEditTask(null)}>
              {/* if there is a button in form, it will close the modal */}
              <button className="px-5 py-1 neomorphism-outset hover:neomorphism-inset">Close</button>
            </form>
          </div>
        </div>
      </dialog>);
};

export default EditModal;