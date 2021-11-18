import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router5';
import { Routes } from '../routes';

export const Page1: React.FC = () => {
    return (
        <div>
            <Helmet bodyAttributes={{ xxx: 1 }}>
                <title>page1</title>
                <meta name="generator" content="notepad" />
            </Helmet>
            <h1>page1</h1>
            <Link routeName={Routes.page2} >Got to PAGE-2</Link>
        </div>
    );
};
