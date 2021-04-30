<template>
  <div
    :class="`border ${bgColor(
      alertType
    )} shadow rounded-lg fixed top-3 right-3 left-3 sm:left-auto sm:max-w-sm sm:w-full p-4 flex z-50`"
  >
    <div>
      <!-- Heroicon name: solid/check-circle -->
      <svg
        :class="`h-6 w-6 ${svgColor(alertType)}`"
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
      <p :class="`text-sm font-medium ${txtColor(alertType)}`">{{ msg }}</p>
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
    alertType: {
      type: String,
      default: 'success',
      required: true,
    },
  },
  setup(props) {
    props.alertType;
  },
  methods: {
    bgColor(alertType: string) {
      if (alertType === 'warning') {
        return 'bg-yellow-50 dark:bg-yellow-100 border-yellow-400';
      } else if (alertType === 'error') {
        return 'bg-red-50 dark:bg-red-100 border-red-400';
      } else {
        return 'bg-green-50 dark:bg-green-100 border-green-400';
      }
    },
    svgColor(alertType: string) {
      if (alertType === 'warning') {
        return 'text-yellow-400';
      } else if (alertType === 'error') {
        return 'text-red-400';
      } else {
        return 'text-green-400';
      }
    },
    txtColor(alertType: string) {
      if (alertType === 'warning') {
        return 'text-yellow-600';
      } else if (alertType === 'error') {
        return 'text-red-600';
      } else {
        return 'text-green-600';
      }
    },
  },
});
</script>
