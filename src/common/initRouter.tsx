import React from 'react';
import { createRouter, Route } from 'router5';
import browserPlugin from 'router5-plugin-browser';
import { Routes } from 'src/pages/routes';

export interface AppModule {
    loadComponent: () => React.ComponentType | Promise<React.ComponentType>;
}

export type RoutesConfiguration = Record<string, AppModule>;

const cache: Record<string, React.ComponentType> = {};
export const routesConfig: RoutesConfiguration = {};

function addRoute(route: Routes, loader: () => Promise<React.ComponentType>) {
    // TODO: вынести в класс
    routesConfig[route] = {
        loadComponent: () => {
            if (cache[route]) {
                return cache[route];
            }

            return loader().then(obj => cache[route] = obj);
        }
    }
}

// TODO: сделать в pages/routes фабрику конфига роутинга
addRoute(Routes.page1, () => import('../pages/page1').then(m => m.Page1));
addRoute(Routes.page2, () => import('../pages/page2').then(m => m.Page2));

export function initRouter(config: RoutesConfiguration, basePath?: string) {
    const routes: Route<unknown>[] = Object.keys(config).map(
        (route: string): Route<unknown> => ({
            name: route,
            path: `/${route}`,
        }),
    );

    const router = createRouter(routes, {
        queryParamsMode: 'loose',
        trailingSlashMode: 'always',
        defaultRoute: '404',
    });

    router.usePlugin(browserPlugin({ base: basePath }));
    return router;
}
