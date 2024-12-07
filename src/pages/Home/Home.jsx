import { Box } from '@mui/material'
import React from 'react'
import Speciality from './Speciality/Speciality'
import Doctors from './Doctors/Doctors'
import Hero from './Hero/Hero'
import Hero2 from './Hero2/Hero2'

const Home = () => {
  return (
    <Box bgcolor={'lightpink'} >
      <Hero />
      <Speciality />
      <Doctors />
      <Hero2 />
    </Box>
  )
}

export default Home