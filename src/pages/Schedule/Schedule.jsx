import { Box, Button, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { MdVerified } from 'react-icons/md'
import { color } from '../../utils/color'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { useSelector } from 'react-redux'
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Schedule = () => {

    const [timingArr, setTimingArr] = useState([]); //date, day, all timings
    const [BookedSlots, setBookedSlots]= useState([]);
    const [slot, setSlot] = useState({
        date: new Date().toISOString().split('T')[0],
        time: '',
        // month: new Date().getMonth()+ 1
    })
    const { isAuthenticated, token } = useSelector((state)=> state.auth);

    const updateTimingArr = () => {
        const date = new Date();
        console.log(date.toISOString())
        const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const finalArr = [];

        for (let i = 0; i < 7; i++) {
            let singleObj = {};
            const currentDate = new Date(date);
            currentDate.setDate(date.getDate() + i); // Increment date

            singleObj.date = currentDate.toISOString().split('T')[0]; //YYY-MM-DD
            singleObj.day = daysOfWeek[currentDate.getDay()]; // Get the day of the week

            const timings = [];
            if (i === 0) {
                // Logic for today's slots
                let currentHour = date.getHours();
                let currentMinutes = date.getMinutes();

                if (currentMinutes < 30 && currentHour < 21) {
                    timings.push(`${formatHour(currentHour)}:30 ${currentHour >= 12 ? "PM" : "AM"}`);
                } else {

                    currentHour++;
                    if (currentHour < 21) {
                        timings.push(`${formatHour(currentHour)}:00 ${currentHour >= 12 ? "PM" : "AM"}`);
                        timings.push(`${formatHour(currentHour)}:30 ${currentHour >= 12 ? "PM" : "AM"}`);
                    }

                }
                // Add remaining slots for today
                for (let hour = currentHour + 1; hour < 21; hour++) {
                    timings.push(`${formatHour(hour)}:00 ${hour >= 12 ? "PM" : "AM"}`);
                    timings.push(`${formatHour(hour)}:30 ${hour >= 12 ? "PM" : "AM"}`);
                }
            } else {
                // Logic for other days
                for (let hour = 10; hour < 21; hour++) {
                    timings.push(`${formatHour(hour)}:00 ${hour >= 12 ? "PM" : "AM"}`);
                    timings.push(`${formatHour(hour)}:30 ${hour >= 12 ? "PM" : "AM"}`);
                }
            }
            singleObj.timings = timings;

            finalArr.push(singleObj);
        }

        setTimingArr(finalArr);
    };

    const formatHour = (hour) => {
        // Convert 24-hour time to 12-hour format
        return hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    };

    useEffect(() => {
        updateTimingArr();
    }, []);

    // ---------------------get doctor data---------------------
    const [singleDoctor, setSingleDoctor] = useState({})
    const { id } = useParams()

    useEffect(() => {
        async function singleDoctor() {
            try {
                const response = await axios.get(`http://localhost:8080/doctor/singledoctor/${id}`)
                setSingleDoctor(response.data.data)
            } catch (error) {
                console.log(error.message)
            }
        }

        singleDoctor()
    }, [])
    // --------------------------------------
    const navigate = useNavigate()

    const handleSlot = async () => {
        
        if (!isAuthenticated) {
            alert('Please log in to book a slot.');
            return navigate('/auth'); // Redirect to login page
        }

        if (!slot.time) {
            return alert('please select time slot..')
        }


        try {
            const response= await axios.post(`${BACKEND_URL}/appointment/book-appointment/${id}`, 
                {date: slot.date, time: slot.time, fees: singleDoctor.fees},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            alert(response.data.message)
        } catch (error) {
            if(error.response){
                alert(error.response.data.message)
              }else{
                console.log(error.message)
              }
        }
    }

    // -----------get all appointments----------

   useEffect(()=>{
    async function fetchAppointments(){
        try {
            const response= await axios.get(`${BACKEND_URL}/appointment/all-appointments`);
            // console.log(response.data)
            setBookedSlots(response.data.appointments)
        } catch (error) {
            console.log(error.message)
        }
    }
    fetchAppointments()
   }, [BookedSlots])

    return (
        <Box display={'flex'} justifyContent={'space-between'} mt={'1.3rem'}>
            <Box bgcolor={color.background} width={'23%'} height={'17rem'} borderRadius={'10px'}>
                <img height={'100%'} src={`${BACKEND_URL}${singleDoctor.image}`} alt="" />
            </Box>

            {/* -------right------- */}
            <Box width={'75%'}>
                <Box width={'100%'} p={'1.5rem'} border={'1px solid lightgrey'} borderRadius={'20px'}>
                    <Typography fontSize={'1.8rem'} display={'flex'} alignItems={'center'}>{singleDoctor.name} <MdVerified style={{ color: 'blue', fontSize: '1.5rem', marginLeft: '0.5rem' }} /></Typography>
                    <Typography>MBBS - {singleDoctor.speciality} <span style={{ padding: '0.2rem 0.3rem', borderRadius: '16px', fontSize: '12px', border: '1px solid lightgrey' }}>2 Years</span></Typography>
                    <Typography>About</Typography>
                    <Typography fontSize={'13.5px'} width={'75%'}>{singleDoctor.about}</Typography>
                    <Typography>Appointment fee: ${singleDoctor.fees}</Typography>
                </Box>

                <Box mt={'2rem'}>
                    <Typography>Booking slots</Typography>
                    <Box display={'flex'} mt={'0.6rem'}>
                        {
                            timingArr.map((elem, index) => (
                                <Box key={index} onClick={() => setSlot({ ...slot, date: elem.date })} bgcolor={elem.date == slot.date && color.primary} color={elem.date == slot.date ? 'white' : 'grey'} sx={{ '&:hover': { cursor: 'pointer' } }} width={'3.8rem'} height={'6.2rem'} mr={'0.6rem'} border={'1px solid lightgrey'} display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'} borderRadius={'30px'}>
                                    <Typography>{elem.day}</Typography>
                                    <Typography>{elem.date.split('-')[2]}</Typography>
                                </Box>
                            ))
                        }


                    </Box>

                    <Box display={'flex'} overflow={'auto'} mt={'0.7rem'} sx={{ '&::-webkit-scrollbar': { display: 'none' } }}>
                        {/* {
                            timingArr.find((elem) => elem.date === slot.date)?.timings // Get the object with matching date
                                .filter((time) =>
                                    !BookedSlots.some(
                                        (booked) => booked.date === slot.date && booked.time === time
                                    ) // Exclude booked slots
                                )
                                .map((elem, index) => (
                                    <Box key={index} onClick={() => setSlot({ ...slot, time: elem })} color={'lightgray'} bgcolor={elem == slot.time && color.primary} sx={{ '&:hover': { cursor: 'pointer' } }} border={'1px solid lightgrey'} mr={'1rem'} minWidth={'6rem'} height={'2.2rem'} display={'flex'} alignItems={'center'} justifyContent={'center'} borderRadius={'17px'}>
                                        {elem}
                                    </Box>
                                ))
                        } */}
                        
                        {/* shown all times if available then shown that time otherwise 'Booked' text */}
                        {timingArr.find((elem) => elem.date === slot.date)?.timings
                            .map((time, index) => {
                                // Check if the current time slot is booked
                                const isBooked = BookedSlots.some(
                                    (booked) => booked.date === slot.date && booked.time === time
                                );

                                return (
                                    <Box
                                        key={index}
                                        onClick={!isBooked ? () => setSlot({ ...slot, time: time }) : undefined} // Disable click for booked slots
                                        color={isBooked ? 'lightgrey' : 'lightgray'} // Gray for booked, light gray otherwise
                                        bgcolor={isBooked ? '#C75C5C' : time === slot.time && color.primary} // Coral for booked, highlight selected
                                        sx={{ '&:hover': { cursor: isBooked ? 'not-allowed' : 'pointer' } }} // Disable hover for booked slots
                                        border={'1px solid lightgrey'}
                                        mr={'1rem'}
                                        minWidth={'6rem'}
                                        height={'2.2rem'}
                                        display={'flex'}
                                        alignItems={'center'}
                                        justifyContent={'center'}
                                        borderRadius={'17px'}

                                    >
                                        {isBooked ? 'Booked' : time}
                                    </Box>
                                );
                            })}

                    </Box>

                    <Button variant='contained' onClick={handleSlot} sx={{ bgcolor: color.primary, borderRadius: '18px', width: '20rem', height: '2.6rem', mt: '1rem' }}>Book an appointment</Button>
                </Box>


            </Box>
            {/* ----------------- */}
        </Box>
    )
}

export default Schedule