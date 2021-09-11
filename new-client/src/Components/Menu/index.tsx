/* eslint-disable no-nested-ternary */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/no-unresolved */
import React from 'react';
import './index.css';

const Menu = ({ show }:any) => (
    <div>
        <div id="contextMenu" className="context-menu" style={{ ...show, zIndex: '100' }}>
            <ul className="menu">
                <li className="share">
                    <a href="/">
                        <i className="fa fa-share" aria-hidden="true" />
                        {' '}
                        Share
                    </a>
                </li>
                <li className="rename">
                    <a href="/">
                        <i className="fa fa-pencil" aria-hidden="true" />
                        {' '}
                        Rename
                    </a>
                </li>
                <li className="link">
                    <a href="/">
                        <i className="fa fa-link" aria-hidden="true" />
                        {' '}
                        Copy Link Address
                    </a>
                </li>
                <li className="copy">
                    <a href="/">
                        <i className="fa fa-copy" aria-hidden="true" />
                        {' '}
                        Copy to
                    </a>
                </li>
                <li className="paste">
                    <a href="/">
                        <i className="fa fa-paste" aria-hidden="true" />
                        {' '}
                        Move to
                    </a>
                </li>
                <li className="download">
                    <a href="/">
                        <i className="fa fa-download" aria-hidden="true" />
                        {' '}
                        Download
                    </a>
                </li>
                <li className="trash">
                    <a href="/">
                        <i className="fa fa-trash" aria-hidden="true" />
                        {' '}
                        Delete
                    </a>
                </li>
            </ul>
        </div>
    </div>

);

export default Menu;
