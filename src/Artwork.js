import React, { useContext, useState } from 'react';
import { ArtworkContext } from './contexts/ArtworkContext';
import firebase from './firebase';

function Artwork() {
    const [artwork] = useContext(ArtworkContext);
    const [image, setImage] = useState();
    
    const getURL = async () => {
        // let a = artwork; //this should stop setState when artwork changes
        const url = await firebase.storage().ref(artwork.images[0]).getDownloadURL();
        setImage(url);
    }

    if (artwork) {
        // console.log("image:", artwork.images[0]);
        getURL();
        return (
            <div className="artwork">
                <img src={image} alt="" />
                <p>{artwork.dimensions}</p>
                <p>{artwork.materials}</p>
            </div>
        )
    } else {
        if (image) setImage(null);
        return (
            <div className="artwork"></div>
        )
    }  
}

export default Artwork;
