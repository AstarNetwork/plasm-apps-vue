<template>
  <!-- TODO: Switch Light & Dark mode -->
  <div class="flex items-center">
    <button
      type="button"
      class="tooltip p-3 rounded-full relative focus:z-10 focus:outline-none focus:ring focus:ring-gray-100 focus:bg-blue-50 dark:hover:bg-darkGray-600 dark:focus:ring-darkGray-600 dark:focus:bg-darkGray-900"
      :class="{ 'cursor-default': !darkMode }"
      @click="switchModeTo(MODE.LIGHT)"
    >
      <!-- Heroicon name: outline/sun -->
      <icon-base
        class="h-5 w-5 text-blue-900 dark:text-gray-300 dark:text-darkGray-500"
        viewBox="0 0 24 24"
        stroke="currentColor"
        iconColor="none"
      >
        <icon-outline-sun />
      </icon-base>
      <!-- Tooltip -->
      <span
        class="pointer-events-none hidden absolute top-0 left-1/2 z-10 transform -translate-y-full -translate-x-1/2 p-2 text-xs leading-tight text-white bg-gray-800 dark:bg-darkGray-500 rounded-md shadow-lg opacity-90 whitespace-nowrap"
      >
        Light mode
      </span>
    </button>

    <span class="text-gray-300 dark:text-darkGray-500">/</span>

    <button
      type="button"
      class="tooltip p-3 rounded-full focus:z-10 focus:outline-none focus:ring focus:ring-gray-100 focus:bg-blue-50 relative group dark:ring-darkGray-600 dark:focus:bg-darkGray-900"
      :class="[darkMode ? 'cursor-default' : 'hover:bg-gray-100']"
      @click="switchModeTo(MODE.DARK)"
    >
      <!-- Heroicon name: outline/moon -->
      <icon-base
        class="h-5 w-5 group-hover:text-blue-900 dark:group-hover:text-darkGray-300"
        :class="[darkMode ? 'text-darkGray-100' : 'text-gray-300']"
        viewBox="0 0 24 24"
        stroke="currentColor"
        iconColor="none"
      >
        <icon-outline-moon />
      </icon-base>
      <!-- Tooltip -->
      <span
        class="pointer-events-none hidden absolute top-0 left-1/2 z-10 transform -translate-y-full -translate-x-1/2 p-2 text-xs leading-tight text-white bg-gray-800 dark:bg-darkGray-500 rounded-md shadow-lg opacity-90 whitespace-nowrap"
      >
        Dark mode
      </span>
    </button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import IconBase from '../icons/IconBase.vue';
import IconOutlineSun from '../icons/IconOutlineSun.vue';
import IconOutlineMoon from '../icons/IconOutlineMoon.vue';

export default defineComponent({
  components: { IconBase, IconOutlineSun, IconOutlineMoon },
  setup() {
    enum MODE {
      LIGHT,
      DARK,
    }
    const currentMode = ref(MODE.LIGHT);
    const darkMode = computed(() => currentMode.value == MODE.DARK);

    const switchModeTo = (mode: MODE) => {
      const htmlClasses = document.documentElement.classList;
      switch (mode) {
        case MODE.DARK: {
          //add 'dark' class to the html tag to enable dark mode
          if (currentMode.value != MODE.DARK) {
            currentMode.value = MODE.DARK;
            htmlClasses.add('dark');
          }
          break;
        }
        case MODE.LIGHT: {
          currentMode.value = MODE.LIGHT;
          htmlClasses.remove('dark');
          break;
        }
      }
    };
    return {
      MODE,
      switchModeTo,
      darkMode,
    };
  },
});
</script>
