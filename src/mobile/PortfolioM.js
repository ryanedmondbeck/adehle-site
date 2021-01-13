import React, { useEffect } from 'react';
// import CollectionList from './CollectionList';
// import './CollectionList.css';
// import Artwork from './Artwork';
// import './Artwork.css';
import { Link } from "react-router-dom";

function Portfolio({ setTransition }) {
  
    useEffect(() => {
        setTimeout(() => {setTransition('pts')}, 1000);
    })
    return (
        <div className="portfolio">
            {/* <Contact contact={contact} /> */}
            <div className="portfolio__header">
                <Link onClick={() => setTransition('pts')} className="portfolio__header__adehle" to="/">Adehle Daley</Link>
                {/* <button className="portfolio__header__button" onClick={() => handleClick()}>info</button> */}
            </div>
            <div className="portfolio__content">
                <div className="portfolio__list">
                    {/* <CollectionList /> */}
                </div>
                
                <div className="portfolio__image" >
                    {/* <Artwork /> */}
                </div> 
            </div>
        </div>
    )
}

export default Portfolio;
