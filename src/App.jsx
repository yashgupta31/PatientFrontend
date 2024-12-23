import './App.css'
import { Box, Button, useMediaQuery } from '@mui/material'
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
import MidNavbar from './components/Navbar/MidNavbar'
import Footer from './components/Footer/Footer'
import Profile from './pages/Profile/Profile'
import About from './pages/About/About'
import Contact from './pages/Contact/Contact'

function App() {
  // const {isAuthenticated}= useSelector((state)=> state.auth)
  // console.log(isAuthenticated)
  const dispatch= useDispatch()
  useEffect(() => {
    const token = localStorage.getItem('pToken');
    const storedUserData = localStorage.getItem('userDetail'); // Retrieve persisted user data

    if (token) {
        const userData = storedUserData ? JSON.parse(storedUserData) : jwtDecode(token);
        dispatch(loginSuccess(token, userData)); // Initialize Redux state
    }
}, []);

  // useEffect(()=>{
  //   const token= localStorage.getItem('pToken');
  //   if(token){
  //     const userData= jwtDecode(token);
  //     if(userData){
  //       dispatch(loginSuccess(token, userData))
  //     }
  //   }
  // }, [])

  // -------screen sizes------------

  const isLargerThan850=useMediaQuery('(min-width: 850px)')

  return (
    <Box width={isLargerThan850?'80%': '95%'} margin={'auto'} >
     
      {
        isLargerThan850? <Navbar />: <MidNavbar />
      }
       

       <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/alldoctors' element={<AllDoctors />} />
        <Route path='/auth' element={<ProtectedRoute><Auth /></ProtectedRoute>} />
        <Route path='/my-appointments' element={<Appointments />} />
        <Route path='/schedule/:id' element={<Schedule />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='*' element={<h2>No Result found</h2>} />
       </Routes>
       <Footer />
    </Box>
  )
}

export default App
