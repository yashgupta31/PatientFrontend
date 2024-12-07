import { Box, Button, Typography, useMediaQuery } from '@mui/material'
import React from 'react'
import { color } from '../../../utils/color'

const Hero2 = () => {

    const isLargerThan700= useMediaQuery('(min-width: 700px)');
    const isLargerThan600= useMediaQuery('(min-width: 600px)');
    const isLargerThan400= useMediaQuery('(min-width: 400px)');
  return (
    <Box bgcolor={color.primary} height={isLargerThan700?'23.6rem': 'auto'} mb={isLargerThan700?'9rem': '5rem'} pt={'1rem'} display={'flex'} flexDirection={isLargerThan700?'row': 'column'} alignItems={isLargerThan700?'end': 'center'} justifyContent={'center'} borderRadius={'10px'}>
        <Box width={isLargerThan700?'50%': '95%'} textAlign={isLargerThan700?'start': 'center'} m={isLargerThan700 && 'auto'}  ml={isLargerThan700 && '2rem'}>
            <Typography  fontSize={isLargerThan700?'3rem': isLargerThan600?'2.8rem': isLargerThan400?'2.1rem': '1.6rem'} lineHeight={isLargerThan600?'3.8rem': isLargerThan400?'3rem': '2.4rem'} mb={'0.6rem'} color='white'>Book Appointment <br />With 100+ Trusted Doctors</Typography>
            <Button variant='contained' sx={{bgcolor: 'white', color: '#282828', borderRadius: '22px', p: isLargerThan600?'0.7rem 1.8rem': '0.6rem 1.8rem', fontSize: isLargerThan600?'0.8rem': '0.7rem'}}>Create Account</Button>
        </Box>
    {
        isLargerThan700? 
        <img style={{height: '110%', marginRight: '1rem'}} src="https://prescripto.vercel.app/assets/appointment_img-DzbZlMsi.png" alt="" />
        : <img style={{height: '17rem', marginRight: '1rem'}} src="https://static.vecteezy.com/system/resources/previews/010/837/589/original/cute-nurse-pointing-up-png.png" alt="" />

    }
    </Box>
  )
}

export default Hero2