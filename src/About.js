import React, { useEffect, useState } from 'react';
// import im from './images/profile.jpg';
import EmailIcon from '@material-ui/icons/Email';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import CloseIcon from '@material-ui/icons/Close';
import { Link } from "react-router-dom";
import './About.css';
import AboutEmail from './AboutEmail';

import firebase from './firebase';

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

function About({ setTransition }) {
    
    useEffect(() => {
        setTimeout(() => {setTransition('ats')}, 1000);
    })

    const info = useBio();
    const bio = info.map(a => (a.bio));
    const image = info.map(a => (a.url));

    const [email, showEmail] = useState(false);
    const [status, setStatus] = useState('empty');

    return (
        <div className="about">
            <div className="about__left">
                <p>{bio}</p>
                <div className="about__social">
                    <button onClick={() => showEmail(!email)}><EmailIcon /></button>
                    <a href="https://www.instagram.com/adehledaley/" target="_blank" rel="noopener noreferrer"><InstagramIcon /></a>
                    <a href="https://www.facebook.com/pages/category/Artist/Adehle-Daley-Paintings-663358720698293/" 
                        target="_blank" rel="noopener noreferrer"><FacebookIcon /></a>
                </div>
                <div className={`about__email ${(email) ? "" : "about__email--collapsed"}`}>
                    <AboutEmail status={status} setStatus={setStatus} showEmail={showEmail} />
                </div>
                
            </div>
            <div className="about__right">
                <img key="profile_image" src={image} alt="profile" />
            </div>
            <div className="about__back">
                <Link onClick={() => setTransition('ats')} className="portfolio__header__adehle" to="/"><CloseIcon fontSize="large"/></Link>
            </div>
        </div>
    )
}

export default About;
