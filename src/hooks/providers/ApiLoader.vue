<template>
  <polkadot-provider :polkadotApi="api">
    <slot />
  </polkadot-provider>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
import { ActionTypes } from '@/store/action-types';
import PolkadotProvider from './PolkadotProvider.vue';
import { providerEndpoints } from '@/config';

export default defineComponent({
  name: 'api-loader',
  async setup() {
    const store = useStore();

    const api = computed(() => store.getters.api);

    const networkIdx = computed(() => store.getters.networkIdx);
    store.dispatch(
      ActionTypes.GET_NETWORK_API,
      providerEndpoints[networkIdx.value].endpoint
    );

    return {
      api,
    };
  },
  components: {
    PolkadotProvider,
  },
});
</script>
