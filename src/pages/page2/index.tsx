import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router5';
import { Routes } from '../routes';

export const Page2: React.FC = () => {
    return (
        <div>
            <Helmet>
                <title>page22</title>
            </Helmet>
            <h1>page22</h1>
            <Link routeName={Routes.page1} >Got to PAGE-1</Link>
        </div>
    );
};
