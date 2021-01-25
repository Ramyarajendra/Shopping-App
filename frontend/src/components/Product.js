import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Box } from '@material-ui/core';
import Ratings from './Ratings';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) =>({
  root: {
    width:'100%',
    height:'100%',
    display: 'flex',
    flexDirection: 'column'
  },
  media: {
    width: '100%',
  },
  stylename: {
      '&:hover':{
          color:'#E8A425'
      }
  }
}));

const Product = ({product}) => {
    const classes = useStyles();
    return (
            <Card className={classes.root}>
                <CardActionArea>
                    <Link to={ `/product/${product._id}` } >
                        <CardMedia
                        className={classes.media}
                        image={product.image}
                        component="img"
                        title={product.name}
                        />
                    </Link>
                    <CardContent>
                        <Link to={ `/product/${product._id}` } className='link-style' >
                            <Typography className={classes.stylename} gutterBottom variant="h6"  component="h3">
                                {product.name}
                            </Typography>
                        </Link>
                                <Typography variant="body2" color="textSecondary" component='div'>
                                    <Ratings value={product.rating} text={`${product.numReviews} reviews`}/>
                                </Typography>
                                <Typography variant="h6" component="p">
                                    ${product.price}
                                </Typography>
                    </CardContent>
                </CardActionArea>
                {/* <CardActions>
                    <Button size="small" color="primary">
                    Share
                    </Button>
                    <Button size="small" color="primary">
                    Learn More
                    </Button>
                </CardActions> */}
            </Card>
    )
}

export default Product
