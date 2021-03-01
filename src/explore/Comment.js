import React, { useState, useEffect } from 'react';
import './Comment.css';
import * as d3 from "d3-timer";

function Comment({ width, height, comment }) {
    
    const MAXV = 2;
    const [pos, setPos] = useState({
        x: Math.floor(Math.random() * width),
        vx: Math.random() * MAXV * (Math.round(Math.random()) ? 1 : -1),
        y: height/4,
        vy: Math.random() * MAXV * (Math.round(Math.random()) ? 1 : -1),
        fs: Math.random() + 1,
        vfs: Math.random() * 0.05
    })

    function tickAnimation() {

        setPos(function(pos) {
            let {x, vx, y, vy, fs, vfs} = pos
            if (x > width || x < 0) {
                vx = -1 * vx;
            }
            if (y > height || y < 0) {
                vy = -1 * vy;
            }
            x += vx;
            y += vy;
            if (fs >= 14 || fs <= 0.9) {
                vfs = -1 * vfs;
            }
            fs += vfs;
            return {x, vx, y, vy, fs, vfs};
        })
    }
    
    useEffect(() => {
        const t = d3.timer(tickAnimation);
        return () => t.stop();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const trans = {transform: `translate(${pos.x}px, ${pos.y}px)`};
    // const size = Math.random() + 1;
    const fontSize = {fontSize: `${pos.fs}em`}

    return (
        <div className="comment" style={{...trans, ...fontSize}}>
            {comment}
        </div>
    )
}

export default Comment;