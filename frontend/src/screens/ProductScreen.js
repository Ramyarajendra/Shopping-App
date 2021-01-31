import { Avatar, Box, Button, Card, CardContent, CardHeader, Divider, FormControl, Grid, InputLabel, LinearProgress, List, ListItem, makeStyles, MenuItem, Select, TextField, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { createProductReview, listProductDetails } from '../actions/productActions';
import Message from '../components/Message';
import Ratings from '../components/Ratings';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants';




const useStyles = makeStyles((theme) =>({
    gridclass:{
        marginTop: theme.spacing(2)
    },
    disabledButton:{
        opacity: 0.5
    },
    root: {
        width:'100%',
      },
    margin:{
        marginTop:theme.spacing(2)
    }
  }));
  

//history can be used and called as a prop  

const ProductScreen = ({history, match}) => {
    const classes = useStyles()
    const [qty, setQty] = useState(1)
    const [rating, setRating]= useState(0)
    const [comment, setComment]= useState('')
    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails )
    const { product, error, loading} = productDetails

    const productReviewCreate = useSelector(state => state.productReviewCreate )
    const { success: successProductReview, error: errorProductReview} = productReviewCreate

    const userLogin = useSelector(state => state.userLogin )
    const { userInfo} = userLogin

    useEffect(()=>{
        if(successProductReview){
            alert('Review Submitted')
            setRating(0)
            setComment('')
            dispatch({type: PRODUCT_CREATE_REVIEW_RESET})
        }
        dispatch(listProductDetails(match.params.id))
    },[match, dispatch, successProductReview])

    
    const addToCartHandler = () => {
        history.push( `/cart/${match.params.id}?qty=${qty}`)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createProductReview(match.params.id, {
            rating,
            comment
        }))
    }
    return (
        <div>
            <Link to='/' className='link-style' >
                <Button color='primary' variant='outlined'>
                    Go Back
                </Button>
            </Link>
            {loading ? <LinearProgress/> : error ? <Message severity='error'>{error}</Message>: (
                <div>
                <Grid container spacing={2} className={classes.gridclass}>
                    <Grid item xs={12} md={6}>
                        <img src={product.image} alt={product.name} width='100%' height='auto'/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
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
                    <Grid item sm={6} xs={12} md={3}>
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
                                        <FormControl  fullWidth size='small' >
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
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                        <h2>REVIEWS</h2>
                        {product.reviews.length === 0 && <Message>No Reviews</Message>}
                        <List>                    
                            {product.reviews.map((review)=> (
                                <ListItem key={review._id}>
                                   <Card className={classes.root}>
                                   <CardHeader
                                       avatar={
                                           <Avatar>{review.name.substring(0,1)}</Avatar>
                                       }
                                       title={<h3 style={{ margin:0}}>{review.name}</h3> }
                                       subheader={`Reviewed on ${review.createdAt.substring(0,10)}`}
                                   />
                                    <CardContent>
                                        <Ratings value={review.rating}/>
                                        <p>{review.comment}</p>
                                        </CardContent>
                                    </Card> 
                                </ListItem>
                            ))}
                            <ListItem>
                            <div style={{ width: '100%'}}>
                                <h2>Write a Customer Review</h2>
                                {errorProductReview && <Message severity='error'>{errorProductReview}</Message>}
                                {userInfo ? (
                                    <form onSubmit={submitHandler}>
                                        <Box py={2} >
                                        <InputLabel>Rating</InputLabel>
                                        <FormControl className={classes.margin} fullWidth size='small' >
                                                <Select
                                                
                                                labelId="demo-simple-select-outlined-label"
                                                id="demo-simple-select-outlined"
                                                value={rating}
                                                onChange={e => setRating(e.target.value)}
                                                label="Age"
                                                >
                                                <MenuItem value='0'><em>Select...</em></MenuItem>
                                                <MenuItem value='1'>1 - Poor</MenuItem>
                                                <MenuItem value='2'>2 - Fair</MenuItem>
                                                <MenuItem value='3'>3 - Good</MenuItem>
                                                <MenuItem value='4'>4 - Very Good</MenuItem>
                                                <MenuItem value='5'>5 - Excellent</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Box>
                                        <Box py={2}>
                                            <InputLabel>Comment</InputLabel>
                                            <TextField className={classes.margin} fullWidth variant='outlined' placeholder='Enter Comment' multiline rows={3}
                                                value={comment} onChange={(e)=> setComment(e.target.value)}
                                            />
                                        </Box>
                                        <Button type='submit' variant='contained'
                                        style={{ backgroundColor: '#393836', color:'#fff'}}>Submit</Button>
                                    </form>
                                ): <Message>
                                    Please <Link to='/login'>sign in</Link> to write a review
                                </Message>}
                                </div>
                            </ListItem>
                        </List>
                </Grid>
            </Grid>
            </div>
            )}
            
        </div>
    )
}

export default ProductScreen
