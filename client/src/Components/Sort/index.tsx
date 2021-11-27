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
            <li><button className="dropdown-item" type="button" onClick={() => Store.setSort('start:asc')}>Start: Asc</button></li>
            <li><button className="dropdown-item" type="button" onClick={() => Store.setSort('start:desc')}>Start: Desc</button></li>
            <li><button className="dropdown-item" type="button" onClick={() => Store.setSort('dueDate:asc')}>End: Asc</button></li>
            <li><button className="dropdown-item" type="button" onClick={() => Store.setSort('dueDate:desc')}>End: Desc</button></li>
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
