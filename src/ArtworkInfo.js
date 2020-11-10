import React, { useContext } from 'react';
import './ArtworkInfo.css';
import { ArtworkContext } from './contexts/ArtworkContext';

function ArtworkInfo({ dimensions, materials, id, show }) {
    const [artwork] = useContext(ArtworkContext);
    return (
        <div className={`artwork-info ${(show === id && artwork != null) ? "" : "artwork-info--collapsed"}`}>
            <p>{dimensions}</p>
            <p>{materials}</p>
        </div>
    )
}

export default ArtworkInfo;
