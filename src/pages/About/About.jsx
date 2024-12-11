import { Box, Typography, useMediaQuery } from '@mui/material';
import React from 'react'
import { color } from '../../utils/color';

const About = () => {
  const data= [
    {
      name: 'EFFICIENCY:',
      para: 'Streamlined appointment scheduling that fits into your busy lifestyle.'
    },
    {
      name: 'CONVENIENCE:',
      para: 'Access to a network of trusted healthcare professionals in your area.'
    },
    {
      name: 'PERSONALIZATION:',
      para: 'Tailored recommendations and reminders to help you stay on top of your health.'
    }
  ]

  // ---screen-----
  const isLargerThan1200= useMediaQuery('(min-width: 1200px)');
  const isLargerThan1000= useMediaQuery('(min-width: 1000px)');
  const isLargerThan800= useMediaQuery('(min-width: 800px)');
  const isLargerThan750= useMediaQuery('(min-width: 750px)');
  const isLargerThan500= useMediaQuery('(min-width: 500px)');
  return (
    <Box display={'flex'} flexDirection={'column'} pt={isLargerThan500?'3rem': '1rem'}>
      <Typography m={'auto'} fontSize={isLargerThan500?'1.4rem': '1.2rem'} color='grey'>ABOUT <span style={{color: '#383838', fontWeight: 600}}>US</span></Typography>
      <Box height={isLargerThan750?'23rem': 'auto'} display={'flex'} flexDirection={isLargerThan750?'row': 'column'} alignItems={'center'} mt={isLargerThan750?'2rem': '0.5rem'} mb={'2.8rem'}>
        <Box height={isLargerThan750?'100%': '15rem'} width={isLargerThan750? '23rem': '15rem'} overflow={'hidden'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
          <img style={{height: '100%'}} src="https://prescripto.vercel.app/assets/about_image-MG9zrc7b.png" alt="" />
        </Box>
        <Box width={isLargerThan750?'61%': '100%'} display={'flex'} flexDirection={'column'} justifyContent={'space-around'} p={isLargerThan1200?'3rem': isLargerThan1000?'1rem': '0.3rem 1rem'}>
          <Typography  fontSize={isLargerThan500?'14px': '13px'} color='#585858' pb={'0.4rem'} pt={!isLargerThan750 && '1rem'}>
          Welcome to Prescripto, your trusted partner in managing your healthcare needs conveniently and efficiently. At Prescripto, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.
          </Typography>

          <Typography   fontSize={isLargerThan500?'14px': '13px'} color='#585858' pb={'0.4rem'}>
          Prescripto is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, Prescripto is here to support you every step of the way.
          </Typography>

          <Typography  fontSize={isLargerThan500?'14px': '13px'} fontWeight={600} pb={'0.4rem'}>Our Vision</Typography>

          <Typography  fontSize={isLargerThan500?'14px': '13px'} color='#585858'>
          Our vision at Prescripto is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.
          </Typography>
        </Box>
      </Box>

      <Typography fontSize={isLargerThan500?'1.4rem': '1.2rem'} fontWeight={500} color='grey' >WHY <span style={{color: '#383838', fontWeight: 600}}>CHOOSE US</span></Typography>
      <Box display={'flex'} flexWrap={'wrap'} height={isLargerThan750?'13rem': 'auto'} width={'100%'} mt={'1rem'} mb={isLargerThan750?'6rem': '0rem'}>
        {
          data.map((elem, index)=>(
            <Box key={index} width={isLargerThan800 ?'33%': '100%'} border={`0.1px solid ${color.border}`} p={isLargerThan800?'4rem': isLargerThan500?'2rem': '1rem'} display={'flex'} flexDirection={'column'} justifyContent={'center'} sx={{'&:hover': {bgcolor: color.primary, cursor: 'pointer', transition: '0.4s'}}}>
              <Typography fontSize={isLargerThan500?'1rem': '0.9rem'} mb={isLargerThan500?'0.8rem': '0.3rem'} fontWeight={600} color='#484848'>{elem.name}</Typography>
              <Typography fontSize={isLargerThan500?'15px': '14px'} color='#484848'>{elem.para}</Typography>
            </Box>
          ))
        }
      </Box>
    </Box>
  )
}

export default About;