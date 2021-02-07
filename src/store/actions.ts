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
        payload: Parameters<Mutations[K]>[1],
    ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, State>, 'commit'>;

export interface Actions {
    [ActionTypes.GET_NETWORK_API](
        { commit }: AugmentedActionContext,
        payload: ApiPromise,
    ): Promise<ApiPromise>;
}

export const actions: ActionTree<State, State> & Actions = {
    async [ActionTypes.GET_NETWORK_API]({ commit }) {
        const url = process.env.VUE_APP_WS_URL ?? 'ws://127.0.0.1:9944';
        const api = await connectApi(url);
        commit(MutationTypes.SET_NETWORK_API, api);
        commit(MutationTypes.SET_INITIALIZED, undefined);
        return api;
    },
};
