import { Box, Button, useMediaQuery } from '@mui/material'
import React, { useState } from 'react'
import { color } from '../../utils/color'
import { Typography } from '@mui/joy'
import { CiMenuFries } from 'react-icons/ci'
import './MidNavbar.css'
import { RxCross1 } from 'react-icons/rx'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../Redux/Actions.js/authAction'
import { BiPlusMedical } from 'react-icons/bi'
import { FaHouseMedical } from 'react-icons/fa6'

const MidNavbar = () => {
  const { userData, token } = useSelector((state) => state.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLargerThan550 = useMediaQuery('(min-width: 550px)')
  return (
    <Box display={'flex'} height={isLargerThan550 ? '4.8rem' : '4.2rem'} alignItems={'center'} justifyContent={'space-between'} borderBottom={'1px solid grey'}>
      {/* <Typography fontSize={isLargerThan550?'1.8rem': '1.5rem'} fontWeight={'700'}  onClick={()=> {navigate('/'); setIsMenuOpen(false)}}>Doctor<Typography textColor={color.primary}>Now</Typography></Typography> */}
      <Box display={'flex'} alignItems={'center'} fontWeight={'700'} onClick={() => { navigate('/'); setIsMenuOpen(false) }}>
        <FaHouseMedical style={{ fontSize: isLargerThan550?'1.8rem': '1.5rem', marginRight: '0.2rem', color: '#004B4B'}}  />
        <Typography sx={{ color: color.primary }} fontSize={isLargerThan550 ? '1.8rem' : '1.5rem'} fontWeight={600}>Docmate</Typography>
      </Box>
      <CiMenuFries style={{ fontSize: '1.6rem' }} onClick={() => setIsMenuOpen(true)} />

      {/* ----menu bar----- */}
      {/* ${isMenuOpen? 'open': ''} */}
      <Box className={`menu ${isMenuOpen ? 'open' : ''}`} >
        <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} p={'1.2rem'} mb={'1rem'}>
          {/* <Typography fontSize={isLargerThan550 ? '1.8rem' : '1.5rem'} fontWeight={'700'} onClick={() => { navigate('/'); setIsMenuOpen(false) }}>Doctor<Typography textColor={color.primary}>Now</Typography></Typography> */}
          <Box display={'flex'} alignItems={'center'} fontWeight={'700'} onClick={() => { navigate('/'); setIsMenuOpen(false) }}>
        <FaHouseMedical style={{ fontSize: isLargerThan550?'1.8rem': '1.5rem', marginRight: '0.2rem', color: '#004B4B'}}  />
        <Typography sx={{ color: color.primary }} fontSize={isLargerThan550 ? '1.8rem' : '1.5rem'} fontWeight={600}>Docmate</Typography>
      </Box> 
          <RxCross1 style={{ fontSize: '1.4rem' }} onClick={() => setIsMenuOpen(false)} />
        </Box>
        <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
        <Button sx={{ fontSize: '1.1rem' }} onClick={() => { navigate('/'); setIsMenuOpen(false) }}>Home</Button>
        <Button sx={{ fontSize: '1.1rem' }} onClick={() => { navigate('/profile'); setIsMenuOpen(false) }}>My Profile</Button>
        <Button sx={{ fontSize: '1.1rem' }} onClick={() => { navigate('/alldoctors'); setIsMenuOpen(false) }}>All Doctors</Button>
        <Button sx={{ fontSize: '1.1rem' }} onClick={() => { navigate('/about'); setIsMenuOpen(false) }}>About</Button>
        <Button sx={{ fontSize: '1.1rem' }} onClick={() => { navigate('/contact'); setIsMenuOpen(false) }}>Contact us</Button>
        <Button sx={{ fontSize: '1.1rem' }} onClick={() => { navigate('/my-appointments'); setIsMenuOpen(false) }}>All Appointments</Button>
        <Button href="https://docmate-admin-frontend.vercel.app" target="_blank"  sx={{ fontSize: '1.1rem' }}>Admin Pannel</Button>
        {/* <Typography component={'a'} href='https://docmate-admin-frontend.vercel.app' sx={{ fontSize: '1.1rem', textDecoration: 'none' }} target="_blank" onClick={() => { setIsMenuOpen(false) }}><Button>Admin Panel </Button></Typography> */}
        {
          (userData && token)? 
          <Button sx={{ fontSize: '1.1rem' }} onClick={() => { dispatch(logout()); setIsMenuOpen(false) }}>Logout</Button>:
          <Button sx={{ fontSize: '1.1rem' }} onClick={()=> {navigate('/auth'); setIsMenuOpen(false)}}>Login</Button>
        }
        </Box>
        
        
      </Box>

    </Box>
  )
}

export default MidNavbar