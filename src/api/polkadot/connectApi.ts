import { ApiPromise, WsProvider } from '@polkadot/api';
import { keyring } from '@polkadot/ui-keyring';
import { web3Accounts, web3Enable } from '@polkadot/extension-dapp';
import { isTestChain } from '@polkadot/util';
import { cryptoWaitReady } from '@polkadot/util-crypto';
import chainTypeDefs from '@plasm/types';

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
      ss58Format: 5,
    },
    injectedAccounts
  );
};

export const connectApi = async (endpoint: string) => {
  const provider = new WsProvider(endpoint);

  const api = new ApiPromise({
    provider,
    types: {
      ...chainTypeDefs.dustyDefinitions,
      LookupSource: 'MultiAddress',
    },
  });

  try {
    await api.isReadyOrError;
  } catch (err) {
    console.error('err', err);
  }

  try {
    await loadAccounts(api);
  } catch (err) {
    console.error(err);
  }

  // load the web3 extension
  injectedPromise
    .then((): void => { })
    .catch((error: Error) => console.error(error));

  return api;
};
