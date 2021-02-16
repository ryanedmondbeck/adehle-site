import React, { useContext, useState, useEffect } from 'react';
import { ArtworkContext } from './contexts/ArtworkContext';
import firebase from './firebase';
import ArtworkInfo from './ArtworkInfo';

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return collection;
}

function Collection({ collectionID, description, expanded, detail, setDetail, setPrice, setTitle, status, setStatus }) {
    const [, setArtwork] = useContext(ArtworkContext);
    const [show, setShow] = useState({});

    const handleClick = (collID, artID, materials, dimensions, images, imurl, price, title) => {
        setDetail(false);
        setTimeout(() => setStatus('empty'), 2000);
        setPrice(price);
        setTitle(title);
        setArtwork({collID, artID, materials, dimensions, images, imurl, index: 0});
        if (show === artID) {
            setShow(null);
        }
        else {
            setShow(artID);
        }
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
                    art.imurl,
                    art.price,
                    art.title
                )}>{art.title}</button>
                <ArtworkInfo 
                    detail={detail}
                    setDetail={setDetail}
                    dimensions={art.dimensions} 
                    materials={art.materials} 
                    id={art.id}
                    show={show}
                    purchase={art.purchase}/>
            </div>
        ));
        return artwork_list;
    }
    return (
        <div>
            <div className={`description ${(expanded === collectionID) ? "" : "description--collapsed"}`}>
                <p>{description}</p>
            </div>
            <div className={`collection ${(expanded === collectionID) ? "" : "collection--collapsed"}`}>
                {renderCollection()}
            </div>
        </div>
    )
}

export default Collection;
