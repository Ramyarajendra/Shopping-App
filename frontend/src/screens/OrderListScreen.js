import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { deleteUser, listUsers } from '../actions/userActions'
import {Button, IconButton, LinearProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@material-ui/core'
import Message from '../components/Message'
import ClearIcon from '@material-ui/icons/Clear';
import CheckIcon from '@material-ui/icons/Check';
import { Link } from 'react-router-dom'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { listOrders } from '../actions/orderActions'


const OrderListScreen = ({history}) => {
    const dispatch = useDispatch()
    const orderList = useSelector(state => state.orderList)
    const {error, loading, orders} = orderList

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    useEffect(() => {
        if(userInfo && userInfo.isAdmin){
            dispatch(listOrders())
        }else{
            history.push('/login')
        }
    },[dispatch, history, userInfo])

    return (
        <>
            <h1>Orders</h1>
            {loading ? <LinearProgress/> : error ? <Message severity='error'>{error}</Message> :(
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><strong>ID</strong></TableCell>
                                <TableCell><strong>USER</strong></TableCell>
                                <TableCell><strong>DATE</strong></TableCell>
                                <TableCell><strong>TOTAL</strong></TableCell>
                                <TableCell><strong>PAID</strong></TableCell>
                                <TableCell><strong>DELIVERED</strong></TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders.map((order)=> (
                                <TableRow key={order._id}>
                                    <TableCell>{order._id}</TableCell>
                                    <TableCell>{order.user && order.user.name}</TableCell>
                                    <TableCell>
                                        {order.createdAt.substring(0,10)}
                                    </TableCell>
                                    <TableCell>
                                        ${order.totalPrice}
                                    </TableCell>
                                    <TableCell>{order.isPaid ? 
                                    order.paidAt.substring(0,10): <ClearIcon style={{ color: 'red'}}/>}</TableCell>
                                     <TableCell>{order.isDelivered ? 
                                    order.deliveredAt.substring(0,10): <ClearIcon style={{ color: 'red'}}/>}</TableCell>
                                    <TableCell>
                                        <Link className='link-style' to={`/order/${order._id}`}>
                                            <Button variant='contained' style={{ backgroundColor: '#393836', color:'#fff'}}>
                                                Details
                                            </Button>
                                        </Link>
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

export default OrderListScreen
