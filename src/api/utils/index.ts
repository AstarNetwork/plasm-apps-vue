import { ApiPromise } from '@polkadot/api';

export function assertApiIsDefined(api?: ApiPromise): ApiPromise {
    if (api === undefined) {
        throw new Error('Polkadot api is undefined');
    }
    return api;
}
