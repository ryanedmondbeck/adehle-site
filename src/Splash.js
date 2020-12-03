import React from 'react';
import './Splash.css';
import { Link } from "react-router-dom";
import SketchSplash from './SketchSplash';

function Splash({ setTransition }) {
    return (
        <div className="splash">
            <div className="splash__title">
                <p>ADEHLE DALEY</p>
                <Link>ABOUT</Link>
            </div>
            <div className="splash__menu">
                <Link onClick={() => setTransition('stp')} className="splash__button" to="/portfolio">PORTFOLIO</Link>
                <Link className="splash__button" to="/">EXPLORE</Link>
            </div>     
            <div className="splash__p5">
                <SketchSplash />
            </div>
        </div>
    )
}

export default Splash;
