import React from 'react';
import './Explore.css';
import CommentCloud from './CommentCloud';
import Network from './Network.js'
import ccbg from './svg/gradient-up-bg.svg';
import CloseIcon from '@material-ui/icons/Close';

function Explore() {
    
    return (
        <div className="explore" style={{backgroundImage: `url(${ccbg})`}}>
            <CommentCloud />
            <Network />
        </div>
    )
}

export default Explore;
