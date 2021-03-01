import React, { useEffect, useState, useRef } from 'react';
import EmailIcon from '@material-ui/icons/Email';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import './ContactM.css'

function ContactM({ setX, selected, setSelected, id, name, description, website, email, instagram, facebook}) {
    const thisRef = useRef(id);
    
    const handleClick = (id) => {
        setX(thisRef.current.offsetLeft);
        (selected === id) ? setSelected('') : setSelected(id);
    }
    const renderWebsite = (name, website) => {
        if (website) {
            const pretty_name = name.split(" ")[0];
            return (
                <a className="network-m__contact__website" href={website} target="_blank" rel="noopener noreferrer">
                   {`${pretty_name}'s website`}</a>
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
    return (
        <button ref={thisRef} id={id} className="contact-m" onClick={() => handleClick(id)}>
            <div className={`contact-m__letter ${(selected === id) ? '' : 'contact-m__letter--collapsed'}`}>
                {name.charAt(0)}
            </div>
            <div className={`contact-m__info ${(selected === id) ? '' : 'contact-m__info--collapsed'}`}>
                <p className="contact-m__name">{name}</p>
                <p className="contact-m__description">{description}</p>
                {renderWebsite(name, website)}
                <div className="contact-m__info__icons">
                    {renderEmail(email)}
                    {renderInstagram(instagram)}
                    {renderFacebook(facebook)}
                </div>
            </div>
        </button>
    )
}

export default ContactM;
