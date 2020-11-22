import React, { useState, useEffect, useContext } from 'react';
import CollectionList from './CollectionList';
import './CollectionList.css';
import Artwork from './Artwork';
import './Artwork.css';
import Contact from './Contact';
import './Contact.css';
import { PageContext } from './contexts/PageContext';

function Portfolio() {
    const [, setPage] = useContext(PageContext);
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
                <button className="portfolio__header__adehle" onClick={() => setPage('splash')}>Adehle Daley</button>
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
