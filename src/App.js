import React, { useState, useEffect } from 'react';
import './App.css';
import Portfolio from './Portfolio';
import './Portfolio.css';
import CMS from './CMS';
import './CMS.css';
import CMSLoggin from './CMSLoggin';
import Splash from './Splash';
import { ArtworkProvider } from './contexts/ArtworkContext';
// import { render } from '@testing-library/react';
import { CMSPageProvider } from './contexts/CMSPageContext';
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { Switch, Route, useLocation } from "react-router-dom";
// import SketchSplash from './SketchSplash';


function App() {
    let location = useLocation();
    const [transition, setTransition] = useState('stp');
    const [auth, setAuth] = useState(false);
    // const [dtrue, setDtrue] = useState(true);
   
    const toCMS = () => {
        if (auth) {
            return (
                <CMSPageProvider>
                    <CMS />
                </CMSPageProvider>
            )
        }
        else {
            return (<CMSLoggin setAuth={setAuth} />);
        }
    }
    return (
        <div className="fade">
            <TransitionGroup childFactory={child => React.cloneElement(child, { 
                classNames: transition,
                timeout: 1000
            })}>
                <CSSTransition key={location.key} >
                    <div className="container">
                        <Switch location={location}>
                            <Route path="/portfolio">
                                <ArtworkProvider>   
                                    <Portfolio setTransition={setTransition} />
                                </ArtworkProvider>
                            </Route>
                            <Route path="/cms">
                                {toCMS()}
                            </Route>
                            <Route path="/">
                                <Splash setTransition={setTransition} />
                            </Route>
                        </Switch>
                    </div>
                </CSSTransition>
            </TransitionGroup>
            
        </div>
    )
}

export default App;
