import React from 'react';
// import { LazyLoadImage } from 'react-lazy-load-image-component';

function ArtworkImage({ artwork }) {
  
    return (
        // <LazyLoadImage
        //     key={artwork.id + artwork.index} 
        //     effect="blur"
        //     placeholderSrc={artwork.imurl[artwork.index]}
        //     src={artwork.imurl[artwork.index]} />
        <img key={artwork.id + artwork.index} src={artwork.imurl[artwork.index]} />
    )
}

export default ArtworkImage;
