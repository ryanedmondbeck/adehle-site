import React, { useState, useEffect } from 'react';
import EditArtworkTitle from './EditArtworkTitle';
import EditArtworkDimensions from './EditArtworkDimensions';
import EditArtworkMaterials from './EditArtworkMaterials';
import EditArtworkIndex from './EditArtworkIndex';
import EditArtworkImages from './EditArtworkImages';

import firebase, { db } from './firebase';

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
function EditArtwork({ collectionID }) {

    const handleDelete = async (collID, artID, e) => {
        e.preventDefault();
        // console.log(id);
        if (window.confirm('Are you sure you want to delete this artwork?')) {
            try {
                const res = await db
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
                <div>
                    <p>Title:</p>
                    <EditArtworkTitle collID={collectionID} artID={art.id} title={art.title}/>
                </div>
                <div>
                    <p>Dimensions:</p>
                    <EditArtworkDimensions collID={collectionID} artID={art.id} dimensions={art.dimensions}/>
                </div>
                <div>
                    <p>Materials:</p>
                    <EditArtworkMaterials collID={collectionID} artID={art.id} materials={art.materials}/>
                </div>
                <div>
                    <p>Index:</p>
                    <EditArtworkIndex collID={collectionID} artID={art.id} index={art.index}/>
                </div>
                <div>
                    <p>Images:</p>
                    <EditArtworkImages collID={collectionID} artID={art.id} images={art.images} urls={art.imurl}/>
                </div>
                <button onClick={(e) => handleDelete(collectionID, art.id, e)}>Delete Artwork</button>
            </div>
        ));
        return artwork;
    }

    return (
        <div className="edit-artwork">
            {renderCollection()}
        </div>
    )
}

export default EditArtwork;
