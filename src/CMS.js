import React, { useContext } from 'react';
import NewUpload from './NewUpload';
import './NewUpload.css';
import { PageContext } from './contexts/PageContext';

function CMS() {
    const [, setPage] = useContext(PageContext);
    return (
        <div className="cms">
            <p>CMS:</p>
            <NewUpload />
            <button onClick={() => setPage('portfolio')}>Portfolio</button>
        </div>
    )
}

export default CMS;
