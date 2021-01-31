import React from 'react'
import Pagination from '@material-ui/lab/Pagination';
import { Link } from 'react-router-dom';
import PaginationItem from '@material-ui/lab/PaginationItem';

const Paginate = ({pages, page, isAdmin= false , keyword=''}) => {
    return pages > 1 && (
        <Pagination page={page} count={pages} 
        renderItem={ x => (
            <PaginationItem
                component={Link}
                to={!isAdmin ? keyword ? `/search/${keyword}/page/${x.page}` : `/page/${x.page}`: `/admin/productlist/${x.page}`}
                {...x}
            />
        )

        }/>
    )
}

export default Paginate
