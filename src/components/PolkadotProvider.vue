<template>
    <slot />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { providePolkadotContainer } from '@/api/polkadot';

export default defineComponent({
    name: 'polkadot-provider',
    setup() {
        const isLoading = ref(false);
        //todo: initialize node connection
        // set up the provider that can be accessed to all the child components
        providePolkadotContainer();

        return {
            isLoading,
        };
    },
});
</script>
