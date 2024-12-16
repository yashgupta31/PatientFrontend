import { Box, Button, Typography, useMediaQuery } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { MdVerified } from 'react-icons/md'
import { color } from '../../utils/color'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { bookAppointment, getSelectedDoctorsAppointments } from '../../Redux/Actions.js/appointmentAction'
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Schedule = () => {
    const dispatch= useDispatch()
    const {bookedSlots}= useSelector((state)=> state.appointments)
    const [timingArr, setTimingArr] = useState([]); //date, day, all timings
    // console.log(timingArr)
    // const [BookedSlots, setBookedSlots]= useState([]);
    const [slot, setSlot] = useState({
        date: new Date().toISOString().split('T')[0],
        time: '',
        // month: new Date().getMonth()+ 1
    })
    // console.log(slot)
    const { isAuthenticated, token } = useSelector((state)=> state.auth);
    
    // console.log(bookedSlots)

    const updateTimingArr = () => {
        const date = new Date();
        // console.log(date.toISOString())
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

                if (currentMinutes < 30 && currentHour < 21 ) {
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
    const { id } = useParams() //this is doctors id got from params

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

        await dispatch(bookAppointment({date: slot.date, time: slot.time, fees: singleDoctor.fees}, id))
        dispatch(getSelectedDoctorsAppointments(id));
    }

    // -----------get all appointments of selected doctor----------

   useEffect(()=>{
    dispatch(getSelectedDoctorsAppointments(id))
   }, [dispatch])

//    ------screen sizes-------
   const isLargerThan1250= useMediaQuery('(min-width: 1250px)');
   const isLargerThan950= useMediaQuery('(min-width: 950px)');
   const isLargerThan650= useMediaQuery('(min-width: 650px)');
   const isLargerThan500= useMediaQuery('(min-width: 500px)');

    return (
        <Box  width={'100%'} display={'flex'} flexDirection={isLargerThan650? 'row': 'column'} alignItems={isLargerThan650? 'start': 'center'} justifyContent={'space-between'} mt={'1.3rem'}>
            <Box bgcolor={color.background} width={isLargerThan1250?'23%': isLargerThan650?'40%': '15rem'}  height={isLargerThan950?'17rem': '15rem'} mr={isLargerThan500?'1rem': '0rem'} mb={!isLargerThan650 && '1rem'} display={'flex'} alignItems={'end'} justifyContent={'center'} borderRadius={'10px'}>
                <img height={'100%'} src={`${singleDoctor.image}`} alt="" />
            </Box>

            {/* -------right------- */}
            <Box width={isLargerThan1250?'75%': isLargerThan650?'58%': '100%'}>
                <Box width={'100%'} p={isLargerThan500? '1.5rem': '0.6rem'} border={'1px solid lightgrey'} borderRadius={'20px'}>
                    <Typography fontSize={isLargerThan500?'1.8rem': '1.3rem'} display={'flex'} alignItems={'center'}>{singleDoctor.name} <MdVerified style={{ color: 'blue', fontSize: isLargerThan500?'1.5rem': '1.1rem', marginLeft: '0.5rem' }} /></Typography>
                    <Typography fontSize={isLargerThan500?'1rem': '0.9rem'}>MBBS - {singleDoctor.speciality} <span style={{ padding: '0.1rem 0.5rem', borderRadius: '16px', fontSize: isLargerThan500?'12px': '10px', border: '1px solid lightgrey' }}>{singleDoctor.experience} Years</span></Typography>
                    <Typography>About</Typography>
                    <Typography fontSize={'13.5px'} width={isLargerThan1250? '75%': '98%'}>{singleDoctor.about}</Typography>
                    <Typography>Appointment fee: ${singleDoctor.fees}</Typography>
                </Box>

                <Box mt={'2rem'}>
                    <Typography>Booking slots</Typography>
                    <Box sx={{overflowX: 'scroll', '&::-webkit-scrollbar': { display: 'none' }}} display={'flex'} mt={'0.6rem'} >
                        {
                            timingArr.map((elem, index) => (
                                <Box key={index} onClick={() => setSlot({ ...slot, date: elem.date })} bgcolor={elem.date == slot.date && color.primary} color={elem.date == slot.date ? 'white' : 'grey'} minWidth={'2.7rem'} width={'3.8rem'} height={isLargerThan500?'6.2rem': '5.4rem'}  sx={{ '&:hover': { cursor: 'pointer' } }}  mr={'0.6rem'} border={'1px solid lightgrey'} display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'} borderRadius={'30px'}>
                                    <Typography fontSize={isLargerThan500?'1rem': '0.9rem'}>{elem.day}</Typography>
                                    <Typography fontSize={isLargerThan500?'1rem': '0.9rem'}>{elem.date.split('-')[2]}</Typography>
                                </Box>
                            ))
                        }


                    </Box>

                    <Box display={'flex'} overflow={'auto'} mt={'0.7rem'} sx={{ '&::-webkit-scrollbar': { display: 'none' } }}>
                        
                        {/* shown all times if available then shown that time otherwise 'Booked' text */}
                        {timingArr.find((elem) => elem.date === slot.date)?.timings
                            .map((time, index) => {
                                // Check if the current time slot is booked
                                const isBooked = bookedSlots.some(
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
                                        mr={isLargerThan500?'1rem': '0.4rem'}
                                        minWidth={'6rem'}
                                        height={isLargerThan500?'2.2rem': '1.9rem'}
                                        fontSize={isLargerThan500?'1rem': '0.8rem'}
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

                    <Button variant='contained' onClick={handleSlot} sx={{ bgcolor: color.primary, borderRadius: '18px', width: isLargerThan650? '20rem': '100%', height: isLargerThan500?'2.6rem': '2.4rem', mt: '1rem', mb: '1rem', fontSize: '0.8rem' }}>Book an appointment</Button>
                </Box>


            </Box>
            {/* ----------------- */}
        </Box>
    )
}

export default Schedule