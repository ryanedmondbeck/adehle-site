import React, { useState } from 'react';
import { db } from '../firebase';
import './EditArtworkMaterials.css';

function EditArtworkMaterials({ collID, artID, materials}) {
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

    const renderEditMaterials = () => {
        if (edit) {
            return (
                <div className="edit-artwork-materials">
                    <form onSubmit={handleSubmit}>
                        <label>
                            <textarea type="text" name="materials" 
                                value={data.materials} 
                                onChange={handleChange}>{materials}</textarea>
                        </label>
                        <input type="submit" value="Save" />
                    </form>
                </div>
            )
        }
        else {
            return (
                <div className="edit-artwork-materials">
                    <p>Materials:</p>
                    <p>{materials}</p>
                    <button onClick={() => setEdit(true)}>Edit</button>
                </div>   
            )
        }
    }
    return (
        <div>{renderEditMaterials()}</div>
    )
}

export default EditArtworkMaterials;
