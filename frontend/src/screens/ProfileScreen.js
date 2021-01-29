import { Box, Button, Grid, InputLabel, LinearProgress, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import FormContainer from '../components/FormContainer'
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import {getUserDetails, updateUserProfile} from '../actions/userActions'
import Message from '../components/Message';
import { listMyOrders } from '../actions/orderActions';
import ClearIcon from '@material-ui/icons/Clear';


const useStyles = makeStyles((theme) =>({
   text : {
       marginTop: theme.spacing(2)
   }
  }));
  

const ProfileScreen = ({location, history}) => {
    const classes = useStyles()

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] =useState('')
    const [message, setMessage] = useState(null)
    
    const dispatch = useDispatch()
    const userDetails = useSelector(state => state.userDetails)

    const {loading, error, user} = userDetails

    const userLogin = useSelector(state => state.userLogin)

    const {userInfo} = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)

    const {success} = userUpdateProfile
    
    const orderListMy = useSelector(state => state.orderListMy)

    const {loading: loadingOrders, error: errorOrders, orders} = orderListMy

    useEffect(()=> {
        if(!userInfo){
            history.push('/login')
        }else{
            if(!user.name){
                dispatch(getUserDetails('profile'))
                dispatch(listMyOrders())
            }else{
                setName(user.name)
                setEmail(user.email)
            }
        }
    },[history, userInfo, dispatch, user])

    const submitHandler = (e) =>{
        e.preventDefault()
        if(password !== confirmPassword){
            setMessage('Passwords do not match')
        }else{
            dispatch(updateUserProfile({ id: user._id, name, email, password}))
        }
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
            <h2>User Profile</h2>
            {message && <Message severity='error'>{message}</Message>}
            {error && <Message severity='error'>{error}</Message>}
            {success && <Message severity='success'>Profile Updated</Message>}
            {loading && <LinearProgress/>}
            <form onSubmit = {submitHandler}>
                <Box py={2} >
                    <InputLabel>Name </InputLabel>
                    <TextField className={classes.text} variant='outlined' fullWidth type='text' placeholder='Enter Name' value={name} onChange={(e) => setName(e.target.value)} />
                </Box>
                <Box py={2} >
                    <InputLabel>Email </InputLabel>
                    <TextField className={classes.text} variant='outlined' fullWidth type='email' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                </Box>
                <Box py={2}>
                    <InputLabel>Password </InputLabel>
                    <TextField className={classes.text} variant='outlined' fullWidth type='password' placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                </Box>
                <Box py={2}>
                    <InputLabel>Confirm Password </InputLabel>
                    <TextField className={classes.text} variant='outlined' fullWidth type='password' placeholder='Enter Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </Box>
                <Button size='large' type='submit' variant='contained' style={{ backgroundColor: '#393836', color:'#fff'}} >Update</Button>
            </form>
            </Grid>
            <Grid item xs={12} md={9}>
                <h2>My Orders</h2>
                {loadingOrders ? <LinearProgress/> : errorOrders ? <Message severity='error'>{errorOrders}</Message>:
                (
                    <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><strong>ID</strong></TableCell>
                                <TableCell><strong>DATE</strong></TableCell>
                                <TableCell><strong>TOTAL</strong></TableCell>
                                <TableCell><strong>PAID</strong></TableCell>
                                <TableCell><strong>DELIVERED</strong></TableCell>
                                <TableCell></TableCell>
                           </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders.map(order => (
                                <TableRow key={order._id}>
                                    <TableCell>
                                        {order._id}
                                    </TableCell>
                                    <TableCell>
                                        {order.createdAt.substring(0,10)}
                                    </TableCell>
                                    <TableCell>
                                        {order.totalPrice}
                                    </TableCell>
                                    <TableCell>
                                        {order.isPaid ? order.paidAt.substring(0,10) : <ClearIcon style={{ color: 'red'}}/> }
                                    </TableCell>
                                    <TableCell>
                                        {order.isDelivered ? order.deliveredAt.substring(0,10) : <ClearIcon style={{ color: 'red'}}/> }
                                    </TableCell>
                                    <TableCell>
                                        <Link className='link-style' to={`/order/${order._id}`}>
                                            <Button variant='contained' style={{ backgroundColor: '#393836', color:'#fff'}}>Details</Button>
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    </TableContainer>
                )}
            </Grid>
        </Grid>
    )
}

export default ProfileScreen
