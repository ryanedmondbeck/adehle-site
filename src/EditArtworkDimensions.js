import React, { useState } from 'react';
import { db } from './firebase';
import './EditArtworkDimensions.css';

function EditArtworkDimensions({ collID, artID, dimensions}) {
    const [edit, setEdit] = useState(false);
    const [data, setData] = useState({});
        
    const handleChange = (e) => {
        e.preventDefault();
        setData({[e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await db
                .collection('collection_list')
                .doc(collID)
                .collection('collection')
                .doc(artID)
                .set(data, { merge: true });
            // console.log(res);
            setEdit(false);
        } catch (error) { console.log(error); }
    }

    const renderEditDimensions = () => {
        if (edit) {
            return (
                <div className="edit-artwork-dimensions">
                    <form onSubmit={handleSubmit}>
                        <label>
                            <textarea type="text" name="dimensions" 
                                value={data.dimensions} 
                                onChange={handleChange}>{dimensions}</textarea>
                        </label>
                        <input type="submit" value="Save" />
                    </form>
                </div>
            )
        }
        else {
            return (
                <div className="edit-artwork-dimensions">
                    <p>Dimensions:</p>
                    <p>{dimensions}</p>
                    <button onClick={() => setEdit(true)}>Edit</button>
                </div>   
            )
        }
    }
    return (
        <div>{renderEditDimensions()}</div>
    )
}

export default EditArtworkDimensions;
