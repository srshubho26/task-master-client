import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

const inputCss = "px-3 py-2 bg-transparent neomorphism-inset focus:neomorphism-outset focus:outline-0";
const labelCss = "text-dark text-xl font-semibold";

const Form = ({title, handleSubmit, dueDate, setDueDate, btnTxt, formVals, loading}) => {
    const [cat, setCat] = useState("To Do");
    const [taskTitle, setTaskTitle] = useState("");
    const [desc, setDesc] = useState("");

    useEffect(()=>{
        if(formVals){
            setCat(formVals.cat);
            setTaskTitle(formVals.title);
            setDesc(formVals.desc);
        }
    }, [formVals]);


    return (<form className="w-full max-w-sm neomorphism-outset px-8 pt-5 pb-8" onSubmit={handleSubmit}>
            <h3 className="text-prime font-semibold text-2xl mb-5">{title}</h3>
    
            <div className="flex flex-col mb-7 gap-2">
                <label className={labelCss}>Title</label>
                <input type="text" maxLength={50} placeholder="Enter Task Title" name="title" className={inputCss} value={taskTitle} onChange={e=>setTaskTitle(e.target.value)} />
            </div>
    
            <div className="flex flex-col mb-7 gap-2">
                <label className={labelCss}>Category</label>
                <select name="cat" className={inputCss} value={cat} onChange={e=>setCat(e.target.value)}>
                    <option>To Do</option>
                    <option>In Progress</option>
                    <option>Done</option>
                </select>
            </div>
    
            <div className="flex flex-col mb-7 gap-2">
                <label className={labelCss}>Description</label>
                <textarea value={desc} onChange={e=>setDesc(e.target.value)} maxLength={200} name="desc" placeholder="Task Description (Optional)" rows={4} className={inputCss}/>
            </div>
    
            <div className="flex flex-col mb-7 gap-2">
                <label className={labelCss}>Due Date</label>
                <DatePicker className={inputCss + " w-full"} selected={dueDate} onChange={(date) => setDueDate(date)} />
            </div>
    
            <button disabled={loading} className="px-5 py-2 neomorphism-inset text-xl hover:neomorphism-outset hover:text-prime">{loading ? 'Loading...' : btnTxt}</button>
        </form>);
};

export default Form;