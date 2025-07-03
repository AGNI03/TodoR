import React, { useEffect, useState } from 'react'
import axios from 'axios'

function EditTask({theme, EditTaskId, setEditTaskDiv}) {

    const [Values, setValues] = useState({
        title: "",
        description: "",
        priority: "low",
        status: "yetToStart"
    })

    useEffect(() => {
      const fetch= async()=>{
        try {
            const res = await axios.get(`http://localhost:1000/api/v1/getTask/${EditTaskId}`, {withCredentials:true})
            setValues(res.data.taskData)
        } catch (error) {}
      }
      fetch()
    }, [])

    const change = (e) => {
        const {name, value} = e.target
        setValues({...Values, [name]: value})
    }

    const editTask = async (e,id) => {
        e.preventDefault()
        try {
            const res = await axios.put(`http://localhost:1000/api/v1/editTask/${id}`, Values, {withCredentials: true})
            alert(res.data.success)
            window.sessionStorage.clear('editTaskId')
            setEditTaskDiv('hidden')
            window.location.reload()
        } catch (error) {
            alert(error.response.data.error)
        }
    }

    const cancel = (e)=>{
        e.preventDefault()
        window.sessionStorage.clear('editTaskId')
        setEditTaskDiv('hidden')
    }

    const deleteTask = async (e,id) => {
        e.preventDefault()
        try {
            const res = await axios.delete(`http://localhost:1000/api/v1/deleteTask/${id}`, {withCredentials: true})
            alert(res.data.success)
            window.sessionStorage.clear('editTaskId')
            setEditTaskDiv('hidden')
            window.location.reload()
        } catch (error) {
            alert(error.response.data.error)
        }
    }

  return (
    <div className={`${theme==='light'?'bg-white':'bg-black'} rounded px-4 py-4 w-[40%]`}>
        <h1 className='text-center font-semibold text-xl'>Edit Task</h1>
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
                <button onClick={(e)=>editTask(e,Values._id)} className={`w-full border border-blue-800 ${theme==='light'?'bg-blue-800 hover:bg-blue-700 text-white':'text-blue-500 hover:text-blue-300 hover:shadow-md'} shadow-blue-600  py-2  transition-all duration-300  rounded`}>Edit Task</button>
                <button onClick={(e)=>deleteTask(e,Values._id)} className={`w-full border border-red-600 ${theme==='light'?'text-red-600 hover:bg-red-200':'text-red-500 hover:text-red-300 hover:shadow-md'} shadow-red-600  py-2 transition-all duration-300 rounded`}>Delete Task</button>
                <button onClick={cancel} className={`w-full border ${theme==='light'?'border-black hover:bg-zinc-200':'border-zinc-300 text-zinc-400 hover:text-white hover:shadow-md'} shadow-zinc-300 py-2 transition-all duration-300 rounded`}>Cancel</button>
            </div>
        </form>
    </div>
  )
}

export default EditTask