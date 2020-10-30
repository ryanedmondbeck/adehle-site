import React from 'react';

function Contact({contact}) {
    return (
        <div className={`contact ${contact ? "" : "contact--hidden"}`}>
            <p>adehledaley@realemail.com</p>
        </div>
    )
}

export default Contact;
