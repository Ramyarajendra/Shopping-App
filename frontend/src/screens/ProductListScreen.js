import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { deleteUser, listUsers } from '../actions/userActions'
import {Button, Grid, IconButton, LinearProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@material-ui/core'
import Message from '../components/Message'
import ClearIcon from '@material-ui/icons/Clear';
import CheckIcon from '@material-ui/icons/Check';
import { Link } from 'react-router-dom'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import { listProducts, deleteProduct, createProduct } from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'


const ProductListScreen = ({history, match}) => {
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const {error, loading, products} = productList

    const productDelete = useSelector(state => state.productDelete)
    const {error: errorDelete, loading: loadingDelete, success: successDelete} = productDelete

    const productCreate = useSelector(state => state.productCreate)
    const {error: errorCreate, loading: loadingCreate, success: successCreate, product: createdProduct} = productCreate


    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin


    useEffect(() => {
        dispatch({type: PRODUCT_CREATE_RESET})
        if(!userInfo.isAdmin){
            history.push('/login')
        }
        if(successCreate){
            history.push(`/admin/product/${createdProduct._id}/edit`)
        }else{
            dispatch(listProducts())
        }
    },[dispatch, history, userInfo, successDelete, createdProduct, successCreate])

    const deleteHandler = (id) => {
        if(window.confirm('Are you sure')){
            dispatch(deleteProduct(id))
        }
    }
    const createProductHandler = () =>{
        dispatch(createProduct())

    }
    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs>
                    <h1>Products</h1>
                </Grid>
                <Grid item xs container justify='flex-end' alignItems='center'>
                    <Grid>
                        <Button startIcon={<AddIcon/>} onClick={createProductHandler} style={{ backgroundColor: '#393836', color:'#fff'}}>
                            Create Product
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
            {loadingDelete && <LinearProgress/> }
            {errorDelete && <Message severity='error'>{errorDelete}</Message>}
            {loadingCreate && <LinearProgress/> }
            {errorCreate && <Message severity='error'>{errorCreate}</Message>}
            {loading ? <LinearProgress/> : error ? <Message severity='error'>{error}</Message> :(
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><strong>ID</strong></TableCell>
                                <TableCell><strong>NAME</strong></TableCell>
                                <TableCell><strong>PRICE</strong></TableCell>
                                <TableCell><strong>CATEGORY</strong></TableCell>
                                <TableCell><strong>BRAND</strong></TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products.map((product)=> (
                                <TableRow key={product._id}>
                                    <TableCell>{product._id}</TableCell>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell>${product.price}</TableCell>
                                    <TableCell>{product.category}</TableCell>
                                    <TableCell>{product.brand}</TableCell>
                                    <TableCell>
                                        <Link to={`/admin/product/${product._id}/edit`}>
                                            <IconButton><EditIcon/></IconButton>
                                        </Link>
                                        <IconButton onClick={()=> deleteHandler(product._id)}><DeleteIcon/></IconButton>
                                    </TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </>
    )
}

export default ProductListScreen
