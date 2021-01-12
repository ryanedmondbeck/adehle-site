import React, { useEffect } from 'react';
import im from './images/profile.jpg';
import EmailIcon from '@material-ui/icons/Email';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import CloseIcon from '@material-ui/icons/Close';
import { Link } from "react-router-dom";

function About({ setTransition }) {

    useEffect(() => {
        setTimeout(() => {setTransition('ats')}, 1000);
    })

    return (
        <div className="about">
            <div className="about__left">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                    Excepteur sint occaecat cupidatat non proident, 
                    sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <div className="about__social">
                    <a href="mailto:adehlerose@gmail.com"><EmailIcon /></a>
                    <a href="https://www.instagram.com/adehledaley/" target="_blank"><InstagramIcon /></a>
                    <a href="https://www.facebook.com/pages/category/Artist/Adehle-Daley-Paintings-663358720698293/" 
                        target="_blank"><FacebookIcon /></a>
                </div>
            </div>
            <div className="about__right">
                <img key="profile_image" src={im} alt="profile" />
            </div>
            <div className="about__back">
                <Link onClick={() => setTransition('ats')} className="portfolio__header__adehle" to="/"><CloseIcon fontSize="large"/></Link>
            </div>
        </div>
    )
}

export default About;
