import React from 'react';
import './App.css';
import Portfolio from './Portfolio';
import './Portfolio.css';
import CMS from './CMS';
import './CMS.css';
import Splash from './Splash';
import { ArtworkProvider } from './contexts/ArtworkContext';
import { render } from '@testing-library/react';
import { CMSPageProvider } from './contexts/CMSPageContext';
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import TinyCrossfade from "react-tiny-crossfade";
import { Switch, Route, useLocation } from "react-router-dom";


function App() {
    let location = useLocation();

    return (
        <div>
            <TransitionGroup>
                <CSSTransition
                    key={location.key}
                    classNames="fade"
                    timeout={300}
                >
                    <Switch location={location}>
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
                </CSSTransition>
            </TransitionGroup>
        </div>
    )
}

export default App;
