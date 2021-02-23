import React, { useEffect, useState } from 'react';
import firebase, { db } from '../firebase';
import DeleteIcon from '@material-ui/icons/Delete';
import './EditComments.css';

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
const handleDelete = async (commentID, e) => {
    e.preventDefault();
    // console.log(id);
    if (window.confirm('Are you sure you want to delete this comment?')) {
        try {
            await db
                .collection('comments')
                .doc(commentID)
                .delete();
            // console.log(res);
        } catch (error) { console.log(error); }
    }
}

function EditComments() {
    
    const comments = useComments();
    const renderComments = () => {
        const c_list = comments.map(c => (
            <div className="edit-comments__comment">
                <button onClick={(e) => handleDelete(c.id, e)}><DeleteIcon /></button>
                <p>{c.comment}</p>
            </div>
        ));
        return c_list;
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
            <form onSubmit={handleSubmit} > 
                <input type="text" name="comment" placeholder="Add a comment"
                    value={newComment.comment} 
                    onChange={handleChange}/>
                <input type="submit" value="Submit" />
            </form>
        )
    }
    return (
        <div className="edit-comments">
            {renderComments()}
            {addComment()}
        </div>
    )
}

export default EditComments;
