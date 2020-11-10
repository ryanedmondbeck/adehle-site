import React, { useContext, useState } from 'react';
import { ArtworkContext } from './contexts/ArtworkContext';

function Artwork() {
    const [artwork] = useContext(ArtworkContext);
    const [image, setImage] = useState();

    const artwork_display = [];
    if (artwork) {
        artwork_display.push(
            <div>
                <img src={artwork.imurl[0]} alt="" />
            </div>
        );
        if (artwork.imurl.length > 1) {
            for (let i = 1; i < (artwork.imurl.length); i++) {
                artwork_display.push(
                    <div>
                        <img src={artwork.imurl[i]} alt="" />
                    </div>
                );
            }
        }
        return (<div className="artwork">{artwork_display}</div>);
    } else {
        if (image) setImage(null);
        return (
            <div className="artwork"></div>
        )
    }  
}

export default Artwork;
