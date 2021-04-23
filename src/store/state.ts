import { ApiPromise } from '@polkadot/api';

export type State = {
  api?: ApiPromise;
  initialized: boolean;
  isLoading: boolean;
  showAlertMsg: boolean;
  alertMsg: string;
  currentNetworkIdx: Number;
  currentAccountIdx: Number;
  currentCustomEndpoint: string;
};

export const state: State = {
  api: undefined,
  initialized: false,
  isLoading: false,
  showAlertMsg: false,
  alertMsg: '',
  currentNetworkIdx: 0,
  currentAccountIdx: 0,
  currentCustomEndpoint: '',
};
