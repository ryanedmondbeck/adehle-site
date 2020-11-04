import React from 'react';
import { db, storage } from './firebase';

function EditArtworkImages({ collID, artID, images, urls }) {
    
    const handleDelete = async (i) => {
        const new_images = [];
        const new_urls = [];
        for (let j = 0; j < urls.length; j++) {
            if (i != j) {
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
            // console.log(res);
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

    const renderImages = () => {
        const image_list = [];
        for (let i in urls) {
            console.log("url:", urls[i]);
            image_list.push(
                <div key={i}>
                    <p>{images[i]}</p>
                    <img src={urls[i]} alt="" />
                    <button onClick={() => handleDelete(i)}>Delete</button>
                </div>
            )
        }
        return image_list;        
    }

    return (
        <div>
            {renderImages()}
        </div>
    )
}

export default EditArtworkImages;
