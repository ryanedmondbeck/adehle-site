import React, { useState } from 'react';

function CMSLoggin({ setAuth }) {
    const [input, setInput] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (process.env.REACT_APP_PW === input) {
            setAuth(true);
        }  
        else {
            alert("Incorrect password.");
            return;
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit} >
                <label>
                    <input type="text" placeholder="password"
                        value={input} 
                        onChange={e => setInput(e.target.value)}/>
                </label>
                <div className="submit">
                    <input type="submit" value="Submit" />  
                </div>
            </form>
        </div>
    )
}

export default CMSLoggin;
