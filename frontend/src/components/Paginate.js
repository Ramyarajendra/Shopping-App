import React from 'react'
import Pagination from '@material-ui/lab/Pagination';
import { Link } from 'react-router-dom';
import PaginationItem from '@material-ui/lab/PaginationItem';
import { Box } from '@material-ui/core';

const Paginate = ({pages, page, isAdmin= false , keyword=''}) => {
    return pages > 1 && (
        <Box my={2} pb={4} display='flex' justifyContent='center'>
        <Pagination page={page} count={pages} color='primary'
        renderItem={ x => (
            <PaginationItem
                component={Link}
                to={!isAdmin ? keyword ? `/search/${keyword}/page/${x.page}` : `/page/${x.page}`: `/admin/productlist/${x.page}`}
                {...x}
            />
        )

        }/></Box>
    )
}

export default Paginate
