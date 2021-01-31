import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { CssBaseline, Menu, MenuItem } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import { Link, Route } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import AccountCircle from '@material-ui/icons/AccountCircle';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { logout } from '../actions/userActions';
import SearchBox from './SearchBox';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block',
    },
  }
}));

const Header = () => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const logoutHandler = () => {
      handleClose()
      dispatch(logout())

    }
    return (
        <div className={classes.root}>
            <CssBaseline/>
            <AppBar style={{ backgroundColor: '#2A273C'}} position="static">
                <Toolbar>
                <Link to='/' className='link-style'>
                  <Typography variant="h6" className={classes.title}>
                      Shopping App
                  </Typography>
                </Link>
                <Route render={({history})=> <SearchBox history={history}/> }/> 
                <div className={classes.root}/>
                <Link to='/cart' className='link-style' > <Button startIcon={<ShoppingCartIcon/>} color='inherit'>CART</Button></Link>
                {userInfo ? (
                  <div>
                    <Button startIcon={<AccountCircle/>} onClick={handleMenu} color='inherit'>
                        {userInfo.name}
                        <ArrowDropDownIcon/>
                    </Button>
                    <Menu
                      id="menu-appbar"
                      anchorEl={anchorEl}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      open={open}
                      onClose={handleClose}
                    >
                      {userInfo.isAdmin && 
                        <div>
                        <MenuItem onClick={handleClose}><Link className='link-style' to='/admin/userlist'>Users </Link></MenuItem>
                        <MenuItem onClick={handleClose}><Link className='link-style' to='/admin/productlist'>Products </Link></MenuItem>
                        <MenuItem onClick={handleClose}><Link className='link-style' to='/admin/orderlist'>Orders </Link></MenuItem>

                        </div>
                       }
                      <MenuItem onClick={handleClose}><Link className='link-style' to='/profile'> Profile</Link></MenuItem>
                      <MenuItem onClick={logoutHandler}>LogOut</MenuItem>
                    </Menu>
                  </div>
                ):
                (<Link to='/login' className='link-style' ><Button startIcon={<AccountCircleIcon/>} color="inherit">SIGN IN</Button></Link>)
                }
                
                </Toolbar>
              </AppBar>
        </div>
    )
}

export default Header
