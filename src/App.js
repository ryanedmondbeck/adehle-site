import React, { useContext } from 'react';
import './App.css';
import Portfolio from './Portfolio';
import './Portfolio.css';
import CMS from './CMS';
import './CMS.css';
import { ArtworkProvider } from './contexts/ArtworkContext';
import { PageContext } from './contexts/PageContext';
import { render } from '@testing-library/react';

function App() {
    const [page, setPage] = useContext(PageContext);
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
                <CMS />
            )
                
            
        }
    }
    return (
        <div className="app">
            {showPage()}
        </div>
    );
}

export default App;
