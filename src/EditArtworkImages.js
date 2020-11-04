import React from 'react';

function EditArtworkImages({ collID, artID, images, urls }) {
    
    const renderImages = () => {
        const image_list = [];
        for (let i in urls) {
            console.log("url:", urls[i]);
            image_list.push(
                <div key={i}>
                    <p>{images[i]}</p>
                    <img src={urls[i]} alt="" />
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
