<template>
  <button
    :disabled="isBusy"
    type="button"
    @click="updateMetadata"
    class="
      my-1
      inline-flex
      justify-center
      w-full
      border border-gray-300
      dark:border-darkGray-600
      px-2
      py-1
      bg-white
      dark:bg-darkGray-900
      text-xs
      font-light
      text-gray-700
      dark:text-darkGray-100
      hover:bg-gray-100
      dark:hover:bg-darkGray-700
      focus:outline-none
      focus:ring focus:ring-gray-100
      dark:focus:ring-darkGray-600
    "
  >
    Update Metadata
  </button>
</template>
<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
import { useStore } from 'vuex';
import { useMetaExtensions } from '@/hooks/useMetaExtensions';
import { useChainInfo } from '@/hooks/useChainInfo';

export default defineComponent({
  setup() {
    const store = useStore();
    const apiRef = computed(() => store.getters.api);
    const extensionsRef = computed(() => store.getters.extensions);

    const { chainInfo } = useChainInfo(apiRef);

    const { metaExtensions } = useMetaExtensions(apiRef, extensionsRef);
    const selectedIndex = 0;
    let isBusy = ref(false);
    const updateMetadata = () => {
      const extensions = metaExtensions?.value?.extensions;

      if (chainInfo.value && extensions?.[selectedIndex]) {
        isBusy.value = true;

        extensions[selectedIndex]
          .update(JSON.parse(JSON.stringify(chainInfo.value)))
          .catch((e) => console.error(e))
          .then(() => (isBusy.value = false))
          .catch(console.error);
      }
    };

    return {
      updateMetadata,
      isBusy,
    };
  },
});
</script>
