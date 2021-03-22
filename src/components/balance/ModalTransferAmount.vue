<template>
  <div class="fixed z-10 inset-0 overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen">
      <!-- Background overlay -->
      <div class="fixed inset-0 transition-opacity" aria-hidden="true">
        <div class="absolute inset-0 bg-gray-900 dark:bg-black opacity-75"></div>
      </div>

      <div
        class="inline-block bg-white dark:bg-darkGray-900 rounded-lg px-4 sm:px-8 py-10 shadow-xl transform transition-all mx-2 my-2 align-middle max-w-lg w-full">
        <div>
          <div>
            <h3 class="text-lg font-extrabold text-blue-900 dark:text-white mb-6 text-center">
              Transfer XXX
            </h3>

            <button type="button"
              class="w-full bg-blue-500 dark:bg-blue-800 text-white rounded-lg px-5 py-5 mb-4 relative hover:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-100 dark:focus:ring-blue-400">
              <span class="block text-left font-bold text-sm mb-2">XXX Balance</span>
              <span class="block font-semibold text-2xl mb-1">0 XXX</span>
              <span class="block font-normal text-sm mb-2">≈US $0</span>
              <!-- Heroicon name: solid/chevron-down -->
              <svg class="h-6 w-6 dark:text-darkGray-300 absolute top-1/2 right-5 -mt-2"
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd" />
              </svg>
            </button>

            <form>
              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-500 dark:text-darkGray-400 mb-2">
                  Account
                </label>
                <div class="relative">
                  <button type="button"
                    class="relative text-blue-900 dark:text-darkGray-100 w-full bg-white dark:bg-darkGray-900 border border-gray-300 dark:border-darkGray-500 rounded-md pl-3 pr-10 py-3 text-left focus:outline-none focus:ring focus:ring-blue-100 dark:focus:ring-darkGray-600 hover:bg-gray-50 dark:hover:bg-darkGray-800">
                    <div class="flex items-center justify-between">
                      <div class="flex items-center">
                        <div class="h-8 w-8 rounded-full overflow-hidden border border-gray-100 mr-3 flex-shrink-0">
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
                          <div class="text-sm font-medium">Account Option</div>
                          <div class="text-xs text-gray-500 dark:text-darkGray-400">5Hn8MM....2dZzwc</div>
                        </div>
                      </div>
                      <div class="text-sm">100PLM</div>
                    </div>

                    <span class="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <!-- Heroicon name: solid/selector -->
                      <svg class="h-5 w-5 text-gray-400 dark:text-darkGray-300" xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd"
                          d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                          clip-rule="evenodd" />
                        </svg>
                    </span>
                  </button>
                    
                  <!--
                    Select popover
                    on: block
                    off:hidden
                  -->
                  <div
                    class="block absolute mt-1 w-full rounded-md bg-white dark:bg-darkGray-800 shadow-lg z-10 border border-gray-200 dark:border-darkGray-600">
                    <ul class="max-h-56 rounded-md py-1 text-base overflow-auto focus:outline-none">
                      <!-- Select option -->
                      <ModalSelectAccountOption />
                      <ModalSelectAccountOption />
                      <ModalSelectAccountOption />
                      <ModalSelectAccountOption />
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-500 dark:text-darkGray-400 mb-2">
                  Amount
                </label>
                <div class="border border-gray-300 dark:border-darkGray-500 rounded-md relative">
                  <div class="flex items-center border-b border-gray-300 dark:border-darkGray-500">
                    <div class="flex-1 pl-16">
                      <input
                        class="w-full text-blue-900 dark:text-darkGray-100 text-2xl focus:outline-none bg-transparent placeholder-gray-300 dark:placeholder-darkGray-600"
                        inputmode="decimal" min="0" pattern="^[0-9]*(\.)?[0-9]*$" placeholder="0.0" value="">
                    </div>
                    <button type="button"
                        class="bg-blue-100 dark:bg-blue-200 hover:bg-blue-200 dark:hover:bg-blue-300 text-xs rounded-full px-3 py-2 text-blue-900 dark:text-darkGray-900 mx-3 focus:outline-none focus:ring focus:ring-blue-100 dark:focus:ring-blue-300">MAX</button>
                    <div
                      class="text-blue-900 dark:text-darkGray-100 text-lg border-l border-gray-300 dark:border-darkGray-500 px-3 py-4">
                        XXX
                    </div>
                  </div>
                  <div class="text-gray-500 dark:text-darkGray-400 text-lg flex items-center justify-between">
                    <div class="pl-16">≈US $2,617.51</div>
                    <div class="px-3 py-4">aUSD</div>
                  </div>
                  <button type="button"
                    class="bg-blue-100 dark:bg-blue-200 hover:bg-blue-200 dark:hover:bg-blue-300 text-xs rounded-full p-2 text-blue-900 dark:text-darkGray-900 absolute left-3 top-1/2 -mt-4 focus:outline-none focus:ring focus:ring-blue-100 dark:focus:ring-blue-300">
                    <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                    </svg>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div class="mt-6 flex justify-center flex-row-reverse">
          <button type="button"
            @click="closeModal"
            class="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-100 dark:focus:ring-blue-400 mx-1">
            Confirm
          </button>
          <button type="button"
            @click="closeModal"
            class="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-darkGray-500 text-sm font-medium rounded-full text-gray-500 dark:text-darkGray-400 bg-white dark:bg-darkGray-900 hover:bg-gray-100 dark:hover:bg-darkGray-700 focus:outline-none focus:ring focus:ring-gray-100 dark:focus:ring-darkGray-600 mx-1">
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import ModalSelectAccountOption from '@/components/balance/ModalSelectAccountOption.vue';

export default defineComponent({
  components: {
    ModalSelectAccountOption
  },
  setup (props, { emit }) {
    
    const closeModal = () => {
      emit("update:is-open", false)
    }

    return {
      closeModal
    }
  }
})
</script>
