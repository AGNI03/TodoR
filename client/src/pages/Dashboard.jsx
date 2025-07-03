import React, { useEffect, useState } from 'react'
import Header from '../components/Dashboard/Header'
import AddTask from '../components/Dashboard/AddTask'
import StackTitle from '../components/Dashboard/StackTitle'
import YetToStart from '../components/Dashboard/YetToStart'
import InProgress from '../components/Dashboard/InProgress'
import Completed from '../components/Dashboard/Completed'
import EditTask from '../components/Dashboard/EditTask'
import axios from 'axios'

function Dashboard({theme, setTheme}) {
    const [AddTaskDiv, setAddTaskDiv] = useState('hidden')
    const [Tasks, setTasks] = useState()
    const [EditTaskDiv, setEditTaskDiv] = useState('hidden')
    const [EditTaskId, setEditTaskId] = useState()
   
    useEffect(() => {
      const fetUserDetails = async () => {
        try {
          const res= await axios.get('http://localhost:1000/api/v1/userDetails', {withCredentials: true})
          setTasks(res.data.tasks)
        } catch (error) {
        }
      }
      fetUserDetails()
      if(window.sessionStorage.getItem('editTaskId')){
        setEditTaskDiv('block')
        setEditTaskId(window.sessionStorage.getItem('editTaskId'))
      }
    }, [AddTaskDiv])

  return (
    <div className={`w-full h-[100vh] relative ${theme==='light'?'bg-zinc-300':'bg-[#111111]'} transition-all duration-500`}>
        <div className={`${theme==='light'?'bg-white':'bg-black'} transition-all duration-500`}>
            <Header theme={theme} setTheme={setTheme} setAddTaskDiv={setAddTaskDiv}/>
        </div>
        <div className={'px-12 py-4 flex gap-12 max-h-auto'}>
          <div className='w-1/3 '>
            <StackTitle theme={theme} title={'Yet To Start'}/>
            <div className='pt-2'>
              {Tasks && <YetToStart theme={theme} task={Tasks[0].yetToStart}/>}
            </div>
          </div>
          <div className='w-1/3 '>
            <StackTitle theme={theme} title={'In Progress'}/>
            <div className='pt-2'>
              {Tasks && <InProgress theme={theme} task={Tasks[1].inProgress}/>}
            </div>
          </div>
          <div className='w-1/3 '>
            <StackTitle theme={theme} title={'Completed'}/>
            <div className='pt-2'>
              {Tasks && <Completed theme={theme} task={Tasks[2].completed}/>}
            </div>
          </div>
        </div>

        {/* --------------------------------------------- */}
        <div className={`w-full ${AddTaskDiv} h-screen fixed top-0 left-0 ${theme==='light'?'bg-zinc-800 opacity-85':'bg-zinc-900 opacity-80'}`}></div>
        <div className={`w-full ${AddTaskDiv} h-screen fixed top-0 left-0 flex items-center justify-center`}><AddTask theme={theme} setAddTaskDiv={setAddTaskDiv}/></div>

        {/* --------------------------------------------- */}
        { EditTaskId && (<>
        <div className={`w-full ${EditTaskDiv} h-screen fixed top-0 left-0 ${theme==='light'?'bg-zinc-800 opacity-85':'bg-zinc-900 opacity-80'}`}></div>
        <div className={`w-full ${EditTaskDiv} h-screen fixed top-0 left-0 flex items-center justify-center`}><EditTask theme={theme} EditTaskId={EditTaskId} setEditTaskDiv={setEditTaskDiv}/></div>
        </>)}
    </div>
  )
}

export default Dashboard
