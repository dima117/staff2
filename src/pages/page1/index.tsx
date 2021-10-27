import React from 'react';
import { Helmet } from 'react-helmet';

export const Page1: React.FC = () => {
    return (
        <div>
            <Helmet bodyAttributes={{ xxx: 1 }}>
                <title>page1</title>
                <meta name="generator" content="notepad" />
            </Helmet>
            page1
        </div>
    );
};
