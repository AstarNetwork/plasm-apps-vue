<template>
  <div class="fixed z-10 inset-0 overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen">
      <!-- Background overlay -->
      <div class="fixed inset-0 transition-opacity" aria-hidden="true">
        <div
          class="absolute inset-0 bg-gray-900 dark:bg-black opacity-75"
        ></div>
      </div>

      <div
        class="inline-block bg-white dark:bg-darkGray-900 rounded-lg px-4 sm:px-8 py-10 overflow-hidden shadow-xl transform transition-all mx-2 my-2 align-middle max-w-4xl w-full"
      >
        <div>
          <h3
            class="text-lg font-extrabold text-blue-900 dark:text-white mb-6 text-center"
          >
            Create Your dApps
          </h3>

          <div class="sm:flex grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div class="sm:w-1/2">
              <div class="grid grid-cols-1 gap-6">
                <div class="relative">
                  <label
                    class="block text-sm font-medium text-gray-500 dark:text-darkGray-400 mb-2"
                  >
                    Deployment Account
                  </label>

                  <button
                    type="button"
                    class="relative text-blue-900 dark:text-darkGray-100 w-full bg-white dark:bg-darkGray-900 border border-gray-300 dark:border-darkGray-500 rounded-md pl-3 pr-10 py-3 text-left focus:outline-none focus:ring focus:ring-blue-100 dark:focus:ring-darkGray-600 hover:bg-gray-50 dark:hover:bg-darkGray-800"
                  >
                    <div class="flex items-center justify-between">
                      <div class="flex items-center">
                        <div
                          class="h-8 w-8 rounded-full overflow-hidden border border-gray-100 mr-3 flex-shrink-0"
                        >
                          <icon-base class="h-full w-full" viewBox="0 0 64 64">
                            <icon-account-sample />
                          </icon-base>
                        </div>
                        <div>
                          <div class="text-sm font-medium">Account Option</div>
                          <div
                            class="text-xs text-gray-500 dark:text-darkGray-400"
                          >
                            5Hn8MM....2dZzwc
                          </div>
                        </div>
                      </div>
                      <div class="text-sm">100PLM</div>
                    </div>

                    <span
                      class="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
                    >
                      <!-- Heroicon name: solid/selector -->
                      <icon-base
                        class="h-5 w-5 text-gray-400 dark:text-darkGray-300"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <icon-solid-selector />
                      </icon-base>
                    </span>
                  </button>

                  <!--
                  Select popover
                  on: block
                  off:hidden
                -->
                  <div
                    class="hidden absolute mt-1 w-full rounded-md bg-white dark:bg-darkGray-800 shadow-lg z-10 border border-gray-200 dark:border-darkGray-600"
                  >
                    <ul
                      class="max-h-56 rounded-md py-1 text-base overflow-auto focus:outline-none"
                    >
                      <deployment-account-select-option />
                      <deployment-account-select-option />
                      <deployment-account-select-option />
                      <deployment-account-select-option />
                      <deployment-account-select-option />
                      <deployment-account-select-option />
                    </ul>
                  </div>
                </div>

                <div>
                  <label
                    class="block text-sm font-medium text-gray-500 dark:text-darkGray-400 mb-2"
                  >
                    Project web page
                  </label>
                  <div class="flex rounded-md">
                    <span
                      class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 dark:border-darkGray-500 bg-gray-50 dark:bg-darkGray-800 text-gray-500 dark:text-darkGray-400 text-sm"
                    >
                      https://
                    </span>
                    <input
                      type="text"
                      name="company_website"
                      id="company_website"
                      class="border border-gray-300 dark:border-darkGray-500 rounded-r-md w-full text-blue-900 dark:text-darkGray-100 focus:outline-none placeholder-gray-300 dark:placeholder-darkGray-600 px-3 py-3 appearance-none bg-white dark:bg-darkGray-900"
                      placeholder="www.example.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    class="block text-sm font-medium text-gray-500 dark:text-darkGray-400 mb-2"
                  >
                    Project name
                  </label>
                  <input
                    class="border border-gray-300 dark:border-darkGray-500 rounded-md w-full text-blue-900 dark:text-darkGray-100 focus:outline-none placeholder-gray-300 dark:placeholder-darkGray-600 px-3 py-3 appearance-none bg-white dark:bg-darkGray-900"
                    placeholder=""
                    value=""
                  />
                </div>

                <div>
                  <label
                    class="block text-sm font-medium text-gray-500 dark:text-darkGray-400 mb-2"
                  >
                    Project description
                  </label>
                  <textarea
                    rows="3"
                    class="border border-gray-300 dark:border-darkGray-500 rounded-md w-full text-blue-900 dark:text-darkGray-100 focus:outline-none placeholder-gray-300 dark:placeholder-darkGray-600 px-3 py-3 appearance-none bg-white dark:bg-darkGray-900"
                  ></textarea>
                </div>

                <div>
                  <label
                    class="block text-sm font-medium text-gray-500 dark:text-darkGray-400 mb-2"
                  >
                    Category
                  </label>

                  <div class="relative">
                    <!--
                    Select popover
                    on: block
                    off:hidden
                  -->
                    <div
                      class="block absolute mt-1 w-full rounded-md bg-white dark:bg-darkGray-800 shadow-lg z-10 bottom-1 border border-gray-200 dark:border-darkGray-600"
                    >
                      <ul
                        class="max-h-56 rounded-md py-1 text-base overflow-auto focus:outline-none"
                      >
                        <!-- Select option -->
                        <li
                          role="option"
                          class="text-blue-900 dark:text-darkGray-100 py-2 px-3 hover:bg-gray-50 dark:hover:bg-darkGray-700 text-sm cursor-pointer"
                        >
                          Suggestion
                        </li>
                        <li
                          role="option"
                          class="text-blue-900 dark:text-darkGray-100 py-2 px-3 hover:bg-gray-50 dark:hover:bg-darkGray-700 text-sm cursor-pointer"
                        >
                          Suggestion
                        </li>
                      </ul>
                    </div>
                  </div>

                  <input
                    class="border border-gray-300 dark:border-darkGray-500 rounded-md w-full text-blue-900 dark:text-darkGray-100 focus:outline-none placeholder-gray-300 dark:placeholder-darkGray-600 px-3 py-3 appearance-none bg-white dark:bg-darkGray-900"
                    placeholder=""
                    value=""
                  />

                  <div class="flex flex-wrap mt-2">
                    <category-multi-select />
                    <category-multi-select />
                    <category-multi-select />
                    <category-multi-select />
                  </div>
                </div>
              </div>
            </div>

            <div class="sm:w-1/2">
              <div class="grid grid-cols-1 gap-6">
                <div>
                  <label
                    class="block text-sm font-medium text-gray-500 dark:text-darkGray-400 mb-2"
                  >
                    Top picture
                  </label>
                  <div
                    class="max-w-lg flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-darkGray-500 border-dashed rounded-md bg-blue-50 dark:bg-darkGray-800"
                  >
                    <div class="space-y-1 text-center">
                      <icon-top-picture />
                      <div
                        class="flex text-sm text-gray-500 dark:text-darkGray-400"
                      >
                        <label
                          for="file-upload"
                          class="relative cursor-pointer rounded-md font-medium text-blue-500 dark:text-blue-400 hover:text-blue-400 dark:hover:text-blue-300 focus-within:ring-offset-none"
                        >
                          <span>Upload a file</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            class="sr-only"
                          />
                        </label>
                        <p class="pl-1">or drag and drop</p>
                      </div>
                      <p class="text-xs text-gray-500 dark:text-darkGray-400">
                        PNG, JPG, GIF up to 00MB
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    class="block text-sm font-medium text-gray-500 dark:text-darkGray-400 mb-2"
                  >
                    Json file
                  </label>
                  <div
                    class="max-w-lg flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-darkGray-500 border-dashed rounded-md bg-blue-50 dark:bg-darkGray-800"
                  >
                    <div class="space-y-1 text-center">
                      <icon-document />
                      <div
                        class="flex text-sm text-gray-500 dark:text-darkGray-400"
                      >
                        <label
                          for="file-upload"
                          class="relative cursor-pointer rounded-md font-medium text-blue-500 dark:text-blue-400 hover:text-blue-400 dark:hover:text-blue-300 focus-within:ring-offset-none"
                        >
                          <span>Upload a file</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            class="sr-only"
                          />
                        </label>
                        <p class="pl-1">or drag and drop</p>
                      </div>
                      <p class="text-xs text-gray-500 dark:text-darkGray-400">
                        PNG, JPG, GIF up to 00MB
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-6 flex justify-center flex-row-reverse">
          <button
            type="button"
            @click="closeModal"
            class="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-100 dark:focus:ring-blue-400 mx-1"
          >
            Upload
          </button>
          <button
            type="button"
            @click="closeModal"
            class="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-darkGray-500 text-sm font-medium rounded-full text-gray-500 dark:text-darkGray-400 bg-white dark:bg-darkGray-900 hover:bg-gray-100 dark:hover:bg-darkGray-700 focus:outline-none focus:ring focus:ring-gray-100 dark:focus:ring-darkGray-600 mx-1"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import IconBase from '@/components/icons/IconBase.vue';
import IconAccountSample from '@/components/icons/IconAccountSample.vue';
import IconSolidSelector from '@/components/icons/IconSolidSelector.vue';
import IconDocument from '@/components/icons/IconDocument.vue';
import IconTopPicture from '@/components/icons/IconTopPicture.vue';
import DeploymentAccountSelectOption from '@/components/dapps/DeploymentAccountSelectOption.vue';
import CategoryMultiSelect from '@/components/dapps/CategoryMultiSelect.vue';

export default defineComponent({
  components: {
    IconBase,
    IconAccountSample,
    IconSolidSelector,
    IconDocument,
    IconTopPicture,
    DeploymentAccountSelectOption,
    CategoryMultiSelect,
  },
  setup(props, { emit }) {
    const closeModal = () => {
      emit('update:is-open', false);
    };

    return {
      closeModal,
    };
  },
});
</script>
