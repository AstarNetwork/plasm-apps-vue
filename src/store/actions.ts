import { ActionTree, ActionContext } from 'vuex';
import { ApiPromise } from '@polkadot/api';
import { connectApi } from '@/api/polkadot';
import { State } from './state';
import { Mutations } from './mutations';
import { ActionTypes } from './action-types';
import { MutationTypes } from './mutation-types';

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, State>, 'commit'>;

export interface Actions {
  [ActionTypes.GET_NETWORK_API](
    { commit }: AugmentedActionContext,
    url: string
  ): Promise<ApiPromise>;
}

export const actions: ActionTree<State, State> & Actions = {
  async [ActionTypes.GET_NETWORK_API]({ commit }, url: string) {
    const api = await connectApi(url);
    commit(MutationTypes.SET_NETWORK_API, api);
    commit(MutationTypes.SET_INITIALIZED, undefined);
    return api;
  },
  [ActionTypes.SHOW_ALERT_MSG]({ commit }, { msg, alertType }) {
    commit(MutationTypes.SET_SHOW_ALERT_MSG, true);
    commit(MutationTypes.SET_ALERT_MSG, msg);
    commit(MutationTypes.SET_ALERT_TYPE, alertType);
    setTimeout(() => {
      commit(MutationTypes.SET_SHOW_ALERT_MSG, false);
    }, 3000);
  },
};
