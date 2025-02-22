import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import useAxiosWithCredentials from "../../../hooks/useAxiosWithCredentials";
import Form from "../../reusuable/Form";


const AddTaskForm = ({refetch}) => {
    const [dueDate, setDueDate] = useState(new Date());
    const [loading, setLoading] = useState(false);
    const axiosSecure = useAxiosWithCredentials(setLoading);

    const handleSubmit = async e=>{
        e.preventDefault();
        const form = e.target;
        const title = form.title.value;
        const cat = form.cat.value;
        const desc = form.desc.value;
        const deadline = dueDate.getTime();

        setLoading(true);
        await axiosSecure.post("/tasks", {title, cat, desc, deadline});
        await refetch();
        setLoading(false);
    }

    return (<Form title="Add New Task" handleSubmit={handleSubmit} dueDate={dueDate} setDueDate={setDueDate} btnTxt="Add" loading={loading}/>);
};

export default AddTaskForm;