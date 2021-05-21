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
              Add an existing code hash
            </h3>

            <div class="grid grid-cols-1 gap-6">
              <div>
                <label
                  class="block text-sm font-medium text-gray-500 dark:text-darkGray-400 mb-2"
                >
                  Code hash
                </label>
                <input
                  class="border border-gray-300 dark:border-darkGray-500 rounded-md w-full text-blue-900 dark:text-darkGray-100 focus:outline-none placeholder-gray-300 dark:placeholder-darkGray-600 px-3 py-3 appearance-none bg-white dark:bg-darkGray-900"
                  placeholder=""
                  v-model="codeHash"
                />
              </div>

              <div>
                <label
                  class="block text-sm font-medium text-gray-500 dark:text-darkGray-400 mb-2"
                >
                  Code bundle name
                </label>
                <input
                  class="border border-gray-300 dark:border-darkGray-500 rounded-md w-full text-blue-900 dark:text-darkGray-100 focus:outline-none placeholder-gray-300 dark:placeholder-darkGray-600 px-3 py-3 appearance-none bg-white dark:bg-darkGray-900"
                  placeholder=""
                  v-model="bundleName"
                />
              </div>

              <div>
                <label
                  class="block text-sm font-medium text-gray-500 dark:text-darkGray-400 mb-2"
                >
                  Contract ABI
                </label>
                <input
                  class="border border-gray-300 dark:border-darkGray-500 rounded-md w-full text-blue-900 dark:text-darkGray-100 focus:outline-none placeholder-gray-300 dark:placeholder-darkGray-600 px-3 py-3 appearance-none bg-white dark:bg-darkGray-900"
                  placeholder=""
                  v-model="abiData"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="mt-6 flex justify-center flex-row-reverse">
          <button
            type="button"
            @click="upload"
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
import { defineComponent, ref, watch, computed, reactive, toRefs } from 'vue';
import { BlueprintPromise } from '@polkadot/api-contract';
import { web3FromSource } from '@polkadot/extension-dapp';
import { useStore } from 'vuex';
import type {
  ChainProperties,
  ContractProject,
} from '@polkadot/types/interfaces';
import { CodePromise, Abi } from '@polkadot/api-contract';
import { AnyJson } from '@polkadot/types/types';
const { createTestKeyring } = require('@polkadot/keyring/testing');

export default defineComponent({
  props: {
    address: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit }) {
    const closeModal = () => {
      emit('update:is-open', false);
    };

    const store = useStore();
    const api = computed(() => store.getters.api);
    const abiData = ref();
    const bundleName = ref('');
    const codeHash = ref('');

    const upload = async () => {
      const injector = await web3FromSource('polkadot-js');

      console.log('f', abiData.value + '/' + codeHash.value);
      const registry = api?.value?.registry;
      const chainProperties = registry?.getChainProperties() as
        | ChainProperties
        | undefined;

      // const abi = new Abi(abiData?.value, chainProperties);

      const abi = require('@/test/metadata.json');

      console.log('sss', abi);

      const blueprint = new BlueprintPromise(api?.value, abi, codeHash.value);
      // Deploy a contract using the Blueprint
      const endowment = 1230000000000n;

      // NOTE The apps UI specifies these in Mgas
      const gasLimit = 100000n * 1000000n;
      const initValue = 123;

      let contract;

      // We pass the constructor (named `new` in the actual Abi),
      // the endowment, gasLimit (weight) as well as any constructor params
      // (in this case `new (initValue: i32)` is the constructor)
      const unsub = await blueprint.tx
        .new(endowment, gasLimit, initValue)
        .signAndSend(
          props.address,
          {
            signer: injector.signer,
          },
          (result: any) => {
            if (result.status.isInBlock || result.status.isFinalized) {
              console.log('r', result);
              contract = result.contract;
              unsub();
            }
          }
        );
    };

    return {
      closeModal,
      upload,
      abiData,
      bundleName,
      codeHash,
    };
  },
});
</script>
