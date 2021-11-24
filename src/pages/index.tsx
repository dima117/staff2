import React from 'react';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router5';
import { Router } from 'router5';
import { initStore } from 'src/common/initStore';
import { ApplicationContainer } from '../client/components/Application/Application';

export function initApplication(router: Router<any>) {
    const store = initStore({});

    const application = (
        <RouterProvider router={router}>
            <Provider store={store}>
                <ApplicationContainer />
            </Provider>
        </RouterProvider>
    );

    return application;
}
