import { RoutesConfiguration } from 'src/common/initRouter';

export enum Routes {
    page1 = 'page1',
    page2 = 'page2',
}

export function configureRoutes(config: RoutesConfiguration) {
    config.addRoute(Routes.page1, () => import('../pages/page1').then(m => m.Page1));
    config.addRoute(Routes.page2, () => import('../pages/page2').then(m => m.Page2));
}
