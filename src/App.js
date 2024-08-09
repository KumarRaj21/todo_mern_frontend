import React, { useState, useEffect } from 'react';
import './App.css';
import { Routes, Route, NavLink } from 'react-router-dom'
import All from './components/All/All.jsx'
import Completed from './components/Completed.jsx'
import Incompleted from './components/Incompletd.jsx'
import Form from './components/Todoform.jsx'
import Login from './components/auth/Login.jsx';
import Signup from './components/auth/Signup.jsx';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Update from './components/Update.jsx';
import { FiMenu } from "react-icons/fi";
import { IoCloseSharp } from "react-icons/io5";
function App() {
  const [userId, setuserId] = useState(localStorage.getItem("userId") || null)
  const [user, setuser] = useState(!!userId);
  const [btnpopup, setbtnpopup] = useState(false);
  const [tasklist, setTasklist] = useState([]);
  const [openEdit, setopenEdit] = useState(false);
  const [updatedArray, setupdatedArray] = useState(null);
  const [Username,setUsername] = useState("")
  const [OpenMenu, setOpenMenu] = useState(false);
  
  useEffect(() => {
    if (userId) {
      console.log('User ID:', userId);
    }
  }, [userId]);


useEffect(() => {
  const storedUsername = localStorage.getItem("username");
  if (storedUsername) {
    setUsername(storedUsername);
  }
}, []);
  const fetchTasks = async () => {
    if (userId) {
      try {
        const response = await axios.get(`https://todo-mern-backend-2.onrender.com/api/v1/gettask/${userId}`);
        setTasklist(response.data.list);

      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    }
  };
  useEffect(() => {
    fetchTasks();
  }, [userId]);
  const navigate = useNavigate();

  const del = async (cardid) => {
    await axios.delete(`https://todo-mern-backend-2.onrender.com/api/v1/deletetask/${cardid}`, { data: { id: userId } }).then(() => {
      toast.success("Task Deleted")
      fetchTasks();
    })
  }

  const update = (id) => {
    const taskToUpdate = tasklist.find(task => task._id === id);
    setupdatedArray(taskToUpdate);
  }


  const toggleDone = async (id) => {
    try {
      await axios.put(`https://todo-mern-backend-2.onrender.com/api/v1/togglecompletedtask/${id}`);
      fetchTasks();
    } catch (error) {
      console.error("Error toggling task:", error);
      toast.error("Error toggling task");
    }
  };

  return (
    <>
      {
        user ? <div className="container">
          <div className="box">
            <div className="box1">
              <ul>
                <p style={{fontSize:"20px"}}>welcome <span style={{fontWeight:"bold", color:"rgb(0, 149, 255)", marginLeft:"8px"}}>{Username}</span>👋</p>
                <p><NavLink to="/all-tasks"> All Tasks</NavLink></p>
                <p><NavLink to="/IncompletedTasks">In Progess</NavLink></p>
                <p><NavLink to="/CompletedTasks">Done</NavLink></p>
              </ul>
              <div className='navbar-btns'>
                <button className="btn" onClick={() => {
                  setbtnpopup(!btnpopup)
                }} > + Add Task</button>
                <button className='logout-btn' onClick={() => {
                  toast.success("Logout successfully")
                  setuser(false);
                  setuserId(null);
                  localStorage.removeItem("userId");
                  navigate("/login");
                }}>Logout</button>
              </div>
            </div>
            <div className="box2">
              <div className="header">
                <div className='menu-btn'>
                  <FiMenu onClick={()=> setOpenMenu(true)}
                     style={{ height: '30px', width: '30px', cursor: 'pointer' }}/>
                </div>
                <h1>TODO list App</h1>
              {
                OpenMenu ? (<div className='menu-container'>
               <div className='menu-in'>
                 <div className='menu-head'>
                 <p style={{fontSize:"20px"}}>welcome 
                 <span style={{fontWeight:"bold", color:"rgb(0, 149, 255)", marginLeft:"8px"}}>
                  {Username}
                  </span>
                  👋
                  </p>
                  <IoCloseSharp onClick={()=>setOpenMenu(!OpenMenu)}
   style={{ height: '30px', width: '30px', cursor: 'pointer' }}/>
                 </div>
                 <div className='menu-links'>
                 <NavLink to="/all-tasks"> All Tasks</NavLink>
                <NavLink to="/IncompletedTasks">In Progess</NavLink>
                <NavLink to="/CompletedTasks">Done</NavLink>
                 </div>
                 <div className='menu-buttons'>
                 <button className="menu-addbtn" onClick={() => {
                  setbtnpopup(!btnpopup)
                }} >+ Add Task</button>
                <button className='menu-logout-btn' onClick={() => {
                  toast.success("Logout successfully");
                  setuser(false);
                  setuserId(null);
                  localStorage.removeItem("userId");
                  navigate("/login");
                }}>Logout</button>
                 </div> 
               </div>
                </div>):""
              }
               <Form trigger={btnpopup} settrigger={setbtnpopup}
                tasklist={tasklist} setTasklist={setTasklist}
                setuserId={setuserId} userId={userId} fetchTasks={fetchTasks} >
              </Form>
              <Update openEdit={openEdit} setopenEdit={setopenEdit} tasklist={tasklist} setTasklist={setTasklist}
                setuserId={setuserId} userId={userId} update={update} updatedArray={updatedArray} setupdatedArray={setupdatedArray} fetchTasks={fetchTasks} />
              </div>
              <div className='box2-body'>
                <Routes>
                <Route path="/all-tasks" element={<All openEdit={openEdit} setopenEdit={setopenEdit} 
                tasklist={tasklist} setTasklist={setTasklist}
                  userId={userId} setuserId={setuserId} del={del}
                  update={update} updatedArray={updatedArray}
                  trigger={btnpopup} settrigger={setbtnpopup}
                  toggleDone={toggleDone}
                />} />
                <Route path="/CompletedTasks" element={<Completed openEdit={openEdit} setopenEdit={setopenEdit} tasklist={tasklist} setTasklist={setTasklist}
                  userId={userId} setuserId={setuserId} del={del}
                  update={update} updatedArray={updatedArray}
                  toggleDone={toggleDone} />} />
                <Route path="/IncompletedTasks" element={<Incompleted Completed openEdit={openEdit} setopenEdit={setopenEdit} tasklist={tasklist} setTasklist={setTasklist}
                  userId={userId} setuserId={setuserId} del={del}
                  update={update} updatedArray={updatedArray}
                  toggleDone={toggleDone} />} />
              </Routes>
              </div>
            </div>
          </div>
        </div> : <Routes>
          <Route path='/login' element={<Login user={user} setuser={setuser} setuserId={setuserId} userId={userId}
          Username={Username} setUsername={setUsername}
          />} />
          <Route path='/' element={<Signup user={user} setuser={setuser} />} />
        </Routes>
      }
    </>
  );
}
export default App;