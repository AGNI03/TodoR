import React from 'react'

function TaskCard({theme, data}) {

    const showEditDiv= (e,id)=>{
        e.preventDefault();
        window.sessionStorage.setItem('editTaskId', id)
        window.location.reload()
    }

  return (
    <button onClick={(event)=>showEditDiv(event, data._id)} className={`${theme==='light'?'bg-zinc-100 text-black shadow-md hover:shadow-xl':'bg-black text-[#1DCD9F] shadow-[#169976] shadow-sm hover:shadow-md'} rounded  px-4 w-[100%] py-2 transition-all duration-500`}>
        <div className='flex items-center justify-between'>
            <h1>{data.title}</h1>
            <div className={`border-1 text-sm ${data.priority==='low'? theme==='light'?'text-green-500 bg-green-100 border-zinc-100':'text-green-300 border-green-500' : data.priority==='medium'? theme==='light'?'text-yellow-500 bg-yellow-100 border-zinc-100':'text-yellow-300 border-yellow-500' : theme==='light'?'text-red-500 bg-red-100 border-zinc-100':'text-red-300 border-red-500'}  px-2 rounded-full transition-all duration-500`}>
                <p>{data.priority}</p>
            </div>
        </div>
        <hr className='my-2'/>
        <p className={`text-sm ${theme==='light'?'text-zinc-500':'text-[#169976]'} text-start transition-all duration-500`}>{data.description}</p>
    </button>
  )
}

export default TaskCard