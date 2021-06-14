import { ActionTree, ActionContext } from 'vuex';
import { ApiPromise } from '@polkadot/api';
import { GeneralState as State } from '../../state';
import { AugmentedActionContext } from '../../actions';
import { ActionTypes } from '../../action-types';
import { MutationTypes } from '../../mutation-types';
import { CodeJson } from './state';
import type { Hash } from '@polkadot/types/interfaces';
import { Abi } from '@polkadot/api-contract';
import { isString } from '@polkadot/util';
import store from 'store';

interface SaveCode {
  api: ApiPromise;
  _codeHash: string | Hash;
  partial: Partial<CodeJson>;
}

export interface Actions {
  [ActionTypes.LOAD_ALL_CONTRACTS](
    { commit }: AugmentedActionContext,
    api: ApiPromise
  ): void;
  [ActionTypes.SAVE_CODE](
    { commit, state }: AugmentedActionContext,
    payload: SaveCode
  ): void;
}

const KEY_CODE = 'code:';

const getCodeJson = (api: ApiPromise, json: CodeJson): any => {
  return {
    contractAbi: json.abi
      ? new Abi(json.abi, api.registry.getChainProperties())
      : undefined,
    json,
  };
};

export const actions: ActionTree<State, State> & Actions = {
  async [ActionTypes.LOAD_ALL_CONTRACTS]({ commit }, param: any) {
    try {
      const api: ApiPromise = param.api;
      const genesisHash = api.genesisHash?.toHex();

      console.log('genesisHash', genesisHash);

      store.each((json: CodeJson, key: string): void => {
        if (
          json &&
          json.genesisHash === genesisHash &&
          key.startsWith(KEY_CODE)
        ) {
          const newJson = getCodeJson(api, json);
          commit(MutationTypes.ADD_CODE, newJson);
        }
      });
    } catch (e) {
      console.error('Unable to load code', e);
    }
  },
  async [ActionTypes.SAVE_CODE](
    { commit, state },
    { api, _codeHash, partial }
  ) {
    const hash: Hash = isString(_codeHash)
      ? api.registry.createType('Hash', _codeHash)
      : _codeHash;
    const codeHash = hash.toHex();
    const existing = state.allCode[codeHash];
    const json = {
      ...(existing ? existing.json : {}),
      ...partial,
      codeHash,
      genesisHash: api.genesisHash.toHex(),
      whenCreated: existing?.json.whenCreated || Date.now(),
    };
    const key = `${KEY_CODE}${json.codeHash}`;

    console.log('key', key);
    console.log('json', json);

    store.set(key, json);
    const newJson = getCodeJson(api, json as CodeJson);
    commit(MutationTypes.ADD_CODE, newJson);
  },
  async [ActionTypes.FORGET_CODE]({ commit, state }, { codeHash }) {
    const key = `${KEY_CODE}${codeHash}`;
    delete state.allCode[codeHash];
    store.remove(key);
  },
};
