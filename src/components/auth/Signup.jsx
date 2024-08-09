import React from 'react'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify';
import './Login.css'
const Signup = () => {
  const [Input, setinput] = useState({ email: "", username: "", password: "" })
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setinput({ ...Input, [name]: value })
  }

  const Submit = async (e) => {
    e.preventDefault();
    if (!Input.email || !Input.password || !Input.username) {
      toast.error("Email or Password or Username cannot be empty");
      return;
    }
    await axios.post("https://todo-mern-backend-2.onrender.com/api/register", Input).then((res) => {
      toast.success("Signup Successfully")
      setinput({ email: "", username: "", password: "" })
      navigate("/login")
    })

  }
  return (
    <div className='signup-container'>
      <div className='signup-in'>
        <h1>Signup</h1>
        <form action=''>
          <input type='email' name='email'
            value={Input.email}
            onChange={handleChange} placeholder='Enter your email' />
          <input type='text' name='username'
            value={Input.username}
            onChange={handleChange} placeholder='Enter User name' />
          <input type='password' name='password'
            value={Input.password}
            onChange={handleChange} placeholder='Enter password' />
          <button onClick={Submit}>
            Create Account
          </button>
          <NavLink to={'/login'} >already have an account?</NavLink>
        </form>
      </div>
    </div>
  )
}

export default Signup