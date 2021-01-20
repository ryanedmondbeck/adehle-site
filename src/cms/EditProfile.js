import React, { useEffect, useState, createRef, useContext } from 'react'
import firebase, { db, storage } from '../firebase';
import { CMSPageContext } from '../contexts/CMSPageContext';

function useBio() {
    const [bio, setBio] = useState([]);
    useEffect(() => {
        const unsubscribe = firebase
            .firestore()
            .collection('about')
            .onSnapshot((snapshot) => {
                const about = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }))
                setBio(about);
            })
        return () => unsubscribe();
    }, []) // need empty array so that this function isn't repeatedly called
    return bio;
}

function EditProfile() {
    const [edit, setEdit] = useState(false);
    const [data, setData] = useState({});

    const info = useBio();
    const bio = info.map(a => (a.bio));
    const pimage = info.map(a => (a.url));
    const pname = info.map(a => (a.name));

    const handleChange = (e) => {
        e.preventDefault();
        setData({[e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await db
                .collection('about')
                .doc('nqXuXiBLll2pKjArSBzD')
                .set(data, { merge: true });
            // console.log(res);
            setEdit(false);
        } catch (error) { console.log(error); }
    }

    const renderBio = () => {
        if (edit) {
            return (
                <div className="edit-profile__bio">
                    <form onSubmit={handleSubmit}>
                        <label>
                            <textarea 
                                className="edit-profile-bio__text-area"
                                type="text" name="bio" 
                                value={data.bio} 
                                onChange={handleChange}>{bio}</textarea>
                        </label>
                        <input type="submit" value="Save" />
                    </form>
                </div>
            )
        }
        else {
            return (
                <div className="edit-profile__bio">
                    <p>Bio:</p>
                    <p>{bio}</p>
                    <button onClick={() => setEdit(true)}>Edit Bio</button>
                </div> 
            ) 
        }
    }
    // ---------------------------------------------------------------------
    const [image, setImage] = useState({});
    const [, setCmsPage] = useContext(CMSPageContext);
    const fileInput = createRef();

    const handleImage = (e) => {
        e.preventDefault();
        setImage({...fileInput.current.files});
    }

    const handleImSubmit = async (e) => {
        e.preventDefault();
        setCmsPage('loading'); 
        //delete the old image from image storage
        console.log("deleting " + pname[0] + " from storage.");
        storage.ref(pname[0]).delete()
            .then(() => {
                console.log(pname[0] + " deleted from storage");
            })
            .catch((error) => {
                console.log(error);
            }); 
        // Upload the images and get download IDs
        let url;
        await storage.ref(image[0].name).put(image[0])
            .then(async (snapshot) => {
                // console.log(snapshot);
                url = await storage.ref(image[0].name).getDownloadURL();
                console.log(url);
            })
            .catch((error) => {
                console.log(error);
            });     
        // Now add the object to firestore
        try {
            await db
                .collection('about')
                .doc('nqXuXiBLll2pKjArSBzD')
                .set({
                    url: url,
                    name: image[0].name
                }, { merge: true });
            setCmsPage('profile');
        } catch (error) { console.log(error); } 
        
    }

    const renderImageForm = () => {
        return (
            <div>
                <form onSubmit={handleImSubmit} >
                    <label>
                        <p>Upload new profile image:</p>
                        <input type="file" name="image" 
                        ref={fileInput} 
                        onChange={handleImage} />
                    </label>
                    <div className="submit">
                        <input type="submit" value="Submit" />
                    </div>
                </form>
            </div>
        )
    }
    return (
        <div className="edit-profile">
            {renderBio()}
            <p>------------------------------------------------</p>
            <div className="edit-profile__image">
                <p>Current profile image: {pname}</p>
                <img key="edit-profile-image" src={pimage} alt="profile" />
            </div>
            <div className="edit-profile__form">
                {renderImageForm()}
            </div>
            
        </div>
    )
}

export default EditProfile;
