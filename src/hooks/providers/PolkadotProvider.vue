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
    if (props.polkadotApi) {
      providePolkadotContainer(props.polkadotApi);
    }
  },
});
</script>
