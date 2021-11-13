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
            const obj = routesConfig[this.props.route.name];

            if (obj) {
                const { Component } = obj;

                return <Component />;
            }
        }

        return <div>404</div>;
    }

    render() {
        return (
            <div>
                {this.renderContent()}
            </div>
        );
    }
}

export const ApplicationContainer: React.FC = props => {
    const route = useRoute();

    return <Application route={route.route} />
}
