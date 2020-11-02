import React, { useContext } from 'react';
import NewUpload from './NewUpload';
import './NewUpload.css';
import NewCollection from './NewCollection';
import './NewCollection.css';
import { PageContext } from './contexts/PageContext';

function CMS() {
    const [, setPage] = useContext(PageContext);
    return (
        <div className="cms">
            <p>CMS:</p>
            <NewUpload />
            <NewCollection />
            <button onClick={() => setPage('portfolio')}>Portfolio</button>
        </div>
    )
}

export default CMS;
