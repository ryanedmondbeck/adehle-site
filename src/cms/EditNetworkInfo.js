import React, { useState } from 'react';
import { db } from '../firebase';
import './EditNetworkInfo.css';

function EditNetworkInfo({ id, info, type }) {
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
                .collection('network')
                .doc(id)
                .set(data, { merge: true });
            // console.log(res);
            setEdit(false);
        } catch (error) { console.log(error); }
    }

    const renderEditInfo = () => {
        if (edit) {
            return (
                <div className="edit-network-info">
                    <form onSubmit={handleSubmit}>
                        <label>
                            <input type="text" name={type} placeholder={info}
                                value={data.info} 
                                onChange={handleChange}/>
                        </label>
                        <input type="submit" value="Save" />
                    </form>
                </div>
            )
        }
        else {
            return (
                <div className="edit-network-info">
                    <p>{type}:</p>
                    <p>{info}</p>
                    <button onClick={() => setEdit(true)}>Edit</button>
                </div>   
            )
        }
    }
    return (
        <div>{renderEditInfo()}</div>
    )
}

export default EditNetworkInfo;
