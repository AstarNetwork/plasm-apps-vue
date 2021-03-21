<template>
  <div class="fixed z-10 inset-0 overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen">
      <!-- Background overlay -->
      <div class="fixed inset-0 transition-opacity" aria-hidden="true">
        <div class="absolute inset-0 bg-gray-900 dark:bg-black opacity-75"></div>
      </div>

      <div
        class="inline-block bg-white dark:bg-darkGray-900 rounded-lg px-4 sm:px-8 py-10 overflow-hidden shadow-xl transform transition-all mx-2 my-2 align-middle max-w-lg w-full">
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

            <fieldset>
              <ul role="radiogroup" class="grid grid-cols-3 gap-2">
                <!-- on -->
                <li>
                  <label
                    class="rounded-lg border border-blue-500 bg-blue-200 dark:bg-blue-500 bg-opacity-10 px-4 py-5 cursor-pointer relative block text-center">
                    <div class="h-10 w-10 rounded-full overflow-hidden mx-auto mb-2">
                      <img src="@/assets/img/ACA.96bf6b59.svg" class="h-full w-full">
                    </div>
                    <div>
                      <p class="text-blue-500 dark:text-blue-400 font-bold text-lg leading-tight">ACA</p>
                      <p class="text-gray-500 dark:text-darkGray-400 text-xs">Acala</p>
                    </div>
                    <div class="bg-blue-500 rounded-full p-1 absolute top-2 right-2">
                      <!-- Heroicon name: outline/check -->
                      <svg class="h-3 w-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </label>
                </li>

                <!-- off -->
                <li>
                  <label
                    class="rounded-lg border border-gray-300 dark:border-darkGray-600 bg-white dark:bg-darkGray-900 hover:bg-gray-50 dark:hover:bg-darkGray-800 px-4 py-5 cursor-pointer group relative block text-center">
                    <div class="h-10 w-10 rounded-full overflow-hidden mx-auto mb-2">
                      <img src="@/assets/img/ACA.96bf6b59.svg" class="h-full w-full">
                    </div>
                    <div>
                      <p
                        class="text-blue-900 dark:text-darkGray-400 dark:group-hover:text-darkGray-100 font-bold text-lg leading-tight">
                        ACA</p>
                      <p class="text-gray-500 dark:text-darkGray-500 dark:group-hover:text-darkGray-400 text-xs">Acala</p>
                    </div>
                  </label>
                </li>

                <li>
                  <label
                    class="rounded-lg border border-gray-300 dark:border-darkGray-600 bg-white dark:bg-darkGray-900 hover:bg-gray-50 dark:hover:bg-darkGray-800 px-4 py-5 cursor-pointer group relative block text-center">
                    <div class="h-10 w-10 rounded-full overflow-hidden mx-auto mb-2">
                      <img src="@/assets/img/ACA.96bf6b59.svg" class="h-full w-full">
                    </div>
                    <div>
                      <p
                        class="text-blue-900 dark:text-darkGray-400 dark:group-hover:text-darkGray-100 font-bold text-lg leading-tight">
                        ACA</p>
                      <p class="text-gray-500 dark:text-darkGray-500 dark:group-hover:text-darkGray-400 text-xs">Acala</p>
                    </div>
                  </label>
                </li>
              </ul>
            </fieldset>
          </div>
        </div>
        <div class="mt-5 sm:mt-6 flex justify-center flex-row-reverse">
          <button type="button"
            class="inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-100 dark:focus:ring-blue-400 mx-1">
            Confirm
          </button>
          <button type="button"
            @click="closeModal"
            class="inline-flex items-center px-6 py-2 border border-gray-300 dark:border-darkGray-600 text-sm font-medium rounded-full text-gray-500 dark:text-darkGray-400 bg-white dark:bg-darkGray-900 hover:bg-gray-100 dark:hover:bg-darkGray-700 focus:outline-none focus:ring focus:ring-gray-100 dark:focus:ring-darkGray-600 mx-1">
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({

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
