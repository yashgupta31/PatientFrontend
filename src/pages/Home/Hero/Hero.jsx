import { Typography } from '@mui/joy'
import { Avatar, AvatarGroup, Box, Button, Icon, useMediaQuery } from '@mui/material'
import React from 'react'
import { BsArrowRight } from 'react-icons/bs'
import { color } from '../../../utils/color'
import { useNavigate } from 'react-router-dom'

const Hero = () => {
    const navigate= useNavigate()
    const isLargerThan1100= useMediaQuery('(min-width: 1100px)');
    const isLargerThan800= useMediaQuery('(min-width: 800px)');
    const isLargerThan900= useMediaQuery('(min-width: 900px)');
    const isLargerThan500= useMediaQuery('(min-width: 500px)');
    const isLargerThan375= useMediaQuery('(min-width: 375px)');
    return (
        <Box height={isLargerThan900? '32rem': 'auto'} borderRadius={'15px'} bgcolor={color.primary} position={'relative'} display={'flex'} flexDirection={isLargerThan900?'row': 'column'} justifyContent={'space-evenly'} alignItems={isLargerThan900?'end':'center'} mt={'1.3rem'} >
            <Box width={isLargerThan900?'45%': '90%'} height={'auto'} mt={'1rem'} mb={isLargerThan900?'6rem': '1rem'} display={'flex'} flexDirection={'column'} ml={isLargerThan900?'4rem': '0rem'} justifyContent={'space-evenly'} alignItems={isLargerThan900?'start': 'center'}>
                <Typography mb={'1rem'} fontSize={isLargerThan1100?'2.7rem': isLargerThan500?'2rem': '1.5rem'} textAlign={isLargerThan900?'start': 'center'} fontWeight={650} lineHeight={isLargerThan1100?'3.3rem': isLargerThan500?'2.9rem': '2.5rem'} sx={{color: 'white'}}>Book Appointment <br />
                    With Trusted Doctors</Typography>

                <Box mb={'1rem'} display={'flex'} flexDirection={isLargerThan900?'row': 'column'} justifyContent={'space-between'}  alignItems={'center'}>
                    <AvatarGroup total={3}>
                        <Avatar alt="Remy Sharp" src="https://tse3.mm.bing.net/th?id=OIP.2i5UaEHaQM3PYAYXQyM1AAAAAA&pid=Api&P=0&h=220" />
                        <Avatar src="https://img.freepik.com/premium-photo/happy-man-ai-generated-portrait-user-profile_1119669-1.jpg" />
                        <Avatar alt="Agnes Walker" src="https://as2.ftcdn.net/v2/jpg/02/19/70/25/1000_F_219702545_nb5bzV8qvnaWS0TSZ5avxf57c2sOGjIt.jpg" />
                        <Avatar alt="Trevor Henderson" src="https://img.freepik.com/premium-photo/girl-happy-portrait-user-profile-by-ai_1119669-10.jpg" />
                    </AvatarGroup>
                    <Typography fontSize={'sm'} marginLeft={'1rem'} mt={!isLargerThan900 && '1rem'} textAlign={isLargerThan900? 'start':'center'} sx={{color: 'white'}}>
                    Simply browse through our extensive list of trusted doctors,
                    schedule your appointment hassle-free.
                    </Typography>
                </Box>

                <Button variant='contained' onClick={()=> navigate('/alldoctors')}  sx={{borderRadius: '22px', height: isLargerThan500?'2.8rem': '2.4rem', width: isLargerThan500?'14rem': '12rem', fontSize: '0.7rem', color: '#282828', bgcolor: 'white'}}>Book appointment <BsArrowRight /></Button>
           
            </Box>

            {/* ----------image------------ */}
            <img style={{ width: isLargerThan900 ? '43%': '55%'}} src="https://prescripto.vercel.app/assets/header_img-DhAi3lLA.png" alt="" />
        </Box>
    )
}

export default Hero