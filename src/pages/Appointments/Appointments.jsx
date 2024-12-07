import { Typography } from '@mui/joy'
import { Box, useMediaQuery } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { color } from '../../utils/color'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { getMyAppointments } from '../../Redux/Actions.js/appointmentAction'
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Appointments = () => {
    const dispatch= useDispatch()
    const { isAuthenticated } = useSelector((state) => state.auth)
    const {myAppointments}= useSelector((state)=> state.appointments)
    // const [myAppointments, setMyAppointments] = useState([])
    // console.log(myAppointments)

    useEffect(() => {
        dispatch(getMyAppointments())
    }, [dispatch]);

    const isLargerThan500= useMediaQuery('(min-width: 500px)');
    const isLargerThan350= useMediaQuery('(min-width: 350px)');

    return (
        <Box mt={'2rem'}>
            <Typography fontSize={'1.1rem'} fontWeight={550} mb={'1rem'} >My appointments</Typography>
            <Box display={'flex'} flexDirection={'column'} >
                {/* -----each appointment------ */}
                {(myAppointments.length>0 && isAuthenticated ) &&
                    myAppointments.map((elem, index) => (
                        <Box key={index} height={isLargerThan500?'12rem': 'auto'} p={'0.9rem 0.3rem'} display={'flex'} flexDirection={isLargerThan500?'row': 'column'} alignItems={'center'} borderTop={`1px solid lightgrey`}>
                            <Box bgcolor={color.background} height={isLargerThan500? '100%': '10rem'} width={'10rem'} display={'flex'} justifyContent={'center'}>
                                <img style={{ height: '100%' }} src={`${BACKEND_URL}${elem.doctorId.image}`} alt="" />
                            </Box>

                            <Box height={'100%'} width={isLargerThan500? '17rem': '95%'} ml={isLargerThan500?'1.3rem': '0rem'} textAlign={isLargerThan500?'start':'center'}>
                                <Typography fontSize={isLargerThan350?'1.1rem': '1rem'} fontWeight={500}>{elem.doctorId.name}</Typography>
                                <Typography fontSize={isLargerThan350?'sm': '14px'}>{elem.doctorId.speciality}</Typography>
                                <Typography fontWeight={500} fontSize={isLargerThan350?'sm': '14px'} mt={'0.2rem'}>Address:</Typography>
                                <Typography fontSize={isLargerThan350?'sm': '14px'}>{elem.doctorId.address}</Typography>
                                <Typography fontSize={isLargerThan350?'sm': '14px'} mt={'0.4rem'}><Typography fontWeight={500}>Date & Time: </Typography>{elem.date} | {elem.time}</Typography>
                            </Box>

                            <Typography  bgcolor={elem.status== 'Pending' && '#ffe57f' || elem.status== 'Confirmed' && '#c8e6c9' || elem.status == 'Completed' && '#b3e5fc' || elem.status == 'Cancelled' && '#ffccbc' || elem.status == 'Expired' && '#eeeeee'} sx={{color: elem.status== 'Pending' && '#e65100' || elem.status== 'Confirmed' && '#1b5e20' || elem.status == 'Completed' && '#01579b' || elem.status == 'Cancelled' && '#ff5722' || elem.status == 'Expired' && '#212121'}} p={'0.1rem 0rem'} width={'6rem'} borderRadius={'15px'} fontSize={isLargerThan350?'13px': '12px'} ml={'auto'} mt={isLargerThan500? 'auto': '1rem'} display={'flex'} justifyContent={'center'} alignItems={'center'}>{elem.status}</Typography>
                        </Box>
                    ))
                }
                {/* if not */}

                {
                    myAppointments.length<=0 && 
                    <Typography >No Appointments Scheduled....</Typography>
                }

                {/* ------------- */}
            </Box>
        </Box>
    )
}

export default Appointments