import React, { useState, useEffect } from 'react';
import EditCollectionName from './EditCollectionName';
import EditCollectionDescription from './EditCollectionDescription';
import EditCollectionIndex from './EditCollectionIndex';
import { db } from './firebase';

function useLists() {
    const [collectionList, setCollectionList] = useState([]);
    useEffect(() => {
        const unsubscribe = db
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

function EditCollection() {

    const list = useLists();

    const renderCollections = () => {
        const collection_list = list.map(coll => (
            <div key={coll.id} className="edit-collection__collection">
                <div>
                    <p>Name:</p>
                    <EditCollectionName id={coll.id} name={coll.name} />
                </div>
                <div>
                    <p>Description:</p>
                    <EditCollectionDescription id={coll.id} description={coll.description} />
                </div>
                <div>
                    <p>Index:</p>
                    <EditCollectionIndex id={coll.id} index={coll.index} />
                </div>
            </div> 
        ));
        return collection_list;
    }

    return (
        <div className="edit-collection">
            {renderCollections()}
        </div>
    )
}

export default EditCollection;
