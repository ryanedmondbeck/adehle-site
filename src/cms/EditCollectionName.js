import React, { useState } from 'react';
import { db } from '../firebase';
import './EditCollectionName.css';

function EditCollectionName({ id, name }) {
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
                .doc(id)
                .set(data, { merge: true });
            // console.log(res);
            setEdit(false);
        } catch (error) { console.log(error); }
    }

    const renderEditName = () => {
        if (edit) {
            return (
                <div className="edit-collection-name">
                    <form onSubmit={handleSubmit}>
                        <label>
                            <input type="text" name="name" placeholder={name}
                                value={data.name} 
                                onChange={handleChange}/>
                        </label>
                        <input type="submit" value="Save" />
                    </form>
                </div>
            )
        }
        else {
            return (
                <div className="edit-collection-name">
                    <p>Name:</p>
                    <p>{name}</p>
                    <button onClick={() => setEdit(true)}>Edit</button>
                </div>   
            )
        }
    }
    return (
        <div>{renderEditName()}</div>
    )
}

export default EditCollectionName;
