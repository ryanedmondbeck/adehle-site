import React, { useState, useEffect, createRef } from 'react';
import { db, storage } from './firebase';

function useLists() {
    const [collectionList, setCollectionList] = useState([]);
    useEffect(() => {
        const unsubscribe = db
            .collection('collection_list')
            .orderBy('index')
            .onSnapshot((snapshot) => {
                const newList = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }))
                setCollectionList(newList);
            })
        return () => unsubscribe();
    }, []) // need empty array so that this function isn't repeatedly called
    return collectionList;
}

function NewUpload() {

    const [form, setForm] = useState({
        title: '',
        dimensions: '',
        materials: '',
        index: 0,
        images: []
    });
    const [image, setImage] = useState({});
    const [collection, setCollection] = useState({});
    const fileInput = createRef();

    // useEffect(() => {
    //     setTimeout(() => {console.log("image: ", image, "form: ", form);}, 3000);
    // })
    const list = useLists();
    const createList = () => {
        const options = list.map(coll =>  (
            <option value={coll.id} key={coll.id}>{coll.name}</option>
        ));
        // console.log("options:", options);
        return options;
    }
    const chooseCollection = (e) => {
        console.log(e);
        // setCollection(e.target.value);
        console.log("after setCollection: ", collection);
    }
    const handleChange = (e) => {
        e.preventDefault();
        setForm({ ...form, [e.target.name]: e.target.value })
        // console.log("form: ", e.target.value);
    }
    const handleImage = (e) => {
        e.preventDefault();
        setImage({...fileInput.current.files});
        let im = [];
        for (let i = 0; i < fileInput.current.files.length; i++) {
            im.push(fileInput.current.files[i].name);
        }
        setForm({ ...form, [e.target.name]: im});
        
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("image files: ", image);
        const res = await db
            .collection('collection_list')
            .doc('vBNEWniAGFN6ufyBOL0i')
            .collection('collection')
            .add(form);
        console.log(res);        
        for (const i in image) {
            // console.log("im:", image[i], "image: ", image);
            await storage.ref(image[i].name).put(image[i])
                .then((snapshot) => {
                    console.log(snapshot);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }
    return (
        <div className="upload">
            Create new artwork
            <form onSubmit={handleSubmit} >
                <label>
                    Choose a Collection:
                    <select value={collection} onChange={chooseCollection}>
                        {createList()}
                    </select> 
                </label>            
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