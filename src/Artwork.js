import React, { useContext, useState, useEffect } from 'react';
import { ArtworkContext } from './contexts/ArtworkContext';
import CrossfadeImage from 'react-crossfade-image';

function Artwork() {
    const [artwork, setArtwork] = useContext(ArtworkContext);

    const handlClick = () => {
        let i = (artwork.index + 1) % artwork.imurl.length;
        setArtwork({...artwork, index: i});
    }
    useEffect(() => {
        console.log(artwork);
    })
    const renderNext = () => {
        if (artwork.imurl.length > 1) {
            return (
                <button onClick={() => handlClick()}className="artwork__next">next</button>
            )
        }
    }
    if (artwork) {
        return (
            <div className={`artwork ${(artwork) ? "" : "artwork--hidden"}`}>
                <CrossfadeImage src={artwork.imurl[artwork.index]} duration={1200}/>
                {renderNext()}
            </div>
        )
    }
    else {
        return(<div className={`artwork ${(artwork) ? "" : "artwork--hidden"}`}></div>)
    }   
}

export default Artwork;
