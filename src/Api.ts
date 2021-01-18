import { ApiPromise } from '@polkadot/api';
import keyring from '@polkadot/ui-keyring';
import { web3Accounts, web3Enable } from '@polkadot/extension-dapp';
import { isTestChain } from '@polkadot/util';
import { WsProvider } from '@polkadot/rpc-provider';
import * as plasmDefinitions from '@plasm/types/interfaces/definitions';

interface InjectedAccountExt {
    address: string;
    meta: {
        name: string;
        source: string;
    };
}

const injectedPromise = web3Enable('polkadot-js/apps');

async function loadOnReady(api: ApiPromise): Promise<void> {
    const [systemChain, injectedAccounts] = await Promise.all([
        api.rpc.system.chain() as any,
        web3Accounts().then((accounts): InjectedAccountExt[] =>
            accounts.map(
                ({ address, meta }): InjectedAccountExt => ({
                    address,
                    meta: {
                        ...meta,
                        name: `${meta.name} (${
                            meta.source === 'polkadot-js' ? 'extension' : meta.source
                        })`,
                    },
                }),
            ),
        ),
    ]);
    const isDevelopment = isTestChain(systemChain ? systemChain.toString() : '<unknown>');

    keyring.loadAll(
        {
            genesisHash: api.genesisHash,
            isDevelopment,
            type: 'ed25519',
        },
        injectedAccounts,
    );
}

export function connectApi(url: string): ApiPromise {
    const provider = new WsProvider(url);

    const types = Object.values(plasmDefinitions).reduce(
        (res, { types }): object => ({ ...res, ...types }),
        {},
    );

    const api = new ApiPromise({
        provider,
        types,
    });
    api.on('connected', (): void => console.log(`Connected to ${url}`));
    api.on('disconnected', (): void => console.log(`Disconnected from ${url}`));
    api.on(
        'ready',
        async (): Promise<void> => {
            try {
                await loadOnReady(api);
            } catch (error) {
                console.error('Unable to load chain', error);
            }
        },
    );

    injectedPromise.then((): void => {}).catch((error: Error) => console.error(error));

    return api;
}
