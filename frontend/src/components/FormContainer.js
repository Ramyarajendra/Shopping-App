import React from 'react'
import {Container, Grid} from '@material-ui/core'

const FormContainer = ({children}) => {
    return (
        <Container>
            <Grid container spacing={2} justify='center'>
                <Grid item xs={12} md={6}>
                    {children}
                </Grid>
            </Grid>
        </Container>
    )
}

export default FormContainer
