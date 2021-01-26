import { Button, Card, Divider, FormControl, Grid, InputLabel, LinearProgress, List, ListItem, makeStyles, MenuItem, Select, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { listProductDetails } from '../actions/productActions';
import Message from '../components/Message';
import Ratings from '../components/Ratings';
import products from '../products'



const useStyles = makeStyles((theme) =>({
    gridclass:{
        marginTop: theme.spacing(2)
    },
    disabledButton:{
        opacity: 0.5
    }
  }));
  

//history can be used and called as a prop  

const ProductScreen = ({history, match}) => {
    const classes = useStyles()
    const [qty, setQty] = useState(1)
    const dispatch = useDispatch()
    const productDetails = useSelector(state => state.productDetails )

    useEffect(()=>{
        dispatch(listProductDetails(match.params.id))
    },[match, dispatch])

    const { product, error, loading} = productDetails
    const addToCartHandler = () => {
        history.push( `/cart/${match.params.id}?qty=${qty}`)
    }

    return (
        <div>
            <Link to='/' className='link-style' >
                <Button color='primary' variant='outlined'>
                    Go Back
                </Button>
            </Link>
            {loading ? <LinearProgress/> : error ? <Message severity='error'>{error}</Message>: (
                <Grid container spacing={2} className={classes.gridclass}>
                    <Grid item xs={12} md={6}>
                        <img src={product.image} alt={product.name} width='100%' height='auto'/>
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <List>
                            <ListItem>
                                <Typography component='h3' variant='h5'>{product.name}</Typography>
                            </ListItem>
                            <Divider/>
                            <ListItem>
                                <Ratings value={product.rating} text={`${product.numReviews} reviews`}/>
                            </ListItem>
                            <Divider/>
                            <ListItem>
                                Price: ${product.price}
                            </ListItem>
                            <Divider/>
                            <ListItem>
                                Description: {product.description}
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <Card>
                            <List>
                                <ListItem>
                                        <Grid item xs={6}>
                                            Price:
                                        </Grid>
                                        <Grid item xs={6}>
                                            ${product.price}
                                        </Grid>
                                </ListItem>
                                <ListItem>
                                        <Grid item xs={6}>
                                            Status:
                                        </Grid>
                                        <Grid item xs={6}>
                                            {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                                        </Grid>
                                </ListItem>
                                {product.countInStock > 0 && (
                                    <ListItem>
                                        <Grid item xs={6}>
                                            Qty:
                                        </Grid>
                                        <Grid item xs={6}>
                                        <FormControl fullWidth size='small' >
                                            <Select
                                            labelId="demo-simple-select-outlined-label"
                                            id="demo-simple-select-outlined"
                                            value={qty}
                                            onChange={e => setQty(e.target.value)}
                                            label="Age"
                                            >
                                            {[...Array(product.countInStock).keys()].map((x)=> (
                                                <MenuItem key={x+1} value={x+1}>
                                                {x+1}
                                                </MenuItem>
                                            ))}
                                           
                                            </Select>
                                        </FormControl>
                                        </Grid>
                                    </ListItem>
                                )}
                                <ListItem>
                                    <Button fullWidth style={{ backgroundColor: '#393836', color:'#fff'}}
                                     disabled={product.countInStock === 0}
                                     classes={{ disabled: classes.disabledButton }}
                                     variant='contained'
                                     onClick = {addToCartHandler} >
                                        Add To Cart
                                    </Button>
                                </ListItem>
                            </List>
                        </Card>
                    </Grid>
            </Grid>
            )}
            
        </div>
    )
}

export default ProductScreen
