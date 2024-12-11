import { Box, Button, Typography, useMediaQuery } from '@mui/material'
import React from 'react'

const Contact = () => {

    const isLargerThan1000= useMediaQuery('(min-width: 1000px)');
    const isLargerThan400= useMediaQuery('(min-width: 400px)');
    return (
        <Box display={'flex'} flexDirection={'column'} alignItems={'center'} pb={isLargerThan1000 && '4rem'}>
                  <Typography fontSize={isLargerThan400?'1.4rem': '1.2rem'} mt={isLargerThan400?'2rem': '0.7rem'} mb={isLargerThan400?'2rem': '0.7rem'} fontWeight={500} color='grey' >WHY <span style={{color: '#383838', fontWeight: 600}}>CHOOSE US</span></Typography>
            <Box display={'flex'} flexDirection={isLargerThan1000?'row': 'column'} alignItems={!isLargerThan1000 && 'center'} width={isLargerThan1000?'50rem': '100%'} height={isLargerThan1000?'23rem': 'auto'}>
                <Box width={isLargerThan400?'50%': '95%'}  overflow={'hidden'}>
                    <img src="https://prescripto.vercel.app/assets/contact_image-IJu_19v_.png" width={'100%'} alt="" />
                </Box>

                <Box p={isLargerThan400?'2rem': '1rem'} display={'flex'} flexDirection={'column'} justifyContent={'space-between'} alignItems={'start'}>
                    <Typography fontSize={isLargerThan400?'1rem': '0.8rem'} fontWeight={600}>OUR OFFICE</Typography>
                    <Typography fontSize={isLargerThan400?'1rem': '0.8rem'}>00000 Willms Station
                        Suite 000, Washington, USA</Typography>
                    <Typography fontSize={isLargerThan400?'1rem': '0.9rem'}>Tel: (000) 000-0000
                        Email: greatstackdev@gmail.com</Typography>

                    <Typography fontSize={isLargerThan400?'1rem': '0.9rem'} fontWeight={600}>CAREERS AT PRESCRIPTO</Typography>

                    <Typography fontSize={isLargerThan400?'1rem': '0.9rem'} mb={'1rem'}>Learn more about our teams and job openings.</Typography>
                    <Button variant='outlined' color='black' >Explore jobs</Button>
                </Box>
            </Box>
        </Box>
    )
}

export default Contact