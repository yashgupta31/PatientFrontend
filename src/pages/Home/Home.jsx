import { Box } from '@mui/material'
import React from 'react'
import Speciality from './Speciality/Speciality'
import Doctors from './Doctors/Doctors'
import Hero from './Hero/Hero'

const Home = () => {
  return (
    <Box bgcolor={'lightpink'}>
      <Hero />
      <Speciality />
      <Doctors />
    </Box>
  )
}

export default Home