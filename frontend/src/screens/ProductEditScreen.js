import { Box, Button, Checkbox, FormControlLabel, Grid, InputLabel, LinearProgress, makeStyles, TextField } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import FormContainer from '../components/FormContainer'
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import {listProductDetails, updateProduct} from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';


const useStyles = makeStyles((theme) =>({
   text : {
       marginTop: theme.spacing(2)
   }
  }));
  

const ProductEditScreen = ({location, history, match}) => {
    const classes = useStyles()
    const productId = match.params.id

    const [price, setPrice] = useState(0)
    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')

    
    const dispatch = useDispatch()
    const productDetails = useSelector(state => state.productDetails)

    const {loading, error, product} = productDetails

    const productUpdate = useSelector(state => state.productUpdate)

    const {loading: loadingUpdate, error: errorUpdate, success: successUpdate} = productUpdate


    useEffect(()=> {
        if(successUpdate){
            dispatch({type: PRODUCT_UPDATE_RESET})
            history.push('/admin/productlist')
        }else{
            if(!product.name || product._id !== productId){
                dispatch(listProductDetails(productId))
            }else{
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setBrand(product.brand)
                setCategory(product.category)
                setDescription(product.description)
                setCountInStock(product.countInStock)
                setDescription(product.description)     
            }
        }
    },[product, dispatch, productId, history, successUpdate])

    const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(updateProduct({
            _id: productId,
            name,
            price,
            image,
            brand,
            category,
            description,
            countInStock
        }))
       
    }

    return (

            <>
               <Box my={2}> <Link to='/admin/productlist' className='link-style'>
               <Button variant='outlined' color='primary'>Go Back</Button> </Link></Box>
                <FormContainer>
                        <h1>Edit Product</h1>
                        {loadingUpdate && <LinearProgress/>}
                        {errorUpdate && <Message severity='error'>{errorUpdate}</Message>}
                        {loading ? <LinearProgress/> : error ?  <Message severity='error'>{error}</Message>:
                        <form onSubmit = {submitHandler}>
                            <Box py={2} >
                                <InputLabel>Name </InputLabel>
                                <TextField className={classes.text} variant='outlined' fullWidth type='text' placeholder='Enter Name' value={name} onChange={(e) => setName(e.target.value)} />
                            </Box>
                            <Box py={2} >
                                <InputLabel>Price </InputLabel>
                                <TextField className={classes.text} variant='outlined' fullWidth type='number' placeholder='Enter price' value={price} onChange={(e) => setPrice(e.target.value)} />
                            </Box>
                            <Box py={2} >
                                <InputLabel>Image </InputLabel>
                                <TextField className={classes.text} variant='outlined' fullWidth type='text' placeholder='Enter Image URL' value={image} onChange={(e) => setImage(e.target.value)} />
                            </Box>
                            <Box py={2} >
                                <InputLabel>Brand </InputLabel>
                                <TextField className={classes.text} variant='outlined' fullWidth type='text' placeholder='Enter Brand' value={brand} onChange={(e) => setBrand(e.target.value)} />
                            </Box>
                            <Box py={2} >
                                <InputLabel>Count In Stock </InputLabel>
                                <TextField className={classes.text} variant='outlined' fullWidth type='number' placeholder='Enter CountInStock' value={countInStock} onChange={(e) => setCountInStock(e.target.value)} />
                            </Box>
                            <Box py={2} >
                                <InputLabel>Category </InputLabel>
                                <TextField className={classes.text} variant='outlined' fullWidth type='text' placeholder='Enter Category' value={category} onChange={(e) => setCategory(e.target.value)} />
                            </Box>
                            <Box py={2} >
                                <InputLabel>Description </InputLabel>
                                <TextField className={classes.text} variant='outlined' fullWidth type='text' placeholder='Enter Description' value={description} onChange={(e) => setDescription(e.target.value)} />
                            </Box>
                            <Button size='large' type='submit' variant='contained' style={{ backgroundColor: '#393836', color:'#fff'}} >update</Button>
                        </form>}
                        
                        
                    </FormContainer>
            </>
    )
}

export default ProductEditScreen
