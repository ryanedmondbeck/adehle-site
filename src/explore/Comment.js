import React, { useState, useEffect } from 'react';
import './Comment.css';
import * as d3 from "d3-timer";

function Comment({ width, height, comment }) {
    
    const MAXV = 3;
    const [x, setX] = useState(Math.floor(Math.random() * width * 0.9));
    const [y, setY] = useState(Math.floor(Math.random() * height * 0.9));
    const [vx, setVx] = useState(Math.floor(Math.random() * MAXV) * (Math.round(Math.random()) ? 1 : -1));
    const [vy, setVy]  = useState(Math.floor(Math.random() * MAXV) * (Math.round(Math.random()) ? 1 : -1));

    const tickAnimation = () => {
        if (vx === 0) {setVx(0.1)}
        if (vy === 0) {setVy(0.1)}
        setX(x => ((x + vx) % width));
        setY(y => ((y + vy) % height));
    }
    useEffect(() => {
        const t = d3.timer(() => tickAnimation());
        return () => t.stop();
    }, []);

    return (
        <div className="comment" style={{transform: `translate(${x}px, ${y}px)`}}>
            {comment}
        </div>
            
    )
}

export default Comment;