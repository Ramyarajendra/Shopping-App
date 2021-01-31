import { Box, Button, Checkbox, FormControlLabel, Grid, InputLabel, LinearProgress, makeStyles, TextField } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import FormContainer from '../components/FormContainer'
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import {getUserDetails, updateUser} from '../actions/userActions'
import Message from '../components/Message';
import { USER_UPDATE_RESET } from '../constants/userConstants';


const useStyles = makeStyles((theme) =>({
   text : {
       marginTop: theme.spacing(2)
   }
  }));
  

const UserEditScreen = ({location, history, match}) => {
    const classes = useStyles()
    const userId = match.params.id

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)
    
    const dispatch = useDispatch()
    const userDetails = useSelector(state => state.userDetails)

    const {loading, error, user} = userDetails

    const userUpdate = useSelector(state => state.userUpdate)

    const {loading: loadingUpdate, error: errorUpdate, success: successUpdate} = userUpdate



    useEffect(()=> {
        if(successUpdate){
            dispatch({type: USER_UPDATE_RESET})
            history.push('/admin/userlist')
        }else{
            if(!user.name || user._id !== userId){
                dispatch(getUserDetails(userId))
            }else{
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }
      
    },[user, dispatch, userId, history, successUpdate])

    const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(updateUser({_id: userId, name, email, isAdmin}))
       
    }

    return (

            <>
               <Box my={2}> <Link to='/admin/userlist' className='link-style'>
               <Button variant='outlined' color='primary'>Go Back</Button> </Link></Box>
                <FormContainer>
                        <h1>Edit User</h1>
                        {loadingUpdate && <LinearProgress/>}
                        {errorUpdate && <Message severity='error'>{error}</Message>}
                        {loading ? <LinearProgress/> : error ?  <Message severity='error'>{error}</Message>:
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
                               <FormControlLabel control={
                                    <Checkbox checked={isAdmin} onChange={(e)=> setIsAdmin(e.target.checked)}/>
                               }
                                label='isAdmin'
                               />
                               
                            </Box>
                            <Button size='large' type='submit' variant='contained' style={{ backgroundColor: '#393836', color:'#fff'}} >update</Button>
                        </form>}
                        
                        
                    </FormContainer>
            </>
    )
}

export default UserEditScreen
