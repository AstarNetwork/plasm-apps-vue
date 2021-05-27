import { MutationTree } from 'vuex';
import { MutationTypes } from './mutation-types';
import { GeneralState as State } from './state';
import { Mutations as MutationsContract, mutations as mutationsContract } from './modules/contracts/mutations';

export interface GeneralMutations<S = State> extends MutationsContract {
  [MutationTypes.SET_NETWORK_API](state: S, payload: any): void;
  [MutationTypes.SET_INITIALIZED](state: S): void;
  [MutationTypes.SET_LOADING](state: S, isLoading: boolean): void;
  [MutationTypes.SET_SHOW_ALERT_MSG](state: S, showAlert: boolean): void;
  [MutationTypes.SET_ALERT_MSG](state: S, msg: string): void;
  [MutationTypes.SET_ALERT_TYPE](state: S, type: string): void;
  [MutationTypes.SET_CURRENT_NETWORK_IDX](state: S, networkIdx: Number): void;
  [MutationTypes.SET_CURRENT_ACCOUNT_IDX](state: S, accountIdx: Number): void;
  [MutationTypes.SET_CURRENT_CUSTOM_ENDPOINT](state: S, endpoint: string): void;
}

export const mutations: MutationTree<State> & GeneralMutations = {
  [MutationTypes.SET_NETWORK_API](state, payload) {
    state.api = payload;
  },
  [MutationTypes.SET_INITIALIZED](state) {
    state.initialized = true;
  },
  [MutationTypes.SET_LOADING](state, isLoading) {
    state.isLoading = isLoading;
  },
  [MutationTypes.SET_SHOW_ALERT_MSG](state, showAlert) {
    state.alertBox.showAlertMsg = showAlert;
  },
  [MutationTypes.SET_ALERT_MSG](state, msg) {
    state.alertBox.alertMsg = msg;
  },
  [MutationTypes.SET_ALERT_TYPE](state, type) {
    state.alertBox.alertType = type;
  },
  [MutationTypes.SET_CURRENT_NETWORK_IDX](state, networkIdx) {
    state.currentNetworkIdx = networkIdx;
  },
  [MutationTypes.SET_CURRENT_ACCOUNT_IDX](state, accountIdx) {
    state.currentAccountIdx = accountIdx;
  },
  [MutationTypes.SET_CURRENT_CUSTOM_ENDPOINT](state, endpoint) {
    state.currentCustomEndpoint = endpoint;
  },
  ...mutationsContract
};
