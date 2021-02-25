import React from 'react';
import './Explore.css';
import CommentCloud from './CommentCloud';
import Network from './Network.js'
import ccbg from './svg/gradient-bg-50.svg';
import CloseIcon from '@material-ui/icons/Close';
import { Link } from "react-router-dom";

function Explore({ setTransition }) {
    
    return (
        <div className="explore" style={{backgroundImage: `url(${ccbg})`}}>
            <Link onClick={() => setTransition('ste')} className="explore__home" to="/"><CloseIcon fontSize="large" /></Link>
            <CommentCloud />
            <Network />
        </div>
    )
}

export default Explore;
