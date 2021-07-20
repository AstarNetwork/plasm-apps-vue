<template>
  <polkadot-provider :polkadotApi="api" :extensions="extensions">
    <slot />
  </polkadot-provider>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
import { MutationTypes } from '@/store/mutation-types';
import PolkadotProvider from './PolkadotProvider.vue';
import { providerEndpoints, endpointKey } from '@/config';
import { connectApi } from '@/api/polkadot';

export default defineComponent({
  name: 'api-loader',
  async setup() {
    const store = useStore();
    const networkIdx = computed(() => store.getters.networkIdx);
    let endpoint = providerEndpoints[networkIdx.value].endpoint;
    if (networkIdx.value === endpointKey.CUSTOM) {
      const customEndpoint = computed(() => store.getters.customEndpoint);
      endpoint = customEndpoint.value;
    }

    let { api, extensions } = await connectApi(endpoint, networkIdx.value);
    // only for sidebar, which is not connected with provider
    store.commit(MutationTypes.SET_API, api);
    store.commit(MutationTypes.SET_EXTENSIONS, extensions);

    return {
      api,
      extensions,
    };
  },
  components: {
    PolkadotProvider,
  },
});
</script>
