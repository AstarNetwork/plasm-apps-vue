import { ApiPromise } from '@polkadot/api';

export type State = {
    api?: ApiPromise;
    initialized: boolean;
};

export const state: State = {
    api: undefined,
    initialized: false,
};
