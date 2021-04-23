<template>
  <div
    class="bg-green-50 dark:bg-green-100 border border-green-400 shadow rounded-lg fixed top-3 right-3 left-3 sm:left-auto sm:max-w-sm sm:w-full p-4 flex z-50"
  >
    <div>
      <!-- Heroicon name: solid/check-circle -->
      <svg
        class="h-6 w-6 text-green-400"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clip-rule="evenodd"
        />
      </svg>
    </div>
    <div class="ml-3 flex-1 pt-0.5">
      <p class="text-sm font-medium text-green-600">{{ msg }}</p>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  props: {
    msg: {
      type: String,
      required: true,
    },
  },
});
</script>
