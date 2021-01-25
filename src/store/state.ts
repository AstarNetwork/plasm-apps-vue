import { ApiPromise } from '@polkadot/api';

export type State = {
    api: ApiPromise;
};

export let state: State;
