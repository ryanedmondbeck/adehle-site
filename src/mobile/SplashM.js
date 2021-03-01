import React from 'react';
import './SplashM.css';
import { Link } from "react-router-dom";
import SketchSplashM from './SketchSplashM';

function Splash({ setTransition, p, setP }) {
    
    return (
        <div className="splash-m">
            <div className="splash-m__title">
                <p>ADEHLE DALEY</p>
            </div>
            <div className="splash-m__about">
                <Link onClick={() => setTransition('sta')} className="splash-m__button" to="/about-mobile">ABOUT</Link>
            </div>
            <div className="splash-m__portfolio">
                <Link onClick={() => setTransition('stp')} className="splash-m__button" to="/portfolio-mobile">PORTFOLIO</Link>
            </div>
            <div className="splash-m__explore">
                <Link onClick={() => setTransition('ste')} className="splash-m__button" to="/explore-mobile">EXPLORE</Link>
            </div>     
            <div className="splash-m__p5">
                <SketchSplashM />
            </div>
        </div>
    )
}

export default Splash;
