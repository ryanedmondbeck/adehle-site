import React  from 'react';
import './PortfolioM.css';
import CollectionListM from './CollectionListM';
// import CloseIcon from '@material-ui/icons/Close';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { Link } from "react-router-dom";

function Portfolio({ setTransition, p, setP }) {
    // console.log('mobile portfolio page');

    // useEffect(() => {
    //     window.scrollTo(0, 0)
    //   }, [])
    
    return (
        <div className="portfolio-m">
            <div className="portfolio-m__header">
                <Link onClick={() => setTransition('pts')} className="portfolio-m__header__adehle" to="/">Adehle Daley</Link>
                <Link onClick={() => setTransition('pts')} className="portfolio-m__header__adehle" to="/"><ArrowForwardIosIcon fontSize="small"/></Link>
            </div>
            <div className="portfolio-m__content">
                <CollectionListM setTransition={setTransition} />
            </div>
        </div>
    )
}

export default Portfolio;
