import { MutationTree } from 'vuex';
import { MutationTypes } from './mutation-types';
import { State } from './state';

export type Mutations<S = State> = {
  [MutationTypes.SET_NETWORK_API](state: S, payload: any): void;
  [MutationTypes.SET_INITIALIZED](state: S): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SET_NETWORK_API](state, payload) {
    state.api = payload;
  },
  [MutationTypes.SET_INITIALIZED](state) {
    state.initialized = true;
  },
};
