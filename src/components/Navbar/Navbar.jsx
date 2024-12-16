import { Box, Button } from '@mui/material'
import React, { useState } from 'react'
import Typography from '@mui/joy/Typography';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { color } from '../../utils/color';
import { useDispatch, useSelector } from 'react-redux';
import { FaChevronDown } from 'react-icons/fa';
import './Navbar.css'
import { logout } from '../../Redux/Actions.js/authAction';
const BACKEND_URL= import.meta.env.VITE_BACKEND_URL;

const Navbar = () => {
  const { userData, token } = useSelector((state) => state.auth);
  console.log(userData)
  const dispatch= useDispatch();
  const location = useLocation()
  const navigate= useNavigate()
  // const [currentPath, setCurrentPath]= useState('home'|| location.pathname.split('/').pop())
  const path = location.pathname.split('/').pop() || 'home';
  console.log(location.pathname.split('/').pop())



  return (
    <Box display={'flex'} height={'4.8rem'} alignItems={'center'} justifyContent={'space-between'} borderBottom={'1px solid grey'}>
      <Typography level="h2" sx={{cursor: 'pointer'}}  onClick={()=> navigate('/')}>Doctor<Typography textColor={color.primary}>Now</Typography></Typography>
      <Box color={'#282828'} width={'28rem'} display={'flex'} alignItems={'center'} fontFamily={'san serif'} fontSize={'0.9rem'} justifyContent={'space-evenly'}>
        <NavLink to={'/'} style={{ color: '#282828', textDecoration: 'none', paddingBottom: '0.3rem', borderBottom: path == 'home' && `2px solid ${color.primary}` }}>HOME</NavLink>
        <NavLink to={'/alldoctors'} style={{ color: '#282828', textDecoration: 'none', paddingBottom: '0.3rem', borderBottom: path == 'alldoctors' && `2px solid ${color.primary}` }}>ALL DOCTORS</NavLink>
        <NavLink to={'/about'} style={{ color: '#282828', textDecoration: 'none', paddingBottom: '0.3rem', borderBottom: path == 'about' && `2px solid ${color.primary}` }}>ABOUT</NavLink>
        <NavLink to={'/contact'} style={{ color: '#282828', textDecoration: 'none', paddingBottom: '0.3rem', borderBottom: path == 'contact' && `2px solid ${color.primary}` }}>CONTACT</NavLink>
        <Typography border={'1px solid lightgrey'} p={'0.2rem 0.8rem'} borderRadius={'13px'} fontSize={'xs'} fontWeight={'500'}>Admin Panel</Typography>
      </Box>
      {/* <NavLink to={'/auth'}>
        <Button variant='contained' sx={{borderRadius: '22px', fontSize: '0.7rem', padding: '0.8rem 1.8rem', bgcolor: color.primary}}>Create Account</Button>
        </NavLink> */}
      {
        (userData && token)?
        <Box className="profile" pb={'1.2rem'} pt={'1.2rem'} display={'flex'} alignItems={'center'} position={'relative'}   >
          <Box width={'2.5rem'} height={'2.5rem'} borderRadius={'50%'} overflow={'hidden'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
            <img style={{height: '100%'}} src={userData.image? `${userData.image}` :"https://www.pngmart.com/files/23/Profile-PNG-Photo.png"} alt="" />
          </Box> 
          <FaChevronDown style={{marginLeft: '0.5rem'}} />
          <Box  className="profile-dropdown" boxShadow={'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'}>
            <Button onClick={()=> navigate('/profile')} sx={{width: '100%', p: '0.5rem 0rem', fontSize: '0.9rem'}}>Profile</Button>
            <Button sx={{width: '100%', p: '0.5rem 0rem', fontSize: '0.9rem'}} onClick={()=> navigate('/my-appointments')}>My Appointments</Button>
            <Button sx={{width: '100%', color: 'tomato', p: '0.5rem 0rem', mb: '0.4rem', fontSize: '0.9rem'}} onClick={()=> dispatch(logout())}>Logout</Button>
          </Box>
        </Box>
        :
        (<NavLink to={'/auth'}>
        <Button variant='contained' sx={{borderRadius: '22px', fontSize: '0.7rem', padding: '0.8rem 1.8rem', bgcolor: color.primary}}>Create Account</Button>
        </NavLink>)
      }


    </Box>
  )
}

export default Navbar