import React from 'react';
import './App.css';
import Portfolio from './Portfolio';
import './Portfolio.css';
import { CollectionProvider } from './contexts/CollectionContext';
import { ArtworkProvider } from './contexts/ArtworkContext';

function App() {
  return (
    <div className="app">
        <ArtworkProvider>
            <CollectionProvider>
                <Portfolio />
            </CollectionProvider>
        </ArtworkProvider>
        
    </div>
  );
}

export default App;
