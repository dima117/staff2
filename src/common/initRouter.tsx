import React from 'react';
import { createRouter, Route, State } from 'router5';
import browserPlugin from 'router5-plugin-browser';
import { Routes } from 'src/pages/routes'; // TODO: убрать зависимость от pages

export interface AppModule {
    loadComponent: () => React.ComponentType | Promise<React.ComponentType>;
}

export class RoutesConfiguration {

    readonly routes: Routes[] = [];
    private modules: Record<string, AppModule> = {};
    private cache: Record<string, React.ComponentType> = {};

    addRoute(route: Routes, loader: () => Promise<React.ComponentType>) {
        if (this.modules[route]) {
            throw new Error(`duplicate route: ${route}`)
        }

        this.routes.push(route);
        this.modules[route] = {
            loadComponent: () => {
                return this.cache[route] || loader().then(obj => this.cache[route] = obj);
            }
        }
    }

    loadComponent(state?: State): React.ComponentType | Promise<React.ComponentType> | undefined {
        if (state?.name) {
            const module = this.modules[state?.name];

            if (module) {
                return module.loadComponent();
            }
        }

        return undefined;
    }
}

export function initRouter(config: RoutesConfiguration, basePath?: string) {
    const routes: Route[] = config.routes.map(
        (route: string): Route => ({
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
