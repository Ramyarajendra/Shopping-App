import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { listTopProducts } from '../actions/productActions'
import {Box, LinearProgress, Typography} from '@material-ui/core'
import Message from '../components/Message'
import {Link} from 'react-router-dom'
import Carousel from 'react-material-ui-carousel'

const ProductCarousel = () => {
    const dispatch = useDispatch()

    const productTopRated = useSelector(state => state.productTopRated)
    const {loading, error, products} = productTopRated

    useEffect(()=> {
        dispatch(listTopProducts())
    },[dispatch])
    return loading ? <LinearProgress/> : error ? <Message severity='error'>{error}</Message> :
    (
        <Carousel animation='slide'>
        
            {products.map(product => (
                <Box display='flex' justifyContent='center' style={{backgroundColor:'#322F48', borderRadius:'8px', marginTop:'10px'}}>
                   
                    <Link className='link-style' to={`/product/${product._id}`} >
                        <Typography variant='h5' className='carousel-header'>{product.name}</Typography>
                        <img src={product.image} alt={product.name}  className='carousel-img'/>
                    </Link>
                </Box>
            ))}
        
        </Carousel>
    )
}

export default ProductCarousel
