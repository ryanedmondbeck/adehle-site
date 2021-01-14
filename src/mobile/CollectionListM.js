import React, { useState, useEffect } from 'react';
import './CollectionListM.css';
import CollectionM from './CollectionM';
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
    const [expanded, setExpanded] = useState({});
    const [show, setShow] = useState(true);
    
    // useEffect(() => {
    //     setTimeout(() => {console.log(expanded);}, 2000);
    // })
 
    const handleClick = (id) => {
        (show) ? setShow(false) : setShow(true);
        (expanded === id) ? setExpanded(null) : setExpanded(id);
    }
    const lists = useLists();

    const setParentShow = (b) => {
        console.log(b);
        setShow(b);
        setExpanded(null);
    }

    const renderCollectionList = () => {
        const collection_list_accordion = lists.map(coll =>  (
            <div className={`collection-list-m__collection ${((expanded === coll.id) || (show))
                            ? "" : "collection-list-m__collection--collapsed"}`} key={coll.id}>
                <button onClick={() => handleClick(coll.id)} >
                    {coll.name}
                </button>
                {/* {`${(show) ? "" : "X"}`} */}
                {/* <p>{coll.description}</p>  */}
                <CollectionM 
                    collectionID={coll.id} 
                    description={coll.description} 
                    expanded={expanded} 
                    setParentShow={setParentShow}
                />
            </div>
        ));
        return collection_list_accordion;
    }

    return (
        <div className="collection-list-m">
            <div className="collection-list-m__list">
                {renderCollectionList()}
            </div>
        </div>
        
    )
}

export default CollectionList;
