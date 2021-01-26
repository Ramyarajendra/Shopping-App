import { Button, Card, FormControl, Grid, IconButton, List, ListItem, makeStyles, MenuItem, Select, Typography } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {addToCart, removeFromCart} from '../actions/cartActions'
import Message from '../components/Message'
import DeleteIcon from '@material-ui/icons/Delete'

const useStyles = makeStyles((theme) =>({
    disabledButton:{
        opacity: 0.5
    }
  }));

const CartScreen = ({match, location, history}) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const productId = match.params.id
    const qty = location.search ? Number(location.search.split('=')[1]) : 1
    // location.search can be used to get query params that is anything followed by ? , in this case ?qty=1 for example
    const cart = useSelector(state => state.cart)
    const { cartItems} = cart

    useEffect(()=> {
        if(productId){
            dispatch(addToCart(productId,qty))
        }
    },[dispatch, productId, qty])

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))

    }
    const checkoutHandler = () => {
        history.push('/login?redirect=shipping')
    }
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
                <h1>Shopping Cart</h1>
                {cartItems.length === 0 ? (
                    <Message>Your cart is empty <Link to='/' className='link-style'>Go Back</Link></Message>
                ): (
                    <List>
                        {cartItems.map( item => (
                            <ListItem key={item.product}>
                                <Grid container spacing={3}>
                                    <Grid item xs={2}>
                                        <img src={item.image} alt={item.name} width='100%' height='auto'/>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Link to={`/product/${item.product}`} className='link-style'>{item.name}</Link>
                                    </Grid>
                                    <Grid item xs={2}>
                                        ${item.price}
                                    </Grid>
                                    <Grid item xs={2}>
                                            <FormControl fullWidth size='small' >
                                                <Select
                                                labelId="demo-simple-select-outlined-label"
                                                id="demo-simple-select-outlined"
                                                value={item.qty}
                                                onChange={e => dispatch(addToCart(item.product, Number(e.target.value)))}
                                                label="Age"
                                                >
                                                {[...Array(item.countInStock).keys()].map((x)=> (
                                                    <MenuItem key={x+1} value={x+1}>
                                                    {x+1}
                                                    </MenuItem>
                                                ))}
                                            
                                                </Select>
                                            </FormControl>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <IconButton onClick={()=> removeFromCartHandler(item.product)}>
                                        <DeleteIcon/></IconButton>
                                    </Grid>
                                </Grid>
                            </ListItem>
                        ))}
                    </List>
                )}
            </Grid>
            <Grid item xs={12} md={4} >
                  <Card>
                      <List>
                          <ListItem>
                               <Typography component='h6' variant='h6'>SubTotal ({cartItems.reduce((acc, item) => acc + item.qty , 0)}) items</Typography>                        
                          </ListItem>
                          <ListItem>
                            <Typography> ${cartItems.reduce((acc, item)=> acc + item.qty * item.price , 0).toFixed(2)} </Typography>
                          </ListItem>
                          <ListItem>
                              <Button fullWidth style={{ backgroundColor: '#393836', color:'#fff'}}
                              classes={{ disabled: classes.disabledButton }} disabled={cartItems.length === 0} onClick={checkoutHandler}>Proceed To Checkout</Button>
                          </ListItem>
                      </List>
                  </Card>                                  
            </Grid>
        </Grid>
    )
}

export default CartScreen
