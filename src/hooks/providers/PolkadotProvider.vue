<template>
    <slot />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { providePolkadotContainer } from '@/api/polkadot';
import { ApiPromise } from '@polkadot/api';

export default defineComponent({
    name: 'polkadot-provider',
    props: {
        polkadotApi: { type: Object as PropType<ApiPromise>, required: true },
    },
    setup(props) {
        // we use the api instance that was passed as a prop to inject data
        // note: trying to use the `provide()` function within a promise wrapper may cause unexpected behavior
        if (props.polkadotApi) {
            providePolkadotContainer(props.polkadotApi);
        }
    },
});
</script>
