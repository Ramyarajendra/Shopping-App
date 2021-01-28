import React from 'react'
import { Box, Button, makeStyles, Toolbar } from '@material-ui/core'
import { Link } from 'react-router-dom'

const useStyles = makeStyles({
    title: {
        flexGrow: 1
    }
})
const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
    const classes = useStyles()

    return (
        <div position='static' color='inherit'>
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
                            <Button><Link className='link-style' to='/placeorder'>Place Order</Link></Button>
                        ) : (
                            <Button disabled style={{opacity: 0.5}}>Place Order</Button>
                        )}
                    </Box>
                </Box>
            </Toolbar>
        </div>
    )
}

export default CheckoutSteps
