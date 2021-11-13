import React from 'react';
import { RouterProvider } from 'react-router5';
import { Router } from 'router5';
import { ApplicationContainer } from '../client/components/Application/Application';

export function initApplication(router: Router<any>) {
    const application = (
        <RouterProvider router={router}>
            <ApplicationContainer />
        </RouterProvider>
    );

    return application;
}
