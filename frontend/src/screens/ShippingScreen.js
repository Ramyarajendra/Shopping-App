import { Box, Button, InputLabel, makeStyles, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';
import FormContainer from '../components/FormContainer'


const useStyles = makeStyles((theme) =>({
    text : {
        marginTop: theme.spacing(2)
    }
   }));

const ShippingScreen = ({history}) => {
    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart

    const classes = useStyles()
    const [address , setAddress] = useState(shippingAddress.address)
    const [city , setCity] = useState(shippingAddress.city)
    const [postalCode , setPostalCode] = useState(shippingAddress.postalCode)
    const [country , setCountry] = useState(shippingAddress.country)

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({address,city,postalCode,country}))
        history.push('/payment')
    }
    return (
        <FormContainer>
            <CheckoutSteps step1 step2/>
            <h1>Shipping</h1>
            <form onSubmit={submitHandler}>
                <Box py={2} >
                    <InputLabel>Address </InputLabel>
                    <TextField className={classes.text} variant='outlined' fullWidth type='text' placeholder='Enter Address' value={address} onChange={(e) => setAddress(e.target.value)}
                    required />
                </Box>
                <Box py={2} >
                    <InputLabel>City </InputLabel>
                    <TextField className={classes.text} variant='outlined' fullWidth type='text' placeholder='Enter city' value={city} onChange={(e) => setCity(e.target.value)}
                    required />
                </Box>
                <Box py={2} >
                    <InputLabel>Postal Code </InputLabel>
                    <TextField className={classes.text} variant='outlined' fullWidth type='text' placeholder='Enter postal code' value={postalCode} onChange={(e) => setPostalCode(e.target.value)}
                    required />
                </Box>
                <Box py={2} >
                    <InputLabel>Country </InputLabel>
                    <TextField className={classes.text} variant='outlined' fullWidth type='text' placeholder='Enter Country' value={country} onChange={(e) => setCountry(e.target.value)}
                    required />
                </Box>
                <Button size='large' type='submit' variant='contained' style={{ backgroundColor: '#393836', color:'#fff'}}>Continue</Button>
            </form>
        </FormContainer>
    )
}

export default ShippingScreen
