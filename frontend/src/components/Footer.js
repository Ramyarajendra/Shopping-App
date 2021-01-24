import { Box, Container } from '@material-ui/core'
import React from 'react'

const Footer = () => {
    return (
        <div>
            <Container>
                <Box display='flex' justifyContent='center' >
                    <Box>Copyright &copy; Shopping App</Box>
                </Box>
            </Container>
        </div>
    )
}

export default Footer
