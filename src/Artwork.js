import React, { useContext } from 'react';
import { ArtworkContext } from './contexts/ArtworkContext';
import ArtworkImage from './ArtworkImage';
import './ArtworkImage.css';
// import TinyCrossfade from "react-tiny-crossfade";
// import ReactCSSTransitionReplace from 'react-css-transition-replace';
// import { TransitionGroup, CSSTransition } from 'react-transition-group'


function Artwork() {
    const [artwork, setArtwork] = useContext(ArtworkContext);

    const handleClick = () => {
        let i = (artwork.index + 1) % artwork.imurl.length;
        setArtwork({...artwork, index: i});
    }
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
                <div>
                    <ArtworkImage key={artwork.artID} artwork={artwork} />  
                </div>
                <div>
                    {renderNext()} 
                </div>     
            </div>
        )
    }
    else {
        return(<div className={`artwork ${(artwork) ? "" : "artwork--hidden"}`}></div>)
    }   
}

export default Artwork;
