import { Box, Button, FormControl, FormControlLabel, FormLabel, InputLabel, makeStyles, Radio, RadioGroup, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';
import FormContainer from '../components/FormContainer'


const useStyles = makeStyles((theme) =>({
    text : {
        marginTop: theme.spacing(2),
        marginBottom:theme.spacing(2)
    }
   }));

const PaymentScreen = ({history}) => {
    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart

    if(!shippingAddress){
        history.push('/shipping')
    }

    const classes = useStyles()
    const [paymentMethod, setPaymentMethod]= useState('PayPal')

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
    }
    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3/>
            <h1>Payment Method</h1>
            <form onSubmit={submitHandler}>
            <FormControl fullWidth component="fieldset" className={classes.text}>
                <FormLabel component="legend">Select Method</FormLabel>
                <RadioGroup aria-label="gender" name="gender1" value={paymentMethod} onChange={(e)=> setPaymentMethod(e.target.value)}>
                    <FormControlLabel value="PayPal" control={<Radio />} label="PayPal or Credit Card" />
                </RadioGroup>
            </FormControl>
                <Button size='large' type='submit' variant='contained' style={{ backgroundColor: '#393836', color:'#fff'}}>Continue</Button>
            </form>
        </FormContainer>
    )
}

export default PaymentScreen
