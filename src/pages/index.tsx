import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router5';
import { Router } from 'router5';
import { RoutesConfiguration } from 'src/common/initRouter';
import { initStore } from 'src/common/initStore';
import { ApplicationContainer } from '../client/components/Application/Application';

// TODO: кажется, этот файл нужно перенести в common
export function initApplication(router: Router, routesConfig: RoutesConfiguration) {
    const store = initStore({});

    const application = (
        <RouterProvider router={router}>
            <Provider store={store}>
                <ApplicationContainer routesConfig={routesConfig} />
            </Provider>
        </RouterProvider>
    );

    return application;
}
