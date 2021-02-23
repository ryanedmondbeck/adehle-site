import React, { useState, useEffect } from 'react';
import Comment from './Comment';
import './CommentCloud.css';
import firebase, { db } from '../firebase';

function useComments() {
    const [comments, setComments] = useState([]);
    useEffect(() => {
        const unsubscribe = firebase
            .firestore()
            .collection('comments')
            .onSnapshot((snapshot) => {
                const c = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }))
                setComments(c);
            })
        return () => unsubscribe();
    }, []); 
    return comments;
}

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

    const comments = useComments();
    const renderComments = () => {
        const c_list = comments.map(c => (
            <div className="edit-comments__comment">
                <Comment width={width} height={height} comment={c.comment} />
            </div>
        ));
        return(c_list);
    }

    const [newComment, setNewComment] = useState({
        comment: ''
    });
    const handleChange = (e) => {
        e.preventDefault();
        setNewComment({ ...newComment, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await db
                .collection('comments')
                .add(newComment); 
                setNewComment({comment: '' });
            // console.log(res);  
        } catch (error) { console.log(error); } 
    }
    const addComment = () => {
        return (
            <form onSubmit={handleSubmit}  className="comment-cloud__add-comment"> 
                <textarea type="text" name="comment" placeholder="Add to the comment cloud"
                    value={newComment.comment} 
                    onChange={handleChange}/>
                <input className="comment-cloud__add-comment--submit" type="submit" value="Submit"/>
            </form>
        )
    }
    return (
        <div className="comment-cloud">
            {addComment()}
            {renderComments()}
            {/* <Comment width={width} height={height} i={1} /> */}
        </div>
    )
}

export default CommentCloud;
