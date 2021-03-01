import React, { useRef, useState, useEffect } from 'react';
import firebase from '../../firebase';
import './NetworkM.css';
// import EmailIcon from '@material-ui/icons/Email';
// import InstagramIcon from '@material-ui/icons/Instagram';
// import FacebookIcon from '@material-ui/icons/Facebook';
import ContactM from './ContactM.js';

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

function NetworkM() {
    
    // const width = window.innerWidth();
    const net = useNetwork();
    const [selected, setSelected] = useState('');

    const netRef = useRef("net")
    const [x, setX] = useState(0);
    useEffect(() => {
        setTimeout(() => netRef.current.scrollTo(x - (window.innerWidth * 0.05), 0), 500);
    }, [x]);

    const renderNetwork = () => {
        const contacts = net.map(contact => (
            <ContactM setX={setX} selected={selected} setSelected={setSelected} 
                id={contact.id} name={contact.name} description={contact.description} website={contact.website}
                email={contact.email} instagram={contact.instagram} facebook={contact.facebook} />
        ))
        return contacts;
    }
    return (
        <div ref={netRef} className="network-m">
            {/* <p><PublicIcon fontSize="inherit"/></p> */}
            {renderNetwork()}
        </div>
    )
}

export default NetworkM;
