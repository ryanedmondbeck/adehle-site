import React, { useState } from 'react';
import './DetailEmailM.css';
import emailjs from 'emailjs-com';
import { Link } from "react-router-dom";

function DetailEmailM({ title, price, setTransition}) {
    const [status, setStatus] = useState();

    emailjs.init("user_4knm2h4SRCFyntFJjrMFB");

    const sendEmail = (e) => {
        e.preventDefault();
        setStatus('loading');
        console.log('sending email...');
        emailjs.sendForm('contact_service', 'contact_template', e.target, 'user_4knm2h4SRCFyntFJjrMFB')
            .then((result) => {
                setStatus('sent');
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
        });
    }
    if (status === 'loading') {
        return (
            <p className="detail-email-m--loading">Sending message to Adehle...</p>
        )
    }
    else if (status === 'sent') {
        return (
            <div className="detail-email-m--sent">
                <p>Your message has been sent to Adehle.</p>
                <Link onClick={() => setTransition('dtp')} to="/portfolio-mobile">Return to Portfolio</Link>
            </div>
        )
    }
    else {
        return (
            <form className="detail-email-m" onSubmit={sendEmail}>
                <input type="hidden" name="artwork" value={title} />
                <input type="hidden" name="price" value={price} />
                <input type="text" name="from_name" placeholder="Name"/>
                <input type="email" name="user_email" placeholder="Email"/>
                <textarea name="message" placeholder="Message" />
                <input className="detail-email-m__send" type="submit" value="Send" />
            </form>
        )
    }
}

export default DetailEmailM;
