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
                    @click="openOption = !openOption"
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
                        <input
                          class="w-full text-blue-900 dark:text-darkGray-100 text-xl focus:outline-none bg-transparent placeholder-gray-300 dark:placeholder-darkGray-600"
                          style="width: 21rem"
                          type="text"
                          v-model="toAddress"
                        />
                      </div>
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

                  <div
                    v-if="openOption"
                    class="block absolute mt-1 w-full rounded-md bg-white dark:bg-darkGray-800 shadow-lg z-10 border border-gray-200 dark:border-darkGray-600"
                  >
                    <ul
                      class="max-h-56 rounded-md py-1 text-base overflow-auto focus:outline-none"
                    >
                      <ModalSelectAccountOption
                        v-for="(account, index) in allAccounts"
                        :key="index"
                        :key-idx="index"
                        :address="account"
                        :addressName="allAccountNames[index]"
                        :checked="selAccount === index"
                        v-model:selOption="selAccount"
                      />
                    </ul>
                  </div>

                  <!-- <div
                    class="absolute mt-1 w-full rounded-md bg-white dark:bg-darkGray-800 shadow-lg z-10 border border-gray-200 dark:border-darkGray-600"
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
                  </div> -->
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
                      v-model="webpage"
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
                    v-model="projectName"
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
                    v-model="projectDesc"
                  ></textarea>
                </div>

                <div>
                  <label
                    class="block text-sm font-medium text-gray-500 dark:text-darkGray-400 mb-2"
                  >
                    Category
                  </label>

                  <!-- <div class="relative">
                    <div
                      class="block absolute mt-1 w-full rounded-md bg-white dark:bg-darkGray-800 shadow-lg z-10 bottom-1 border border-gray-200 dark:border-darkGray-600"
                    >
                      <ul
                        class="max-h-56 rounded-md py-1 text-base overflow-auto focus:outline-none"
                      >
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
                  </div> -->

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
                  <!-- <div
                    class="max-w-lg flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-darkGray-500 border-dashed rounded-md bg-blue-50 dark:bg-darkGray-800"
                  > -->
                  <!-- <div class="space-y-1 text-center">
                      <icon-document />
                      <div
                        class="flex text-sm text-gray-500 dark:text-darkGray-400"
                      > -->
                  <!-- <label
                          for="file-upload2"
                          class="relative cursor-pointer rounded-md font-medium text-blue-500 dark:text-blue-400 hover:text-blue-400 dark:hover:text-blue-300 focus-within:ring-offset-none"
                        >
                          <span>Upload a file</span>
                          <input
                            id="file-upload2"
                            name="wasmFile"
                            type="file"
                            class="sr-only"
                            @change="setFile"
                            :value="wasmFromFile"
                          />                          
                        </label>
                        <p class="pl-1">or drag and drop</p> -->

                  <input-file v-on:dropFile="onDropFile" :file="wasmFromFile" />
                  <!-- </div>
                      <p class="text-xs text-gray-500 dark:text-darkGray-400">
                        PNG, JPG, GIF up to 00MB
                      </p> -->
                  <!-- </div> -->
                  <!-- </div> -->
                </div>
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
import IconBase from '@/components/icons/IconBase.vue';
import IconAccountSample from '@/components/icons/IconAccountSample.vue';
import IconSolidSelector from '@/components/icons/IconSolidSelector.vue';
import IconDocument from '@/components/icons/IconDocument.vue';
import IconTopPicture from '@/components/icons/IconTopPicture.vue';
// import DeploymentAccountSelectOption from '@/components/dapps/DeploymentAccountSelectOption.vue';
import ModalSelectAccountOption from '@/components/balance/ModalSelectAccountOption.vue';
import CategoryMultiSelect from '@/components/dapps/CategoryMultiSelect.vue';
import InputFile from '@/components/dapps/InputFile.vue';
import { compactAddLength, isNull, isWasm } from '@polkadot/util';
import { SubmittableResult } from '@polkadot/api';
import { web3FromSource } from '@polkadot/extension-dapp';
import useFile, { FileState } from '@/hooks/useFile';
import useAbi from '@/hooks/useAbi';
import { CodePromise, Abi } from '@polkadot/api-contract';
import { useApi } from '@/hooks';
import { AnyJson } from '@polkadot/types/types';

