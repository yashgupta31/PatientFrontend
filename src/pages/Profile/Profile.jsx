import { Box,  Table, Typography, IconButton  } from '@mui/joy'
import { MenuItem, Select, TableBody, TableCell, TableRow, TextField, Button,} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { MdEdit } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { color } from '../../utils/color';
import { jwtDecode } from 'jwt-decode';
import { loginSuccess } from '../../Redux/Actions.js/authAction';

const Profile = () => {
    const {userData}= useSelector((state)=> state.auth);
    const [isEdit, setIsEdit] = useState(false);
    const [name, setName]= useState('');
    const [phone, setPhone]= useState('');
    const [address, setAddress]= useState('');
    const [gender, setGender]= useState('');
    const [DOB, setDOB]= useState('');

    if (!userData) {
        return <Typography>Loading...</Typography>;
    }
    
    const image = 'sas';
    return (
        <Box >
            {/* ------image----- */}
            <Box position={'relative'} width={'9rem'} height={'9rem'} borderRadius={'50%'} mt={'2rem'}>
                <Box bgcolor={'black'} width={'100%'} height={'100%'} borderRadius={'50%'} overflow={'hidden'} position={'relative'} display={'flex'} alignItems={'center'} justifyContent={'center'} >
                    {/* <img height={'100%'} src={userData.image? "https://tse1.mm.bing.net/th?id=OIP.hCfHyL8u8XAbreXuaiTMQgHaHZ&pid=Api&P=0&h=220": "https://tse4.mm.bing.net/th?id=OIP.hGSCbXlcOjL_9mmzerqAbQHaHa&pid=Api&P=0&h=220"} alt="" /> */}
                    <img style={{ height: '100%', opacity: '90%' }} src={image ? "https://tse1.mm.bing.net/th?id=OIP.hCfHyL8u8XAbreXuaiTMQgHaHZ&pid=Api&P=0&h=220" : "https://tse4.mm.bing.net/th?id=OIP.hGSCbXlcOjL_9mmzerqAbQHaHa&pid=Api&P=0&h=220"} alt="" />
                    {
                        isEdit && 
                        <input type="file" style={{ height: '100%', width: '100%', position: 'absolute', opacity: '0%', cursor: 'pointer', backgroundColor: 'green' }} />
                    }
                </Box>
                {
                    isEdit && 
                    <IconButton size='small' sx={{ position: 'absolute', bgcolor: color.primary, color: 'white', borderRadius: '50%', bottom: '0.5rem', right: '0.4rem', fontSize: '0.9rem', p: '0.5rem' }}>
                    <input type="file" style={{ height: '100%', width: '100%', position: 'absolute', opacity: '0%', borderRadius: '50%', cursor: 'pointer' }} />
                    <MdEdit />
                </IconButton>
                }
                
            </Box>
            {/* ------ */}
            {
                isEdit ? <TextField size='small' defaultValue={'Yash Gupta'} /> :
                    <Typography fontSize={'1.5rem'} p={'0.5rem 0rem'}>Yash Gupta</Typography>
            }

            {/* <TextField size='small' sx={{outline: 'none', border: 'none'}} defaultValue={'yash'}/> */}
            <Box width={'50%'} display={'flex'} flexDirection={'column'} pt={'1rem'} mb={'2rem'} borderTop={'1px solid lightgrey'}>
                <Typography>CONTACT INFORMATION:</Typography>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell align="left">Email id:</TableCell>
                            <TableCell align="left">{userData.email}</TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell align="left">Phone:</TableCell>
                            {isEdit ? <TextField size='small'  defaultValue={userData.phone? userData.phone : ''} /> :
                                <TableCell align="left">{userData.phone? userData.phone : '-'}</TableCell>
                            }
                        </TableRow>

                        <TableRow>
                            <TableCell align="left">Address:</TableCell>
                            {isEdit ? <TextField size='small' defaultValue={'7887878778'} /> :
                                <TableCell align="left">Chani Lorem ipsum optio.</TableCell>
                            }</TableRow>
                    </TableBody>
                </Table>
                {/* -----Basic info---- */}
                <Typography mt={'1.4rem'}>BASIC INFORMATION:</Typography>
                <Table>
                    <TableBody>

                        <TableRow>
                            <TableCell align="left">Gender:</TableCell>
                            {isEdit ? <Select size='small' defaultValue={'male'}>
                                <MenuItem value="male">Male</MenuItem>
                                <MenuItem value="female">Female</MenuItem>
                            </Select> :
                                <TableCell align="left">Male</TableCell>
                            }
                        </TableRow>

                        <TableRow>
                            <TableCell align="left">DOB:</TableCell>
                            {
                                isEdit ? <TextField size='small' type='date' defaultValue="2001-05-31" /> :
                                    <TableCell align="left">31-05-2001</TableCell>
                            }

                        </TableRow>
                    </TableBody>
                </Table>
            </Box>

            <Button onClick={() => setIsEdit(!isEdit)} variant={isEdit?"contained": 'outlined'} sx={{ width: '13rem', p: '0.7rem 0rem', borderRadius: '20px' }}>{isEdit ? 'Save' : 'Edit'}</Button>
        </Box>
    )
}

export default Profile