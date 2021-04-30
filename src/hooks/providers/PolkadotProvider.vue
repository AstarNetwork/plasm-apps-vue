<template>
  <slot />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { providePolkadotContainer } from '@/api/polkadot';
import { ApiPromise } from '@polkadot/api';
import { useStore } from 'vuex';
import { MutationTypes } from '@/store/mutation-types';

export default defineComponent({
  name: 'polkadot-provider',
  props: {
    polkadotApi: { type: Object as PropType<ApiPromise>, required: true },
  },
  setup(props) {
    if (props.polkadotApi) {
      const store = useStore();
      store.commit(MutationTypes.SET_NETWORK_API, props.polkadotApi);
      providePolkadotContainer(props.polkadotApi);
    }
  },
});
</script>
