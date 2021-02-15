import React, { useState, useContext, useEffect } from 'react';

import Collection from './Collection';
import './Collection.css';
import { ArtworkContext } from './contexts/ArtworkContext';
import Detail from './Detail';

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
    const [, setArtwork] = useContext(ArtworkContext);
    const [expanded, setExpanded] = useState({});
    const [detail, setDetail] = useState(false);
    const [price, setPrice] = useState();
    const [title, setTitle] = useState();
    
    // useEffect(() => {
    //     setTimeout(() => {console.log(expanded);}, 2000);
    // })
 
    const handleClick = (id) => {
        setDetail(false);
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
                <Collection 
                    collectionID={coll.id} 
                    description={coll.description} 
                    expanded={expanded} 
                    detail={detail}
                    setDetail={setDetail}
                    setPrice={setPrice}
                    setTitle={setTitle}
                />
            </div>
        ));
        return collection_list_accordion;
    }
    return (
        <div className="collectionList">
            {renderCollectionList()}
            <div className={`detail ${(detail) ? "" : "detail--collapsed"}`}>
                <Detail detail={detail} price={price} title={title} />
            </div>
        </div>
    )
}

export default CollectionList;
