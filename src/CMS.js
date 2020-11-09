import React, { useContext } from 'react';
import NewUpload from './NewUpload';
import './NewUpload.css';
import NewCollection from './NewCollection';
import './NewCollection.css';
import EditCollection from './EditCollection';
import './EditCollection.css';
import CMSMenu from './CMSMenu';
import './CMSMenu.css';
import { PageContext } from './contexts/PageContext';
import { CMSPageContext } from './contexts/CMSPageContext';


function CMS() {
    const [, setPage] = useContext(PageContext);
    const [cmsPage] = useContext(CMSPageContext);
    console.log(cmsPage);
    const renderCMS = () => {
        if (cmsPage === 'menu') {
            return(
                <CMSMenu />
            )
        }
        if (cmsPage === 'artwork') {
            return (
                <div>
                    <CMSMenu />
                    <NewUpload />
                </div>
                
            )
        }
        if (cmsPage === 'collection') {
            return (
                <div>
                    <CMSMenu />
                    <NewCollection />
                </div>
                
            )
        }
        if (cmsPage === 'edit') {
            return (
                <div>
                    <CMSMenu />
                    <EditCollection />
                </div>
                
            )
        }
        
    }
    return ( 
        <div className="cms">
            {renderCMS()}
            <button onClick={() => setPage('portfolio')}>Portfolio</button>
        </div>
    )
}

export default CMS;
