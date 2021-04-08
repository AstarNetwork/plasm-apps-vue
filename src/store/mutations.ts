import { MutationTree } from 'vuex';
import { MutationTypes } from './mutation-types';
import { State } from './state';

export type Mutations<S = State> = {
  [MutationTypes.SET_NETWORK_API](state: S, payload: any): void;
  [MutationTypes.SET_INITIALIZED](state: S): void;
  [MutationTypes.SET_CURRENT_NETWORK_IDX](state: S, networkIdx: Number): void;
  [MutationTypes.SET_CURRENT_ACCOUNT_IDX](state: S, accountIdx: Number): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SET_NETWORK_API](state, payload) {
    state.api = payload;
  },
  [MutationTypes.SET_INITIALIZED](state) {
    state.initialized = true;
  },
  [MutationTypes.SET_CURRENT_NETWORK_IDX](state, networkIdx) {
    state.currentNetworkIdx = networkIdx;
  },
  [MutationTypes.SET_CURRENT_ACCOUNT_IDX](state, accountIdx) {
    state.currentAccountIdx = accountIdx;
  },
};
