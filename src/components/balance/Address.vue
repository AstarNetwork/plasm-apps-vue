<template>
  <div class="relative z-0 inline-flex shadow rounded-lg bg-white dark:bg-darkGray-800">

    <div class="relative inline-flex items-center py-4 px-1 sm:py-5 sm:px-2 rounded-l-lg flex-1 text-left">
      <div class="flex items-center">
        <div class="h-11 w-11 sm:h-12 sm:w-12 rounded-full overflow-hidden border border-gray-100 mx-2 sm:mx-3">
          <svg class="h-full w-full" viewBox="0 0 64 64">
            <circle cx="32" cy="32" fill="#eee" r="32"></circle>
            <circle cx="32" cy="8" fill="hsl(230, 93%, 75%)" r="5"></circle>
            <circle cx="32" cy="20" fill="hsl(90, 93%, 75%)" r="5"></circle>
            <circle cx="21.607695154586736" cy="14" fill="hsl(320, 93%, 35%)" r="5"></circle>
            <circle cx="11.215390309173472" cy="20" fill="hsl(230, 93%, 75%)" r="5"></circle>
            <circle cx="21.607695154586736" cy="26" fill="hsl(90, 93%, 75%)" r="5"></circle>
            <circle cx="11.215390309173472" cy="32" fill="hsl(320, 93%, 35%)" r="5"></circle>
            <circle cx="11.215390309173472" cy="44" fill="hsl(230, 93%, 75%)" r="5"></circle>
            <circle cx="21.607695154586736" cy="38" fill="hsl(90, 93%, 75%)" r="5"></circle>
            <circle cx="21.607695154586736" cy="50" fill="hsl(320, 93%, 35%)" r="5"></circle>
            <circle cx="32" cy="56" fill="hsl(230, 93%, 75%)" r="5"></circle>
            <circle cx="32" cy="44" fill="hsl(90, 93%, 75%)" r="5"></circle>
            <circle cx="42.392304845413264" cy="50" fill="hsl(320, 93%, 35%)" r="5"></circle>
            <circle cx="52.78460969082653" cy="44" fill="hsl(230, 93%, 75%)" r="5"></circle>
            <circle cx="42.392304845413264" cy="38" fill="hsl(90, 93%, 75%)" r="5"></circle>
            <circle cx="52.78460969082653" cy="32" fill="hsl(320, 93%, 35%)" r="5"></circle>
            <circle cx="52.78460969082653" cy="20" fill="hsl(230, 93%, 75%)" r="5"></circle>
            <circle cx="42.392304845413264" cy="26" fill="hsl(90, 93%, 75%)" r="5"></circle>
            <circle cx="42.392304845413264" cy="14" fill="hsl(320, 93%, 35%)" r="5"></circle>
            <circle cx="32" cy="32" fill="hsl(151, 93%, 35%)" r="5"></circle>
          </svg>
        </div>
        <div>
          <p class="text-blue-900 dark:text-darkGray-100 font-bold">AddressName</p>
          <p class="text-xs text-gray-500 dark:text-darkGray-400">5Hn8MM......2dZzwc</p>
        </div>
      </div>

      <button type="button"
        @click="openModal"
        class="tooltip ml-auto p-4 sm:p-5 rounded-full hover:bg-gray-100 dark:hover:bg-darkGray-600 focus:z-10 focus:outline-none focus:ring focus:ring-gray-100 dark:focus:ring-darkGray-600 focus:bg-blue-50 dark:focus:bg-darkGray-900 relative">
        <!-- Heroicon name: outline/chevron-down -->
        <svg class="text-blue-900 dark:text-darkGray-300 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
        <!-- Tooltip -->
        <span
          class="pointer-events-none hidden absolute top-0 left-1/2 z-10 transform -translate-y-full -translate-x-1/2 p-2 text-xs leading-tight text-white bg-gray-800 dark:bg-darkGray-500 rounded-md shadow-lg opacity-90">
          Change
        </span>
      </button>
    </div>

    <div class="border-l border-gray-100 dark:border-darkGray-600 flex items-center px-1 md:px-2">
        <button type="button"
          class="tooltip p-4 sm:p-5 rounded-full hover:bg-gray-100 dark:hover:bg-darkGray-600 focus:z-10 focus:outline-none focus:ring focus:ring-gray-100 dark:focus:ring-darkGray-600 focus:bg-blue-50 dark:focus:bg-darkGray-900 relative group">
          <!-- Heroicon name: outline/document-duplicate -->
          <svg class="text-blue-900 dark:text-darkGray-300 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
          </svg>
          <!-- Tooltip -->
          <span
            class="pointer-events-none hidden absolute top-0 left-1/2 z-10 transform -translate-y-full -translate-x-1/2 p-2 text-xs leading-tight text-white bg-gray-800 dark:bg-darkGray-500 rounded-md shadow-lg">
            Copy
          </span>
        </button>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup (props, { emit }) {
    const openModal = () => {
      emit("update:is-open", true)
    }

    return {
      openModal
    }
  }
})
</script>
