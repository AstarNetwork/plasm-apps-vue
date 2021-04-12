<template>
  <polkadot-provider :polkadotApi="api">
    <slot />
  </polkadot-provider>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
import PolkadotProvider from './PolkadotProvider.vue';
import { providerEndpoints } from '@/config';
import { connectApi } from '@/api/polkadot';

export default defineComponent({
  name: 'api-loader',
  async setup() {
    const store = useStore();
    const networkIdx = computed(() => store.getters.networkIdx);
    let endpoint = providerEndpoints[networkIdx.value].endpoint;
    if (networkIdx.value == 3) {
      const customEndpoint = computed(() => store.getters.customEndpoint);
      endpoint = customEndpoint.value;
    }

    const api = await connectApi(endpoint);

    return {
      api,
    };
  },
  components: {
    PolkadotProvider,
  },
});
</script>
