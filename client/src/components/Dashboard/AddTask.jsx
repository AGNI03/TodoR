import React, { useState } from 'react'
import axios from 'axios'

function AddTask({theme, setAddTaskDiv}) {

    const [Values, setValues] = useState({
        title: "",
        description: "",
        priority: "low",
        status: "yetToStart"
    })

    const change = (e) => {
        const {name, value} = e.target
        setValues({...Values, [name]: value})
    }
    
    const addTask = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post('http://localhost:1000/api/v1/addTask', Values, {withCredentials: true})
            alert(res.data.success)
            setValues({
                title: "",
                description: "",
                priority: "low",
                status: "yetToStart"
            })
            setAddTaskDiv('hidden')
        } catch (error) {
            alert(error.response.data.error)
        }
    }

  return (
    <div className={`${theme==='light'?'bg-white':'bg-black'} rounded px-4 py-4 w-[40%]`}>
        <h1 className='text-center font-semibold text-xl'>Add Task</h1>
        <hr className='mb-4 mt-2'/>
        <form className='flex flex-col gap-4'>
            <input type="text" name='title' onChange={change} value={Values.title} placeholder='Title' className={`border px-2 py-1 rounded ${theme==='light'?'border-zinc-300':'border-[#169976] text-[#1DCD9F]'} outline-none`}/>
            <div className='flex items-center justify-between gap-4'>
                <div className='w-full'>
                    <h3 className='mb-2'>Select Priority</h3>
                    <select name="priority" value={Values.priority} onChange={change} className={`border px-2 py-1 rounded ${theme==='light'?'border-zinc-300':'border-[#169976] text-[#1DCD9F] bg-black'} outline-none w-full`}>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>
                <div className='w-full'>
                    <h3 className='mb-2'>Select Status</h3>
                    <select name="status" value={Values.status} onChange={change} className={`border px-2 py-1 rounded ${theme==='light'?'border-zinc-300':'border-[#169976] text-[#1DCD9F] bg-black'} outline-none w-full`}>
                        <option value="yetToStart">Yet to Start</option>
                        <option value="inProgress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
            </div>
            <textarea name="description" onChange={change} value={Values.description} placeholder='Description' className={`border px-2 py-1 rounded ${theme==='light'?'border-zinc-300':'border-[#169976] text-[#1DCD9F]'} outline-none h-[25vh]`}></textarea>
            <div className='flex items-center justify-between gap-4'>
                <button onClick={addTask} className={`w-full border border-blue-800 ${theme==='light'?'bg-blue-800 hover:bg-blue-700 text-white':'text-blue-500 hover:text-blue-300 hover:shadow-md'} shadow-blue-600  py-2  transition-all duration-300  rounded`}>Add Task</button>
                <button onClick={()=>setAddTaskDiv('hidden')} className={`w-full border ${theme==='light'?'border-black hover:bg-zinc-200':'border-zinc-300 text-zinc-400 hover:text-white hover:shadow-md'} shadow-zinc-300 py-2 transition-all duration-300 rounded`}>Cancel</button>
            </div>
        </form>
    </div>
  )
}

export default AddTask