import React from 'react';
import { createRouter, Route } from 'router5';
import browserPlugin from 'router5-plugin-browser';

import { Page1 } from '../pages/page1';
import { Page2 } from '../pages/page2';

export interface AppModule {
    Component: React.ComponentType;
}

export type RoutesConfiguration = Record<string, AppModule>;

export const routesConfig: RoutesConfiguration = {
    page1: {
        Component: Page1,
    },
    page2: {
        Component: Page2,
    },
};

export function initRouter(config: RoutesConfiguration) {
    const routes: Route<unknown>[] = Object.keys(config).map(
        (route: string): Route<unknown> => ({
            name: route,
            path: `/${route}`,
        }),
    );

    const router = createRouter(routes, {
        trailingSlashMode: 'always',
        defaultRoute: '404',
    });

    router.usePlugin(browserPlugin());
    return router;
}
