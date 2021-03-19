<template>
  <div
  class="bg-white dark:bg-darkGray-800 overflow-hidden shadow rounded-lg sm:col-span-2 text-blue-900 dark:text-darkGray-100 p-5 sm:grid grid-cols-2 gap-4">
    <div>
      <div class="flex items-center">
        <div class="h-10 w-10 rounded-full overflow-hidden border border-gray-100 mr-2">
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
        <p class="text-blue-900 dark:text-darkGray-100 font-bold text-lg">PLM Balance</p>
      </div>

      <div class="flex justify-center mt-4 sm:mt-8 lg:mt-6">
        <div>
          <p class="font-semibold text-center"><span class="text-4xl tracking-tight leading-tight">1,200</span><span
            class="text-2xl">PLM</span></p>
          <p class="text-right text-gray-500 dark:text-darkGray-400 mb-2 text-sm">≈US $120</p>
        </div>
      </div>

      <p class="text-xs text-center">
        <span class="text-red-500 dark:text-red-400">-$698.68 (3.14%)</span>
        <span class="text-red-500 dark:text-red-400">
          <!-- Heroicon name: outline/trending-down -->
          <svg class="w-4 h-4 inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
          </svg>
        </span>
        <span class="text-gray-500 dark:text-darkGray-400">24h</span>
      </p>
      <p class="text-xs text-center">
        <span class="text-green-500">+$698.68 (3.14%)</span>
        <span class="text-green-500">
          <!-- Heroicon name: outline/trending-up -->
          <svg class="w-4 h-4 inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        </span>
        <span class="text-gray-500 dark:text-darkGray-400">24h</span>
      </p>

      <div class="mt-3 text-center mb-6 sm:mb-0">
        <button type="button"
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-blue-500 hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-100 dark:focus:ring-blue-400 mx-0.5">
          Transfer
        </button>
        <button type="button"
          class="inline-flex items-center px-4 py-2 text-sm font-medium rounded-full shadow-sm text-blue-500 dark:text-blue-400 border border-blue-500 dark:border-blue-400 hover:bg-blue-100 dark:hover:bg-darkGray-800 dark:hover:border-blue-300 dark:hover:text-blue-300 focus:outline-none focus:ring focus:ring-blue-100 dark:focus:ring-blue-400 mx-0.5">
          Staking
        </button>
      </div>
    </div>

    <div class="text-sm">
      <div class="flex justify-between items-center bg-blue-50 dark:bg-darkGray-700 rounded-lg mb-2 py-3 px-4">
        <div>Transferable</div>
        <div>
          <p class="font-bold text-right"><span class="text-2xl leading-tight">100</span>PLM</p>
          <p class="text-xs text-gray-500 dark:text-darkGray-400 text-right">≈US $10</p>
        </div>
      </div>
      <div class="flex justify-between items-center bg-blue-50 dark:bg-darkGray-700 rounded-lg mb-2 py-3 px-4">
        <div>dApps staking</div>
        <div>
          <p class="font-bold text-right"><span class="text-2xl leading-tight">100</span>PLM</p>
          <p class="text-xs text-gray-500 dark:text-darkGray-400 text-right">≈US $10</p>
        </div>
      </div>
      <div class="flex justify-between items-center bg-blue-50 dark:bg-darkGray-700 rounded-lg py-3 px-4">
        <div>Transferable</div>
        <div>
          <p class="font-bold text-right"><span class="text-2xl leading-tight">100</span>PLM</p>
          <p class="text-xs text-gray-500 dark:text-darkGray-400 text-right">≈US $10</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({

})
</script>
