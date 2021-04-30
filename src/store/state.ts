import { ApiPromise } from '@polkadot/api';

export type AlertBox = {
  showAlertMsg: boolean;
  alertMsg: string;
  alertType: string;
};

export type State = {
  api?: ApiPromise;
  initialized: boolean;
  isLoading: boolean;
  alertBox: AlertBox;
  currentNetworkIdx: Number;
  currentAccountIdx: Number;
  currentCustomEndpoint: string;
};

export const state: State = {
  api: undefined,
  initialized: false,
  isLoading: false,
  alertBox: {
    showAlertMsg: false,
    alertMsg: '',
    alertType: 'success',
  },
  currentNetworkIdx: 0,
  currentAccountIdx: 0,
  currentCustomEndpoint: '',
};
