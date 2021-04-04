<template>
  <div
    class="bg-blue-500 dark:bg-blue-800 text-white overflow-hidden shadow rounded-lg"
  >
    <div
      style="background-image: url(images/bg-total-balance.png)"
      class="rounded-lg px-5 pt-8 pb-10 sm:pb-0 h-full bg-local bg-left-top bg-no-repeat bg-80 sm:bg-88"
    >
      <p class="text-lg font-bold mb-4 sm:mb-12 lg:mb-10">Total Balance</p>
      <p class="font-semibold text-center mb-2">
        <!-- <span class="text-3xl">≈US $</span> -->
        <span class="text-4xl tracking-tight leading-tight"
          >{{ formatBalance }} PLM</span
        >
      </p>
      <!-- <p class="text-xs text-center">
        <span class="text-red-300 dark:text-red-400">-$698.68 (3.14%)</span>
        <span class="text-red-300 dark:text-red-400 mx-1">
          <icon-base
            class="w-4 h-4 inline"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <icon-trending-down />
          </icon-base>
        </span>
        <span>24h</span>
      </p>
      <p class="text-xs text-center">
        <span class="text-green-300 dark:text-green-400">+$698.68 (3.14%)</span>
        <span class="text-green-300 dark:text-green-400 mx-1">
          <icon-base
            class="w-4 h-4 inline"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <icon-trending-up />
          </icon-base>
        </span>
        <span>24h</span>
      </p> -->
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, toRefs, computed } from 'vue';
import BN from 'bn.js';
import IconBase from '@/components/icons/IconBase.vue';
import IconTrendingDown from '@/components/icons/IconTrendingDown.vue';
import IconTrendingUp from '@/components/icons/IconTrendingUp.vue';

export default defineComponent({
  props: {
    balance: {
      type: BN,
      required: true,
    },
  },
  components: {
    IconBase,
    IconTrendingDown,
    IconTrendingUp,
  },
  setup(props, { emit }) {
    const { balance } = toRefs(props);

    const formatBalance = computed(() => {
      return balance.value.toString(10).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    });

    return {
      formatBalance,
    };
  },
});
</script>
