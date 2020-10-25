import React, { useContext, useRef, useEffect } from 'react';
import { CollectionContext } from './contexts/CollectionContext';
import { ArtworkContext } from './contexts/ArtworkContext';
import firebase from './firebase';

function Artwork() {
    const [collections] = useContext(CollectionContext);
    const [artwork] = useContext(ArtworkContext);
    const images = require.context('./my_example_artwork', true);

    if (artwork.j != null) {
        // console.log(artwork.i, artwork.j);
        let i = artwork.i;
        let j = artwork.j;
        let image = images(collections[i].collection[j].image);
        console.log(artwork);
      
        return (
            <div className="artwork" style={{ animation: `fadeIn 1s` }}>
                <img src={image} alt="" />
                <p>{collections[i].collection[j].dimensions}</p>
                <p>{collections[i].collection[j].materials}</p>
                {/* more images */}
            </div>
        )
    }
    else {
        return (<div className="artwork" style={{ opacity: 0}}></div>)
    }
}

export default Artwork;
