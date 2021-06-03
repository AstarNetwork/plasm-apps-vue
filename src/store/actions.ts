import { ActionTree, ActionContext } from 'vuex';
import { connectApi } from '@/api/polkadot';
import { GeneralState as State } from './state';
import { GeneralMutations as Mutations } from './mutations';
import { ActionTypes } from './action-types';
import { MutationTypes } from './mutation-types';
import {
  Actions as ActionsContract,
  actions as actionsContract,
} from './modules/contracts/actions';

export type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, State>, 'commit'>;

export interface GeneralActions extends ActionsContract {
  // [ActionTypes.GET_NETWORK_API](
  //   { commit }: AugmentedActionContext,
  //   url: string
  // ): Promise<ApiPromise>;
}

export const actions: ActionTree<State, State> & GeneralActions = {
  // async [ActionTypes.GET_NETWORK_API]({ commit }, url: string) {
  //   const api = await connectApi(url);
  //   commit(MutationTypes.SET_NETWORK_API, api);
  //   commit(MutationTypes.SET_INITIALIZED, undefined);
  //   return api;
  // },
  [ActionTypes.SHOW_ALERT_MSG]({ commit }, { msg, alertType }) {
    commit(MutationTypes.SET_SHOW_ALERT_MSG, true);
    commit(MutationTypes.SET_ALERT_MSG, msg);
    commit(MutationTypes.SET_ALERT_TYPE, alertType);
    setTimeout(() => {
      commit(MutationTypes.SET_SHOW_ALERT_MSG, false);
    }, 3000);
  },
  ...actionsContract,
};
