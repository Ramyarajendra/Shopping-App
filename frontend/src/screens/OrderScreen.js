import { Box, Button, Card, Divider, Grid, LinearProgress, List, ListItem, makeStyles } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { Link } from 'react-router-dom'
import {  deliverOrder, getOrderDetails, payOrder } from '../actions/orderActions'
import CheckoutSteps from '../components/CheckoutSteps'
import FormContainer from '../components/FormContainer'
import Message from '../components/Message'
import axios from 'axios'
import { PayPalButton} from 'react-paypal-button-v2'
import { ORDER_DELIVER_RESET, ORDER_PAY_RESET } from '../constants/orderConstants'



const useStyles = makeStyles((theme) =>({
    disabledButton:{
        opacity: 0.5
    }
  }));
  
const OrderScreen = ({match, history}) => {
    const orderId = match.params.id
    const dispatch = useDispatch()
    const classes = useStyles()
    
    const [sdkReady, setSdkReady] = useState(false)

    const orderDetails = useSelector(state => state.orderDetails)
    const {order, loading, error} = orderDetails

    const orderPay = useSelector(state => state.orderPay)
    const {loading: loadingPay, success: successPay} = orderPay

    const orderDeliver = useSelector(state => state.orderDeliver)
    const { loading: loadingDeliver, success: successDeliver} = orderDeliver

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo} = userLogin

    useEffect(()=>{
        if(!userInfo){
            history.push('/login')
        }
        const addPayPalScript = async () => {
            const {data: clientId} = await axios.get('/api/config/paypal')
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true
            script.onload = () => {
                setSdkReady(true)
            }
            document.body.appendChild(script)
        }

        if(!order || successPay || order._id !== orderId || successDeliver ){
            dispatch({ type: ORDER_PAY_RESET})
            dispatch({ type: ORDER_DELIVER_RESET})
            dispatch(getOrderDetails(orderId))
        }else if(!order.isPaid){
            if(!window.paypal){
                addPayPalScript()
            }else{
                setSdkReady(true)
            }
        }
    }, [order, dispatch, orderId, successPay, successDeliver, userInfo])
   
    const successPaymentHandler = (paymentResult) =>{
        console.log(paymentResult)
        dispatch(payOrder(orderId, paymentResult))
    }
   
    const deliverHandler = () => {
        dispatch(deliverOrder(order))
    }
    return (
        loading ? <LinearProgress/> : error ? <Message severity='error'>{error}</Message>:
        <>
            <h1>Order {order._id.toUpperCase()}</h1>
           <Grid container spacing={2}>
               <Grid item xs={12} md={8}>
                    <List>
                        <ListItem>
                            <Box style={{ width: '100%'}}>
                                <h2>Shipping</h2>
                                <p><strong>Name: </strong>{order.user.name}</p>
                                <p><strong>Email: </strong><a className='link-style' href={`mailto:${order.user.email}`}>{order.user.email}</a></p> 
                                <p>
                                    <strong>Address: </strong>
                                    {order.shippingAddress.address}, {order.shippingAddress.city} {order.shippingAddress.postalCode} ,
                                    {order.shippingAddress.country}
                                </p>
                                {order.isDelivered ? <Message severity='success'>Paid on {order.deliveredAt}</Message>: 
                                <Message severity='error'>Not Delivered</Message>}
                            </Box>
                        </ListItem>
                        <Divider/>
                        <ListItem>
                            <Box style={{ width: '100%'}}>
                                <h2>Payment Method</h2>
                                <p>
                                <strong>Method:</strong>
                                {order.paymentMethod}
                                </p>
                                {order.isPaid ? <Message severity='success'>Paid on {order.paidAt}</Message>: 
                                <Message severity='error'>Not Paid</Message>}
                            </Box>
                        </ListItem>
                        <Divider/>
                        <ListItem>
                            <Box component='div'>
                                <h2>Order Items</h2>
                                {order.orderItems.length === 0 ? <Message>Order is Empty</Message>:
                                <List>
                                    {order.orderItems.map((item, index) => (
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
               <Grid item xs={12} md={4}>
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
                                    <Grid item xs>${order.itemsPrice}</Grid>
                                </Grid>
                            </ListItem>
                            <ListItem>
                                <Grid container spacing={2}>
                                    <Grid item xs>
                                        Shipping
                                    </Grid>
                                    <Grid item xs>${order.shippingPrice}</Grid>
                                </Grid>
                            </ListItem>
                            <ListItem>
                                <Grid container spacing={2}>
                                    <Grid item xs>
                                        Tax
                                    </Grid>
                                    <Grid item xs>${order.taxPrice}</Grid>
                                </Grid>
                            </ListItem>
                            <ListItem>
                                <Grid container spacing={2}>
                                    <Grid item xs>
                                        Total
                                    </Grid>
                                    <Grid item xs>${order.totalPrice}</Grid>
                                </Grid>
                            </ListItem>
                            {userInfo && order.user && userInfo._id === order.user._id && !order.isPaid && (
                                <ListItem>
                                    <div style={{width : '100%'}}>
                                    {loadingPay && <LinearProgress/>}
                                    {!sdkReady ? <LinearProgress/> : (
                                        <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler}/>
                                    )}
                                    </div>
                                </ListItem>
                            )}
                            {loadingDeliver && <LinearProgress/>}
                            {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                                <ListItem>
                                    <Button
                                    style={{ backgroundColor: '#393836', color:'#fff'}}
                                     variant='contained'
                                     fullWidth
                                     onClick={deliverHandler}>
                                        Mark as delivered
                                    </Button>
                                </ListItem>
                            )}
                        </List>
                    </Card>
               </Grid>
           </Grid>
        </>
    )
}

export default OrderScreen
