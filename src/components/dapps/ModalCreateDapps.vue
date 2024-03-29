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
            Create Your dApps ({{ step }} / 2)
          </h3>

          <div
            v-if="step === 1"
            class="sm:flex grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
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
                          spellcheck="false"
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

                <input-amount
                  title="Endowment"
                  :noMax="true"
                  :maxInDefaultUnit="endowment"
                  v-model:amount="endowment"
                  v-model:selectedUnit="selectUnitEndowment"
                />

                <div
                  v-if="isInsufficientFee"
                  class="inline-flex text-red-700 text-xs"
                >
                  Fees of
                  <balance
                    class="ml-1 mr-1"
                    :balance="partialFee"
                    :decimals="decimal"
                    :unit="defaultUnitToken"
                  />
                  will be applied to the submission
                </div>

                <input-amount
                  title="Max gas allowed"
                  :noMax="true"
                  :maxInDefaultUnit="weight"
                  v-model:amount="weight"
                  v-model:selectedUnit="selectUnitGas"
                />
              </div>
            </div>

            <div class="sm:w-1/2">
              <div class="grid grid-cols-1 gap-6">
                <div>
                  <label
                    class="block text-sm font-medium text-gray-500 dark:text-darkGray-400 mb-2"
                  >
                    Contract file
                  </label>

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
          <div v-else class="dark:text-white">
            <params-generator
              :constructors="messages.filter((msg) => msg.isConstructor)"
              v-model:constructorIndex="constructorIndex"
              v-model:params="params"
            />
          </div>
        </div>

        <div class="mt-6 flex justify-end">
          <button
            type="button"
            @click="closeModal"
            class="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-darkGray-500 text-sm font-medium rounded-full text-gray-500 dark:text-darkGray-400 bg-white dark:bg-darkGray-900 hover:bg-gray-100 dark:hover:bg-darkGray-700 focus:outline-none focus:ring focus:ring-gray-100 dark:focus:ring-darkGray-600 mx-1"
          >
            Cancel
          </button>
          <button
            type="button"
            @click="moveStep2"
            :disabled="!canMoveToStep2"
            v-if="step === 1"
            class="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-blue-500 focus:outline-none focus:ring focus:ring-blue-100 dark:focus:ring-blue-400 mx-1"
            :class="{
              'placeholder-opacity-90': !canMoveToStep2,
              'dark:hover:bg-blue-400': canMoveToStep2,
              'hover:bg-blue-700': canMoveToStep2,
              'cursor-not-allowed': !canMoveToStep2,
            }"
          >
            Next Step
          </button>
          <div v-if="step === 2">
            <button
              type="button"
              @click="step = 1"
              class="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-darkGray-500 text-sm font-medium rounded-full text-gray-500 dark:text-darkGray-400 bg-white dark:bg-darkGray-900 hover:bg-gray-100 dark:hover:bg-darkGray-700 focus:outline-none focus:ring focus:ring-gray-100 dark:focus:ring-darkGray-600 mx-1"
            >
              Previous Step
            </button>
            <button
              type="button"
              @click="upload"
              class="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-100 dark:focus:ring-blue-400 mx-1"
            >
              Upload
            </button>
          </div>
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

import type { SubmittableExtrinsic } from '@polkadot/api/types';
import type { CodeSubmittableResult } from '@polkadot/api-contract/promise/types';
import type { Balance as BalanceType } from '@polkadot/types/interfaces/runtime';
import type { QueueTx } from '@/types/Status';
import BN from 'bn.js';
import * as plasmUtils from '@/helper';
import ModalSelectAccountOption from '@/components/balance/ModalSelectAccountOption.vue';
import InputFile from '@/components/dapps/InputFile.vue';
import InputAmount from '@/components/common/InputAmount.vue';
import Balance from '@/components/common/Balance.vue';
import { stringify, isFunction } from '@polkadot/util';
import { SubmittableResult } from '@polkadot/api';
import { ActionTypes } from '@/store/action-types';
import { MutationTypes } from '@/store/mutation-types';
import { keyring } from '@polkadot/ui-keyring';
import { useApi, useMessages, useWasm, useChainMetadata } from '@/hooks';
import { useFile, FileState } from '@/hooks/useFile';
import useAbi from '@/hooks/useAbi';
import useSendTx from '@/hooks/signer/useSendTx';
import { AnyJson } from '@polkadot/types/types';
import { AddressProxy } from '@/types/Signer';
import type { ApiPromise } from '@polkadot/api';
import { getParamValues } from '@/helper/params';
import ContractInfo from './ContractInfo.vue';
import usePendingTx from '@/hooks/signer/usePendingTx';
import ParamsGenerator from './ParamsGenerator.vue';
import { CodePromise, Abi } from '@polkadot/api-contract';
import { useStore } from 'vuex';
import { Param } from '@/types/Params';
import { getUnit } from '@/helper/units';

