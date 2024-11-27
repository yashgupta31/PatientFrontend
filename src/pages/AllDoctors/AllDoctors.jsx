import { Typography } from '@mui/joy';
import { Box, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { NavLink, useSearchParams } from 'react-router-dom';
import { color } from '../../utils/color';
import axios from 'axios';
import './AllDoctors.css'
const BACKEND_URL= import.meta.env.VITE_BACKEND_URL;

const AllDoctors = () => {

const [doctorsArr, setDoctorsArr]= useState([])
const [searchParams, setSearchParams]= useSearchParams();
const selectedSpecialist= searchParams.get('specialist') || 'all';

const handleClick = (specialist) => {
    setSearchParams({ specialist });
  };

  useEffect(()=>{
    async function fetchDoctors(){

        try {
            const response= await axios.get('http://localhost:8080/doctor/getdoctors', 
                {
                    params: { specialist: selectedSpecialist },
                }
            ) 
            setDoctorsArr(response.data.data)

        } catch (error) {
            console.log(error)
        }
    }

    fetchDoctors()
  },[selectedSpecialist])



  return (
    <Box bgcolor={'white'} width={'100%'} display={'flex'} justifyContent={'space-between'} mt={'3rem'}>
      <Box  width={'16%'}>
        {
          ['General physician', 'Gynecologist', 'Darmatologist', 'Pediatricians', 'Neurologist', 'Gastroenterologist']
          .map((elem, index)=>(
            <Button variant='contained' sx={{bgcolor: elem==selectedSpecialist && color.background, width: '100%', height: '2.3rem', mb: '1rem', fontSize: '0.8rem'}} size='xm'  key={index} onClick={() => handleClick(elem)} color={'#4B5563'} border={'1.5px solid #C9D8FF'} borderRadius={'4px'} display={'flex'} alignItems={'center'} justifyContent={'start'} pl={'1rem'}>{elem}</Button>
          ))
        }
      </Box>

      {/* --------All Doctors--------- */}
      <Box  width={'82%'} display={'flex'} flexWrap={'wrap'} justifyContent={'flex-start'} >
                {/* ------each doctor------- */}
               {
                doctorsArr.map((elem, index)=>(
                    <NavLink to={`/schedule/${elem._id}`} className={'each-doctors'} key={index} style={{width: '23%', height: '20rem', marginRight: 'auto', textDecoration: 'none', marginBottom: '1.5rem', border: '1.5px solid #C9D8FF', borderRadius: '9px', overflow: 'hidden', transition: '0.4s'}}>
                    <Box width={'100%'} height={'100%'} >
                    <Box bgcolor={'#DCFDFD'} height={'70%'} >
                        <img src={`${BACKEND_URL}${elem.image}`} height={'100%'} alt="" />
                    </Box>

                    <Box p={'0rem 1rem'} height={'29%'} display={'flex'} flexDirection={'column'} justifyContent={'center'}>
                    
                    <Typography sx={{color: elem.isAvailable?'#22C55E': 'red'}} display={'flex'} alignItems={'center'}> 
                        <div style={{width: '10px', height: '10px', backgroundColor: elem.isAvailable?'#22C55E': 'red', borderRadius: '50%', marginRight: '7px' }}></div>{elem.isAvailable?'Available': 'Unavailable'}</Typography>
                    <Typography fontSize={'1.2rem'}>{elem.name}</Typography>
                    <Typography fontSize={'sm'}>{elem.speciality}</Typography>
                    </Box>

                </Box>
                </NavLink>
                ))
               }
                
                {/* ---------------- */}
            </Box>
    </Box>
  )
}

export default AllDoctors 