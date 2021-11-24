import { createStore, IModuleStore } from "redux-dynamic-modules";
import { getObservableExtension } from "redux-dynamic-modules-observable";

// TODO: изолированные сторы для модулей
// TODO: не добавлять эпики на сервере
export function initStore(initialState: unknown): IModuleStore<unknown>  {
    const store = createStore(
        {
            initialState,
            enhancers: [ /** enhancers to include */ ], 
            extensions: [getObservableExtension()],
        },
        /* ...any additional modules */
    );    

    return store;
}
