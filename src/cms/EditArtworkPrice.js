import React, { useState } from 'react';
import { db } from '../firebase';
import './EditArtworkPrice.css';

function EditArtworkPrice({ collID, artID, price}) {
    const [edit, setEdit] = useState(false);
    const [data, setData] = useState({});
        
    const handleNumChange = (e) => {
        e.preventDefault();
        setData({[e.target.name]: parseInt(e.target.value) })
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

    const renderEditPrice = () => {
        if (edit) {
            return (
                <div>
                    <form onSubmit={handleSubmit}>
                        <label>
                            <input type="number" name="price" 
                                value={data.price} 
                                onChange={handleNumChange}/>
                        </label>
                        <input type="submit" value="Save" />
                    </form>
                </div>
            )
        }
        else {
            return (
                <div className="edit-artwork-price">
                    <p>Price</p>
                    <p className="edit-artwork-price__price">{price}</p>
                    <button onClick={() => setEdit(true)}>Edit</button>
                </div>   
            )
        }
    }
    return (
        renderEditPrice()
    )
}

export default EditArtworkPrice;
