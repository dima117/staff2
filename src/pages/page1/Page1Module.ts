import { AnyAction } from "redux";
import { IEpicModule } from "redux-dynamic-modules-observable";
import { Epic } from "redux-observable";
import { EMPTY, mergeMapTo, tap } from "rxjs";

export interface Page1State {
    count: number;
}

export const stubEpic: Epic<AnyAction, AnyAction, Page1State> = (action$) => action$.pipe(
    tap(a => {
        console.log('m1', a);
    }),
    mergeMapTo(EMPTY),
);

export function getPage1Module(): IEpicModule<Page1State> {
    return {
        id: "page1-module",
        reducerMap: {
            count: (state = 0) => state + 1
        },
        epics: [stubEpic],
        // Actions to fire when this module is added/removed
        // initialActions: [],
        // finalActions: [],
    };
}