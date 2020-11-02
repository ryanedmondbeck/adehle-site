import React, { useState } from 'react';
import { db } from './firebase';

function NewCollection() {
    const [form, setForm] = useState({
        name: '',
        description: '',
        index: 0
    });

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
        try {
            const res = await db
                .collection('collection_list')
                .add(form); 
            console.log(res);  
        } catch (error) { console.log(error); }   
    }

    return (
        <div className="new-collection">
            Create New Collection
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
                    Index
                    <input type="number" name="index" 
                    value={form.index} 
                    onChange={handleNumChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default NewCollection;
