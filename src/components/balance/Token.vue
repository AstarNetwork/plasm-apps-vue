<template>
  <div
    class="bg-white dark:bg-darkGray-800 overflow-hidden shadow rounded-lg p-5"
  >
    <div class="flex justify-between">
      <div class="flex items-center">
        <div class="h-10 w-10 rounded-full overflow-hidden mr-2">
          <img src="@/assets/img/ACA.96bf6b59.svg" class="h-full w-full" />
        </div>
        <div>
          <p
            class="text-blue-900 dark:text-darkGray-100 font-bold text-lg leading-tight"
          >
            ACA
          </p>
          <p class="text-gray-500 dark:text-darkGray-400 text-xs">Acala</p>
        </div>
      </div>

      <div>
        <p class="font-bold text-blue-900 dark:text-darkGray-100 text-right">
          <span class="text-2xl leading-tight">100</span>PLM
        </p>
        <p class="text-xs text-gray-500 dark:text-darkGray-400 text-right">
          ≈US $10
        </p>
      </div>
    </div>

    <p class="text-xs mb-2 text-right">
      <span class="text-green-500">+$698.68 (3.14%)</span>
      <span class="text-green-500 mx-1">
        <icon-base
          class="w-4 h-4 inline"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <icon-trending-up />
        </icon-base>
      </span>
      <span class="text-gray-500 dark:text-darkGray-400">24h</span>
    </p>

    <div class="text-center">
      <button
        type="button"
        @click="openTransferModal"
        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-100 dark:focus:ring-blue-400"
      >
        Transfer
      </button>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import IconBase from '@/components/icons/IconBase.vue';
import IconTrendingUp from '@/components/icons/IconTrendingUp.vue';

export default defineComponent({
  components: {
    IconBase,
    IconTrendingUp,
  },
  setup(props, { emit }) {
    const openTransferModal = (): void => {
      emit('update:is-open-transfer', true);
    };

    return {
      openTransferModal,
    };
  },
});
</script>
