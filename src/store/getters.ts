import { GetterTree } from 'vuex';
import { AlertBox, GeneralState as State } from './state';
import {
  Getters as GettersContract,
  getters as gettersContract,
} from './modules/contracts/getters';

export interface GeneralGetters extends GettersContract {
  initialized(state: State): boolean;
  isLoading(state: State): boolean;
  showAlert(state: State): AlertBox;
  networkIdx(state: State): Number;
  accountIdx(state: State): Number;
  customEndpoint(state: State): string;
}

export const getters: GetterTree<State, State> & GeneralGetters = {
  initialized: (state) => state.initialized,
  isLoading: (state) => state.isLoading,
  showAlert: (state) => state.alertBox,
  networkIdx: (state) => state.currentNetworkIdx,
  accountIdx: (state) => state.currentAccountIdx,
  customEndpoint: (state) => state.currentCustomEndpoint,
  ...gettersContract,
};
