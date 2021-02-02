import { provide, inject, reactive, toRefs, readonly } from 'vue';
import { ApiPromise } from '@polkadot/api/promise';

// global state that holds the reference to the API instance
const state = reactive({ api: new ApiPromise() });

export const PolkadotContainerProviderSymbol = Symbol();

export const providePolkadotContainer = () => {
    provide(PolkadotContainerProviderSymbol, toRefs(readonly(state)));
};

export const usePolkadotContainerContext = () => {
    return { ...inject<typeof state>(PolkadotContainerProviderSymbol) };
};