interface FormData {
  endowment: BN;
  weight: BN;
  projectName: string;
  projectDesc: string;
  webpage: string;
}

export default defineComponent({
  components: {
    IconBase,
    IconAccountSample,
    IconSolidSelector,
    ModalSelectAccountOption,
    InputFile,
    ContractInfo,
    ParamsGenerator,
    InputAmount,
    Balance,
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

    const { defaultUnitToken, decimal } = useChainMetadata();

    const selectUnitEndowment = ref<string>(defaultUnitToken.value);
    const selectUnitGas = ref<string>('micro');

    const formData = reactive<FormData>({
      endowment: new BN(0),
      weight: new BN(200000),
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

    const store = useStore();

    const { api } = useApi();
    const apiPromise: ApiPromise = api?.value as ApiPromise;

    const { abi, onChangeAbi, onRemoveAbi } = useAbi();

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

    const extensionFile = ['.contract', '.json'];

    const onDropFile = (fileState: FileState) => {
      setWasmFile(fileState);
    };

    const { messages } = useMessages(abi);

    const { wasm, isWasmValid } = useWasm(
      abi,
      wasmFromFile.value,
      isWasmFromFileValid
    );

    const { onSend } = useSendTx();

    const constructorIndex = ref(0);
    const partialFee = ref<BalanceType>();

    //handlers for transactions
    const _onFailedTx = (result: SubmittableResult | null) => {
      console.error('_onFailed', result);
      store.commit(MutationTypes.SET_LOADING, false);
      store.dispatch(ActionTypes.SHOW_ALERT_MSG, {
        msg: result,
        alertType: 'error',
      });
    };

    const _onStartTx = () => {
      console.log('_onStart');
      store.commit(MutationTypes.SET_LOADING, true);
    };

    const _onSuccessTx = (result: CodeSubmittableResult) => {
      console.log('_onSuccess', result);

      const codeHash = result.blueprint?.codeHash;
      const codeJson = {
        abi: stringify(result.blueprint?.abi.json),
        name: formData.projectName || '<>',
        tags: [],
      };
      console.log('codeHash', codeHash?.toHex());
      console.log('codeJson', codeJson);

      result.blueprint &&
        store.dispatch(ActionTypes.SAVE_CODE, {
          api: apiPromise,
          _codeHash: codeHash,
          partial: codeJson,
        });

      result.contract &&
        keyring.saveContract(result.contract.address.toString(), {
          contract: {
            abi: stringify(result.contract.abi.json),
            genesisHash: apiPromise.genesisHash.toHex(),
          },
          name: formData.projectName || '<>',
          tags: [],
        });

      store.commit(MutationTypes.SET_LOADING, false);
      store.dispatch(ActionTypes.SHOW_ALERT_MSG, {
        msg: `Success to deploying contract- codeHash: ${codeHash?.toHex()} `,
        alertType: 'success',
      });

      closeModal();
    };
    const _onUpdateTx = () => {};

    const curQueueTx = ref<QueueTx>();
    const toEndowment = ref<BN>(new BN(0));

    const pushPendingTx = async () => {
      if (
        formData.projectName === '' ||
        toAddress.value === '' ||
        wasm.value === null ||
        !isWasmValid
      ) {
        store.dispatch(ActionTypes.SHOW_ALERT_MSG, {
          msg: `Please check fields again`,
          alertType: 'error',
        });
        return;
      }

      const abiData = abi.value as Abi | AnyJson;

      // console.log('s', abiData);
      // console.log('w', wasm.value);

      let uploadTx: SubmittableExtrinsic<'promise'> | null = null;

      try {
        const code = new CodePromise(apiPromise, abiData, wasm.value);
        //should be changable
        // const unit_d = 3;
        // const decimal = 12;
        // const endowment = bnToBn(
        //   plasmUtils.reduceDenomToBalance(27, unit_d, decimal)
        // );
        // const weight = new BN(200000000000);
        ///
        console.log('code', code);

        const unit = getUnit(selectUnitEndowment.value);
        toEndowment.value = plasmUtils.reduceDenomToBalance(
          formData.endowment,
          unit,
          decimal.value
        );
        console.log('toEndowment', toEndowment.value.toString(10));

        const unit2 = getUnit(selectUnitGas.value);
        const toWeight = plasmUtils.reduceDenomToBalance(
          formData.weight,
          unit2,
          decimal.value
        );
        console.log('toWeight', toWeight.toString(10));

        const params = abi?.value?.constructors[constructorIndex.value].args;
        console.log('params', params);

        const arrValues = getParamValues(abi.value?.registry, params);
        console.log('values', arrValues);

        uploadTx =
          code &&
          abi.value?.constructors[constructorIndex.value].method &&
          formData.endowment
            ? code.tx[abi.value?.constructors[constructorIndex.value].method](
                {
                  gasLimit: toWeight,
                  value: toEndowment.value,
                },
                ...arrValues
              )
            : null;
      } catch (e) {
        const error = (e as Error).message;
        console.error(error);
        store.dispatch(ActionTypes.SHOW_ALERT_MSG, {
          msg: error,
          alertType: 'error',
        });
        return;
      }

      console.log('uploadTx', uploadTx);

      const { txqueue } = usePendingTx(
        uploadTx,
        toAddress.value,
        _onStartTx,
        _onFailedTx,
        _onSuccessTx,
        _onUpdateTx
      );

      console.log('txQueue', txqueue);

      const currentItem: QueueTx = txqueue[0];

      // set estimation fee of endowment
      if (
        currentItem.accountId &&
        currentItem.extrinsic &&
        isFunction(currentItem.extrinsic.paymentInfo)
      ) {
        try {
          const info = await currentItem.extrinsic?.paymentInfo(
            currentItem.accountId!
          );

          partialFee.value = info.partialFee;
        } catch (error) {
          console.error(error);
        }
      }

      curQueueTx.value = currentItem;
    };

    const upload = async () => {
      const currentItem: QueueTx | undefined = curQueueTx?.value;

      if (currentItem) {
        const senderInfo: AddressProxy = {
          isMultiCall: false,
          isUnlockCached: false,
          multiRoot: null,
          proxyRoot: null,
          signAddress: toAddress.value,
          signPassword: '',
        };
        onSend(currentItem, senderInfo);
      } else {
        console.log("there's no pending tx");
      }
    };

    const step = ref<number>(1);

    const canMoveToStep2 = computed(() => {
      return (
        !!abi.value &&
        formData.projectName &&
        formData.endowment &&
        formData.weight
      );
    });
    const isInsufficientFee = ref(false);

    const moveStep2 = async () => {
      try {
        await pushPendingTx();
      } catch (e) {
        console.error(e);
        return;
      }

      if (toEndowment.value.lte(partialFee.value!)) {
        isInsufficientFee.value = true;
      } else {
        step.value = 2;
      }
    };

    const params = ref<(Param | never)[]>([]);

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
      extensionFile,
      onDropFile,
      messages,
      step,
      canMoveToStep2,
      constructorIndex,
      params,
      selectUnitEndowment,
      selectUnitGas,
      defaultUnitToken,
      decimal,
      partialFee,
      isInsufficientFee,
      moveStep2,
    };
  },
});
</script>
