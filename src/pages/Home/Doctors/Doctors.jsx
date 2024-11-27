import { Typography } from '@mui/joy'
import { Box, Button } from '@mui/material'
import React from 'react'

const Doctors = () => {
    const doctorsArr = [
        {
            image: 'https://raw.githubusercontent.com/avinashdm/gs-images/main/prescripto/doc1.png',
            name: 'Dr. Alice Johnson',
            speciality: 'Cardiology'
        },
        {
            image: 'https://raw.githubusercontent.com/avinashdm/gs-images/main/prescripto/doc2.png',
            name: 'Dr. Bob Smith',
            speciality: 'Dermatology'
        },
        {
            image: 'https://raw.githubusercontent.com/avinashdm/gs-images/main/prescripto/doc3.png',
            name: 'Dr. Carol Davis',
            speciality: 'Pediatrics'
        },
        {
            image: 'https://raw.githubusercontent.com/avinashdm/gs-images/main/prescripto/doc4.png',
            name: 'Dr. David Brown',
            speciality: 'Orthopedics'
        },
        {
            image: 'https://raw.githubusercontent.com/avinashdm/gs-images/main/prescripto/doc5.png',
            name: 'Dr. Eva Wilson',
            speciality: 'Neurology'
        },
        {
            image: 'https://raw.githubusercontent.com/avinashdm/gs-images/main/prescripto/doc6.png',
            name: 'Dr. Frank Miller',
            speciality: 'General Practice'
        },
        {
            image: 'https://raw.githubusercontent.com/avinashdm/gs-images/main/prescripto/doc7.png',
            name: 'Dr. Grace Lee',
            speciality: 'Gynecology'
        },
        {
            image: 'https://raw.githubusercontent.com/avinashdm/gs-images/main/prescripto/doc8.png',
            name: 'Dr. Henry Martinez',
            speciality: 'Psychiatry'
        },
        {
            image: 'https://raw.githubusercontent.com/avinashdm/gs-images/main/prescripto/doc9.png',
            name: 'Dr. Isla Thompson',
            speciality: 'Ophthalmology'
        },
        {
            image: 'https://raw.githubusercontent.com/avinashdm/gs-images/main/prescripto/doc10.png',
            name: 'Dr. Jack Anderson',
            speciality: 'Radiology'
        }
    ];
    
    return (
        <Box width={'100%'}  display={'flex'} flexDirection={'column'} alignItems={'center'} marginTop={'2rem'} paddingBottom={'5rem'}>
            <Box  width={'28rem'} display={'flex'} flexDirection={'column'} alignItems={'center'} textAlign={'center'}>
                <Typography fontSize={'1.8rem'} fontWeight={'500'} mb={'0.6rem'}>Top Doctors to Book</Typography>
                <Typography fontSize={'13px'} mb={'1rem'}>Simply browse through our extensive list of trusted doctors.</Typography>
            </Box>

            <Box width={'100%'} display={'flex'} flexWrap={'wrap'} marginTop={'1rem'}>
                {/* ------each doctor------- */}
               {
                doctorsArr.map((elem, index)=>(
                    <Box key={index} width={'19%'} height={'20rem'} border={'1.5px solid #C9D8FF'} overflow={'hidden'} borderRadius={'9px'} ml={'auto'} marginBottom={'1.5rem'} sx={{transition: '0.4s',  "&:hover": {marginTop: '-0.6rem', transition: '0.4s', cursor: 'pointer', zIndex: 99}}} >
                    <Box bgcolor={'#DCFDFD'} height={'70%'} >
                        <img src={elem.image} height={'100%'} alt="" />
                    </Box>

                    <Box p={'0rem 1rem'} height={'29%'} display={'flex'} flexDirection={'column'} justifyContent={'center'}>
                    
                    <Typography sx={{color: '#22C55E'}} display={'flex'} alignItems={'center'}> <div style={{width: '10px', height: '10px', backgroundColor:'#22C55E', borderRadius: '50%', marginRight: '7px' }}></div>Available</Typography>
                    <Typography fontSize={'1.2rem'}>Dr. Richard James</Typography>
                    <Typography fontSize={'sm'}>General Physician</Typography>
                    </Box>

                </Box>
                ))
               }
                
                {/* ---------------- */}
            </Box>

            <Button variant='contained'  sx={{borderRadius: '20px', p: '0.7rem 4rem', bgcolor: '#EAEFFF', color: 'grey', marginTop: '2rem'}}>more</Button>
        </Box>
    )
}

export default Doctors