import { Box, Button, Grid, InputLabel, LinearProgress, makeStyles, TextField } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import FormContainer from '../components/FormContainer'
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import {register} from '../actions/userActions'
import Message from '../components/Message';


const useStyles = makeStyles((theme) =>({
   text : {
       marginTop: theme.spacing(2)
   }
  }));
  

const RegisterScreen = ({location, history}) => {
    const classes = useStyles()

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] =useState('')
    const [message, setMessage] = useState(null)
    
    const dispatch = useDispatch()
    const userRegister = useSelector(state => state.userRegister)

    const {loading, error, userInfo} = userRegister

    const redirect = location.search ? location.search.split('=')[1] : '/'


    useEffect(()=> {
        if(userInfo){
            history.push(redirect)
        }
    },[history, userInfo, redirect])

    const submitHandler = (e) =>{
        e.preventDefault()
        if(password !== confirmPassword){
            setMessage('Passwords do not match')
        }else{
            dispatch(register(name,email,password))
        }
    }

    return (
        <FormContainer>
            <h1>Sign Up</h1>
            {message && <Message severity='error'>{message}</Message>}
            {error && <Message severity='error'>{error}</Message>}
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
                <Button size='large' type='submit' variant='contained' style={{ backgroundColor: '#393836', color:'#fff'}} >REGISTER</Button>
            </form>
            <Grid container spacing={2}>
                <Grid className={classes.text} item>
                    Have an Account ? <Link className='link-style' to={ redirect ? `/login?redirect=${redirect}`: '/login'}>
                    <strong>Login</strong></Link> 
                </Grid>
            </Grid>
        </FormContainer>
    )
}

export default RegisterScreen
