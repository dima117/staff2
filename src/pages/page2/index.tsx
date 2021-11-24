import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router5';
import { DynamicModuleLoader } from 'redux-dynamic-modules';
import { Routes } from '../routes';
import { getPage2Module } from './Page2Module';

export const Page2: React.FC = () => {
    return (
        <DynamicModuleLoader modules={[getPage2Module()]}>
            <div>
                <Helmet>
                    <title>page22</title>
                </Helmet>
                <h1>page22</h1>
                <Link routeName={Routes.page1} >Got to PAGE-1</Link>
            </div>
        </DynamicModuleLoader>
    );
};
