import React, { useEffect } from 'react';
import './PortfolioM.css';
import CollectionListM from './CollectionListM';
import CloseIcon from '@material-ui/icons/Close';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { Link } from "react-router-dom";

function Portfolio({ setTransition }) {
  
    useEffect(() => {
        setTimeout(() => {setTransition('pts')}, 1000);
    })
    return (
        <div className="portfolio-m">
            <div className="portfolio-m__header">
                <Link onClick={() => setTransition('pts')} className="portfolio-m__header__adehle" to="/">Adehle Daley</Link>
                <Link onClick={() => setTransition('pts')} className="portfolio-m__header__adehle" to="/"><ArrowForwardIosIcon fontSize="small"/></Link>
            </div>
            <div className="portfolio-m__content">
                <CollectionListM />
            </div>
        </div>
    )
}

export default Portfolio;
