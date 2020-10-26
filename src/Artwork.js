import React, { useContext, useEffect, useState } from 'react';
import { ArtworkContext } from './contexts/ArtworkContext';
import firebase from './firebase';

function Artwork() {
    const [artwork] = useContext(ArtworkContext);
    const [image, setImage] = useState();
    
    const getURL = async () => {
        const url = await firebase.storage().ref(artwork).getDownloadURL();
        setImage(url);
        // console.log("getURL rendered");
    }
    if (artwork) {
        getURL();
        // console.log("rendered");
        return (
            <div className="artwork">
                {/* <p>loading</p> */}
                <img src={image} alt="" />
            </div>
        
        )
    } else {
        if (image) setImage(null);
        // console.log("rendered");
        return (
            <div className="artwork"></div>
        )
    }  
}

export default Artwork;

//old code

// import React, { useContext, useRef, useEffect } from 'react';
// import { CollectionContext } from './contexts/CollectionContext';
// import { ArtworkContext } from './contexts/ArtworkContext';
// import firebase from './firebase';

// function Artwork() {
//     const [collections] = useContext(CollectionContext);
//     const [artwork] = useContext(ArtworkContext);
//     const images = require.context('./my_example_artwork', true);

//     if (artwork.j != null) {
//         // console.log(artwork.i, artwork.j);
//         let i = artwork.i;
//         let j = artwork.j;
//         let image = images(collections[i].collection[j].image);
//         console.log(artwork);
      
//         return (
//             <div className="artwork" style={{ animation: `fadeIn 1s` }}>
//                 <img src={image} alt="" />
//                 <p>{collections[i].collection[j].dimensions}</p>
//                 <p>{collections[i].collection[j].materials}</p>
//                 {/* more images */}
//             </div>
//         )
//     }
//     else {
//         return (<div className="artwork" style={{ opacity: 0}}></div>)
//     }
// }

// export default Artwork;