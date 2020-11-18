import React from 'react';

function ArtworkImage({ artwork }) {
  
    return (
        <img key={artwork.id + artwork.index} src={artwork.imurl[artwork.index]} />
    )
}

export default ArtworkImage;
