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

function ArtworkImage() {
    const [artwork] = useContext(ArtworkContext);

    const collection = useCollection(artwork.collID);
    console.log('collection: ', collection);

    const renderImages = () => {
        const image_list = collection.map(art => (
            <img key={art.id} src={art.imurl[artwork.index]} 
                className={`image ${(artwork.artID === art.id) ? "" : "image--hidden"}`} />
        ));
        console.log("artworkimage.js, artwork.id:", artwork.artID);
        return image_list;
    }

    return (
        <div className="image-container">
            {renderImages()}
        </div>
    )
}

export default ArtworkImage;
