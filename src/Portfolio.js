import React, { useState, useEffect, useContext } from 'react';
import CollectionList from './CollectionList';
import './CollectionList.css';
import Artwork from './Artwork';
import './Artwork.css';
import Contact from './Contact';
import './Contact.css';
import { Link } from "react-router-dom";

function Portfolio() {
    const [contact, setContact] = useState(false);
    const handleClick = () => {
        setContact(true);
    }
    useEffect(() => {
        setTimeout(() => {setContact(false)}, 6000);
    })
    return (
        <div className="portfolio">
            <Contact contact={contact} />
            <div className="portfolio__header">
                <Link className="portfolio__header__adehle" to="/">Adehle Daley</Link>
                <button className="portfolio__header__button" onClick={() => handleClick()}>info</button>
                
            </div>
            <div className="portfolio__content">
                <div className="portfolio__list">
                    <CollectionList />
                </div>
                
                <div className="portfolio__image" >
                    <Artwork />
                </div> 
            </div>
        </div>
    )
}

export default Portfolio;
