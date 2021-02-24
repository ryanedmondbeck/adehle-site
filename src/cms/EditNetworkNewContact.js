import React, { useState, useContext } from 'react';
import { db } from '../firebase';
import { CMSPageContext } from '../contexts/CMSPageContext';
import './EditNetworkNewContact.css';

function EditNetworkNewContact() {
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setCmsPage('loading');
        try {
            await db
                .collection('network')
                .add(form); 
            // console.log(res);  
            setCmsPage('network');
        } catch (error) { console.log(error); }   
    }

    return (
        <div className="edit-network-new-contact">
            <form onSubmit={handleSubmit} >
                <label>
                    <input type="text" name="name" placeholder="Name"
                    value={form.name} 
                    onChange={handleChange}/>
                </label>
                <label>
                    <textarea name="description" placeholder="Description"
                    value={form.description} 
                    onChange={handleChange} />
                </label>
                <label>
                    <input type="text" name="email" placeholder="Email"
                    value={form.email} 
                    onChange={handleChange}/>
                </label>
                <label>
                    <input type="text" name="website" placeholder="Website"
                    value={form.website} 
                    onChange={handleChange}/>
                </label>
                <label>
                    <input type="text" name="instagram" placeholder="Instagram"
                    value={form.instagram} 
                    onChange={handleChange}/>
                </label>
                <label>
                    <input type="text" name="facebook" placeholder="Facebook"
                    value={form.facebook} 
                    onChange={handleChange}/>
                </label>
                <div className="submit">
                    <input type="submit" value="Submit" />  
                </div>
            </form>
        </div>
    )
}

export default EditNetworkNewContact;
