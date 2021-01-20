import React, { useState } from 'react';
import { db } from '../firebase';
import './EditArtworkPurchaseOption.css';

function EditArtworkPurchaseOption({ collID, artID, purchase}) {
    const [edit, setEdit] = useState(false);
    const [data, setData] = useState({});
        
    const handleChange = (e) => {
        e.preventDefault();
        let setBool = (e.target.value === 'true');
        console.log(setBool);
        setData({[e.target.name]: setBool });
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

    const renderPurchaseOption = () => {
        if (edit) {
            return (
                <div className="edit-artwork-purchase-option">
                    <form onSubmit={handleSubmit}>
                        <label>
                            Purchase option available?
                            <select 
                                type='text'
                                name='purchase'
                                value={data.purchase} 
                                onChange={handleChange}
                            >
                                <option disabled>Purchase option available?</option>
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </select>
                        </label>
                        <input type="submit" value="Save" />
                    </form>
                </div>
            )
        }
        else {
            return (
                <div className="edit-artwork-purchase-option">
                    <p>Purchase Option:</p>
                    <p>{purchase.toString()}</p>
                    <button onClick={() => setEdit(true)}>Edit</button>
                </div>   
            )
        }
    }
    return (
        <div>{renderPurchaseOption()}</div>
    )
}

export default EditArtworkPurchaseOption;
