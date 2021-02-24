import React, { useState, useEffect } from 'react';
import firebase, {db} from '../firebase';
import './Network.css';
import EmailIcon from '@material-ui/icons/Email';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';


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

function Network() {

    const net = useNetwork();
    const [selected, setSelected] = useState('');

    const handleClick = (id) => {
        (selected === id) ? setSelected('') : setSelected(id);
    }
    const renderWebsite = (website) => {
        if (website) {
            const pretty_website = website.replace(/(^\w+:|^)\/\//, '');
            return (
                <a className="network__contact__website" href={website} target="_blank" rel="noopener noreferrer">
                    {pretty_website}</a>
            )
        }
    }
    const renderEmail = (email) => {
        if (email) {
            return (
                <a href={`mailto:${email}`} target="_blank" rel="noopener noreferrer"><EmailIcon/></a>
            )
        }
    }
    const renderInstagram = (instagram) => {
        if (instagram) {
            return (
                <a href={instagram} target="_blank" rel="noopener noreferrer"><InstagramIcon/></a>
            )
        }
    }
    const renderFacebook = (facebook) => {
        if (facebook) {
            return (
                <a href={facebook} target="_blank" rel="noopener noreferrer"><FacebookIcon/></a>
            )
        }
    }
    const renderNetwork = () => {
        const contacts = net.map(contact => (
            <button className="network__contact" onClick={() => handleClick(contact.id)}>
                <div className="network__contact__letter">
                    {contact.name.charAt(0)}
                </div>
                <div className={`network__contact__info ${(selected === contact.id) ? '' : 'network__contact__info--collapsed'}`}>
                    <p className="network__contact__name">{contact.name}</p>
                    <p className="network__contact__description">{contact.description}</p>
                    {renderWebsite(contact.website)}
                    <div className="network__contact__info__icons">
                        {renderEmail(contact.email)}
                        {renderInstagram(contact.instagram)}
                        {renderFacebook(contact.facebook)}
                    </div>
                </div>
            </button>
        ))
        return contacts;
    }
    return (
        <div className="network">
            {renderNetwork()}
        </div>
    )
}

export default Network;
