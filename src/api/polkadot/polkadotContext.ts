import { provide, inject, reactive, toRefs, readonly } from 'vue';
import { ApiPromise } from '@polkadot/api/promise';
import { WsProvider } from '@polkadot/rpc-provider';
import { connectApi } from './connectApi';
import { providerEndpoints } from '@/config';

// note: this is a simplified Redux-like state management pattern using the Vue composition API.
// unlike Vuex; this method is not very strict, meaning that if someone really wanted to,
// they could just directly inject the raw state symbol and mutate it

// global state that holds the reference to the API instance. This will be exposed as a readonly reference
let state = reactive({
    //fixme: this is just a temporary init object
    api: new ApiPromise({ provider: new WsProvider(providerEndpoints[0].endpoint) }),
    // fixme: this value is purely for testing the injection method
    testCounter: 0,
});

// methods that can mutate the global state
const mutations = {
    initializeApi: async () => {
        //fixme: the endpoint is just a temporary value
        const api = await connectApi(providerEndpoints[0].endpoint);
        state.api = api;
    },
    setApi: (apiInst: ApiPromise) => {
        state.api = apiInst;
    },
    setCounter: (val: number) => {
        state.testCounter = val;
    },
};

type ProviderState = typeof state;

type StateMutations = typeof mutations;

// define a unique key to access the value
const PolkadotContainerProviderSymbol = Symbol('polkadot API read state');
const PolkadotProviderMutationSymbol = Symbol('polkadot API state mutation');

export const providePolkadotContainer = (initState?: ProviderState) => {
    // use the provided state, or use the default state if none was provided
    if (typeof initState !== 'undefined') {
        state = reactive(initState);
    }

    // provide a readonly reference of the current state and mutation methods
    provide(PolkadotContainerProviderSymbol, toRefs(readonly(state)));
    provide(PolkadotProviderMutationSymbol, mutations);
};

export const usePolkadotContainerContext = () => {
    // allow access to the readonly state provided by the container
    return {
        ...inject<ProviderState>(PolkadotContainerProviderSymbol),
        ...inject<StateMutations>(PolkadotProviderMutationSymbol),
    };
};
