import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router5';
import { DynamicModuleLoader } from 'redux-dynamic-modules';
import { Routes } from '../routes';
import { getPage1Module } from './Page1Module';

export const Page1: React.FC = (props) => {
    const { initialData } = props;
    return (
        <DynamicModuleLoader modules={[getPage1Module(initialData)]}>
            <div>
                <Helmet bodyAttributes={{ xxx: 1 }}>
                    <title>page1</title>
                    <meta name="generator" content="notepad" />
                </Helmet>
                <h1>page1</h1>
                <Link routeName={Routes.page2}>Go to PAGE-2</Link>
            </div>
        </DynamicModuleLoader>
    );
};
