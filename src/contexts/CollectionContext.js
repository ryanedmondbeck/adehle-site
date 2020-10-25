import React, { createContext, useState } from 'react';

export const CollectionContext = createContext();

export const CollectionProvider = (props) => {
    const [collections, setCollection] = useState(
        [
            {
                title: "Collection of Artwork: One",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                collection: [
                    {
                        title: "Artwork: Title One",
                        dimensions: "100x100",
                        materials: "digital melted gold",
                        image: "./aa1.jpg"
                    },
                    {
                        title: "Artwork: Title Two",
                        dimensions: "100x100",
                        materials: "ice and metal",
                        image: "./aa2.jpg"
                    },
                    {
                        title: "Artwork: Title Three",
                        dimensions: "100x100",
                        materials: "ink and wax",
                        image: "./aa3.jpg"
                    }
                ]
            },
            {
                title: "Collection of Artwork: Two",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                collection: [
                    {
                        title: "Artwork: Title One",
                        dimensions: "100x100",
                        materials: "stone and wax",
                        image: "./aa4.jpg"
                    },
                    {
                        title: "Artwork: Title Two",
                        dimensions: "100x100",
                        materials: "stone and wax",
                        image: "./aa5.jpg"
                    },
                    {
                        title: "Artwork: Title Three",
                        dimensions: "100x100",
                        materials: "stone and wax",
                        image: "./aa6.jpg"
                    }
                ]
            },
            {
                title: "Collection of Artwork: Three",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                collection: [
                    {
                        title: "Artwork: Title One",
                        dimensions: "100x100",
                        materials: "stone and wax",
                        image: "./aa7.jpg"
                    },
                    {
                        title: "Artwork: Title Two",
                        dimensions: "100x100",
                        materials: "stone and wax",
                        image: "./aa8.jpg"
                    },
                    {
                        title: "Artwork: Title Three",
                        dimensions: "100x100",
                        materials: "stone and wax",
                        image: "./aa9.jpg"
                    }
                ]
            },
            {
                title: "Collection of Artwork: Four",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                collection: [
                    {
                        title: "Artwork: Title One",
                        dimensions: "100x100",
                        materials: "stone and wax",
                        image: "./aa10.jpg"
                    },
                    {
                        title: "Artwork: Title Two",
                        dimensions: "100x100",
                        materials: "stone and wax",
                        image: "./aa11.jpg"
                    },
                    {
                        title: "Artwork: Title Three",
                        dimensions: "100x100",
                        materials: "stone and wax",
                        image: "./aa1.jpg"
                    }
                ]
            }
        ]
    );

    return (
        <CollectionContext.Provider value={[collections, setCollection]}>
            {props.children}
        </CollectionContext.Provider>
    );

}