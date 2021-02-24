import React, { useContext } from 'react';
import './CMS.css';
import NewUpload from './NewUpload';
import './NewUpload.css';
import NewCollection from './NewCollection';
import './NewCollection.css';
import EditCollection from './EditCollection';
import './EditCollection.css';
import EditProfile from './EditProfile';
import './EditProfile.css';
import CMSMenu from './CMSMenu';
import './CMSMenu.css';
import { CMSPageContext } from '../contexts/CMSPageContext';
import NewUploadLoading from './NewUploadLoading';
import NewCollectionLoading from './NewCollectionLoading';
import EditComments from './EditComments';
import EditNetwork from './EditNetwork';
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
        if (cmsPage === 'profile') {
            return (<EditProfile />)
        } 
        if (cmsPage === 'comments') {
            return(<EditComments />)
        }
        if (cmsPage === 'network') {
            return(<EditNetwork/>)
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
            <Link className="cms__portfolio" to="/portfolio">Go to Portfolio Page</Link>
            <Link className="cms__portfolio" to="/splash">Go to Splash Page</Link>
            <Link className="cms__portfolio" to="/about">Go to About Page</Link>
        </div>
    )
}

export default CMS;
