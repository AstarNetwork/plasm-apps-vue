<template>
  <button
    :disabled="!isNeedUpdate(extensionCount) || isBusy || isComplete"
    type="button"
    @click="updateMetadata"
    class="inline-flex items-center w-full justify-center px-6 py-1 border border-transparent text-xs rounded-full shadow-sm text-white bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-100 dark:focus:ring-blue-400 my-1"
  >
    <template v-if="isNeedUpdate(extensionCount) && !isComplete"
      >Update Metadata</template
    >
    <template v-else>Metadata Already Installed</template>
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

    const { metaExtensions, extensionCount } = useMetaExtensions(
      apiRef,
      extensionsRef
    );

    const selectedIndex = 0;
    const isBusy = ref(false);
    const isComplete = ref(false);
    const updateMetadata = () => {
      const extensions = metaExtensions?.value?.extensions;

      if (chainInfo.value && extensions?.[selectedIndex]) {
        isBusy.value = true;

        extensions[selectedIndex]
          .update(JSON.parse(JSON.stringify(chainInfo.value)))
          .then(() => {
            console.log('updated');
            isBusy.value = false;
            isComplete.value = true;
          })
          .catch(console.error);
      }
    };

    return {
      extensionCount,
      updateMetadata,
      isBusy,
      isComplete,
    };
  },
  methods: {
    isNeedUpdate(extensionCount: number) {
      return extensionCount > 0;
    },
  },
});
</script>
<style scoped>
button:disabled {
  @apply bg-blue-300 hover:bg-blue-300 dark:hover:bg-blue-300;
}
</style>
