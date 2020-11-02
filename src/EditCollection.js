import React, { useState, useEffect } from 'react';
import EditCollectionName from './EditCollectionName';
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

    // const [editName, sEditName] = useState(false);
    const [editDescription, sEditDescription] = useState(false);
    const [editIndex, sEditIndex] = useState(false);
    // const [form, setForm] = useState({});
        
    // const handleChange = (e) => {
    //     e.preventDefault();
    //     setForm({[e.target.name]: e.target.value })
    //     // console.log("form: ", e.target.value);
    // }
    // const handleNameSave = async (e, id) => {
    //     console.log(id);
    //     // const res = await db
    //     //     .collection('collection_list')
    //     //     .doc(id)
    //     //     .collection('collection')
    //     //     .add(form);
    //     // console.log(res);
    // }

    // const renderEditName = (id, name) => {
    //     // console.log("editName: ", editName);
    //     if (editName) {
    //         return (
    //             <div>
    //                 <form onSubmit={(e) => handleNameSave(id)}>
    //                     <label>
    //                         <input type="text" name="name" placeholder="Collection Name"
    //                             value={form.name} 
    //                             onChange={handleChange}/>
    //                     </label>
    //                     <input type="submit" value="Save" />
    //                 </form>
    //                 <button onClick={() => sEditName(false)}>Save</button>
    //             </div>
    //         )
    //     }
    //     else {
    //         return (
    //             <div>
    //                 <p>{name}</p>
    //                 <button onClick={() => sEditName(true)}>Edit</button>
    //             </div>   
    //         )
    //     }
    // }


    const renderCollections = () => {
        const collection_list = list.map(coll => (
            <div key={coll.id} className="edit-collection__collection">
                <div>
                    <p>Name:</p>
                    <EditCollectionName id={coll.id} name={coll.name} />
                </div>
                <div>
                    <p>Description:</p>
                    <p>{coll.description}</p>
                    <button>Edit</button>
                </div>
                <div>
                    <p>Index:</p>
                    <p>{coll.index}</p>
                    <button>Edit</button>
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
