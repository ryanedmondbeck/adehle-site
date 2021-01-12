import React, { useEffect, useState } from 'react'

import firebase, { db } from './firebase';

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

    const handleChange = (e) => {
        e.preventDefault();
        setData({[e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(i
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
                <div className="edit-profile-bio">
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
                <div className="edit-profile-bio">
                    <p>Bio:</p>
                    <p>{bio}</p>
                    <button onClick={() => setEdit(true)}>Edit</button>
                </div> 
            ) 
        }
    }
    return (
        <div className="edit-profile">
            {renderBio()}
        </div>
    )
}

export default EditProfile;
