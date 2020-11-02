import React, { useState } from 'react';
import { db } from './firebase';

function EditCollectionName({ id, name }) {
    const [editName, sEditName] = useState(false);
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
        sEditName(false);
    }

    const renderEditName = () => {
        // console.log("editName: ", editName);
        if (editName) {
            return (
                <div>
                    <form onSubmit={handleSubmit}>
                        <label>
                            <input type="text" name="name" placeholder="Collection Name"
                                value={data.name} 
                                onChange={handleChange}/>
                        </label>
                        <input type="submit" value="Save" />
                    </form>
                    {/* <button onClick={() => sEditName(false)}>Save</button> */}
                </div>
            )
        }
        else {
            return (
                <div>
                    <p>{name}</p>
                    <button onClick={() => sEditName(true)}>Edit</button>
                </div>   
            )
        }
    }
    return (
        <div>{renderEditName()}</div>
    )
}

export default EditCollectionName;
