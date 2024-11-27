import './App.css'
import { Box, Button } from '@mui/material'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import AllDoctors from './pages/AllDoctors/AllDoctors'
import Auth from './pages/Auth/Auth'
import Appointments from './pages/Appointments/Appointments'
import Schedule from './pages/Schedule/Schedule'
import { useEffect } from 'react'
import {jwtDecode} from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux'
import { login, loginSuccess } from './Redux/Actions.js/authAction'
import ProtectedRoute from './ProtectedRoute'

function App() {
  // const {isAuthenticated}= useSelector((state)=> state.auth)
  // console.log(isAuthenticated)
  const dispatch= useDispatch()
  useEffect(()=>{
    const token= localStorage.getItem('pToken');
    if(token){
      const userData= jwtDecode(token);
      if(userData){
        dispatch(loginSuccess(token, userData))
      }
    }
  }, [])

  return (
    <Box width={'80%'} margin={'auto'}>
       <Navbar />

       <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/alldoctors' element={<AllDoctors />} />
        <Route path='/auth' element={<ProtectedRoute><Auth /></ProtectedRoute>} />
        <Route path='/ap' element={<Appointments />} />
        <Route path='/schedule/:id' element={<Schedule />} />


        <Route path='*' element={<h2>No Result found</h2>} />
       </Routes>
    </Box>
  )
}

export default App
