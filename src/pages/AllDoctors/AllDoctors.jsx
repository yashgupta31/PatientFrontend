import { Typography } from '@mui/joy';
import { Box, Button, useMediaQuery } from '@mui/material'
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
const [isOpenFilter, setIsOpenFilter]= useState(false);

const handleClick = (specialist) => {
    setSearchParams({ specialist });
  };

  useEffect(()=>{
    async function fetchDoctors(){

        try {
            const response= await axios.get('http://localhost:8080/doctor/get-available-doctors', 
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


  // ------screen sizes----
  const isLargerThan1450= useMediaQuery('(min-width: 1450px)');
  const isLargerThan550= useMediaQuery('(min-width: 550px)');

  return (
    <Box bgcolor={'white'} width={'100%'} display={'flex'} flexDirection={isLargerThan550?'row': 'column'} justifyContent={'space-between'}  mt={'3rem'}>
     
     {
      !isLargerThan550 &&
      <Typography bgcolor={isOpenFilter? color.primary :'white'} sx={{color: isOpenFilter? 'white': '#282828'}} onClick={()=> setIsOpenFilter(!isOpenFilter)} p={'0.4rem 1rem'} width={'10rem'} mb={'1.5rem'} textAlign={'center'} borderRadius={'4px'} border={'1px solid lightgrey'}>Filter</Typography>
     }
      
      {
        (isOpenFilter && !isLargerThan550) && (
          <Box  width={isLargerThan1450?'16%': isLargerThan550? '38%': '100%'} p={'0.4rem'}>
        {
          ['General physician', 'Gynecologist', 'Darmatologist', 'Pediatricians', 'Neurologist', 'Gastroenterologist']
          .map((elem, index)=>(
            <Button variant='contained' sx={{bgcolor: elem==selectedSpecialist && color.background, width: '100%', height: '2.3rem', mb: '1rem', fontSize: '0.8rem'}} size='xm'  key={index} onClick={() => handleClick(elem)} color={'#4B5563'} border={'1.5px solid #C9D8FF'} borderRadius={'4px'} display={'flex'} alignItems={'center'} justifyContent={'start'} pl={'1rem'}>{elem}</Button>
          ))
        }
      </Box>
        )
      }

      {
        isLargerThan550 &&
        <Box  width={isLargerThan1450?'16%': isLargerThan550? '38%': '100%'} p={'0.4rem'}>
        {
          ['General physician', 'Gynecologist', 'Darmatologist', 'Pediatricians', 'Neurologist', 'Gastroenterologist']
          .map((elem, index)=>(
            <Button variant='contained' sx={{bgcolor: elem==selectedSpecialist && color.background, width: '100%', height: '2.3rem', mb: '1rem', fontSize: '0.8rem'}} size='xm'  key={index} onClick={() => handleClick(elem)} color={'#4B5563'} border={'1.5px solid #C9D8FF'} borderRadius={'4px'} display={'flex'} alignItems={'center'} justifyContent={'start'} pl={'1rem'}>{elem}</Button>
          ))
        }
      </Box>
      }
      

      {/* --------All Doctors--------- */}
      <Box  width={isLargerThan550?'82%': '100%'} minHeight={'60vh'} display={'flex'} flexWrap={'wrap'} gap={'0.5rem'} pl={isLargerThan550 && '1rem'}  justifyContent={'flex-start'} >
                {/* ------each doctor------- */}
               {
                doctorsArr.map((elem, index)=>(
                    <NavLink to={`/schedule/${elem._id}`} className={'each-doctors'} key={index} style={{width: '14rem', height: '20rem', marginRight: 'auto', marginLeft: !isLargerThan1450 && 'auto', textDecoration: 'none', marginBottom: '1.5rem', border: '1.5px solid #C9D8FF', borderRadius: '9px', overflow: 'hidden', transition: '0.4s'}}>
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