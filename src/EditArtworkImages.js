import React, { useState, createRef } from 'react';
import { db, storage } from './firebase';
import './EditArtworkImages.css';

function EditArtworkImages({ collID, artID, images, urls }) {
    
    const handleDelete = async (i) => {
        if (window.confirm('Are you sure you want to delete ' + images[i] + '?')) {
            const new_images = [];
            const new_urls = [];
            for (let j = 0; j < urls.length; j++) {
                if (i !== j) {
                    new_images.push(images[j]);
                    new_urls.push(urls[j]);
                }
            }
            console.log("deleting references to " + images[i]);
            // update image name and download reference arrays in db
            try {
                const res = await db
                .collection('collection_list')
                .doc(collID)
                .collection('collection')
                .doc(artID)
                .set({
                    images: new_images,
                    imurl: new_urls
                }, { merge: true });
                console.log(res);
            } catch (error) { console.log(error); }    
            
            console.log("deleting " + images[i] + " from storage.");
            // delete image from storage
            storage.ref(images[i]).delete()
                .then(() => {
                    console.log(images[i] + " deleted from storage");
                })
                .catch((error) => {
                    console.log(error);
                }); 
        }
    }
    const renderImages = () => {
        const image_list = [];
        for (let i in urls) {
            // console.log("url:", urls[i]);
            image_list.push(
                <div key={i} className="edit-artwork-images__image">
                    <p>{images[i]}</p>
                    <img src={urls[i]} alt="" />
                    <button onClick={() => handleDelete(i)}>Delete</button>
                </div>
            )
        }
        return image_list;        
    }

    const fileInput = createRef();
    const [image, setImage] = useState({});

    const handleImage = (e) => {
        e.preventDefault();
        setImage({...fileInput.current.files});
        // let im = [];
        for (let i = 0; i < fileInput.current.files.length; i++) {
            images.push(fileInput.current.files[i].name);
        }
        // setForm({ ...form, [e.target.name]: im});
    }
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // change loading state
        setLoading(true);
        // Upload the images and get download IDs
        for (const i in image) {
            // console.log("im:", image[i], "image: ", image);
            await storage.ref(image[i].name).put(image[i])
                .then(async (snapshot) => {
                    console.log(snapshot);
                    const url = await storage.ref(image[i].name).getDownloadURL();
                    urls.push(url);
                })
                .catch((error) => {
                    console.log(error);
                });     
        }
        // now add the object to firestore
        try {
            const res = await db
            .collection('collection_list')
            .doc(collID)
            .collection('collection')
            .doc(artID)
            .set({
                images: images,
                imurl: urls
            }, { merge: true });
            setLoading(false);
            console.log(res);
        } catch (error) { console.log(error); }   
    }
    
    const updateImages = () => {
        if (loading === false) {
            return (
                <form onSubmit={handleSubmit}>
                    <label >
                        Add images
                        <input type="file" multiple name="images" 
                        ref={fileInput} 
                        onChange={handleImage} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            )
        }
        if (loading === true) {
            return (
                <p>Uploading image(s)...</p>
            )
        }
    }

    return (
        <div className="edit-artwork-images">
            <div className="edit-artwork-images__images">
                {renderImages()}
            </div>
            
            {updateImages()}
        </div>
    )
}

export default EditArtworkImages;
