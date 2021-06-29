import { GetterTree } from 'vuex';
import { AlertBox, GeneralState as State, Theme } from './state';
import {
  Getters as GettersContract,
  getters as gettersContract,
} from './modules/contracts/getters';

export interface GeneralGetters extends GettersContract {
  initialized(state: State): boolean;
  isLoading(state: State): boolean;
  showAlert(state: State): AlertBox;
  networkStatus(state: State): string;
  networkIdx(state: State): Number;
  accountIdx(state: State): Number;
  customEndpoint(state: State): string;
  theme(state: State): Theme;
}

export const getters: GetterTree<State, State> & GeneralGetters = {
  initialized: (state) => state.initialized,
  isLoading: (state) => state.isLoading,
  showAlert: (state) => state.alertBox,
  networkStatus: (state) => state.currentNetworkStatus,
  networkIdx: (state) => state.currentNetworkIdx,
  accountIdx: (state) => state.currentAccountIdx,
  customEndpoint: (state) => state.currentCustomEndpoint,
  theme: (state: State) => state.currentTheme,
  ...gettersContract,
};
