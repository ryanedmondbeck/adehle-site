import React, { useContext, useState, useEffect } from 'react';
import { ArtworkContext } from './contexts/ArtworkContext';
import firebase from './firebase';

function useCollection(collectionID) {
    const [collection, setCollection] = useState([]);
    useEffect(() => {
        const unsubscribe = firebase
            .firestore()
            .collection('collection_list')
            .doc(collectionID)
            .collection('collection')
            .orderBy('index')
            .onSnapshot(snapshot => {
                const artwork_list = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }))
                setCollection(artwork_list);
            })
        return () => unsubscribe();
    }, [])
    return collection;
}

function Collection({ collectionID, description, expanded }) {
    const [, setArtwork] = useContext(ArtworkContext);

    const handleClick = (collID, artID, materials, dimensions, images, imurl) => {
        setArtwork({collID, artID, materials, dimensions, images, imurl});
    }

    const collection = useCollection(collectionID);

    const renderCollection = () => {
        const artwork_list = collection.map(art => (
            <div key={art.id}>
                <button onClick={() => handleClick(
                    collectionID, 
                    art.id, 
                    art.materials, 
                    art.dimensions, 
                    art.images,
                    art.imurl
                )}>{art.title}</button>
            </div>
        ));
        return artwork_list;
    }
    return (
        <div>
            <div className={`description ${(expanded === collectionID) ? "" : "description--collapsed"}`}>
                {description}
            </div>
            <div className={`collection ${(expanded === collectionID) ? "" : "collection--collapsed"}`}>
                {/* <p>Artwork:</p> */}
                {renderCollection()}
            </div>
        </div>
    )
}

export default Collection;
