import { State as StateContract } from './modules/contracts/state';

export type AlertBox = {
  showAlertMsg: boolean;
  alertMsg: string;
  alertType: string;
};

export interface GeneralState extends StateContract {
  initialized: boolean;
  isLoading: boolean;
  alertBox: AlertBox;
  currentNetworkIdx: Number;
  currentAccountIdx: Number;
  currentCustomEndpoint: string;
}

export const state: GeneralState = {
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
  allCode: {},
};
