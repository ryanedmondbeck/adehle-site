import React, { useContext, useEffect } from 'react';
import { ArtworkContext } from './contexts/ArtworkContext';
import ArtworkImage from './ArtworkImage';
import './ArtworkImage.css';
import TinyCrossfade from "react-tiny-crossfade";
// import ReactCSSTransitionReplace from 'react-css-transition-replace';


function Artwork() {
    const [artwork, setArtwork] = useContext(ArtworkContext);

    const handleClick = () => {
        let i = (artwork.index + 1) % artwork.imurl.length;
        setArtwork({...artwork, index: i});
    }
    // useEffect(() => {
    //     // console.log(artwork);
    //     if (artwork) {
    //         console.log("id in Artwork.js:", artwork.artID);
    //     }
    // });
    const renderNext = () => {
        if (artwork.imurl.length > 1) {
            return (
                <button onClick={() => handleClick()}className="artwork__next">more images »</button>
            )
        }
    }
    if (artwork) {
        return (
            <div className={`artwork ${(artwork) ? "" : "artwork--hidden"}`}>
                <TinyCrossfade className="component-wrapper"> 
                    <ArtworkImage key={artwork.artID} artwork={artwork} />  
                </TinyCrossfade>
                {renderNext()}
            </div>
        )
    }
    else {
        return(<div className={`artwork ${(artwork) ? "" : "artwork--hidden"}`}></div>)
    }   
}

export default Artwork;
