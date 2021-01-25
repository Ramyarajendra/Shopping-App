import { Button, Card, Divider, Grid, List, ListItem, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'
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
  

const ProductScreen = ({match}) => {
    const classes = useStyles()
    const product = products.find( p=> p._id === match.params.id)
    return (
        <div>
            <Link to='/' className='link-style' >
                <Button color='primary' variant='outlined'>
                    Go Back
                </Button>
            </Link>
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
                                <ListItem>
                                    <Button fullWidth style={{ backgroundColor: '#393836', color:'#fff'}}
                                     disabled={product.countInStock === 0}
                                     classes={{ disabled: classes.disabledButton }}
                                     variant='contained'>
                                        Add To Cart
                                    </Button>
                                </ListItem>
                            </List>
                        </Card>
                    </Grid>
            </Grid>
        </div>
    )
}

export default ProductScreen
