import React, { useState, useEffect } from 'react';
import './App.css';
import Portfolio from './Portfolio';
import CMS from './cms/CMS';
import About from './About';
import CMSLoggin from './cms/CMSLoggin';
import Splash from './Splash';
import { ArtworkProvider } from './contexts/ArtworkContext';
// import { render } from '@testing-library/react';
import { CMSPageProvider } from './contexts/CMSPageContext';
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { Switch, Route, useLocation, useRouteMatch } from "react-router-dom";
// import SketchSplash from './SketchSplash';

import PortfolioM from './mobile/PortfolioM.js';
import SplashM from './mobile/SplashM.js';
import AboutM from './mobile/AboutM.js';
import DetailM from './mobile/DetailM';

function App() {
    let location = useLocation();
    const [transition, setTransition] = useState('stp');
    const [auth, setAuth] = useState(false);
    // const [dtrue, setDtrue] = useState(true);\
    

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

    const [width, setWidth] = useState();
    const [isMobile, setIsMobile] = useState();
    const handleResize = () => {
        setWidth(window.innerWidth);
    };
    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);
        (width <= 500) ? setIsMobile(true) : setIsMobile(false);
        // console.log(isMobile, width);
        return _ => {
            window.removeEventListener('resize', handleResize)
        }
    });
    let { path, url } = useRouteMatch();
    if (isMobile) {
        return (
            // <div className="fade">
                <TransitionGroup childFactory={child => React.cloneElement(child, { 
                    classNames: transition,
                    timeout: 750
                })}>
                    <CSSTransition key={location.key} >
                        <div className="container">
                            <Switch location={location}>
                                <Route path="/portfolio-mobile">
                                    <PortfolioM setTransition={setTransition} />
                                </Route>
                                <Route path="/about-mobile">
                                    <AboutM setTransition={setTransition} />
                                </Route>
                                <Route path="/cms">
                                    {toCMS()}
                                </Route>
                                <Route path="/detail-mobile">
                                    <DetailM setTransition={setTransition} />
                                </Route>
                                <Route exact path="/">
                                    <SplashM setTransition={setTransition} />
                                </Route>
                                {/* <RefreshRoute path="/" /> */}
                            </Switch>
                        </div>
                    </CSSTransition>
                </TransitionGroup>
            // </div>
        )
    }
    else {
        return (
            <div className="fade">
                <TransitionGroup childFactory={child => React.cloneElement(child, { 
                    classNames: transition,
                    timeout: 750
                })}>
                    <CSSTransition key={location.key} >
                        <div className="container">
                            <Switch location={location}>
                                <Route path="/portfolio">
                                    <ArtworkProvider>   
                                        <Portfolio setTransition={setTransition} />
                                    </ArtworkProvider>
                                </Route>
                                <Route path="/about">
                                    <About setTransition={setTransition} />
                                </Route>
                                <Route path="/cms">
                                    {toCMS()}
                                </Route>
                                <Route exact path="/">
                                    <Splash setTransition={setTransition} />
                                </Route>
                            </Switch>
                        </div>
                    </CSSTransition>
                </TransitionGroup>
            </div>
        )
    }
    
}

export default App;
