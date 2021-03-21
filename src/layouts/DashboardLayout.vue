<template>
  <div class="h-screen flex overflow-hidden bg-gray-50 dark:bg-darkGray-900">
    <sidebar />
    <div class="flex flex-col w-0 flex-1 overflow-y-auto lg:overflow-hidden">
      <!-- <%- include('./components/common/_header-mobile'); -%> -->
      <plasm-header />
      <main
        class="flex-1 relative z-0 lg:overflow-y-auto overflow-x-hidden focus:outline-none"
      >
        <div class="px-4 sm:px-8 py-10 lg:py-16">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import PlasmHeader from '@/components/common/Header.vue';
import Sidebar from '@/components/Sidebar.vue';

export default defineComponent({
  components: {
    PlasmHeader,
    Sidebar,
  },
});
</script>
