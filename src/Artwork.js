import React, { useContext, useState, useEffect } from 'react';
import { ArtworkContext } from './contexts/ArtworkContext';
import CrossfadeImage from 'react-crossfade-image';

function Artwork() {
    const [artwork] = useContext(ArtworkContext);
    const [image, setImage] = useState();

    useEffect(() => {
        console.log("Artwork component mounted or updated");
    });
    if (artwork) {
        return (
            <div className={`artwork ${(artwork) ? "" : "artwork--hidden"}`}>
                <CrossfadeImage src={artwork.imurl[0]} duration={1200}/>
            </div>
        )
    }
    else {
        return(<div className={`artwork ${(artwork) ? "" : "artwork--hidden"}`}></div>)
    }   
}

export default Artwork;
