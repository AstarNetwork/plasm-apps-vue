import { ActionTree, ActionContext } from 'vuex';
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

export interface GeneralActions extends ActionsContract {}

export const actions: ActionTree<State, State> & GeneralActions = {
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
