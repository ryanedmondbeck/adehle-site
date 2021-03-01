import React from 'react';
import './ExploreM.css';
import CommentCloudM from './CommentCloudM';
import NetworkM from './NetworkM.js'
import ccbg from './svg/gradient-bg-50.svg';
// import CloseIcon from '@material-ui/icons/Close';

function ExploreM({ setTransition }) {
    
    return (
        <div className="explore-m" style={{backgroundImage: `url(${ccbg})`}}>
            {/* <Link onClick={() => setTransition('ste')} className="explore-m__home" to="/"><CloseIcon fontSize="large" /></Link> */}
            <CommentCloudM />
            <NetworkM />
            
        </div>
    )
}

export default ExploreM;
