<template>
    <slot />
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { providePolkadotContainer } from '@/api/polkadot';
import { providerEndpoints } from '@/config';

interface ConnectionStat {
    error?: Error;
    isLoading: boolean;
}

export default defineComponent({
    name: 'polkadot-provider',
    async setup() {
        const connectionStatus = reactive<ConnectionStat>({
            isLoading: true,
        });

        try {
            await providePolkadotContainer(providerEndpoints[0].endpoint);

            connectionStatus.isLoading = false;
        } catch (err) {
            console.error(err);
            connectionStatus.error = err;
        }

        return {
            connectionStatus,
        };
    },
});
</script>
