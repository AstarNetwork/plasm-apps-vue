import { ApiPromise } from '@polkadot/api';

export const state = {
    api: ApiPromise,
};

export type State = typeof state;
