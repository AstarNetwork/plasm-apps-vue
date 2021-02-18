<template>
    <polkadot-provider :polkadotApi="api">
        <slot />
    </polkadot-provider>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import PolkadotProvider from './PolkadotProvider.vue';
import { providerEndpoints } from '@/config';
import { connectApi } from '@/api/polkadot';

export default defineComponent({
    name: 'api-loader',
    async setup() {
        const dusty = providerEndpoints[1].endpoint;
        //const local = providerEndpoints[2].endpoint;

        const endpoint = ref(dusty);

        const api = await connectApi(endpoint.value);
        return {
            api,
        };
    },
    components: {
        PolkadotProvider,
    },
});
</script>
