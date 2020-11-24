import React, { useContext } from 'react';
import NewUpload from './NewUpload';
import './NewUpload.css';
import NewCollection from './NewCollection';
import './NewCollection.css';
import EditCollection from './EditCollection';
import './EditCollection.css';
import CMSMenu from './CMSMenu';
import './CMSMenu.css';
import { CMSPageContext } from './contexts/CMSPageContext';
import NewUploadLoading from './NewUploadLoading';
import NewCollectionLoading from './NewCollectionLoading';
import { Link } from "react-router-dom";


function CMS() {
    const [cmsPage] = useContext(CMSPageContext);

    const renderCMS = () => {
        if (cmsPage === 'artwork') {
            return (<NewUpload />)
        }
        if (cmsPage === 'collection') {
            return (<NewCollection />)
        }
        if (cmsPage === 'edit') {
            return (<EditCollection />)
        } 
        if (cmsPage === 'loading') {
            return(<NewUploadLoading />)
        }
        if (cmsPage === 'uploading-collection') {
            return(<NewCollectionLoading />)
        }
    }
    return ( 
        <div className="cms">
            <CMSMenu />
            {renderCMS()}
            <Link className="cms__portfolio" to="/portfolio">Return to Portfolio</Link>
        </div>
    )
}

export default CMS;
