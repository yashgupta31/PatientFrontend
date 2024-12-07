import { BOOK_APPOINTMENT, BOOKED_SLOTS_OF_DOCTOR, GET_MY_APPOINTMENTS } from "../Actions.js/appointmentAction"

const initialState={
    myAppointments: [],
    bookedSlots: [],
    loading: false
}

export const appointmentsReducer=(state=initialState, action)=>{
    switch(action.type){
        case GET_MY_APPOINTMENTS:
            return {...state, myAppointments: action.payload, loading: false};
        case BOOK_APPOINTMENT:
            return {...state, myAppointments: [...state.myAppointments, action.payload], loading: false}
        case BOOKED_SLOTS_OF_DOCTOR:
            return {...state, bookedSlots: action.payload, loading: false}
        default:
            return state
    }
}