import React, { PureComponent, ReactNode } from 'react';
import { useRoute } from 'react-router5';
import { State } from 'router5';

import { RoutesConfiguration } from 'src/common/initRouter';

export interface ApplicationState {
    hasError: boolean;
}

export interface ApplicationProps {
    route?: State;
    routesConfig: RoutesConfiguration;
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

        if (Component) {
            if (Component instanceof Promise) {
                Component.then(() => {
                    this.forceUpdate();
                });
                return null;
            } else {
                return <Component />
            }
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
}

export const ApplicationContainer: React.FC<{ routesConfig: RoutesConfiguration }> = props => {
    const { routesConfig } = props;
    const route = useRoute();

    return <Application route={route.route} routesConfig={routesConfig} />
}
