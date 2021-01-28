import React from 'react'
import { AppBar, BottomNavigation, BottomNavigationAction, Box, Button, makeStyles, Toolbar } from '@material-ui/core'
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { Link } from 'react-router-dom'

const useStyles = makeStyles({
    title: {
        flexGrow: 1
    }
})
const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
    const classes = useStyles()

    return (
        <AppBar position='static' color='inherit'>
            <Toolbar>
                <Box className={classes.title} style={{display: 'flex', justifyContent:'space-around'}}>
                    <Box>
                        {step1 ? (
                            <Button><Link className='link-style' to='/login'>Login</Link></Button>
                        ) : (
                            <Button disabled style={{opacity: 0.5}}>Login</Button>
                        )}
                    </Box>
                    <Box>
                        {step2 ? (
                            <Button><Link className='link-style' to='/shipping'>Shipping</Link></Button>
                        ) : (
                            <Button disabled style={{opacity: 0.5}}>Shipping</Button>
                        )}
                    </Box>
                    <Box>
                        {step3 ? (
                            <Button><Link className='link-style' to='/payment'>Payment</Link></Button>
                        ) : (
                            <Button disabled style={{opacity: 0.5}}>Payment</Button>
                        )}
                    </Box>
                    <Box>
                        {step4 ? (
                            <Button><Link className='link-style' to='/placeorder'>Placeorder</Link></Button>
                        ) : (
                            <Button disabled style={{opacity: 0.5}}>Placeorder</Button>
                        )}
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default CheckoutSteps
