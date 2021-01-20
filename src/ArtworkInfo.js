import React, { useContext } from 'react';
import './ArtworkInfo.css';
import { ArtworkContext } from './contexts/ArtworkContext';

function ArtworkInfo({ dimensions, materials, id, show, purchase }) {
    const [artwork] = useContext(ArtworkContext);
    
    const renderPurchaseOption = () => {
        if (purchase) {
            return (
                <button>Available for purchase -- see options</button>
            )
        }
        else {
            return (
                <p>Unavailable for purchase</p>
            )
        }
    }
    return (
        <div key={id} className={`artwork-info ${(show === id && artwork != null) ? "" : "artwork-info--collapsed"}`}>
            <p>{dimensions}</p>
            <p>{materials}</p>
            {renderPurchaseOption()}
        </div>
    )
}

export default ArtworkInfo;
