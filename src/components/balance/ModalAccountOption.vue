<template>
  <div>
    <!-- <% if (checked==='on' ) { %> -->
    <li
      role="option"
      class="text-blue-900 dark:text-darkGray-100 cursor-default select-none relative py-2 pl-3 pr-6 bg-blue-200 dark:bg-blue-500 bg-opacity-20"
    >
      <!-- <% } else if (checked==='off' ) { %> -->
      <!-- <li role="option"
        class="text-blue-900 dark:text-darkGray-100 cursor-default select-none relative py-2 pl-3 pr-6 hover:bg-gray-50 dark:hover:bg-darkGray-800"> -->
      <!-- <% } %> -->

      <label class="flex items-center justify-between cursor-pointer">
        <div class="flex items-center">
          <div
            class="h-8 w-8 rounded-full overflow-hidden border border-gray-100 mr-3 flex-shrink-0"
          >
            <svg class="h-full w-full" viewBox="0 0 64 64">
              <circle cx="32" cy="32" fill="#eee" r="32"></circle>
              <circle cx="32" cy="8" fill="hsl(230, 93%, 75%)" r="5"></circle>
              <circle cx="32" cy="20" fill="hsl(90, 93%, 75%)" r="5"></circle>
              <circle
                cx="21.607695154586736"
                cy="14"
                fill="hsl(320, 93%, 35%)"
                r="5"
              ></circle>
              <circle
                cx="11.215390309173472"
                cy="20"
                fill="hsl(230, 93%, 75%)"
                r="5"
              ></circle>
              <circle
                cx="21.607695154586736"
                cy="26"
                fill="hsl(90, 93%, 75%)"
                r="5"
              ></circle>
              <circle
                cx="11.215390309173472"
                cy="32"
                fill="hsl(320, 93%, 35%)"
                r="5"
              ></circle>
              <circle
                cx="11.215390309173472"
                cy="44"
                fill="hsl(230, 93%, 75%)"
                r="5"
              ></circle>
              <circle
                cx="21.607695154586736"
                cy="38"
                fill="hsl(90, 93%, 75%)"
                r="5"
              ></circle>
              <circle
                cx="21.607695154586736"
                cy="50"
                fill="hsl(320, 93%, 35%)"
                r="5"
              ></circle>
              <circle cx="32" cy="56" fill="hsl(230, 93%, 75%)" r="5"></circle>
              <circle cx="32" cy="44" fill="hsl(90, 93%, 75%)" r="5"></circle>
              <circle
                cx="42.392304845413264"
                cy="50"
                fill="hsl(320, 93%, 35%)"
                r="5"
              ></circle>
              <circle
                cx="52.78460969082653"
                cy="44"
                fill="hsl(230, 93%, 75%)"
                r="5"
              ></circle>
              <circle
                cx="42.392304845413264"
                cy="38"
                fill="hsl(90, 93%, 75%)"
                r="5"
              ></circle>
              <circle
                cx="52.78460969082653"
                cy="32"
                fill="hsl(320, 93%, 35%)"
                r="5"
              ></circle>
              <circle
                cx="52.78460969082653"
                cy="20"
                fill="hsl(230, 93%, 75%)"
                r="5"
              ></circle>
              <circle
                cx="42.392304845413264"
                cy="26"
                fill="hsl(90, 93%, 75%)"
                r="5"
              ></circle>
              <circle
                cx="42.392304845413264"
                cy="14"
                fill="hsl(320, 93%, 35%)"
                r="5"
              ></circle>
              <circle cx="32" cy="32" fill="hsl(151, 93%, 35%)" r="5"></circle>
            </svg>
          </div>
          <div>
            <div class="text-sm font-medium">Account Option</div>
            <div class="text-xs text-gray-500 dark:text-darkGray-400">
              5Hn8MM....2dZzwc
            </div>
          </div>
        </div>

        <div class="text-sm">100PLM</div>

        <div class="relative w-5 h-5">
          <!-- <% if (checked==='on' ) { %> -->
          <input
            name="choose_account"
            type="radio"
            class="appearance-none border-2 border-gray-300 dark:border-darkGray-600 rounded-full focus:ring-blue-500 h-4 w-4 mr-3 focus:outline-none bg-white dark:bg-darkGray-900 checked:border-4 checked:border-blue-500"
            checked
          />
          <!-- <% } else if (checked==='off' ) { %>
                <input name="choose_account" type="radio"
                    class="appearance-none border-2 border-gray-300 dark:border-darkGray-600 rounded-full focus:ring-blue-500 h-4 w-4 mr-3 focus:outline-none bg-white dark:bg-darkGray-900 checked:border-4 checked:border-blue-500">
                <% } %> -->

          <span class="hidden absolute top-0 left-0 p-0.5 pointer-events-none">
            <svg
              class="w-4 h-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="3"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </span>
        </div>
      </label>
    </li>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({});
</script>
