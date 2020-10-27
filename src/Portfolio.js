import React from 'react';
import CollectionList from './CollectionList';
import './CollectionList.css';
import Artwork from './Artwork';
import './Artwork.css';

function Portfolio() {
    return (
        <div className="portfolio">
            <div className="portfolio__header">
                <p>Adehle Daley</p>
                <p>Contact</p>
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
