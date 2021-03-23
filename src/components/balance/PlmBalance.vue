<template>
  <div
    class="bg-white dark:bg-darkGray-800 overflow-hidden shadow rounded-lg sm:col-span-2 text-blue-900 dark:text-darkGray-100 p-5 sm:grid grid-cols-2 gap-4"
  >
    <div>
      <div class="flex items-center">
        <div
          class="h-10 w-10 rounded-full overflow-hidden border border-gray-100 mr-2"
        >
          <icon-base class="h-full w-full" viewBox="0 0 64 64">
            <icon-account-sample />
          </icon-base>
        </div>
        <p class="text-blue-900 dark:text-darkGray-100 font-bold text-lg">
          PLM Balance
        </p>
      </div>

      <div class="flex justify-center mt-4 sm:mt-8 lg:mt-6">
        <div>
          <p class="font-semibold text-center">
            <span class="text-4xl tracking-tight leading-tight">1,200</span
            ><span class="text-2xl">PLM</span>
          </p>
          <p
            class="text-right text-gray-500 dark:text-darkGray-400 mb-2 text-sm"
          >
            ≈US $120
          </p>
        </div>
      </div>

      <p class="text-xs text-center">
        <span class="text-red-500 dark:text-red-400">-$698.68 (3.14%)</span>
        <span class="text-red-500 dark:text-red-400 mx-1">
          <icon-base
            class="w-4 h-4 inline"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <icon-trending-down />
          </icon-base>
        </span>
        <span class="text-gray-500 dark:text-darkGray-400">24h</span>
      </p>
      <p class="text-xs text-center">
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

      <div class="mt-3 text-center mb-6 sm:mb-0">
        <button
          type="button"
          @click="openTransferModal"
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-blue-500 hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-100 dark:focus:ring-blue-400 mx-0.5"
        >
          Transfer
        </button>
        <button
          type="button"
          class="inline-flex items-center px-4 py-2 text-sm font-medium rounded-full shadow-sm text-blue-500 dark:text-blue-400 border border-blue-500 dark:border-blue-400 hover:bg-blue-100 dark:hover:bg-darkGray-800 dark:hover:border-blue-300 dark:hover:text-blue-300 focus:outline-none focus:ring focus:ring-blue-100 dark:focus:ring-blue-400 mx-0.5"
        >
          Staking
        </button>
      </div>
    </div>

    <div class="text-sm">
      <div
        class="flex justify-between items-center bg-blue-50 dark:bg-darkGray-700 rounded-lg mb-2 py-3 px-4"
      >
        <div>Transferable</div>
        <div>
          <p class="font-bold text-right">
            <span class="text-2xl leading-tight">100</span>PLM
          </p>
          <p class="text-xs text-gray-500 dark:text-darkGray-400 text-right">
            ≈US $10
          </p>
        </div>
      </div>
      <div
        class="flex justify-between items-center bg-blue-50 dark:bg-darkGray-700 rounded-lg mb-2 py-3 px-4"
      >
        <div>dApps staking</div>
        <div>
          <p class="font-bold text-right">
            <span class="text-2xl leading-tight">100</span>PLM
          </p>
          <p class="text-xs text-gray-500 dark:text-darkGray-400 text-right">
            ≈US $10
          </p>
        </div>
      </div>
      <div
        class="flex justify-between items-center bg-blue-50 dark:bg-darkGray-700 rounded-lg py-3 px-4"
      >
        <div>Transferable</div>
        <div>
          <p class="font-bold text-right">
            <span class="text-2xl leading-tight">100</span>PLM
          </p>
          <p class="text-xs text-gray-500 dark:text-darkGray-400 text-right">
            ≈US $10
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import IconBase from '@/components/icons/IconBase.vue';
import IconAccountSample from '@/components/icons/IconAccountSample.vue';
import IconTrendingDown from '@/components/icons/IconTrendingDown.vue';
import IconTrendingUp from '@/components/icons/IconTrendingUp.vue';

export default defineComponent({
  components: {
    IconBase,
    IconAccountSample,
    IconTrendingDown,
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
