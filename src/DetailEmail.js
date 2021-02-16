import React, { useState } from 'react';
import './DetailEmail.css';
import emailjs from 'emailjs-com';

function DetailEmail({ title, price, status, setStatus }) {
    const user_id = process.env.REACT_APP_EMAILJS_USER_ID;
    const validEmail = (email) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    }
    const sendEmail = (e) => {
        e.preventDefault();
        // console.log(user_id);
        if (e.target.from_name.value && e.target.user_email.value && e.target.message.value) {
            if (validEmail(e.target.user_email.value)) {
                setStatus('loading');
                console.log('sending email...');
                emailjs.sendForm('contact_service', 'contact_template', e.target, user_id)
                    .then((result) => {
                        setStatus('sent');
                        console.log(result.text);
                    }, (error) => {
                        setStatus('error');
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
    else if (status === 'error') {
        return (
            <div className="detail-email--sent">
                <p>There was an error sending your message. Please email Adehle directly at adehlerose@gmail.com</p>
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
