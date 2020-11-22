import React, { useContext } from 'react';
import SketchSplash from './SketchSplash';
import { PageContext } from './contexts/PageContext';
import './Splash.css';

function Splash() {
    const [, setPage] = useContext(PageContext);
    
    return (
        <div className="splash">
             
            <div className="splash__menu">
                {/* <p>Adehle Daley</p> */}
                <button className="splash__button" onClick={() => setPage('portfolio')}>Portfolio</button>
                <button className="splash__button" onClick={() => setPage('other')}>Other</button>
            </div>
           
            <div className="splash__p5">
                <SketchSplash />
            </div>
            
        </div>
    )
}

export default Splash;
