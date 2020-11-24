import React, { useContext } from 'react';
import SketchSplash from './SketchSplash';
import './Splash.css';
import { Link } from "react-router-dom";

function Splash() {
    
    return (
        <div className="splash">
             
            <div className="splash__menu">
                {/* <p>Adehle Daley</p> */}
                <Link className="splash__button" to="/portfolio">Portfolio</Link>
                <Link className="splash__button" to="/">Other</Link>
            </div>
           
            <div className="splash__p5">
                <SketchSplash />
            </div>
            
        </div>
    )
}

export default Splash;
