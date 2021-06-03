<template>
  <div class="fixed z-10 inset-0 overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen">
      <!-- Background overlay -->
      <div class="fixed inset-0 transition-opacity" aria-hidden="true">
        <div class="absolute inset-0 bg-gray-900 dark:bg-black opacity-75"></div>
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
                    Endowment (UNIT)
                  </label>
                  <input
                    class="border border-gray-300 dark:border-darkGray-500 rounded-md w-full text-blue-900 dark:text-darkGray-100 focus:outline-none placeholder-gray-300 dark:placeholder-darkGray-600 px-3 py-3 appearance-none bg-white dark:bg-darkGray-900"
                    placeholder=""
                    v-model="endowment"
                  />
                </div>

                <div>
                  <label
                    class="block text-sm font-medium text-gray-500 dark:text-darkGray-400 mb-2"
                  >
                    Max Gas Allowed (M)
                  </label>
                  <input
                    class="border border-gray-300 dark:border-darkGray-500 rounded-md w-full text-blue-900 dark:text-darkGray-100 focus:outline-none placeholder-gray-300 dark:placeholder-darkGray-600 px-3 py-3 appearance-none bg-white dark:bg-darkGray-900"
                    placeholder=""
                    v-model="gasLimit"
                  />
                </div>
              </div>
            </div>

            <div class="sm:w-1/2">
              <div class="grid grid-cols-1 gap-6">
                <div>
                  <label
                    class="block text-sm font-medium text-gray-500 dark:text-darkGray-400 mb-2"
                  >
                    Json file
                  </label>

                  <input-file v-on:dropFile="onDropFile" :file="wasmFromFile" />
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
import { defineComponent, ref, watch, computed, reactive, toRefs } from "vue";
import IconBase from "@/components/icons/IconBase.vue";
import IconAccountSample from "@/components/icons/IconAccountSample.vue";
import IconSolidSelector from "@/components/icons/IconSolidSelector.vue";
import BN from "bn.js";
import * as plasmUtils from "@/helper";
import ModalSelectAccountOption from "@/components/balance/ModalSelectAccountOption.vue";
import InputFile from "@/components/staking/InputFile.vue";
import { compactAddLength, isWasm, stringify } from "@polkadot/util";
import useFile, { FileState } from "@/hooks/useFile";
import useAbi from "@/hooks/useAbi";
import { useStore } from "vuex";
import { bnToBn } from "@polkadot/util";
import { web3FromSource } from "@polkadot/extension-dapp";
import { ActionTypes } from "@/store/action-types";
import { MutationTypes } from "@/store/mutation-types";
import { useApi } from "@/hooks";

interface FormData {
  endowment: BN;
  gasLimit: BN;
  projectName: string;
}

export default defineComponent({
  components: {
    IconBase,
    IconAccountSample,
    IconSolidSelector,
    ModalSelectAccountOption,
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
      emit("update:is-open", false);
    };

    const openOption = ref(false);

    const unit_d = 3;
    const decimal = 12;

    const formData = reactive<FormData>({
      endowment: bnToBn(plasmUtils.reduceDenomToBalance(27, unit_d, decimal)),
      gasLimit: new BN(200000000000),
      projectName: "",
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
      return `${address.slice(0, 6)}${".".repeat(6)}${address.slice(-6)}`;
    });

    const store = useStore();
    const { api } = useApi();

    const { abi, onChangeAbi, onRemoveAbi } = useAbi();

    const {
      fileRef: wasmFromFile,
      setFile: setWasmFile,
      validate: isWasmFromFileValid,
    } = useFile({
      onChange: onChangeAbi,
      onRemove: onRemoveAbi,
      validate: (file) => file?.data.subarray(0, 4).toString() === "0,97,115,109",
    });

    const wasm = ref();
    const isWasmValid = ref(false);

    const onDropFile = (fileState: FileState) => {
      setWasmFile(fileState);
    };

    watch(abi, () => {
      console.log("abc", abi.value);
      console.log("wasm", abi.value?.project.source.wasm);
      console.log("constructor", abi.value?.constructors);
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

    const upload = async () => {
      api?.value?.isReady.then(async () => {
        const instantiate = await api?.value?.tx.contracts?.instantiateWithCode(
          formData.endowment,
          formData.gasLimit,
          wasm.value,
          "",
          ""
        );
        const injector = await web3FromSource("polkadot-js");
        instantiate?.signAndSend(
          props.address,
          {
            signer: injector.signer,
          },
          ({ status }: any) => {
            if (status.isInBlock) {
              console.log(`Completed at block hash #${status.asInBlock.toString()}`);

              store.dispatch(ActionTypes.SHOW_ALERT_MSG, {
                msg: `Completed at block hash #${status.asInBlock.toString()}`,
                alertType: "success",
              });

              store.commit(MutationTypes.SET_LOADING, false);
              emit("complete-transfer", true);

              closeModal();
            } else {
              console.log(`Current status: ${status.type}`);

              if (status.type !== "Finalized") {
                store.commit(MutationTypes.SET_LOADING, true);
              }
            }
          }
        );
      });
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
