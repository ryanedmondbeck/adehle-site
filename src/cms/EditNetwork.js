import React, { useEffect, useState } from 'react';
import firebase, { db, storage } from '../firebase';
import './EditNetwork.css';

function useNetwork() {
    const [net, setNet] = useState([]);
    useEffect(() => {
        const unsubscribe = firebase
            .firestore()
            .collection('about')
            .onSnapshot((snapshot) => {
                const r = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }))
                setNet(r);
            })
        return () => unsubscribe();
    }, []) // need empty array so that this function isn't repeatedly called
    return net;
}

function EditNetwork() {
    return (
        <div className="edit-network">
            Edit Network
        </div>
    )
}

export default EditNetwork;
