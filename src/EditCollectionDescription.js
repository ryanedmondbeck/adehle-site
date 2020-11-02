import React, { useState } from 'react';
import { db } from './firebase';

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
        const res = await db
            .collection('collection_list')
            .doc(id)
            .set(data, { merge: true });
        console.log(res);
        setEdit(false);
    }

    const renderEditDescription = () => {
        if (edit) {
            return (
                <div>
                    <form onSubmit={handleSubmit}>
                        <label>
                            <textarea type="text" name="description" placeholder="Collection Description"
                                value={data.description} 
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