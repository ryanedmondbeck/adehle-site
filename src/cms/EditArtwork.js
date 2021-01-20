import React, { useState, useEffect } from 'react';
import EditArtworkTitle from './EditArtworkTitle';
import EditArtworkDimensions from './EditArtworkDimensions';
import EditArtworkMaterials from './EditArtworkMaterials';
import EditArtworkIndex from './EditArtworkIndex';
import EditArtworkImages from './EditArtworkImages';

import firebase, { db } from '../firebase';

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
function EditArtwork({ collectionID, expanded }) {

    const handleDelete = async (collID, artID, e) => {
        e.preventDefault();
        // console.log(id);
        if (window.confirm('Are you sure you want to delete this artwork?')) {
            try {
                await db
                    .collection('collection_list')
                    .doc(collID)
                    .collection('collection')
                    .doc(artID)
                    .delete();
                // console.log(res);
            } catch (error) { console.log(error); }
        }
    }

    const collection = useCollection(collectionID);

    const renderCollection = () => {
        const artwork = collection.map(art => (
            <div key={art.id} className="edit-artwork__artwork">
                <div className="edit-artwork__top">
                    <div className="edit-artwork__index">
                        <EditArtworkIndex collID={collectionID} artID={art.id} index={art.index}/>
                    </div>
                    <div className="edit-artwork__right">
                        <div>
                            <EditArtworkTitle collID={collectionID} artID={art.id} title={art.title}/>
                        </div>
                        <div>
                            <EditArtworkDimensions collID={collectionID} artID={art.id} dimensions={art.dimensions}/>
                        </div>
                        <div>
                            <EditArtworkMaterials collID={collectionID} artID={art.id} materials={art.materials}/>
                        </div>
                    </div>
                </div>
                <div className="edit-artwork__images">
                    <p>Images:</p>
                    <EditArtworkImages collID={collectionID} artID={art.id} images={art.images} urls={art.imurl}/>
                </div>
                <button onClick={(e) => handleDelete(collectionID, art.id, e)}>Delete Artwork</button>
            </div>
        ));
        return artwork;
    }

    return (
        <div className={`edit-artwork ${(expanded === collectionID) ? "" : "edit-artwork--collapsed"}`}>
            {renderCollection()}
        </div>
    )
}

export default EditArtwork;
