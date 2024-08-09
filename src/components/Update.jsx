import React, { useState, useEffect } from 'react';
import "./todoform.css"
import axios from 'axios'
import { toast } from 'react-toastify';
import { IoCloseSharp } from "react-icons/io5";
function Update(props) {
  const [inputs, setInputs] = useState({
    task: "",
    description: ""
  })
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value })
  }

  useEffect(() => {
    if (props.updatedArray) {
      setInputs({
        task: props.updatedArray.title, description: props.updatedArray.body
      })
    }

  }, [props.updatedArray])

  const Submit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://todo-mern-backend-2.onrender.com/api/v1/updatetask/${props.updatedArray._id}`, {
        title: inputs.task,
        body: inputs.description
      }).then((res) => {
        console.log("Response Data:", res.data.list);
        setInputs({
          task: "",
          description: ""
        });
        toast.success("Task Updated");
         props.fetchTasks();
        props.setopenEdit(false)
       
      });
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error("Failed to update task.");
    }
  };

  return (props.openEdit) ? (<div className="popup">
    <div className="popup-in">
      <div className="head">
        <h2>Edit Task</h2>
        <IoCloseSharp  onClick={() => {
          props.setopenEdit(!props.openEdit)}}
   style={{ height: '30px', width: '30px', cursor: 'pointer' }}  />
      </div>
      <div className='mid-div'></div>
      <form className="TodoForm" onSubmit={Submit}>
        <input type="text" name='task' value={inputs.task}
          onChange={handleChange}
          className="todo-input" placeholder='What is the task today?' />
        <textarea value={inputs.description}
          onChange={handleChange}
          name='description' className="description" placeholder="Description"></textarea>
        <button className='todo-btn'>Update Task</button>
      </form>
    </div>
  </div>)
    : "";
}
export default Update