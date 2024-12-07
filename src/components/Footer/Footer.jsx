import { Box, Typography, useMediaQuery } from '@mui/material'
import React from 'react'

const Footer = () => {

    const isLargerThan700= useMediaQuery('(min-width: 700px)')
    return (
        <Box pb={'1rem'} mt={'2rem'} display={'flex'} flexDirection={'column'} alignItems={'center'} >
            <Box width={'100%'} display={'flex'} flexDirection={isLargerThan700?'row': 'column'} justifyContent={'space-between'} pb={'2rem'} borderBottom={'1px solid lightgrey'}>
            <Box width={isLargerThan700?'30%': '90%'} pb={!isLargerThan700 && '1rem'}>
                <Typography variant={'h5'}>DoctorNow</Typography>
                <Typography fontSize={'14px'}  color={'#4B5563'} lineHeight={'1.5rem'}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Typography>
            </Box>

            <Box width={isLargerThan700?'25%': '90%'}  pb={!isLargerThan700 && '1rem'}>
                <Typography fontSize={isLargerThan700? '1.3rem': '1rem'} mb={'0.4rem'}>COMPANY</Typography>
                <Typography fontSize={'14px'} color={'#4B5563'} mb={'0.3rem'}>Home</Typography>
                <Typography fontSize={'14px'}  color={'#4B5563'} mb={'0.3rem'}>About us</Typography>
                <Typography fontSize={'14px'}  color={'#4B5563'} mb={'0.3rem'}>Delivery</Typography>
                <Typography fontSize={'14px'} color={'#4B5563'} mb={'0.3rem'}>Privacy Policy</Typography>
            </Box>

            <Box width={isLargerThan700?'20%': '90%'} >
            <Typography fontSize={isLargerThan700? '1.3rem': '1rem'} mb={'0.4rem'}>GET IN TOUCH</Typography>
                <Typography fontSize={'14px'} color={'#4B5563'} mb={'0.3rem'}>+0-000-000-000</Typography>
                <Typography fontSize={'14px'} color={'#4B5563'} mb={'0.3rem'}>doctorsnow@gmail.com</Typography>
            </Box>
            </Box>

            <Typography fontSize={'14px'} pt={'1rem'} color={'4B5563'}>Copyright {new Date().getFullYear()} @ Developer Yash Gupta - All Right Reserved.</Typography>
        </Box>
    )
}

export default Footer