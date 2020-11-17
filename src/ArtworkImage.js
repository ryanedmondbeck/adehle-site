import React from 'react';

function ArtworkImage({ artwork }) {
  
    return (
            <img key={artwork.id} src={artwork.imurl[artwork.index]} />
    )
}

export default ArtworkImage;
