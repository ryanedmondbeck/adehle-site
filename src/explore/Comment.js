import React, { useState, useEffect } from 'react';
import './Comment.css';
import * as d3 from "d3-timer";

function Comment({ width, height, comment }) {
    
    const MAXV = 2;
    const [pos, setPos] = useState({
        x: width/4,
        vx: Math.random() * MAXV * (Math.round(Math.random()) ? 1 : -1),
        y: height/4,
        vy: Math.random() * MAXV * (Math.round(Math.random()) ? 1 : -1)
    })

    function tickAnimation() {

        setPos(function(pos) {
            let {x, vx, y, vy} = pos
            if (x > width || x < 0) {
                vx = -1 * vx;
            }
            if (y > height || y < 0) {
                vy = -1 * vy;
            }
            x += vx;
            y += vy;
            return {x, vx, y, vy};
        })
    }
    
    useEffect(() => {
        const t = d3.timer(tickAnimation);
        return () => t.stop();
    }, []);

    return (
        <div className="comment" style={{transform: `translate(${pos.x}px, ${pos.y}px)`}}>
            {comment}
        </div>
    )
}

export default Comment;