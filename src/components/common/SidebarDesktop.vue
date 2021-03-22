<template>
  <!-- Static sidebar for desktop -->
  <div class="hidden lg:flex lg:flex-shrink-0">
    <div class="flex flex-col w-64">
      <div class="flex flex-col h-0 flex-1 shadow bg-white dark:bg-darkGray-800">
        <sidebar-common />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useSidebar } from '@/hooks/useSidebar';
import SidebarCommon from './SidebarCommon.vue';

export default defineComponent({
  components: { SidebarCommon },
  setup() {
    const { isOpen } = useSidebar();
    const activeClass = ref('bg-gray-600 bg-opacity-25 text-gray-100 border-gray-100');
    const inactiveClass = ref(
      'border-gray-900 text-gray-500 hover:bg-gray-600 hover:bg-opacity-25 hover:text-gray-100',
    );

    return {
      isOpen,
      activeClass,
      inactiveClass,
    };
  },
});
</script>
