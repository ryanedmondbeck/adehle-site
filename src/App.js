import React, { useContext } from 'react';
import './App.css';
import Portfolio from './Portfolio';
import './Portfolio.css';
import CMS from './CMS';
import './CMS.css';
import Splash from './Splash';
import { ArtworkProvider } from './contexts/ArtworkContext';
import { render } from '@testing-library/react';
import { CMSPageProvider } from './contexts/CMSPageContext';
import TinyCrossfade from "react-tiny-crossfade";
import { Switch, Route } from "react-router-dom";


function App() {
    return (
        <div>
            <Switch>
                <Route path="/portfolio">
                    <ArtworkProvider>   
                        <Portfolio />
                    </ArtworkProvider>
                </Route>
                <Route path="/cms">
                    <CMSPageProvider>
                        <CMS />
                    </CMSPageProvider>
                </Route>
                <Route path="/">
                    <Splash />
                </Route>
            </Switch>
        </div>
    )
}

export default App;
