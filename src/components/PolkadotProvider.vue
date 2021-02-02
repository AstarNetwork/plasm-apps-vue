<template>
    <slot />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { providePolkadotContainer } from '@/api/polkadot';

export default defineComponent({
    name: 'polkadot-provider',
    setup() {
        // set up the provider that can be accessed to all the child components
        providePolkadotContainer();

        //todo: add connection handler method
    },
});
</script>
