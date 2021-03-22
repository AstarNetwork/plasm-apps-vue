<template>
  <!-- Off-canvas menu for mobile -->
  <div :class="isOpen ? 'block' : 'hidden'" class="lg:hidden">
    <div class="fixed inset-0 flex z-40">
      <div class="fixed inset-0">
        <div
          class="absolute inset-0 bg-gray-900 dark:bg-black opacity-75"
        ></div>
      </div>
      <div
        class="relative flex-1 flex flex-col max-w-xs w-full bg-white dark:bg-darkGray-800 overflow-visible"
      >
        <div class="absolute top-0 right-0 -mr-12 pt-2">
          <button
            class="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            @click="isOpen = false"
          >
            <span class="sr-only">Close sidebar</span>
            <!-- Heroicon name: outline/x -->
            <icon-base
              class="h-6 w-6 text-white dark:text-darkGray-300"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <icon-outline-x />
            </icon-base>
          </button>
        </div>
        <sidebar-common />
      </div>
      <div class="flex-shrink-0 w-14">
        <!-- Force sidebar to shrink to fit close icon -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SidebarCommon from '@/components/common/SidebarCommon.vue';
import { useSidebar } from '@/hooks';
import IconBase from '../icons/IconBase.vue';
import IconOutlineX from '../icons/IconOutlineX.vue';

export default defineComponent({
  components: { SidebarCommon, IconBase, IconOutlineX },
  setup() {
    const { isOpen } = useSidebar();
    return {
      isOpen,
    };
  },
});
</script>
