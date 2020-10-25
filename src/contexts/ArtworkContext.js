import React, { createContext, useState } from 'react';

export const ArtworkContext = createContext();

export const ArtworkProvider = (props) => {
    const [artwork, setArtwork] = useState({});

    return (
        <ArtworkContext.Provider value={[artwork, setArtwork]}>
            {props.children}
        </ArtworkContext.Provider>
    );

}