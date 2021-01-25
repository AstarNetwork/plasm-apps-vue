import { ApiPromise } from '@polkadot/api';
import { GetterTree } from 'vuex';
import { State } from './state';

export type Getters = {
    api(state: State): ApiPromise | undefined;
    initialized(state: State): boolean;
};

export const getters: GetterTree<State, State> & Getters = {
    api: (state) => {
        return state.api;
    },
    initialized: (state) => {
        return state.initialized;
    },
};
