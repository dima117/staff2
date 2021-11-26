import { AnyAction } from 'redux';
import { IEpicModule } from 'redux-dynamic-modules-observable';
import { Epic } from 'redux-observable';
import { EMPTY, mergeMapTo, tap } from 'rxjs';

export interface Page2State {
    name: string;
}

export const stubEpic: Epic<AnyAction, AnyAction, Page2State> = (action$) =>
    action$.pipe(
        tap((a) => {
            console.log('m2', a);
        }),
        mergeMapTo(EMPTY),
    );

export function getPage2Module(): IEpicModule<Page2State> {
    return {
        id: 'page2-module',
        reducerMap: {
            name: (state = 'a') => state + '!',
        },
        epics: [stubEpic],
        // Actions to fire when this module is added/removed
        // initialActions: [],
        // finalActions: [],
    };
}
