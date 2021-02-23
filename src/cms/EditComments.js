import React, { useEffect, useState } from 'react';
import firebase, { db, storage } from '../firebase';
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
    return (
        <div className="edit-comments">
            {renderComments()}
        </div>
    )
}

export default EditComments;
