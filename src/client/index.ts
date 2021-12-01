import ReactDOM from 'react-dom';
import { initRouter, RoutesConfiguration } from 'src/common/initRouter';
import { initApplication } from 'src/pages';
import { configureRoutes } from 'src/pages/routes';

const routesConfig = new RoutesConfiguration();

configureRoutes(routesConfig);

const router = initRouter(routesConfig);
const application = initApplication(router, routesConfig);
router.start();

Promise.resolve(routesConfig.loadComponent(router.getState())).then(
    () => {
        ReactDOM.hydrate(application, document.getElementById('root'));
    },
);
