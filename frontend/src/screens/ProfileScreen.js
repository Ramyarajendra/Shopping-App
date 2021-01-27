import { Box, Button, Grid, InputLabel, LinearProgress, makeStyles, TextField } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import FormContainer from '../components/FormContainer'
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import {getUserDetails, updateUserProfile} from '../actions/userActions'
import Message from '../components/Message';


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
    


    useEffect(()=> {
        if(!userInfo){
            history.push('/login')
        }else{
            if(!user.name){
                dispatch(getUserDetails('profile'))
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
            </Grid>
        </Grid>
    )
}

export default ProfileScreen
