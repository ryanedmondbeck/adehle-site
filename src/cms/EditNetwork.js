import React, { useEffect, useState } from 'react';
import firebase, {db} from '../firebase';
import EditNetworkInfo from './EditNetworkInfo.js';
import EditNetworkDescription from './EditNetworkDescription.js';
import EditNetworkNewContact from './EditNetworkNewContact.js';
import './EditNetwork.css';

function useNetwork() {
    const [net, setNet] = useState([]);
    useEffect(() => {
        const unsubscribe = firebase
            .firestore()
            .collection('network')
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

    const net = useNetwork();
    const handleDelete = async (id, e) => {
        e.preventDefault();
        // console.log(id);
        if (window.confirm('Are you sure you want to delete this contact?')) {
            try {
                await db
                    .collection('network')
                    .doc(id)
                    .delete();
                // console.log(res);
            } catch (error) { console.log(error); }
        }
    }
    const renderNetwork = () => {
        console.log(net);
        const all_contacts = net.map(contact => (
            <div key={contact.id} className="edit-network__contact">
                <EditNetworkInfo id={contact.id} info={contact.name} type="name"/>
                <EditNetworkInfo id={contact.id} info={contact.email} type="email"/>
                <EditNetworkInfo id={contact.id} info={contact.website} type="website"/>
                <EditNetworkInfo id={contact.id} info={contact.instagram} type="instagram"/>
                <EditNetworkInfo id={contact.id} info={contact.facebook} type="facebook"/>
                <EditNetworkDescription id={contact.id} description={contact.description} />
                <button onClick={(e) => handleDelete(contact.id, e)}>Delete Contact</button>
            </div>
        ));
        return all_contacts;
    }
    return (
        <div className="edit-network">
            {renderNetwork()}
            New Contact:
            <EditNetworkNewContact />
        </div>
    )
}

export default EditNetwork;
