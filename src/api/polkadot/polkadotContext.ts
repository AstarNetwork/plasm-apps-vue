import { provide, inject, reactive, toRefs, readonly } from 'vue';
import { ApiPromise } from '@polkadot/api/promise';
import { WsProvider } from '@polkadot/rpc-provider';
import { providerEndpoints } from '@/config';
import { connectApi } from './connectApi';

// note: this is a simplified Redux-like state management pattern using the Vue composition API.
// unlike Vuex; this method is not very strict, meaning that if someone really wanted to,
// they could just directly inject the raw state symbol and mutate it

type ProviderState = {
    api: null | ApiPromise;
    testCounter: number;
};

// global state that holds the reference to the API instance. This will be exposed as a readonly reference
const state = reactive<ProviderState>({
    // start with an empty api object
    api: null,
    // fixme: this value is purely for testing the injection method
    testCounter: 0,
});

// methods that can mutate the global state
const mutations = {
    setApi: (apiInst: ApiPromise) => {
        state.api = apiInst;
    },
    setCounter: (val: number) => {
        state.testCounter = val;
    },
};

type StateMutations = typeof mutations;

// define a unique key to access the value
const STATE_SYMBOL = Symbol('polkadot API read state');
const MUTATION_SYMBOL = Symbol('polkadot API state mutation');

export const providePolkadotContainer = async (endpoint: string) => {
    const api = await connectApi(endpoint);

    mutations.setApi(api);

    // we are returning the method to ensure the provide function is called inside the component
    return () => {
        // provide a readonly reference of the current state and mutation methods
        provide(STATE_SYMBOL, toRefs(readonly(state)));
        provide(MUTATION_SYMBOL, mutations);
    };
};

export const usePolkadotContainerContext = () => {
    // allow access to the readonly state provided by the container
    return {
        ...inject<ProviderState>(STATE_SYMBOL),
        ...inject<StateMutations>(MUTATION_SYMBOL),
    };
};
