import React, { useContext, useState } from 'react';
import CollectionList from './CollectionList';
import './CollectionList.css';
import Artwork from './Artwork';
import './Artwork.css';

function Portfolio() {


    return (
        <div className="portfolio">
            <div className="portfolio__list">
                <CollectionList />
            </div>
            
            <div className="portfolio__image" >
                <Artwork />
            </div> 
        </div>
    )
}

export default Portfolio;
