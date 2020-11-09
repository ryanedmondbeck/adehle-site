import React, { useContext } from 'react';
import { CMSPageContext } from './contexts/CMSPageContext';

function CMSMenu() {
    const [cmsPage, setCmsPage] = useContext(CMSPageContext);
    return (
        <div className="cms-menu">
            <button onClick={() => setCmsPage('artwork')}>Upload New Artwork</button>
            <button onClick={() => setCmsPage('collection')}>Create New Collection</button>
            <button onClick={() => setCmsPage('edit')}>Edit Artwork and Collections</button>
        </div>
    )
}

export default CMSMenu;
