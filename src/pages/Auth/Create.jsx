import { Typography } from '@mui/joy'
import { Box, Button, FormLabel, Input, TextField, useMediaQuery } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { color } from '../../utils/color'
import axios from 'axios'
const BACKEND_URL= import.meta.env.VITE_BACKEND_URL;

const Create = ({setIsLoginOpen}) => {
  const [name, setName]= useState('');
  const [email, setEmail]= useState('');
  const [password, setPassword]= useState('')

  const handleSubmit= async(e)=>{
    e.preventDefault();
    
    try {
      const response= await axios.post(`${BACKEND_URL}/user/register`, {name, email, password, role: 'patient'});
    console.log(response)
    alert(response.data.message)
    } catch (error) {
      // alert(error.response.data.message)
      if (error.response) {
        // If the server responded with a status code
        console.error(error.response.data.message); // Log the error message
        alert(error.response.data.message); // Show the error message to the user
      } else {
        // For network or unexpected errors
        console.error(error.message);
        alert('An unexpected error occurred. Please try again.');
      }
    }
  }

  // -----------screen sizes---------
  const isLargerThan400= useMediaQuery('(min-width: 400px)');

  return (
    <Box component={'form'} onSubmit={handleSubmit} width={'22rem'} height={isLargerThan400? '25rem': '24rem'} p={'1.5rem'} borderRadius={'9px'} display={'flex'} flexDirection={'column'} justifyContent={'space-between'} alignItems={'start'}  boxShadow={'rgba(0, 0, 0, 0.1) 0px 4px 12px'} border={`1px solid ${color.border}`}>
        <Typography fontSize={isLargerThan400?'1.6rem': '1.3rem'} fontWeight={600}>Create Account</Typography>
        <Typography fontSize={isLargerThan400?'1rem': '0.9rem'}>Please sign up to book appointment</Typography>

        <TextField id="standard-basic" size={isLargerThan400? 'large': 'small'} onChange={(e)=> setName(e.target.value)}  type='text' sx={{width: '100%'}} label="Full Name" variant="standard" required />
        <TextField id="standard-basic" size={isLargerThan400? 'large': 'small'} onChange={(e)=> setEmail(e.target.value)} type='email' sx={{width: '100%'}} label="Email" variant="standard" required />
        <TextField id="standard-basic" size={isLargerThan400? 'large': 'small'} onChange={(e)=> setPassword(e.target.value)} type='password' sx={{width: '100%'}} label="Password" variant="standard" required />
        <Button variant='contained' type='submit' sx={{width: '100%', bgcolor: color.primary, p: '0.5rem 0rem', fontSize: isLargerThan400? '0.9rem': '0.7rem' }}>Create Account</Button>

        <Typography>Already have an account? <span style={{color: color.primary, borderBottom: `1px solid ${color.primary}`, cursor: 'pointer'}} onClick={()=> setIsLoginOpen(true)}>Login here</span></Typography>

    </Box>
  ) 
}

export default Create