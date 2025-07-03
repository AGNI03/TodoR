import React from 'react'
import TaskCard from './TaskCard'

function YetToStart({theme, task}) {
  return (
    <div className='flex flex-col gap-2'>
      {task && task.map((items,i)=><TaskCard theme={theme} key={i} data={items}/>)} 
    </div>
  )
}

export default YetToStart