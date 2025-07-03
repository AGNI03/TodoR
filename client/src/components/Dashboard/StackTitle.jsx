import React from 'react'

function StackTitle({theme, title}) {
  return (
    <div className={`border-b ${theme==='light'?'border-black':'border-[#888888]'}  pb-2 transition-all duration-500`}>
              <h1 className={`font-semibold ${theme==='light'?'text-zinc-800':'text-[#888888]'} text-center transition-all duration-500`}>{title}</h1>
    </div>
  )
}

export default StackTitle