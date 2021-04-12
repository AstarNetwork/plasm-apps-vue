import { ApiPromise } from '@polkadot/api';

export type State = {
  api?: ApiPromise;
  initialized: boolean;
  currentNetworkIdx: Number;
  currentAccountIdx: Number;
  currentCustomEndpoint: string;
};

export const state: State = {
  api: undefined,
  initialized: false,
  currentNetworkIdx: 0,
  currentAccountIdx: 0,
  currentCustomEndpoint: '',
};
