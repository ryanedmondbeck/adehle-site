import React, { useState } from 'react';
import { db } from './firebase';
import './EditArtworkTitle.css';

function EditArtworkTitle({ collID, artID, title}) {
    const [edit, setEdit] = useState(false);
    const [data, setData] = useState({});
        
    const handleChange = (e) => {
        e.preventDefault();
        setData({[e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await db
                .collection('collection_list')
                .doc(collID)
                .collection('collection')
                .doc(artID)
                .set(data, { merge: true });
            console.log(res);
            setEdit(false);
        } catch (error) { console.log(error); }
    }

    const renderEditTitle = () => {
        if (edit) {
            return (
                <div className="edit-artwork-title">
                    <form onSubmit={handleSubmit}>
                        <label>
                            <textarea type="text" name="title" 
                                value={data.title} 
                                onChange={handleChange}>{title}</textarea>
                        </label>
                        <input type="submit" value="Save" />
                    </form>
                </div>
            )
        }
        else {
            return (
                <div className="edit-artwork-title">
                    <p>Title:</p>
                    <p>{title}</p>
                    <button onClick={() => setEdit(true)}>Edit</button>
                </div>   
            )
        }
    }
    return (
        <div>{renderEditTitle()}</div>
    )
}

export default EditArtworkTitle;
