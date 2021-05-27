import { ApiPromise } from '@polkadot/api';
import { GetterTree } from 'vuex';
import { AlertBox, GeneralState as State } from './state';
import { Getters as GettersContract, getters as gettersContract } from './modules/contracts/getters';

export interface GeneralGetters extends GettersContract {
  api(state: State): ApiPromise | undefined;
  initialized(state: State): boolean;
  isLoading(state: State): boolean;
  showAlert(state: State): AlertBox;
  networkIdx(state: State): Number;
  accountIdx(state: State): Number;
  customEndpoint(state: State): string;
}

export const getters: GetterTree<State, State> & GeneralGetters = {
  api: (state) => state.api,
  initialized: (state) => state.initialized,
  isLoading: (state) => state.isLoading,
  showAlert: (state) => state.alertBox,
  networkIdx: (state) => state.currentNetworkIdx,
  accountIdx: (state) => state.currentAccountIdx,
  customEndpoint: (state) => state.currentCustomEndpoint,
  ...gettersContract
};
