import React, { useState } from 'react';
import firebase from './firebase';

function EditArtworkImages({ collID, artID, images }) {
    const [imageState, setImageState] = useState();

    const getURL = async (image) => {
        // let a = artwork; //this should stop setState when artwork changes
        const url = await firebase.storage().ref(image).getDownloadURL();  
        // setImageState(url);
    }
    const renderImages = () => {
        const image_list = [];
        for (let i in images) {
            const url = getURL(images[i])
            image_list.push(
                <div key={i}>
                    {/* <img src={url} alt="" /> */}
                </div>
            )
        }
    
        // console.log("imageState:", imageState);
        // return image_list;

        // getURL(images[0]);
        // return (<div><img src={imageState} alt=""/></div>);
        
    }

    return (
        <div>
            {renderImages()}
        </div>
    )
}

export default EditArtworkImages;
