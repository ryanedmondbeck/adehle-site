import React from 'react';
import './DetailM.css'
import { useLocation } from "react-router-dom";


function DetailM() {
    const location = useLocation();
    return (
        <div className="detail-m">
            <p>{location.state.title}</p>
            <p>{location.state.dimensions}</p>
            <p>{location.state.materials}</p>
        </div>
    )
}

export default DetailM;
