import React from 'react'
import products from '../products'
import { Grid} from '@material-ui/core'
import Product from '../components/Product'

const HomeScreen = () => {
    return (
        <>
           <h1>Latest Products</h1> 
           <Grid container spacing={2}>
               {products.map((product)=> (
                    <Grid key={product._id} item xs={12} md={4}>
                        <Product product={product}/>
                    </Grid>
               ))}
           </Grid>
        </>
    )
}

export default HomeScreen
