import { ApiPromise } from '@polkadot/api';
import { keyring } from '@polkadot/ui-keyring';
import { web3Accounts, web3Enable } from '@polkadot/extension-dapp';
import { isTestChain } from '@polkadot/util';
import { WsProvider } from '@polkadot/rpc-provider';
import * as plasmDefinitions from '@plasm/types/interfaces/definitions';
import { cryptoWaitReady } from '@polkadot/util-crypto';

interface InjectedAccountExt {
  address: string;
  meta: {
    name: string;
    source: string;
  };
}

const injectedPromise = web3Enable('polkadot-js/apps');

const loadAccounts = async (api: ApiPromise) => {
  // wait for the WASM crypto libraries to load first
  await cryptoWaitReady();

  const [systemChain, injectedAccounts] = await Promise.all([
    api.rpc.system.chain() as any,
    web3Accounts().then((accounts): InjectedAccountExt[] =>
      accounts.map(
        ({ address, meta }): InjectedAccountExt => ({
          address,
          meta: {
            ...meta,
            name: `${meta.name} (
              ${meta.source === 'polkadot-js' ? 'extension' : meta.source})`,
          },
        })
      )
    ),
  ]);
  const isDevelopment = isTestChain(
    systemChain ? systemChain.toString() : '<unknown>'
  );

  keyring.loadAll(
    {
      genesisHash: api.genesisHash,
      isDevelopment,
      type: 'ed25519',
    },
    injectedAccounts
  );
};

export const connectApi = async (endpoint: string) => {
  const provider = new WsProvider(endpoint);

  const types = Object.values(plasmDefinitions).reduce(
    (res, { types }): object => ({ ...res, ...types }),
    {}
  );

  const api = await new ApiPromise({
    provider,
    types,
  }).isReady;

  try {
    await loadAccounts(api);
  } catch (err) {
    console.error(err);
  }

  // load the web3 extension
  injectedPromise
    .then((): void => {})
    .catch((error: Error) => console.error(error));

  return api;
};
