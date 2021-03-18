<template>
  <div class="bg-blue-500 dark:bg-blue-800 text-white overflow-hidden shadow rounded-lg">
    <div style="background-image: url(images/bg-total-balance.png);"
        class="rounded-lg px-5 pt-8 pb-10 sm:pb-0 h-full bg-local bg-left-top bg-no-repeat bg-80 sm:bg-88">
      <p class="text-lg font-bold mb-4 sm:mb-12 lg:mb-10">Total Balance</p>
      <p class="font-semibold text-center mb-2"><span class="text-3xl">≈US $</span><span
        class="text-4xl tracking-tight leading-tight">120</span></p>
      <p class="text-xs text-center">
        <span class="text-red-300 dark:text-red-400">-$698.68 (3.14%)</span>
        <span class="text-red-300 dark:text-red-400">
          <!-- Heroicon name: outline/trending-down -->
          <svg class="w-4 h-4 inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
          </svg>
        </span>
        <span>24h</span>
      </p>
      <p class="text-xs text-center">
        <span class="text-green-300 dark:text-green-400">+$698.68 (3.14%)</span>
        <span class="text-green-300 dark:text-green-400">
          <!-- Heroicon name: outline/trending-up -->
          <svg class="w-4 h-4 inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        </span>
        <span>24h</span>
      </p>
    </div>
  </div>
</template>
<script lang="ts">

</script>
