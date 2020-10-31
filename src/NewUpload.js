import React, { useState, useEffect, createRef } from 'react';

function NewUpload() {

    const [form, setForm] = useState({
        title: '',
        dimensions: '',
        materials: '',
        index: 0,
        images: []
    });
    const [image, setImage] = useState({});
    const fileInput = createRef();

    useEffect(() => {
        setTimeout(() => {console.log("image: ", image, "form: ", form);}, 3000);
    })

    const handleChange = (e) => {
        e.preventDefault();
        setForm({ ...form, [e.target.name]: e.target.value })
        console.log("form: ", e.target.value);
    }
    const handleImage = (e) => {
        e.preventDefault();
        setImage({...image, ...fileInput.current.files});
        let im = [];
        for (let i = 0; i < fileInput.current.files.length; i++) {
            im.push(fileInput.current.files[i].name);
        }
        setForm({ ...form, [e.target.name]: im});
        
    }
    const handleSubmit = (e) => {
        console.log("hello");
        console.log("form: ", form);
        e.preventDefault();
    }
    

    console.log(form);
    return (
        <div className="upload">
            Create new artwork
            <form onSubmit={handleSubmit} >
                <label>
                    Title:
                    <input type="text" name="title"
                    value={form.title} 
                    onChange={handleChange}/>
                </label>
                <label>
                    Dimensions:
                    <input type="text" name="dimensions"
                    value={form.dimensions} 
                    onChange={handleChange}/>
                </label>
                <label>
                    Materials:
                    <input type="text" name="materials" 
                    value={form.materials} 
                    onChange={handleChange} />
                </label>
                <label>
                    Index:
                    <input type="number" name="index" 
                    value={form.index} 
                    onChange={handleChange} />
                </label>
                <label>
                    Images:
                    <input type="file" multiple name="images" 
                    ref={fileInput} 
                    onChange={handleImage} />
                </label>
                <input type="submit" value="Submit" />
            </form>
            
        </div>
    )
}

export default NewUpload;