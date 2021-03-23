<template>
  <div class="hidden lg:block ml-auto mb-6">
    <button
      type="button"
      class="inline-flex items-center w-full rounded-full border border-gray-300 dark:border-darkGray-600 px-2 py-2 bg-white dark:bg-darkGray-900 text-xs font-medium hover:bg-gray-100 dark:hover:bg-darkGray-700 focus:outline-none focus:ring focus:ring-gray-100 dark:focus:ring-darkGray-600"
    >
      <div
        class="h-8 w-8 rounded-full overflow-hidden border border-gray-100 mr-2"
      >
        <icon-base class="h-full w-full" viewBox="0 0 64 64">
          <icon-account-sample />
        </icon-base>
      </div>
      <div class="text-left">
        <p
          class="text-blue-900 dark:text-darkGray-100 font-semibold leading-tight flex justify-between"
        >
          <span>AddressName</span><span class="ml-2">100PLM</span>
        </p>
        <p
          class="text-xs text-gray-500 dark:text-darkGray-400 font-normal leading-tight"
        >
          5Hn8MM......2dZzwc
        </p>
      </div>

      <icon-chevron-down />
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import IconBase from '@/components/icons/IconBase.vue';
import IconAccountSample from '@/components/icons/IconAccountSample.vue';
import IconChevronDown from '@/components/icons/IconChevronDown.vue';

export default defineComponent({
  components: {
    IconBase,
    IconAccountSample,
    IconChevronDown,
  },
});
</script>
