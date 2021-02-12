<template>
    <polkadot-provider :polkadotApi="api">
        <slot />
    </polkadot-provider>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PolkadotProvider from './PolkadotProvider.vue';
import { localNode } from '@/config';
import { connectApi } from '@/api/polkadot';

export default defineComponent({
    name: 'api-loader',
    async setup() {
        const api = await connectApi(localNode.endpoint);

        return {
            api,
        };
    },
    components: {
        PolkadotProvider,
    },
});
</script>
