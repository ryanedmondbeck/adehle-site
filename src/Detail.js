import React from 'react';
import './Detail.css';
import DetailEmail from './DetailEmail';

function Detail({ detail, price, title }) {
    return (
        <div className="detail-b">
            <p>The asking price is ${price}.</p>
            <p>If you are interested in purchasing this work of art or have any questions, please fill out the form below.</p>
            <DetailEmail title={title} price={price} />
        </div>
    )
}

export default Detail
