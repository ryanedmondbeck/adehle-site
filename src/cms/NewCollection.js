import React, { useState, useContext } from 'react';
import { db } from '../firebase';
import { CMSPageContext } from '../contexts/CMSPageContext';

function NewCollection() {
    const [form, setForm] = useState({
        name: '',
        description: '',
        index: 0
    });
    const [, setCmsPage] = useContext(CMSPageContext);

    const handleChange = (e) => {
        e.preventDefault();
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleNumChange = (e) => {
        e.preventDefault();
        setForm({ ...form, [e.target.name]: parseInt(e.target.value) })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setCmsPage('uploading-collection');
        try {
            await db
                .collection('collection_list')
                .add(form); 
            // console.log(res);  
            setCmsPage('edit');
        } catch (error) { console.log(error); }   
    }

    return (
        <div className="new-collection">
            <form onSubmit={handleSubmit} >
                <label>
                    <input type="text" name="name" placeholder="Collection Name"
                    value={form.name} 
                    onChange={handleChange}/>
                </label>
                <label>
                    <textarea name="description" placeholder="Description"
                    value={form.description} 
                    onChange={handleChange} />
                </label>
                <label>
                    <p>Index</p>
                    <input type="number" name="index" 
                    value={form.index} 
                    onChange={handleNumChange} />
                </label>
                <div className="submit">
                    <input type="submit" value="Submit" />  
                </div>
            </form>
        </div>
    )
}

export default NewCollection;
