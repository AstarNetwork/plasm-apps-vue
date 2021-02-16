<template>
    <polkadot-provider :polkadotApi="api" :keyring="keyring">
        <slot />
    </polkadot-provider>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import PolkadotProvider from './PolkadotProvider.vue';
import { providerEndpoints } from '@/config';
import { connectApi, loadAccounts } from '@/api/polkadot';

export default defineComponent({
    name: 'api-loader',
    async setup() {
        const dusty = providerEndpoints[1].endpoint;
        //const local = providerEndpoints[2].endpoint;

        const endpoint = ref(dusty);

        const api = await connectApi(endpoint.value);
        const keyring = await loadAccounts(api);
        return {
            api,
            keyring,
        };
    },
    components: {
        PolkadotProvider,
    },
});
</script>
