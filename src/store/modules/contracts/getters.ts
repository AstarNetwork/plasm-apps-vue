import { GetterTree } from 'vuex';
import { GeneralState as State } from '../../state';
import { CodeStored } from './state';

export type Getters = {
  hasCode(state: State): boolean;
  getAllCode(state: State): CodeStored[];
  getCode(state: State, codeHash: string): CodeStored | undefined;
};

export const getters: GetterTree<State, State> & Getters = {
  hasCode: (state) => Object.keys(state.allCode).length !== 0,
  getAllCode: (state) => Object.values(state.allCode),
  getCode: (state, codeHash) => state.allCode[codeHash],
};
