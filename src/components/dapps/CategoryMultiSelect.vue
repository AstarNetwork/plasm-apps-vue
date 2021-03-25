<template>
  <div
    class="inline-flex items-center rounded-full px-3 py-1 bg-blue-100 dark:bg-blue-200 text-xs font-medium text-blue-500 dark:text-blue-700 mr-1 mb-1"
  >
    #DeFi
    <button
      type="button"
      class="rounded-full focus:outline-none p-1 -mr-2 -ml-0.5 hover:text-blue-400 dark:hover:text-blue-600"
    >
      <icon-base class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
        <icon-tag-close />
      </icon-base>
    </button>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import IconBase from '@/components/icons/IconBase.vue';
import IconTagClose from '@/components/icons/IconTagClose.vue';

export default defineComponent({
  components: {
    IconBase,
    IconTagClose,
  },
});
</script>
