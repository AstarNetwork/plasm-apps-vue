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
        class="inline-block bg-white dark:bg-darkGray-900 rounded-lg px-4 sm:px-8 py-10 overflow-hidden shadow-xl transform transition-all mx-2 my-2 align-middle max-w-lg w-full"
      >
        <div>
          <div>
            <h3
              class="text-lg font-extrabold text-blue-900 dark:text-white mb-6 text-center"
            >
              Choose Networks
            </h3>

            <fieldset>
              <ul role="radiogroup">
                <li class="mb-2">
                  <label
                    :class="selNetwork === 0 ? classRadioOn : classRadioOff"
                  >
                    <input
                      name="choose_networks"
                      type="radio"
                      :checked="selNetwork === 0"
                      @change="selNetwork = 0"
                      class="appearance-none border-2 border-gray-300 dark:border-darkGray-600 rounded-full focus:ring-blue-500 h-4 w-4 mr-3 focus:outline-none bg-white dark:bg-darkGray-900 checked:border-4 checked:border-blue-500"
                    />
                    <div class="text-left flex-1">
                      <p
                        :class="
                          selNetwork === 0 ? classRadioTxtOn : classRadioTxtOff
                        "
                      >
                        Plasm Network (Mainnet)
                      </p>
                    </div>
                  </label>
                </li>

                <li class="mb-2">
                  <label
                    :class="selNetwork === 1 ? classRadioOn : classRadioOff"
                  >
                    <input
                      name="choose_networks"
                      type="radio"
                      :checked="selNetwork === 1"
                      @change="selNetwork = 1"
                      class="appearance-none border-2 border-gray-300 dark:border-darkGray-600 rounded-full focus:ring-blue-500 h-4 w-4 mr-3 focus:outline-none bg-white dark:bg-darkGray-900 checked:border-4 checked:border-blue-500"
                    />
                    <div class="text-left flex-1">
                      <p
                        :class="
                          selNetwork === 1 ? classRadioTxtOn : classRadioTxtOff
                        "
                      >
                        Dusty Network (Testnet)
                      </p>
                    </div>
                  </label>
                </li>

                <li class="mb-2">
                  <label
                    :class="selNetwork === 2 ? classRadioOn : classRadioOff"
                  >
                    <input
                      name="choose_networks"
                      type="radio"
                      :checked="selNetwork === 2"
                      @change="selNetwork = 2"
                      class="appearance-none border-2 border-gray-300 dark:border-darkGray-600 rounded-full focus:ring-blue-500 h-4 w-4 mr-3 focus:outline-none bg-white dark:bg-darkGray-900 checked:border-4 checked:border-blue-500"
                    />
                    <div class="text-left flex-1">
                      <p
                        :class="
                          selNetwork === 2 ? classRadioTxtOn : classRadioTxtOff
                        "
                      >
                        Local Network
                      </p>
                    </div>
                  </label>
                </li>

                <li class="mb-2">
                  <label
                    :class="selNetwork === 3 ? classRadioOn : classRadioOff"
                  >
                    <input
                      name="choose_networks"
                      type="radio"
                      :checked="selNetwork === 3"
                      @change="selNetwork = 3"
                      class="appearance-none border-2 border-gray-300 dark:border-darkGray-600 rounded-full focus:ring-blue-500 h-4 w-4 mr-3 focus:outline-none bg-white dark:bg-darkGray-900 checked:border-4 checked:border-blue-500"
                    />
                    <div class="text-left flex-1">
                      <p
                        :class="
                          selNetwork === 3 ? classRadioTxtOn : classRadioTxtOff
                        "
                      >
                        Custom Network
                      </p>
                      <input
                        type="text"
                        placeholder="IP Address / Domain"
                        class="appearance-none bg-gray-50 dark:bg-darkGray-800 block w-full border border-gray-300 dark:border-darkGray-600 focus:ring-blue-500 focus:border-blue-500 rounded-md px-2 py-2 focus:outline-none text-sm text-gray-700 dark:text-darkGray-100 focus:bg-white dark:focus:bg-darkGray-900 placeholder-gray-300 dark:placeholder-darkGray-600"
                        v-model="customEndpoint"
                      />
                    </div>
                  </label>
                </li>
              </ul>
            </fieldset>
          </div>
        </div>
        <div class="mt-6 flex justify-center flex-row-reverse">
          <button
            type="button"
            @click="selectNetwork(selNetwork)"
            class="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-100 dark:focus:ring-blue-400 mx-1"
          >
            Switch
          </button>
          <button
            type="button"
            @click="closeModal"
            class="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-darkGray-600 text-sm font-medium rounded-full text-gray-500 dark:text-darkGray-400 bg-white dark:bg-darkGray-900 dark:hover:bg-darkGray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-100 dark:focus:ring-darkGray-600 mx-1"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  props: {
    networkIdx: {
      type: Number,
      required: true,
    },
  },
  setup(props, { emit }) {
    const classRadioOn =
      'rounded-lg border border-blue-500 bg-blue-200 dark:bg-blue-500 bg-opacity-10 px-4 py-5 flex items-center cursor-pointer';
    const classRadioOff =
      'rounded-lg border border-gray-300 dark:border-darkGray-600 bg-white dark:bg-darkGray-900 hover:bg-gray-50 dark:hover:bg-darkGray-800 px-4 py-5 flex items-start cursor-pointer group';
    const classRadioTxtOn =
      'font-medium text-blue-500 dark:text-blue-400 text-sm';
    const classRadioTxtOff =
      'font-medium text-gray-500 dark:text-darkGray-400 group-hover:text-gray-700 dark:group-hover:text-darkGray-300 text-sm';

    const customEndpoint = ref('');

    const closeModal = (): void => {
      emit('update:is-open', false);
    };

    const selectNetwork = (networkIdx: number): void => {
      localStorage.setItem('networkIdx', networkIdx.toString());
      if (customEndpoint.value) {
        const endpoint = `ws://${customEndpoint.value}`;
        localStorage.setItem('customEndpoint', endpoint);
      }
      location.reload();

      emit('update:is-open', false);
      emit('update:select-network', networkIdx);
    };

    const selNetwork = ref(props.networkIdx);

    return {
      closeModal,
      customEndpoint,
      selectNetwork,
      selNetwork,
      classRadioOn,
      classRadioOff,
      classRadioTxtOn,
      classRadioTxtOff,
    };
  },
});
</script>
