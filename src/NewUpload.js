import React, { useState, useEffect, createRef, useContext } from 'react';
import { db, storage } from './firebase';
import { CMSPageContext } from './contexts/CMSPageContext';

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
        images: [],
        imurl: []
    });
    const [image, setImage] = useState({});
    const [collection, setCollection] = useState({});
    const fileInput = createRef();
    const [, setCmsPage] = useContext(CMSPageContext);

    // useEffect(() => {
    //     setTimeout(() => {console.log("image: ", image, "form: ", form);}, 3000);
    // })
    const list = useLists();

    const createList = () => {
        const options = list.map(coll =>  (
            <option value={coll.id} key={coll.id}>{coll.name}</option>
        ));
        options.unshift(<option value={'empty'} key={'empty'} selected >Choose a Collection...</option>);
        return options;
    }
    const chooseCollection = (e) => {
        // console.log(e);
        setCollection(e.target.value);
        // console.log("after setCollection: ", collection);
    }
    const handleChange = (e) => {
        e.preventDefault();
        setForm({ ...form, [e.target.name]: e.target.value })
        // console.log("form: ", e.target.value);
    }
    const handleNumChange = (e) => {
        e.preventDefault();
        setForm({ ...form, [e.target.name]: parseInt(e.target.value) })
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
        if (Object.keys(collection).length === 0) {
            alert("Choose a collection before submitting.");
            return;
        }
        else {
            setCmsPage('loading');
            // Upload the images and get download IDs
            const imurl = [];
            for (const i in image) {
                // console.log("im:", image[i], "image: ", image);
                await storage.ref(image[i].name).put(image[i])
                    .then(async (snapshot) => {
                        console.log(snapshot);
                        const url = await storage.ref(image[i].name).getDownloadURL();
                        imurl.push(url);
                    })
                    .catch((error) => {
                        console.log(error);
                    });     
            }
            // now add the object to firestore
            try {
                const res = await db
                    .collection('collection_list')
                    .doc(collection)
                    .collection('collection')
                    .add(form);
                console.log(res);
                // console.log(res.id); 
                // add the download url array to the object
                const res2 = await db
                    .collection('collection_list')
                    .doc(collection)
                    .collection('collection')
                    .doc(res.id)
                    .set({
                        imurl: imurl
                    }, { merge: true });
                console.log(res2);
                setCmsPage('edit');
            } catch (error) { console.log(error); }  
        }
    }
    return (
        <div className="upload">
            <form onSubmit={handleSubmit} >
                <label>
                    {/* Choose a Collection: */}
                    <select value={collection} onChange={chooseCollection}>
                        {createList()}
                    </select> 
                </label>            
                <label>
                    <input type="text" name="title" placeholder="Title"
                    value={form.title} 
                    onChange={handleChange}/>
                </label>
                <label>
                    <input type="text" name="dimensions" placeholder="Dimensions"
                    value={form.dimensions} 
                    onChange={handleChange}/>
                </label>
                <label>
                    <input type="text" name="materials" placeholder="Materials"
                    value={form.materials} 
                    onChange={handleChange} />
                </label>
                <label>
                    <p>Images</p>
                    <input type="file" multiple name="images" 
                    ref={fileInput} 
                    onChange={handleImage} />
                </label>
                <label>
                    <p>Index</p>
                    <input type="number" name="index" 
                    value={form.index} 
                    onChange={handleNumChange} />
                </label>
                <div className="submit">
                    <input  type="submit" value="Submit" />
                </div>
            </form>  
        </div>
    )
}

export default NewUpload;