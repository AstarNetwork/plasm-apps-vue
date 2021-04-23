import { ApiPromise } from '@polkadot/api';
import { GetterTree } from 'vuex';
import { State } from './state';

export type Getters = {
  api(state: State): ApiPromise | undefined;
  initialized(state: State): boolean;
  isLoading(state: State): boolean;
  showAlertMsg(state: State): boolean;
  alertMsg(state: State): string;
  networkIdx(state: State): Number;
  accountIdx(state: State): Number;
  customEndpoint(state: State): string;
};

export const getters: GetterTree<State, State> & Getters = {
  api: (state) => state.api,
  initialized: (state) => state.initialized,
  isLoading: (state) => state.isLoading,
  showAlertMsg: (state) => state.showAlertMsg,
  alertMsg: (state) => state.alertMsg,
  networkIdx: (state) => state.currentNetworkIdx,
  accountIdx: (state) => state.currentAccountIdx,
  customEndpoint: (state) => state.currentCustomEndpoint,
};
