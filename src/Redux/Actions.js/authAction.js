import axios from "axios";
const BACKEND_URL= import.meta.env.VITE_BACKEND_URL;
import {jwtDecode} from 'jwt-decode';
export const LOGIN_REQUEST= 'LOGIN_REQUEST';
export const LOGIN_SUCCESS= 'LOGIN_SUCCESS';
export const LOGIN_FAILURE= 'LOGIN_FAILURE';
export const LOGOUT= 'LOGOUT';
export const UPDATE_USER= 'UPDATE_USER';

export const loginSuccess=(token, userData)=>({type: LOGIN_SUCCESS, payload: {token, userData}})
export const updateUserSuccess=(formData)=>({type: UPDATE_USER, payload: formData});

export const login =(email, password, role= 'patient')=> async(dispatch)=>{
    dispatch({type: LOGIN_REQUEST})
    try {
        const response= await axios.post(`${BACKEND_URL}/user/login`, {email, password, role});
        localStorage.setItem('pToken', response.data.token);
        const token= localStorage.getItem('pToken')
        let userData= jwtDecode(token)
        dispatch(loginSuccess(token, userData))
        alert(response.data.message); 
    } catch (error) {
        dispatch({type: LOGIN_FAILURE})
        if(error.response){
            alert(error.response.data.message)
          }else{
            console.log(error.message)
          }
    }
}

export const updateUser=(formData)=> async(dispatch, getState)=>{
    try {
        const userId= getState().auth.userData.userId;
        // console.log(getState().userData)
        const response= await axios.patch(`${BACKEND_URL}/user/update-profile/${userId}`, formData);
        dispatch(updateUserSuccess(response.data.data));
        localStorage.setItem('userDetail', JSON.stringify(response.data.data));
        alert(response.data.message);
    } catch (error) {
        alert(error.message)
    }
}

export const logout=()=> (dispatch)=>{
    localStorage.removeItem('pToken');
    localStorage.removeItem('userDetail');
    dispatch({type: LOGOUT})
}

