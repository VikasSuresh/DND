import React from 'react';
import ReactPaginate from 'react-paginate';
import { Todo as Store } from '../../Store';
import './index.css';

const BasicPagination = () => (
    <div className="pagination">
        <ReactPaginate
            marginPagesDisplayed={1}
            nextLabel="Next >>>"
            onPageChange={(e) => Store.setPage(e.selected)}
            pageRangeDisplayed={5}
            pageCount={Store.page.totalPageCount}
            previousLabel="<<< Previous"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
        />
    </div>
);

export default BasicPagination;
