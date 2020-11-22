import React, { useContext } from 'react';
import './App.css';
import Portfolio from './Portfolio';
import './Portfolio.css';
import CMS from './CMS';
import './CMS.css';
import Splash from './Splash';
import { ArtworkProvider } from './contexts/ArtworkContext';
import { PageContext } from './contexts/PageContext';
import { render } from '@testing-library/react';
import { CMSPageProvider } from './contexts/CMSPageContext';
import TinyCrossfade from "react-tiny-crossfade";


function App() {
    const [page] = useContext(PageContext);
    const showPage = () => {
        if (page === 'portfolio') {
            return (
                <ArtworkProvider>
                    <Portfolio />
                </ArtworkProvider>
            )
        }
        if (page === 'cms') {
            return (
                <CMSPageProvider>
                    <CMS />
                </CMSPageProvider>
            )    
        }
        if (page === 'splash') {
            return (
                <Splash />
            )
        }
    }
    return (
        <div className="app">
            <TinyCrossfade className="component-wrapper"> 
                {showPage()}
            </TinyCrossfade>
        </div>
    );
}

export default App;
