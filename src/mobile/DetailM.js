import React from 'react';
import './DetailM.css'
import { useLocation } from "react-router-dom";


function DetailM() {
    const location = useLocation();
    return (
        <div className="detail-m">
            <p>Purchase Details</p>
            <div className="detail-m__preview">
                <div className="detail-m__left">
                    <img key={location.state.id + location.state.index} src={location.state.imurl[0]} alt="" />
                </div>
                <div className="detail-m__right">
                    <p>{location.state.title}</p>
                    <p>{location.state.dimensions}</p>
                    <p>{location.state.materials}</p>
                </div>
            </div>
        </div>
    )
}

export default DetailM;
