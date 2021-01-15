import React from 'react';
import './SplashM.css';
import { Link } from "react-router-dom";
import SketchSplash from '../SketchSplash';
import Div100vh from 'react-div-100vh';

function Splash({ setTransition }) {
    return (
        <Div100vh>
            <div className="splash">
                <div className="splash__title">
                    <p>ADEHLE DALEY</p>
                </div>
                <div className="splash__about">
                    <Link onClick={() => setTransition('sta')} className="splash__button" to="/about-mobile">ABOUT</Link>
                </div>
                <div className="splash__portfolio">
                    <Link onClick={() => setTransition('stp')} className="splash__button" to="/portfolio-mobile">PORTFOLIO</Link>
                </div>
                <div className="splash__explore">
                    <Link className="splash__button" to="/">EXPLORE</Link>
                </div>     
                <div className="splash__p5">
                    <SketchSplash />
                </div>
            </div>
        </Div100vh>
    )
}

export default Splash;
