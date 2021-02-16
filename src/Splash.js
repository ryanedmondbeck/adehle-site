import React from 'react';
import './Splash.css';
import { Link } from "react-router-dom";
import SketchSplash from './SketchSplash';

function Splash({ setTransition }) {
    return (
        <div className="splash">
            <div className="splash__top">
                <Link onClick={() => setTransition('stp')} to="/portfolio">PORTFOLIO</Link>
                <Link onClick={() => setTransition('sta')} to="/about">ABOUT</Link>
            </div>
            <div className="splash__bottom">
                <p>ADEHLE DALEY</p>
                <Link onClick={() => setTransition('ste')} className="splash__button" to="/explore">EXPLORE</Link>
            </div>     
            <div className="splash__p5">
                <SketchSplash />
            </div>
        </div>
    )
}

export default Splash;
