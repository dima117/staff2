import React, { PureComponent, ReactNode } from 'react';
import { useRoute } from 'react-router5';
import { State } from 'router5';

import { RoutesConfiguration } from 'src/common/initRouter';

export interface ApplicationState {
    hasError: boolean;
    preloadedData?: unknown;
}

export interface ApplicationProps {
    route?: State;
    routesConfig: RoutesConfiguration;
}

let tmp: unknown;

function setGlobalData(data: unknown) {
    tmp = data;
}

function getGlobalData() {
    setTimeout(() => setGlobalData(undefined), 0);
    return tmp;
}

export class Application extends PureComponent<ApplicationProps> {
    override state: ApplicationState = { hasError: false };

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    renderContent(): ReactNode {
        if (this.state.hasError) {
            // ошибка внутри страницы
            return <h1>client error</h1>;
        }

        // TODO: добавить отображение 500/403

        const { route, routesConfig } = this.props;

        const Component = routesConfig.loadComponent(route);
        const data = getGlobalData() || this.makeDataRequest(route);

        if (Component) {
            if (!(Component instanceof Promise) && !(data instanceof Promise)) {
                return <Component initialData={data} />;
            }

            Promise.all([Component, data]).then(([_, payload]) => {
                setGlobalData(payload);
                this.forceUpdate();
            });
            return null;
        }

        return <h1>404</h1>;
    }

    override render() {
        return (
            <div>
                {this.renderContent()}
                <footer>
                    <button onClick={() => alert('it works')}>Click me</button>
                </footer>
            </div>
        );
    }

    async makeDataRequest(_route) {
        return Promise.resolve({ key: 'value-client' });
    }
}

export const ApplicationContainer: React.FC<{
    routesConfig: RoutesConfiguration;
    preloadedData: unknown;
}> = (props) => {
    const { routesConfig, preloadedData } = props;
    const route = useRoute();

    setGlobalData(preloadedData);

    return <Application route={route.route} routesConfig={routesConfig} />;
};
