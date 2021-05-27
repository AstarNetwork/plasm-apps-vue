import { MutationTree } from 'vuex';
import { MutationTypes } from '../../mutation-types';
import { GeneralState as State } from '../../state';

export type Mutations<S = State> = {
  [MutationTypes.ADD_CODE](state: S, json: any): void;
  [MutationTypes.REMOVE_CODE](state: S, codeHash: string): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.ADD_CODE](state, json) {
    state.allCode[json.codeHash] = json;
  },
  [MutationTypes.REMOVE_CODE](state, codeHash) {
    delete state.allCode[codeHash];
  }
};