interface FormData {
  projectName: string;
  projectDesc: string;
  webpage: string;
}

export default defineComponent({
  components: {
    IconBase,
    IconAccountSample,
    IconSolidSelector,
    IconDocument,
    IconTopPicture,
    // DeploymentAccountSelectOption,
    ModalSelectAccountOption,
    CategoryMultiSelect,
    InputFile,
  },
  props: {
    allAccounts: {
      type: Array,
      required: true,
    },
    allAccountNames: {
      type: Array,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit }) {
    const closeModal = () => {
      emit('update:is-open', false);
    };

    const openOption = ref(false);

    const formData = reactive<FormData>({
      projectName: '',
      projectDesc: '',
      webpage: '',
    });

    const selAccount = ref(0);
    const toAccount = ref(props.allAccounts[0] as string);
    const toAddress = ref(props.allAccounts[0] as string);
    const toAccountName = ref(props.allAccountNames[0]);

    watch(
      selAccount,
      () => {
        toAccount.value = props.allAccounts[selAccount.value] as string;
        toAccountName.value = props.allAccountNames[selAccount.value];
        toAddress.value = props.allAccounts[selAccount.value] as string;

        openOption.value = false;
      },
      { immediate: true }
    );

    const shortenToAddress = computed(() => {
      const address = toAccount.value as string;
      return `${address.slice(0, 6)}${'.'.repeat(6)}${address.slice(-6)}`;
    });

    //abi
    const { api } = useApi();

    const {
      abi,
      errorText,
      isAbiError,
      isAbiSupplied,
      isAbiValid,
      onChangeAbi,
      onRemoveAbi,
    } = useAbi();

    const {
      fileRef: wasmFromFile,
      setFile: setWasmFile,
      validate: isWasmFromFileValid,
    } = useFile({
      onChange: onChangeAbi,
      onRemove: onRemoveAbi,
      validate: (file) =>
        file?.data.subarray(0, 4).toString() === '0,97,115,109',
    });

    const wasm = ref();
    const isWasmValid = ref(false);

    const onDropFile = (fileState: FileState) => {
      setWasmFile(fileState);
    };

    watch(abi, () => {
      console.log('abc', abi.value);
      console.log('wasm', abi.value?.project.source.wasm);
      console.log('constructor', abi.value?.constructors);
      if (abi.value && isWasm(abi.value.project.source.wasm)) {
        wasm.value = abi.value.project.source.wasm;
        isWasmValid.value = true;

        // if (currentName.current === '') {
        //   setName(`${abi.value.project.contract.name.toString()}.contract`);
        // }
        return;
      }

      if (wasmFromFile.value && isWasmFromFileValid) {
        wasm.value = compactAddLength(wasmFromFile.value.data);
        isWasmValid.value = true;

        return;
      }

      wasm.value = null;
      isWasmValid.value = false;
    });

    const isSubmittable = ref(false);

    const onSuccess = (result: SubmittableResult): void => {
      const section = api?.value?.tx.contracts ? 'contracts' : 'contract';
      const record = result.findRecord(section, 'CodeStored');

      if (record) {
        const codeHash = record.event.data[0];

        if (!codeHash) {
          return;
        }

        // store.saveCode({ abi: abi?.json || undefined, codeHash: codeHash.toHex(), name, tags: [] })
        //   .then((id): void => navigateTo.uploadSuccess(id)())
        //   .catch((error: any): void => {
        //     console.error('Unable to save code', error);
        //   });
      }
    };

    // const upload = async () => {
    //   const injector = await web3FromSource('polkadot-js');
    //   console.log('sf', api?.value?.tx.contracts.putCode);
    //   const sendContract = await api?.value?.tx.contracts.putCode([wasm.value]);

    //   sendContract?.signAndSend(
    //     props.address,
    //     {
    //       signer: injector.signer,
    //     },
    //     (result) => {
    //       console.log('r', result);
    //     }
    //   );
    // };

    const upload = async () => {
      const injector = await web3FromSource('polkadot-js');

      // const sendContract = await api?.value?.tx.contracts.putCode([wasm.value]);
      if (api?.value) {
        const abiData = abi.value as Abi | AnyJson;

        console.log('s', abiData);
        console.log('w', wasm.value);

        const code = new CodePromise(api?.value?.clone(), abiData, wasm.value);

        // Deploy the WASM, retrieve a Blueprint
        let blueprint;

        // createBlueprint is a normal submittable, so use signAndSend
        // with an known Alice keypair (as per the API samples)

        //@ts-ignore
        const unsub = await code.createBlueprint().signAndSend(
          props.address,
          {
            signer: injector.signer,
          },
          (result: any) => {
            if (result.status.isInBlock || result.status.isFinalized) {
              console.log('r', result);
              // here we have an additional field in the result, containing the blueprint
              blueprint = result.blueprint;
              unsub();
            }
          }
        );
      }

      /*
        // Subscribe to system events via storage
        api?.value?.query.system.events((events) => {
          console.log(`\nReceived ${events.length} events:`);

          // Loop through the Vec<EventRecord>
          events.forEach((record) => {
            // Extract the phase, event and the event types
            const { event, phase } = record;
            const types = event.typeDef;

            // Show what we are busy with
            console.log(
              `\t${event.section}:${event.method}:: (phase=${phase.toString()})`
            );
            console.log(`\t\t${event.meta.documentation.toString()}`);

            // Loop through each of the parameters, displaying the type and data
            event.data.forEach((data, index) => {
              console.log(`\t\t\t${types[index].type}: ${data.toString()}`);
            });
          });
        });

        let constructorExecutionGas = 13500000000;
        let value = 100000000000000;

        code.tx
          .new(
            { gasLimit: constructorExecutionGas, salt: null, value: value },
            OWNER_ADDR
          )
          .signAndSend(
            props.address,
            {
              signer: injector.signer,
            },
            ({ status, events }) => {
              // console.log('r', result);
              if (status.isInBlock || status.isFinalized) {
                events
                  // find/filter for failed events
                  .filter(({ event }) =>
                    api.value?.events.system.ExtrinsicFailed.is(event)
                  )
                  // we know that data for system.ExtrinsicFailed is
                  // (DispatchError, DispatchInfo)
                  .forEach(
                    ({
                      event: {
                        data: [error, info],
                      },
                    }) => {
                      // if (error.isModule) {
                      //     // for module errors, we have the section indexed, lookup
                      //     const decoded = api.value?.registry.findMetaError(error.asModule);
                      //     const { documentation, method, section } = decoded;
                      //     console.log(`${section}.${method}: ${documentation.join(' ')}`);
                      // } else {
                      //     // Other, CannotLookup, BadOrigin, no extra info
                      //     console.log(error.toString());
                      // }
                    }
                  );
                events
                  .filter(({ event }) =>
                    api.value?.events.contracts.CodeStored.is(event)
                  )
                  .forEach(
                    ({
                      event: {
                        data: [code_hash],
                      },
                    }) => {
                      console.log(`code hash: ${code_hash}`);
                    }
                  );
                events
                  .filter(({ event }) =>
                    api.value?.events.contracts.Instantiated.is(event)
                  )
                  .forEach(
                    ({
                      event: {
                        data: [deployer, contract],
                      },
                    }) => {
                      console.log(`contract address: ${contract}`);
                    }
                  );
              }
            }
          );
          */
    };

    return {
      ...toRefs(formData),
      closeModal,
      openOption,
      selAccount,
      toAccountName,
      toAddress,
      shortenToAddress,
      upload,
      wasmFromFile,
      onDropFile,
    };
  },
});
</script>
