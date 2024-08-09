import React,{useState} from 'react';
import "./todoform.css"
import axios from 'axios'
import { toast } from 'react-toastify';
import { IoCloseSharp } from "react-icons/io5";
function Form (props){
  const [inputs, setInputs] = useState({
    task:"",
    description:""
  })
   const handleChange =(e)=>{
      const {name,value} = e.target;
      setInputs({ ...inputs, [name]: value })
    }
    const Submit = async (e) => {
      e.preventDefault();
      if (!inputs.task || !inputs.description) {
        toast.error("Title or Description cannot be empty");
        return;
      }
      try {
        if (props.userId) {
          const response = await axios.post("https://todo-mern-backend-2.onrender.com/api/v1/addtask", {
            title: inputs.task,
            body: inputs.description,
            id: props.userId
          });
    
          console.log("Response Data:", response.data);
          setInputs({
            task:"",
            description:""
          })
          toast.success("Task added");
          props.settrigger(!props.trigger);
          props.fetchTasks();
          
        } else {
          console.log("User ID is not defined");
        }
      } catch (error) {
        console.error("Error adding task:", error);
      }
    }
   return (props.trigger)?(<div className="popup">
 <div className="popup-in">
   <div className="head">
   <h2>Add a Task</h2>
   <IoCloseSharp onClick={()=>props.settrigger(!props.trigger)}
   style={{ height: '30px', width: '30px', cursor: 'pointer' }}/>
  </div>
  <div className='mid-div'></div>
<form className="TodoForm"> 
    <input type="text" name='task' value={inputs.task} 
    onChange={handleChange}
    className="todo-input" placeholder='What is the task today?' />
    <textarea value={inputs.description}
    onChange={handleChange}
    name = 'description' className="description" placeholder="Description"></textarea>
    <button  className='todo-btn'onClick={Submit} style={{cursor: 'pointer' }}>Add Task</button>
  </form>
</div>
 </div>)
:"";
}
export default Form