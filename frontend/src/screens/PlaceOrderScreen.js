import { Box, Button, Card, Divider, Grid, List, ListItem, makeStyles } from '@material-ui/core'
import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { Link } from 'react-router-dom'
import CheckoutSteps from '../components/CheckoutSteps'
import FormContainer from '../components/FormContainer'
import Message from '../components/Message'


const useStyles = makeStyles((theme) =>({
    disabledButton:{
        opacity: 0.5
    }
  }));
  
const PlaceOrderScreen = () => {
    const classes = useStyles()
    const cart = useSelector(state => state.cart)

    const addDecimals = (num) => {
        return (Math.round(num *100)/100).toFixed(2)
    }

    cart.itemsPrice = addDecimals(cart.cartItems.reduce((acc, item) => acc + (item.price * item.qty),0))

    cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 :10)

    cart.taxPrice = addDecimals(Number((0.10 * cart.itemsPrice).toFixed(2)))

    cart.totalPrice =( Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2)
   
    const placeOrderHandler = () => {

    }
    return (
        <>
           <FormContainer><CheckoutSteps step1 step2 step3 step4/></FormContainer>
           <Grid container spacing={2}>
               <Grid item xs={12} md={8}>
                    <List>
                        <ListItem>
                            <Box>
                                <h2>Shipping</h2>
                                <p>
                                    <strong>Address:</strong>
                                    {cart.shippingAddress.address}, {cart.shippingAddress.city} {cart.shippingAddress.postalCode} ,
                                    {cart.shippingAddress.country}
                                </p>
                            </Box>
                        </ListItem>
                        <Divider/>
                        <ListItem>
                            <Box>
                                <h2>Payment Method</h2>
                                <strong>Method:</strong>
                                {cart.paymentMethod}
                            </Box>
                        </ListItem>
                        <Divider/>
                        <ListItem>
                            <Box component='div'>
                                <h2>Order Items</h2>
                                {cart.cartItems.length === 0 ? <Message>Your cart is Empty</Message>:
                                <List>
                                    {cart.cartItems.map((item, index) => (
                                        <ListItem key={index}>
                                            <Grid container spacing={2}>
                                                <Grid item md={1}>
                                                    <img src={item.image} alt={item.name} width='100%' height='auto' />
                                                </Grid>
                                                <Grid item md>
                                                    <Link className='link-style' to={`/product/${item.product}`}>{item.name}</Link>
                                                </Grid>
                                                <Grid item md={4}>
                                                    {item.qty} x ${item.price} = ${item.qty * item.price}
                                                </Grid>
                                            </Grid>
                                        </ListItem>
                                    ))}
                                </List>}
                            </Box>
                        </ListItem>
                    </List>
               </Grid>
               <Grid item md={4}>
                    <Card>
                        <List>
                            <ListItem>
                                <h2>Order Summary</h2>
                            </ListItem>
                            <ListItem>
                                <Grid container spacing={2}>
                                    <Grid item xs>
                                        Items
                                    </Grid>
                                    <Grid item xs>${cart.itemsPrice}</Grid>
                                </Grid>
                            </ListItem>
                            <ListItem>
                                <Grid container spacing={2}>
                                    <Grid item xs>
                                        Shipping
                                    </Grid>
                                    <Grid item xs>${cart.shippingPrice}</Grid>
                                </Grid>
                            </ListItem>
                            <ListItem>
                                <Grid container spacing={2}>
                                    <Grid item xs>
                                        Tax
                                    </Grid>
                                    <Grid item xs>${cart.taxPrice}</Grid>
                                </Grid>
                            </ListItem>
                            <ListItem>
                                <Grid container spacing={2}>
                                    <Grid item xs>
                                        Total
                                    </Grid>
                                    <Grid item xs>${cart.totalPrice}</Grid>
                                </Grid>
                            </ListItem>
                            <ListItem>
                                <Button style={{ backgroundColor: '#393836', color:'#fff'}}
                                 disabled={cart.cartItems.length === 0}
                                     classes={{ disabled: classes.disabledButton }}
                                     variant='contained'
                                     fullWidth
                                     onClick={placeOrderHandler}>Place Order</Button>
                            </ListItem>
                        </List>
                    </Card>
               </Grid>
           </Grid>
        </>
    )
}

export default PlaceOrderScreen
