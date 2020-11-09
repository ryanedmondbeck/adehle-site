import React, { createContext, useState } from 'react';

export const CMSPageContext = createContext();

export const CMSPageProvider = (props) => {
    const [cmsPage, setCmsPage] = useState('menu');

    return (
        <CMSPageContext.Provider value={[cmsPage, setCmsPage]}>
            {props.children}
        </CMSPageContext.Provider>
    );
}