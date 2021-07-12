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
                  Contract ABI
                </label>
                <!-- <input
                  class="
                    border border-gray-300
                    dark:border-darkGray-500
                    rounded-md
                    w-full
                    text-blue-900
                    dark:text-darkGray-100
                    focus:outline-none
                    placeholder-gray-300
                    dark:placeholder-darkGray-600
                    px-3
                    py-3
                    appearance-none
                    bg-white
                    dark:bg-darkGray-900
                  "
                  placeholder=""
                  v-model="abiData"
                /> -->
                <input-file
                  v-on:dropFile="onDropFile"
                  :file="wasmFromFile"
                  :extension="extensionFile"
                />
              </div>
              <contract-info :messages="messages" />
            </div>
          </div>
        </div>
        <div class="mt-6 flex justify-center flex-row-reverse">
          <button
            type="button"
            @click="save"
            class="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-100 dark:focus:ring-blue-400 mx-1"
          >
            Save
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
import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import { stringify } from '@polkadot/util';
import { useApi, useMessages } from '@/hooks';
import useAbi from '@/hooks/useAbi';
import { useFile, FileState } from '@/hooks/useFile';
import { ActionTypes } from '@/store/action-types';
import InputFile from '@/components/dapps/InputFile.vue';
import ContractInfo from './ContractInfo.vue';

export default defineComponent({
  props: {
    address: {
      type: String,
      required: true,
    },
  },
  components: {
    InputFile,
    ContractInfo,
  },
  setup(props, { emit }) {
    const closeModal = () => {
      emit('update:is-open', false);
    };

    const store = useStore();
    const { api } = useApi();

    const { abi, onChangeAbi, onRemoveAbi } = useAbi();

    const codeHash = ref('');
    const bundleName = ref('');
    // const abiData = ref('');
    // const codeHash = ref(
    //   '0x52f960bf3032155ed75db1490c7ac4f6c660105e7847558df5d4edb615e3eb1e'
    // );
    // const bundleName = ref('flipper');
    // const abiData = ref(
    //   '{ "metadataVersion": "0.1.0", "source": { "hash": "0x52f960bf3032155ed75db1490c7ac4f6c660105e7847558df5d4edb615e3eb1e", "language": "ink! 3.0.0-rc3", "compiler": "rustc 1.54.0-nightly" }, "contract": { "name": "flipper", "version": "0.1.0", "authors": [ "[your_name] <[your_email]>" ] }, "spec": { "constructors": [ { "args": [ { "name": "init_value", "type": { "displayName": [ "bool" ], "type": 1 } } ], "docs": [ "Constructor that initializes the `bool` value to the given `init_value`." ], "name": [ "new" ], "selector": "0x9bae9d5e" }, { "args": [], "docs": [ "Constructor that initializes the `bool` value to `false`.", "", "Constructors can delegate to other constructors." ], "name": [ "default" ], "selector": "0xed4b9d1b" } ], "docs": [], "events": [], "messages": [ { "args": [], "docs": [ " A message that can be called on instantiated contracts.", " This one flips the value of the stored `bool` from `true`", " to `false` and vice versa." ], "mutates": true, "name": [ "flip" ], "payable": false, "returnType": null, "selector": "0x633aa551" }, { "args": [], "docs": [ " Simply returns the current value of our `bool`." ], "mutates": false, "name": [ "get" ], "payable": false, "returnType": { "displayName": [ "bool" ], "type": 1 }, "selector": "0x2f865bd9" } ] }, "storage": { "struct": { "fields": [ { "layout": { "cell": { "key": "0x0000000000000000000000000000000000000000000000000000000000000000", "ty": 1 } }, "name": "value" } ] } }, "types": [ { "def": { "primitive": "bool" } } ] }'
    // );

    const { fileRef: wasmFromFile, setFile: setWasmFile } = useFile({
      onChange: onChangeAbi,
      onRemove: onRemoveAbi,
      validate: (file) =>
        file?.data.subarray(0, 4).toString() === '0,97,115,109',
    });

    const extensionFile = ['.contract', '.json'];

    const onDropFile = (fileState: FileState) => {
      setWasmFile(fileState);
    };

    const { messages } = useMessages(abi);

    const save = async () => {
      if (!codeHash.value || !bundleName.value || !abi.value) {
        return;
      }

      const codeJson = {
        // @ts-ignore
        abi: stringify(abi.value.json),
        name: bundleName.value || '<>',
        tags: [],
      };

      console.log('codEJson', codeJson);

      store.dispatch(ActionTypes.SAVE_CODE, {
        api: api?.value,
        _codeHash: codeHash.value,
        partial: codeJson,
      });

      closeModal();
    };

    return {
      closeModal,
      save,
      bundleName,
      codeHash,
      wasmFromFile,
      extensionFile,
      onDropFile,
      messages,
    };
  },
});
</script>
