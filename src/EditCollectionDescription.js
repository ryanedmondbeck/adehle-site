import React, { useState } from 'react';
import { db } from './firebase';
import './EditCollectionDescription.css';

function EditCollectionDescription({ id, description }) {
    const [edit, setEdit] = useState(false);
    const [data, setData] = useState({});
        
    const handleChange = (e) => {
        e.preventDefault();
        setData({[e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(i
        try {
            await db
                .collection('collection_list')
                .doc(id)
                .set(data, { merge: true });
            // console.log(res);
            setEdit(false);
        } catch (error) { console.log(error); }
    }

    const renderEditDescription = () => {
        if (edit) {
            return (
                <div className="edit-collection-description">
                    <form onSubmit={handleSubmit}>
                        <label>
                            <textarea 
                                className="edit-collection-description__text-area"
                                type="text" name="description" 
                                value={data.description} 
                                onChange={handleChange}>{description}</textarea>
                        </label>
                        <input type="submit" value="Save" />
                    </form>
                </div>
            )
        }
        else {
            return (
                <div className="edit-collection-description">
                    <p>Description:</p>
                    <p>{description}</p>
                    <button onClick={() => setEdit(true)}>Edit</button>
                </div>   
            )
        }
    }
    return (
        <div>{renderEditDescription()}</div>
    )
}

export default EditCollectionDescription;
