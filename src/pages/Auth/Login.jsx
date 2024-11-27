import { Typography } from '@mui/joy'
import { Box, Button, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { color } from '../../utils/color'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../Redux/Actions.js/authAction'
const BACKEND_URL= import.meta.env.VITE_BACKEND_URL;


const Login = ({setIsLoginOpen}) => {
  const [email, setEmail]= useState('');
  const [password, setPassword]= useState('');
  const dispatch= useDispatch()
  const {loading}= useSelector((state)=> state.auth)
  // console.log(token)

  const handleSubmit= async(e)=>{
    e.preventDefault();
    dispatch(login(email, password));
    setEmail('');
    setPassword('');
  }

  return (
    <Box component={'form'} onSubmit={handleSubmit} width={'30%'} height={'22rem'} p={'1.5rem'} borderRadius={'9px'} display={'flex'} flexDirection={'column'} justifyContent={'space-between'} alignItems={'start'} boxShadow={'rgba(0, 0, 0, 0.1) 0px 4px 12px'}  border={`1px solid ${color.border}`}>
        <Typography fontSize={'1.6rem'} fontWeight={600}>Login</Typography>
        <Typography>Please log in to book appointment</Typography>

        <TextField id="standard-basic" type='email' value={email} onChange={(e)=> setEmail(e.target.value)} sx={{width: '100%'}} label="Email" variant="standard" required/>
        <TextField id="standard-basic" type='password' value={password} onChange={(e)=> setPassword(e.target.value)} sx={{width: '100%'}} label="Password" variant="standard" required/>
        <Button variant='contained' type='submit' sx={{width: '100%', bgcolor: color.primary, p: '0.5rem 0rem' }}>{loading? 'loading..': 'Login'}</Button>

        <Typography>Create an new account?  <span style={{color: color.primary, borderBottom: `1px solid ${color.primary}`, cursor: 'pointer'}} onClick={()=> setIsLoginOpen(false)}>Click here</span></Typography>

    </Box>
  )
}

export default Login