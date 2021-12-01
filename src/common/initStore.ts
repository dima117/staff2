import { createStore, IModuleStore } from 'redux-dynamic-modules';
import { getObservableExtension } from 'redux-dynamic-modules-observable';

export type AppState = {};

// TODO: изолированные сторы для модулей
// TODO: не добавлять эпики на сервере
export function initStore(initialState: AppState): IModuleStore<AppState> {
    const store = createStore<AppState>(
        {
            initialState,
            enhancers: [
                /** enhancers to include */
            ],
            extensions: [getObservableExtension()],
        },
        /* ...any additional modules */
    );

    return store;
}
