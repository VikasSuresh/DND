import React from 'react';
import './index.css';
import { Todo as Store } from '../../Store';

const sort = () => (
    <div className="dropdown sort">
        <button
            className="btn btn-default dropdown-toggle"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
        >
            Sort
        </button>
        <ul className="dropdown-menu scrollable-menu" aria-labelledby="dropdownMenuButton1">
            <li><button className="dropdown-item" type="button" onClick={() => Store.setSort('createdAt:asc')}>Created: Asc</button></li>
            <li><button className="dropdown-item" type="button" onClick={() => Store.setSort('createdAt:desc')}>Created: Desc</button></li>
            <li><button className="dropdown-item" type="button" onClick={() => Store.setSort('updatedAt:asc')}>Updated: Asc</button></li>
            <li><button className="dropdown-item" type="button" onClick={() => Store.setSort('updatedAt:desc')}>Updated: Desc</button></li>
            <li><button className="dropdown-item" type="button" onClick={() => Store.setSort('bookmarked:desc')}>Bookmarked</button></li>
            <li><button className="dropdown-item" type="button" onClick={() => Store.setSort('bookmarked:asc')}>Not Bookmarked</button></li>
            <li><button className="dropdown-item" type="button" onClick={() => Store.setSort('priority:desc')}>Prioritized</button></li>
            <li><button className="dropdown-item" type="button" onClick={() => Store.setSort('priority:asc')}>Not Prioritized</button></li>
        </ul>
    </div>
);

export default sort;
