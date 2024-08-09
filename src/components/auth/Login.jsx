import React from 'react'
import './Login.css'
import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify';
const Login = (props) => {
const [inputs, setinputs] = useState({
  email:"",
  password:""
})
 const handleChange =(e)=>{
    const {name,value} = e.target;
    setinputs({ ...inputs, [name]: value })
  }
  const navigate = useNavigate();
  
  const Submit = async (e) => {
    e.preventDefault();
    if (!inputs.email || !inputs.password) {
      toast.error("Email or Password cannot be empty");
      return;
    }
    await axios.post("https://todo-mern-backend-2.onrender.com/api/signin", inputs).then((res) => {
     if(res.data.others._id){
     const id = res.data.others._id;
     const username = res.data.others.username;
     props.setuserId(id)
      props.setuser(true)
      localStorage.setItem("userId", id);
      localStorage.setItem("username", username);
        props.setUsername(username);
      toast.success("Login Successfully")
    navigate("/all-tasks")
    }
  })
  }
  return (
    <div className='signin-container'>
    <div className='signin-in'>
       <h1>Login</h1>
      <form action=''>
       <input type='email' name='email' value={inputs.email}
       onChange={handleChange} placeholder='Enter your email'/>
       <input type='password' name='password' value={inputs.password}
       onChange={handleChange} placeholder='Enter password'/>
       <button onClick={Submit}>
           Login
       </button>
       <NavLink to={'/'}>Dont have an account?</NavLink>
      </form>
    </div>
   </div>
  )
}

export default Login