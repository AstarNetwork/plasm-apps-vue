import { GetterTree } from 'vuex';
import { State } from './state';

export type Getters = {
    api(state: State): any;
};

export const getters: GetterTree<State, State> & Getters = {
    api: (state) => {
        return state.api;
    },
};
