import React, { useState } from 'react';
import { db } from '../firebase';
import './EditCollectionIndex.css';

function EditCollectionIndex({ id, index }) {
    const [edit, setEdit] = useState(false);
    const [data, setData] = useState({});
        
    const handleNumChange = (e) => {
        e.preventDefault();
        setData({[e.target.name]: parseInt(e.target.value) })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await db
                .collection('collection_list')
                .doc(id)
                .set(data, { merge: true });
            // console.log(res);
            setEdit(false);
        } catch (error) { console.log(error); }
    }

    const renderEditIndex = () => {
        if (edit) {
            return (
                <div>
                    <form onSubmit={handleSubmit}>
                        <label>
                            <input type="number" name="index" 
                                value={data.index} 
                                onChange={handleNumChange}/>
                        </label>
                        <input type="submit" value="Save" />
                    </form>
                </div>
            )
        }
        else {
            return (
                <div className="edit-collection-index">
                    <p className="edit-collection-index__index">{index}</p>
                    <button onClick={() => setEdit(true)}>Edit</button>
                </div>   
            )
        }
    }
    return (
        <div>{renderEditIndex()}</div>
    )
}

export default EditCollectionIndex;
