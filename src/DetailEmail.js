import React, { useState } from 'react';
import './DetailEmail.css';
import emailjs from 'emailjs-com';

function DetailEmail({ title, price, status, setStatus }) {
    emailjs.init("user_4knm2h4SRCFyntFJjrMFB");

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
                setStatus('sent');
                // emailjs.sendForm('contact_service', 'contact_template', e.target, 'user_4knm2h4SRCFyntFJjrMFB')
                //     .then((result) => {
                //         setStatus('sent');
                //         console.log(result.text);
                //     }, (error) => {
                //         console.log(error.text);
                // });
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
            <p className="detail-email--loading">Sending message to Adehle...</p>
        )
    }
    else if (status === 'sent') {
        return (
            <div className="detail-email--sent">
                <p>Your message has been sent to Adehle.</p>
            </div>
        )
    }
    else {
        return (
            <form className="detail-email" onSubmit={sendEmail}>
                <input type="hidden" name="artwork" value={title} />
                <input type="hidden" name="price" value={price} />
                <input type="text" name="from_name" placeholder="Name"/>
                <input type="email" name="user_email" placeholder="Email"/>
                <textarea name="message" placeholder="Message" />
                <input className="detail-email__send" type="submit" value="Send" />
            </form>
        )
    }
}

export default DetailEmail;
