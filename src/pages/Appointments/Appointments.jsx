import { Typography } from '@mui/joy'
import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { color } from '../../utils/color'
import axios from 'axios'
import { useSelector } from 'react-redux'
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Appointments = () => {
    const { token } = useSelector((state) => state.auth)
    const [myAppointments, setMyAppointments] = useState([])
    console.log(myAppointments)


    useEffect(() => {
        async function fetchAppointments() {
            console.log(token)
            try {
                const response = await axios.get(`${BACKEND_URL}/appointment/my-appointments`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )
                setMyAppointments(response.data.appointments);
            } catch (error) {
                console.log(error.message)
            }
        }
        fetchAppointments();
    }, [token]);

    return (
        <Box mt={'2rem'}>
            <Typography fontSize={'1.1rem'} fontWeight={550} mb={'1rem'} >My appointments</Typography>
            <Box display={'flex'} flexDirection={'column'} >
                {/* -----each appointment------ */}
                {myAppointments.length>0 &&
                    myAppointments.map((elem, index) => (
                        <Box key={index} height={'12rem'} p={'0.9rem 0rem'} display={'flex'} alignItems={'center'} borderTop={`1px solid lightgrey`}>
                            <Box bgcolor={color.background} height={'100%'} width={'10rem'} display={'flex'} justifyContent={'center'}>
                                <img style={{ height: '100%' }} src={`${BACKEND_URL}${elem.doctorId.image}`} alt="" />
                            </Box>

                            <Box height={'100%'} ml={'1.3rem'}>
                                <Typography fontSize={'1.1rem'} fontWeight={500}>{elem.doctorId.name}</Typography>
                                <Typography fontSize={'sm'}>{elem.doctorId.speciality}</Typography>
                                <Typography fontWeight={500} fontSize={'sm'} mt={'0.2rem'}>Address:</Typography>
                                <Typography fontSize={'sm'}>{elem.doctorId.address}</Typography>
                                <Typography fontSize={'sm'}>Circle, Ring Road, London</Typography>
                                <Typography fontSize={'sm'} mt={'0.4rem'}><Typography fontWeight={500}>Date & Time: </Typography>{elem.date} | {elem.time}</Typography>
                            </Box>

                            <Typography bgcolor={'orangered'} sx={{color: 'white'}} p={'0.1rem 0.6rem'} borderRadius={'15px'} fontSize={'13px'} ml={'auto'} mt={'auto'}>{elem.status}</Typography>
                        </Box>
                    ))
                }
                {/* if not */}

                {
                    myAppointments.length<=0 && 
                    <Typography>No Appointments Scheduled....</Typography>
                }

                {/* ------------- */}
            </Box>
        </Box>
    )
}

export default Appointments