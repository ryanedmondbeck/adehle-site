import React, { useState, useEffect } from 'react';
import './CollectionM.css';
import firebase from '../firebase';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { Link } from "react-router-dom";

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

function Collection({ collectionID, description, expanded, setParentShow, setTransition }) {

    const collection = useCollection(collectionID);

    const renderImages = (id, index, imurl) => {
        let images = []
        for (let i = 0; i < imurl.length; i++) {
            images.push(<img key={id + index} src={imurl[i]} alt="" />)
        }
        return images;
    }

    const renderPurchaseOption = (purchase, title, dimensions, materials, id, index, imurl) => {
        if (purchase) {
            return (
                <div>
                    <Link to={{
                        pathname: '/detail-mobile',
                        state: {
                            purchase: purchase,
                            title: title,
                            dimensions: dimensions,
                            materials: materials,
                            id: id,
                            index: index,
                            imurl: imurl
                        }
                    }}>Available for purchase -- see details</Link>
                </div>
            )
        }
        else {
            return (
                <p>Unavailable for purchase</p>
            )
        }
    }

    const renderCollection = () => {
        const artwork_list = collection.map(art => (
            <div className="collection-m__art" key={art.id}>
                <p>{art.title}</p>
                {renderImages(art.id, art.index, art.imurl)}
                <div className="collection-m__art__description">
                    <p>{art.dimensions}</p>
                    <p>{art.materials} </p>
                    {renderPurchaseOption(art.purchase, art.title, art.dimensions, art.materials, art.id, art.index, art.imurl)}
                </div>
            </div>
        ));
        return artwork_list;
    }
    return (
        <div className={`collection-m ${(expanded === collectionID) ? "" : "collection-m--collapsed"}`}>
            <p>{description}</p>
            {renderCollection()}
            <button onClick={() => {setParentShow(true)}}><ExpandLessIcon fontSize="large"/></button>
        </div>
    )
}

export default Collection;
