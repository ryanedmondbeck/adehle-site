import React, { useState, useEffect } from 'react';
import Comment from './Comment';
import './CommentCloud.css';

function CommentCloud() {
    const [width, setWidth] = useState();
    const [height, setHeight] = useState();
    const handleResize = () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
    };
    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);
        console.log("screen size: ", width, height);
    }, [width, height]);

    

    const renderComments = () => {
        const objects = [];
        if (width && height) {
            for (let i = 0; i < 20; i++) {
                objects.push(<Comment width={width} height={height} i={i} key={i} />);
            }
        }
        return(objects);
    }
    return (
        <div className="comment-cloud">
            {renderComments()}
            {/* <Comment width={width} height={height} i={1} /> */}
        </div>
    )
}

export default CommentCloud;
