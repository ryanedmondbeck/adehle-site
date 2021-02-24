import React from 'react';
import './Explore.css';
import CommentCloud from './CommentCloud';
import Network from './Network.js'

function Explore() {
    
    return (
        <div className="explore">
            <CommentCloud />
            <Network />
        </div>
    )
}

export default Explore;
