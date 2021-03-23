import { ApiPromise } from '@polkadot/api';

export function assertApiIsDefined(api?: ApiPromise | null): ApiPromise {
  if (api === undefined || api === null) {
    throw new Error('Polkadot api is undefined');
  }
  return api;
}
