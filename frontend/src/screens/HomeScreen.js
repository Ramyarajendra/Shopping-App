import React, { useEffect } from 'react'
import products from '../products'
import { Grid, LinearProgress} from '@material-ui/core'
import Product from '../components/Product'
import {useDispatch, useSelector} from 'react-redux'
import {listProducts} from '../actions/productActions'
import Message from '../components/Message'
import Paginate from '../components/Paginate'

const HomeScreen = ({match}) => {
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)

    const {loading, error, products, page, pages} = productList

    const keyword = match.params.keyword
    const pageNumber = match.params.pageNumber || 1

    useEffect(()=>{
        dispatch(listProducts(keyword, pageNumber))
    },[dispatch, keyword, pageNumber])

    return (
        <>
           <h1>Latest Products</h1> 
           {loading ? <LinearProgress/>: error ? <Message severity='error'>{error}</Message>:
           <>
           <Grid container spacing={2}>
               {products.map((product)=> (
                    <Grid key={product._id} item xs={12} md={4}>
                        <Product product={product}/>
                    </Grid>
               ))}
           </Grid> 
            <Paginate pages={pages} page={page} keyword={keyword ? keyword: ''}  />
           </> }
           
        </>
    )
}

export default HomeScreen
