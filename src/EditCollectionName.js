import React, { useState } from 'react';
import { db } from './firebase';

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
        const res = await db
                .collection('collection_list')
                .doc(id)
                .set(data, { merge: true });
            console.log(res);
            setEdit(false);
        } catch (error) { console.log(error); }
    }

    const renderEditName = () => {
        if (edit) {
            return (
                <div>
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
                <div>
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
