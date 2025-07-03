import { useEffect, useState} from 'react'
import {Routes, Route, useNavigate} from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
// import './App.css'


function App() {

  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')

  const setThemeHandle = () => {
        if (theme === 'light') {
            setTheme('dark')
            localStorage.setItem('theme', 'dark')
        }
        else {
            setTheme('light')
            localStorage.setItem('theme', 'light')
        }
    }

  const navigate = useNavigate()
  useEffect(() => {
    // if (localStorage.getItem('userLoggedIn')) navigate('/dashboard')
    if (document.cookie.includes('todor_userLoggedIn=yes')) navigate('/dashboard')
    else navigate('/login')
  },[])

  return (
    <>
      <Routes>
        <Route path='/register' element={<Register theme={theme}/>}/>
        <Route path='/login' element={<Login theme={theme}/>}/>
        <Route path='/dashboard' element={<Dashboard theme={theme} setTheme={setThemeHandle}/>}/>
      </Routes>
    </>
  )
}

export default App
