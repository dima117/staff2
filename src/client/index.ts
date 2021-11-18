import ReactDOM from "react-dom";
import { initRouter, routesConfig } from "src/common/initRouter"; // TODO: починить path
import { initApplication } from "src/pages";


const router = initRouter(routesConfig);
const application = initApplication(router);
router.start();

Promise.resolve(routesConfig[router.getState().name].loadComponent())
    .then(() => {
        ReactDOM.hydrate(
            application,
            document.getElementById('root'),
        );
    });
