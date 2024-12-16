import React, { useEffect, useState } from 'react';
import {
  Box,
  Table,
  Typography,
  IconButton,
  Button,
  TextField,
  Select,
  MenuItem,
  TableBody,
  TableCell,
  TableRow,
  useMediaQuery
} from '@mui/material';
import { MdEdit } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { updateUser } from '../../Redux/Actions.js/authAction';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const DEFAULT_IMAGE= 'https://tse3.mm.bing.net/th?id=OIP.7dTfyRneXPY5b7pj0NKuUgHaHa&pid=Api&P=0&h=220';

const Profile = () => {
  const isLargerThan600= useMediaQuery('(min-width: 600px)');
  const isLargerThan500= useMediaQuery('(min-width: 500px)');
  const { userData } = useSelector((state) => state.auth);
  console.log(userData)
  const dispatch = useDispatch();
  // State variables
  const [isEdit, setIsEdit] = useState(false);
  const [formState, setFormState] = useState({
    profilePic: null,
    name: '',
    phone: '',
    address: '',
    gender: 'male',
    DOB: '',

  });
  const [prevImage, setPrevImage]= useState()
  // Synchronize formState with userData
  useEffect(() => {
    if (userData) {
      setFormState((prevState) => ({
        ...prevState,
        profilePic: userData.image || '',
        name: userData.name || '',
        phone: userData.phone || '',
        address: userData.address || '',
        gender: userData.gender || 'male',
        DOB: userData.DOB || '',
      }));
      // initially its checking the database if image found then showing the old image if not then showing profile icon
      setPrevImage(userData.image? `${userData.image}`: DEFAULT_IMAGE);
    }
  }, [userData]);
  //   console.log(formState.image)

  if (!userData) {
    return <Typography>Loading...</Typography>;
  }

  const handleInputChange = (field, value) => {
    if(field == 'profilePic'){
      setPrevImage(value? URL.createObjectURL(value): DEFAULT_IMAGE);
    }
    setFormState((prevState) => ({ ...prevState, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      Object.entries(formState).forEach(([key, value]) => {
        formData.append(key, value);
      });
      dispatch(updateUser(formData))
      //   const response = await axios.patch(`${BACKEND_URL}/user/update-profile/${userData.userId}`, formData);
      //   console.log(response)
      //   alert(response.data.message);

      setIsEdit(false);
    } catch (error) {
      alert(error.message);
    }
  };

  // -----screen sizes-----
  // const isLargerThan600= useMediaQuery('(min-width: 600px)');
  // const isLargerThan550= useMediaQuery('(min-width: 550px)');
  


  return (
    <Box display={'flex'} flexDirection={'column'} alignItems={isLargerThan600?'start':'center'} pt={'2rem'}>
      {/* Profile Picture */}
      <Box position="relative"  width="9rem" height="9rem" borderRadius="50%" mt="2rem"  m={!isLargerThan600 && 'auto'}>
        <Box bgcolor="black" width="100%" height="100%" borderRadius="50%" overflow="hidden" position="relative" display="flex" alignItems="center" justifyContent="center">
          <img style={{ height: '100%'}} src={prevImage} alt="Profile" />

          {isEdit && (
            <input type="file" id='file-upload' name='profilePic' accept="image/*" onChange={(e) => handleInputChange('profilePic', e.target.files[0]) }
              style={{ height: '100%', width: '100%', position: 'absolute', opacity: 0, cursor: 'pointer', }} />
          )}
        </Box>
        {isEdit && (
          <IconButton
            size="small"
            onClick={() => document.getElementById('file-upload').click()}
            sx={{ position: 'absolute', bgcolor: 'primary.main', color: 'white', borderRadius: '50%', bottom: '0.5rem', right: '0.4rem', }} >
            <MdEdit />
          </IconButton>
        )}
      </Box>

      {/* Name */}
      {isEdit ? (
        <TextField
          size="small"
          sx={{ mt: '1rem' }}
          placeholder='eg- Yash Gupta'
          //   defaultValue={formState.name}
          value={formState.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
        />
      ) : (
        <Typography fontSize={isLargerThan500?"1.5rem": '1.3rem'} p="0.5rem 0rem">
          {userData.name}
        </Typography>
      )}

      {/* Contact Information */}
      <Box width={isLargerThan600?"55%": isLargerThan500?'90%': '100%'} pt="1rem" mb="2rem" borderTop="1px solid lightgrey">
        <Typography>Contact Information:</Typography>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Email ID:</TableCell>
              <TableCell>{userData.email}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Phone:</TableCell>
              <TableCell>
                {isEdit ? (
                  <TextField
                    size="small"
                    placeholder='eg. 9527267375'
                    value={formState.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                  />
                ) : (
                  userData.phone || '-'
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Address:</TableCell>
              <TableCell>
                {isEdit ? (
                  <TextField
                    size="small"
                    placeholder='eg. Yavatmal, Nagpur'
                    value={formState.address}
                    onChange={(e) =>
                      handleInputChange('address', e.target.value)
                    }
                  />
                ) : (
                  userData.address || 'N/A'
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        {/* Basic Information */}
        <Typography mt="1.4rem">Basic Information:</Typography>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Gender:</TableCell>
              <TableCell>
                {isEdit ? (
                  <Select
                    size="small"
                    value={formState.gender}
                    onChange={(e) =>
                      handleInputChange('gender', e.target.value)
                    }
                  >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                  </Select>
                ) : (
                  userData.gender || 'Male'
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Date of Birth:</TableCell>
              <TableCell>
                {isEdit ? (
                  <TextField
                    size="small"
                    type="date"
                    defaultValue={formState.DOB ? formState.DOB.split('T')[0] : ''}
                    value={formState.DOB ? formState.DOB.split('T')[0] : ''}
                    onChange={(e) => handleInputChange('DOB', e.target.value)}
                  />
                ) : (
                  userData.DOB?userData.DOB.split('T')[0] : 'Not Provided'
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Box>

      {/* Buttons */}
      <Button
        onClick={isEdit ? handleSubmit : () => setIsEdit(true)}
        variant={isEdit ? 'contained' : 'outlined'}
        sx={{ width: isLargerThan600?'20rem': '90%', p: isLargerThan500?'0.7rem 0rem': '0.5rem 0rem', borderRadius: '20px' }}>
        {isEdit ? 'Save' : 'Edit'}
      </Button>
    </Box>
  );
};

export default Profile;
