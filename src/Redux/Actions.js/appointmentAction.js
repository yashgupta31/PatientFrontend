import axios from "axios";
import { useSelector } from "react-redux";
const BACKEND_URL= import.meta.env.VITE_BACKEND_URL 

export const GET_MY_APPOINTMENTS= 'GET_MY_APPOINTMENTS';
export const BOOK_APPOINTMENT= 'BOOK_APPOINTMENT';
export const BOOKED_SLOTS_OF_DOCTOR= 'BOOKED_SLOTS_OF_DOCTOR';


export const getMyAppointments=()=> async(dispatch, getState)=>{
    const {token}= getState().auth;

    try {
        const response= await axios.get(`${BACKEND_URL}/appointment/my-appointments`, 
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )

        dispatch({
            type: GET_MY_APPOINTMENTS,
            payload: response.data.appointments
        })
    } catch (error) {
        console.log(error.message)
    }
}

export const bookAppointment=(appointmentData, id)=> async(dispatch, getState)=>{
    const {token}= getState().auth;
    // try {
    //    const response= await axios.post(`${BACKEND_URL}/book-appointment/${id}`, appointmentData,
    //     {
    //         headers: {
    //             Authorization: `Bearer ${token}`
    //         }
    //     }
    //    );

    //    dispatch({
    //     type: BOOK_APPOINTMENT,
    //     payload: response.data.appointment
    //    })

       
    // } catch (error) {
    //     console.log(error.message)
    // }

    try {
        const response = await axios.post(
            `${BACKEND_URL}/appointment/book-appointment/${id}`,
            appointmentData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        // Dispatch success action
        dispatch({
            type: BOOK_APPOINTMENT,
            payload: response.data.appointment,
        });

        alert("Appointment booked successfully! Wait for approval.");
    } catch (error) {
        console.error("Error booking appointment:", error.message);

        alert(error.response?.data?.message || "Failed to book appointment.");
    }

}


// Get all booked slots of selected doctor for only to show the available slots on frontend.
export const getSelectedDoctorsAppointments=(doctorId)=> async(dispatch)=>{
   try {
    const response= await axios.get(`${BACKEND_URL}/appointment/selected-doctors-appointments/${doctorId}`);
    dispatch({
        type: BOOKED_SLOTS_OF_DOCTOR,
        payload: response.data.appointments
    })
   } catch (error) {
    console.log(error.message)
   }
}