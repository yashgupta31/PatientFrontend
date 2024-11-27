import { Typography } from '@mui/joy'
import { Avatar, AvatarGroup, Box, Button, Icon } from '@mui/material'
import React from 'react'
import { BsArrowRight } from 'react-icons/bs'
import { color } from '../../../utils/color'

const Hero = () => {
    return (
        <Box height={'71vh'} borderRadius={'15px'} bgcolor={color.primary} position={'relative'} display={'flex'} justifyContent={'start'} alignItems={'center'} mt={'1.3rem'} >
            <Box  width={'32rem'} height={'16rem'} display={'flex'} flexDirection={'column'} ml={'4rem'} justifyContent={'space-evenly'}>
                <Typography fontSize={'2.7rem'} fontWeight={650} lineHeight={'3.3rem'} sx={{color: 'white'}}>Book Appointment <br />
                    With Trusted Doctors</Typography>

                <Box display={'flex'} justifyContent={'space-between'}  >
                    <AvatarGroup total={3} >
                        <Avatar alt="Remy Sharp" src="https://tse3.mm.bing.net/th?id=OIP.2i5UaEHaQM3PYAYXQyM1AAAAAA&pid=Api&P=0&h=220" />
                        <Avatar src="https://img.freepik.com/premium-photo/happy-man-ai-generated-portrait-user-profile_1119669-1.jpg" />
                        <Avatar alt="Agnes Walker" src="https://as2.ftcdn.net/v2/jpg/02/19/70/25/1000_F_219702545_nb5bzV8qvnaWS0TSZ5avxf57c2sOGjIt.jpg" />
                        <Avatar alt="Trevor Henderson" src="https://img.freepik.com/premium-photo/girl-happy-portrait-user-profile-by-ai_1119669-10.jpg" />
                    </AvatarGroup>
                    <Typography fontSize={'sm'} marginLeft={'1rem'} sx={{color: 'white'}}>
                    Simply browse through our extensive list of trusted doctors,
                    schedule your appointment hassle-free.
                    </Typography>
                </Box>

                <Button variant='contained'  sx={{borderRadius: '22px', height: '2.8rem', width: '14rem', fontSize: '0.7rem', color: '#282828', bgcolor: 'white'}}>Book appointment <BsArrowRight /></Button>
           
            </Box>

            {/* ----------image------------ */}
            <img style={{position: 'absolute', bottom: '0', right: '5rem', height: '27rem'}} src="https://prescripto.vercel.app/assets/header_img-DhAi3lLA.png" alt="" />
        </Box>
    )
}

export default Hero