import React, { useState, useEffect } from 'react';
import CommentM from './CommentM';
import './CommentCloudM.css';
import firebase, { db } from '../../firebase';

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

function CommentCloudM() {
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
                <CommentM width={width*0.85} height={height*0.78} comment={c.comment} key={c.comment} />
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
        console.log("form submitted: ", e);
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
            <form onSubmit={handleSubmit}  className="comment-cloud-m__add-comment"> 
                <textarea type="text" name="comment" placeholder="Add to the comment cloud"
                    value={newComment.comment} 
                    onChange={handleChange}/>
                <input className="comment-cloud-m__add-comment--submit" type="submit" value="Submit"/>
            </form>
        )
    }
    return (
        <div className="comment-cloud-m">
            {addComment()}
            {renderComments()}
        </div>
    )
}

export default CommentCloudM;
