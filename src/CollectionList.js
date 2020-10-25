import React, { useState, useContext, useEffect } from 'react';

import Collection from './Collection';
import './Collection.css';
// import { CollectionContext } from './contexts/CollectionContext';
import { ArtworkContext } from './contexts/ArtworkContext';

import firebase from './firebase';


function useLists() {
    const [collectionList, setCollectionList] = useState([]);
    useEffect(() => {
        const unsubscribe = firebase
            .firestore()
            .collection('collection_list')
            .orderBy('index')
            .onSnapshot((snapshot) => {
                const newList = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }))
                setCollectionList(newList);
            })
        return () => unsubscribe();
    }, []) // need empty array so that this function isn't repeatedly called
    return collectionList;
}

function CollectionList() {
    // const [collections] = useContext(CollectionContext);
    const [, setArtwork] = useContext(ArtworkContext);
    // let collection_list_accordion = [];
    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
        setArtwork({});
    };

    const lists = useLists();

    const renderCollectionList = () => {
        const collection_list_accordion = lists.map(coll =>  (
            <div key={coll.id}>
                <button>{coll.name}</button>
                <Collection collectionID={coll.id}/>
            </div>
        ));
        return collection_list_accordion;
    }

    return (
        <div className="collectionList">
            {renderCollectionList()}
        </div>
    )
}

export default CollectionList;
