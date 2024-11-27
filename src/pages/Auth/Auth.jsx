import { Box } from '@mui/material'
import React, { useState } from 'react'
import Create from './Create'
import Login from './Login'

const Auth = () => {
    const [isLoginOpen, setIsLoginOpen]= useState(false)
  return (
    <Box  height={'85vh'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
        {
            isLoginOpen? <Login setIsLoginOpen={setIsLoginOpen} /> : <Create setIsLoginOpen={setIsLoginOpen} />
        }
        
    </Box>
  )
}

export default Auth