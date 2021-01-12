import React, { useEffect } from 'react';
import im from './images/profile.jpg';

function About({ setTransition }) {

    useEffect(() => {
        setTimeout(() => {setTransition('ats')}, 1000);
    })

    return (
        <div className="about">
            <div className="about__left">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <ul className="about__social">
                    <li><a href="" className="about__social--icon">
                        <img />
                        </a></li>
                </ul>
            </div>
            <div className="about__right">
                <img key="profile_image" src={im} alt="profile" />
            </div>
        </div>
    )
}

export default About;
