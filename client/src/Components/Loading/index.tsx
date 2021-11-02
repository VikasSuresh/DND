/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import './index.css';

const Loading = () => (
    <svg className="loading" viewBox="0 0 600 300">
        <symbol id="s-text">
            <text textAnchor="middle" x="50%" y="50%" dy=".35em">
                T
            </text>
        </symbol>

        <use xlinkHref="#s-text" className="text" />
        <use xlinkHref="#s-text" className="text" />
        <use xlinkHref="#s-text" className="text" />
        <use xlinkHref="#s-text" className="text" />
        <use xlinkHref="#s-text" className="text" />
    </svg>
);

export default Loading;
