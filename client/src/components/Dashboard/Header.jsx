import React from 'react'
import {IoLogOutOutline} from 'react-icons/io5'
import { MdOutlineLightMode } from "react-icons/md";
import { MdOutlineDarkMode } from "react-icons/md";
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Header({theme, setTheme, setAddTaskDiv}) {
    const navigate = useNavigate()

    const deleteCookie = () => {
        const date = new Date();
        date.setTime(date.getTime() + (0)); // days to milliseconds
        document.cookie = "todor_userLoggedIn=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax;";
    }

    const logout = async () => {
        try {
            const res = await axios.post('http://localhost:1000/api/v1/logout',{},{withCredentials: true})
            alert(res.data.message)
            // localStorage.clear('userLoggedIn')
            deleteCookie()
            navigate('/login')
        } catch (error) {
            navigate('/login')
        }
    }
    

  return (
    <div className={`${theme==='light'?'text-gray-800 border-black':'text-[#169976] border-[#169976]'} flex px-12 py-4 items-center justify-between border-b transition-all duration-500`}>
        <div>
            <h1 className={`text-2xl ${theme==='light'?'text-blue-800':'text-[#317f97]'} transition-all duration-500 font-semibold`}>TodoR</h1>
        </div>
        <div className='flex gap-8'>
            <button onClick={setTheme} className={`border-0 text-2xl ${theme==='light'?'hover:text-yellow-400':'hover:text-violet-600'} transition-all duration-300`}>{theme === 'light' ? <MdOutlineLightMode/> : <MdOutlineDarkMode/>}</button>
            <button onClick={()=>setAddTaskDiv('block')} className={`${theme==='light'?'hover:text-blue-700':'hover:text-blue-500'} transition-all duration-300`}>Add Task</button>
            <button onClick={logout} className='text-2xl hover:text-red-600 transition-all duration-300'><IoLogOutOutline/></button>
        </div>
    </div>
  )
}

export default Header