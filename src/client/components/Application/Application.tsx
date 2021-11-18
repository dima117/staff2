import React, { PureComponent, ReactNode } from 'react';
import { useRoute } from 'react-router5';
import { State } from 'router5';

import { routesConfig } from '../../../common/initRouter';

export interface ApplicationState {
    hasError: boolean;
}

export interface ApplicationProps {
    route: State;
}

export class Application extends PureComponent<ApplicationProps> {

    state: ApplicationState = { hasError: false };

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    renderContent(): ReactNode {
        if (this.state.hasError) {
            // ошибка внутри страницы
            return <div>client error</div>;
        }

        if (this.props.route) {
            const Component = routesConfig[this.props.route.name].loadComponent();

            if (Component instanceof Promise) {
                Component.then(() => {
                    this.forceUpdate();
                });
                return null;
            } else {
                return <Component />
            }
        }

        return <div>404</div>;
    }

    render() {
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

export const ApplicationContainer: React.FC = () => {
    const route = useRoute();

    return <Application route={route.route} />
}
