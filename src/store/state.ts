import { ApiPromise } from '@polkadot/api';

export type State = {
  api?: ApiPromise;
  initialized: boolean;
  currentNetworkIdx: Number;
};

export const state: State = {
  api: undefined,
  initialized: false,
  currentNetworkIdx: 0,
};
