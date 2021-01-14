import React, { useState, useContext, useEffect } from 'react';
import './CollectionListM.css';

// import Collection from './Collection';
// import './Collection.css';
import { ArtworkContext } from '../contexts/ArtworkContext';

import firebase from '../firebase';

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
    const [, setArtwork] = useContext(ArtworkContext);
    const [expanded, setExpanded] = useState({});
    
    // useEffect(() => {
    //     setTimeout(() => {console.log(expanded);}, 2000);
    // })
 
    const handleClick = (id) => {
        setArtwork(null);
        if (expanded === id) {
            setExpanded(null);
        }
        else {
            setExpanded(id);
        }   
    }
    const lists = useLists();

    const renderCollectionList = () => {
        const collection_list_accordion = lists.map(coll =>  (
            <div key={coll.id}>
                <button onClick={() => handleClick(coll.id)} >
                    {coll.name}
                </button>
                {/* <p>{coll.description}</p> */}
                {/* <Collection 
                    collectionID={coll.id} 
                    description={coll.description} 
                    expanded={expanded} 
                /> */}
            </div>
        ));
        return collection_list_accordion;
    }

    return (
        <div className="collection-list-m">
            {renderCollectionList()}
        </div>
    )
}

export default CollectionList;
