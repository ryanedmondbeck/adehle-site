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

function Collection({ collectionID }) {

    const [, setArtwork] = useContext(ArtworkContext);

    const handleClick = (collID, artID, materials, dimensions, images) => {
        setArtwork({collID, artID, materials, dimensions, images});
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
                    art.images
                )}>{art.title}</button>
                {/* <p>{art.dimensions}</p>
                <p>{art.materials}</p> */}
            </div>
        ));
        return artwork_list;
    }
    return (
        <div className="collection">
            {renderCollection()}
        </div>
    )
}

export default Collection;
