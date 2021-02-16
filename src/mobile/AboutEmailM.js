import React, { useState } from 'react';
import './AboutEmailM.css';
import emailjs from 'emailjs-com';
import { Link } from "react-router-dom";
import CloseIcon from '@material-ui/icons/Close';

function AboutEmailM({ setTransition}) {
    const user_id = process.env.REACT_APP_EMAILJS_USER_ID;
    const [status, setStatus] = useState('empty');

    const validEmail = (email) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    }
    const sendEmail = (e) => {
        e.preventDefault();
        if (e.target.from_name.value && e.target.user_email.value && e.target.message.value) {
            if (validEmail(e.target.user_email.value)) {
                setStatus('loading');
                console.log('sending email...');
                emailjs.sendForm('contact_service', 'general_contact_template', e.target, user_id)
                    .then((result) => {
                        setStatus('sent');
                        console.log(result.text);
                    }, (error) => {
                        console.log(error.text);
                });
            }
            else{
                alert("Please enter a valid email address.")
            }
        }
        else {
            alert("Please fill out all fields of form before sending.")
        }
    }
    if (status === 'loading') {
        return (
            <p className="about-email-m--loading">Sending message to Adehle...</p>
        )
    }
    else if (status === 'sent') {
        return (
            <div className="about-email-m--sent">
                <Link onClick={() => setTransition('ats')} className="portfolio__header__adehle" to="/"><CloseIcon fontSize="large"/></Link>
                <p>Your message has been sent to Adehle.</p>
            </div> 
        )
    }
    else {
        return (
            <form className="about-email-m" onSubmit={sendEmail}>
                <Link onClick={() => setTransition('ats')} className="portfolio__header__adehle" to="/about-mobile"><CloseIcon fontSize="large"/></Link>
                <p>Send a message to Adehle</p>
                <input type="text" name="from_name" placeholder="Name"/>
                <input type="email" name="user_email" placeholder="Email"/>
                <textarea name="message" placeholder="Ask me anything!" />
                <input className="about-email-m__send" type="submit" value="Send" />
            </form>
        )
    }
}

export default AboutEmailM;
