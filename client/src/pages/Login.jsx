import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Login({theme}) {

    const navigate = useNavigate()

    const [Values, setValues] = useState({
        email: "",
        password: ""
    })
    const change = (e) => {
        const {name, value} = e.target
        setValues({...Values, [name]: value})
    }

    const setCookie = () => {
        const date = new Date();
        date.setTime(date.getTime() + (14*24*60*60*1000)); // days to milliseconds
        document.cookie = "todor_userLoggedIn=yes; expires=" + date.toUTCString() + "; path=/; SameSite=Lax;";
    }

    const login = async (e) => {
        e.preventDefault()
        try {
            const res= await axios.post('http://localhost:1000/api/v1/login',Values, {withCredentials: true})
            // localStorage.setItem('userLoggedIn', 'yes')
            setCookie();
            navigate('/dashboard')
        }catch (error) {
        alert(error.response.data.error)
        }
    }

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
        <div className='w-[60vw] md:w-[50vw] lg:w-[30vw]'>
            <h1 className='text-3xl font-bold text-center mb-1 text-blue-800'>TodoR</h1>
            <h3 className='text-center font-semibold text-zinc-900'>Login with TodoR</h3>
        </div>
        <div className='w-[60vw] md:w-[50vw] lg:w-[30vw] mt-4'>
            <form className='flex flex-col gap-4'>
                <input value={Values.email} onChange={change} type="email" required placeholder='email' name="email" className='border rounded px-4 py-1 border-zinc-400 w-[100%] outline-none'/>
                <input value={Values.password} onChange={change} type="password" required placeholder='password' name="password" className='border rounded px-4 py-1 border-zinc-400 w-[100%] outline-none'/>
                <button onClick={login} type='submit' className='bg-blue-800 text-white font-semibold py-2 rounded hover:bg-blue-700 transition-all duration-300'>Login</button>
                <p className='text-center font-semibold text-gray-900'>
                    Don't have an account? <Link to='/register' className='text-blue-800 hover:text-blue-700 transition-all duration-300'>SignUp</Link>    
                </p> 
            </form>
        </div>
    </div>
  )
}

export default Login