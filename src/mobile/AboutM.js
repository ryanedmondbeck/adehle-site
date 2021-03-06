import React, { useEffect, useState } from 'react';
// import im from './images/profile.jpg';
import EmailIcon from '@material-ui/icons/Email';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import CloseIcon from '@material-ui/icons/Close';
import { Link } from "react-router-dom";
import './AboutM.css';

import firebase from '../firebase';

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

    const info = useBio();
    const bio = info.map(a => (a.bio));
    const image = info.map(a => (a.url));

    return (
        <div className=".about-m">
            <div className="about-m__back">
                <Link onClick={() => setTransition('ats')} className="portfolio__header__adehle" to="/"><CloseIcon fontSize="large"/></Link>
            </div>
            <div className="about-m__top">
                <img key="profile_image" src={image} alt="profile" />
            </div>
            <div className="about-m__bottom">
                <p>{bio}</p>
                <div className="about-m__social">
                    <a href="https://www.instagram.com/adehledaley/" target="_blank" rel="noopener noreferrer"><InstagramIcon /></a>
                    <a href="https://www.facebook.com/pages/category/Artist/Adehle-Daley-Paintings-663358720698293/" 
                        target="_blank" rel="noopener noreferrer"><FacebookIcon /></a>
                    <Link onClick={() => setTransition('sta')} className="portfolio__header__adehle" to="/about-email-mobile"><EmailIcon /></Link>
                </div>
            </div>
        </div>
    )
}

export default About;
