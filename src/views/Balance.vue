<template>
  <div
    class="sm:flex items-end border-b border-gray-300 dark:border-darkGray-600 mb-8 -mx-4 sm:-mx-8 px-4 sm:px-8"
  >
    <h1
      class="text-3xl font-extrabold text-blue-900 dark:text-white mb-6 sm:mb-8"
    >
      Balance
    </h1>
    <Tab
      :labels="[
        { label: 'Plasm', path: 'balance-plasm' },
        { label: 'Cross-chain', path: 'cross-chain' },
      ]"
    />
    <!-- <AddressChange /> -->
  </div>

  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Tab from '@/components/common/Tab.vue';
// import AddressChange from '@/components/common/AddressChange.vue';

export default defineComponent({
  components: {
    Tab,
    // AddressChange
  },
});
</script>
