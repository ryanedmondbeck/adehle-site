import React, { useContext } from 'react';
import { CMSPageContext } from './contexts/CMSPageContext';

function CMSMenu() {
    const [cmsPage, setCmsPage] = useContext(CMSPageContext);
    return (
        <div className="cms-menu">
            <button onClick={() => setCmsPage('artwork')}
            className={`cms-menu__button ${(cmsPage === 'artwork') ? "cms-menu__button--selected" : ""}`}>
                Upload New Artwork</button>
            <button onClick={() => setCmsPage('collection')}
            className={`cms-menu__button ${(cmsPage === 'collection') ? "cms-menu__button--selected" : ""}`}>
                Create New Collection</button>
            <button onClick={() => setCmsPage('edit')}
            className={`cms-menu__button ${(cmsPage === 'edit') ? "cms-menu__button--selected" : ""}`}>
                Edit Artwork and Collections</button>
        </div>
    )
}

export default CMSMenu;
