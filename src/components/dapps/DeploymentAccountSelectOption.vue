<template>
  <li
    role="option"
    class="text-blue-900 dark:text-darkGray-100 cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-gray-50 dark:hover:bg-darkGray-700"
  >
    <div class="flex items-center justify-between cursor-pointer">
      <div class="flex items-center">
        <div
          class="h-8 w-8 rounded-full overflow-hidden border border-gray-100 mr-3 flex-shrink-0"
        >
          <icon-base class="h-full w-full" viewBox="0 0 64 64">
            <icon-account-sample />
          </icon-base>
        </div>
        <div>
          <div class="text-sm font-medium">Account Option</div>
          <div class="text-xs text-gray-500 dark:text-darkGray-400">
            5Hn8MM....2dZzwc
          </div>
        </div>
      </div>
      <div class="text-sm">100PLM</div>
    </div>
  </li>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import IconBase from '@/components/icons/IconBase.vue';
import IconAccountSample from '@/components/icons/IconAccountSample.vue';

export default defineComponent({
  components: {
    IconBase,
    IconAccountSample,
  },
});
</script>