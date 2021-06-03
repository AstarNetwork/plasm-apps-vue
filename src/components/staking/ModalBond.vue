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

          <div class="relative">
            <label
              class="block text-sm font-medium text-gray-500 dark:text-darkGray-400 mb-2"
            >
              Stash Account
            </label>

            <button
              type="button"
              @click="
                openStashOption = !openStashOption;
                openControllerOption = false;
              "
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
                    style="width: 42rem"
                    type="text"
                    v-model="toStashAddress"
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
              v-if="openStashOption"
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
                  :checked="selStashAccount === index"
                  v-model:selOption="selStashAccount"
                />
              </ul>
            </div>
          </div>

          <div class="relative">
            <label
              class="block text-sm font-medium text-gray-500 dark:text-darkGray-400 mb-2"
            >
              Controller Account
            </label>

            <button
              type="button"
              @click="
                openControllerOption = !openControlerOption;
                openStashOption = false;
              "
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
                    style="width: 42rem"
                    type="text"
                    v-model="toControllerAddress"
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
              v-if="openControllerOption"
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
                  :checked="selControllerAccount === index"
                  v-model:selOption="selControllerAccount"
                />
              </ul>
            </div>
          </div>

          <div>
            <label
              class="block text-sm font-medium text-gray-500 dark:text-darkGray-400 mb-2"
            >
              Bonded Value (UNIT)
            </label>
            <input
              class="border border-gray-300 dark:border-darkGray-500 rounded-md w-full text-blue-900 dark:text-darkGray-100 focus:outline-none placeholder-gray-300 dark:placeholder-darkGray-600 px-3 py-3 appearance-none bg-white dark:bg-darkGray-900"
              placeholder=""
              v-model="bondedValue"
            />
          </div>
        </div>
        <div class="mt-6 flex justify-center flex-row-reverse">
          <button
            type="button"
            @click="bond"
            class="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-100 dark:focus:ring-blue-400 mx-1"
          >
            Bond
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
import ModalSelectAccountOption from "@/components/balance/ModalSelectAccountOption.vue";
import InputFile from "@/components/staking/InputFile.vue";
import { useStore } from "vuex";
import { useApi } from "@/hooks/useApi";
import { web3FromSource } from "@polkadot/extension-dapp";
import { ActionTypes } from "@/store/action-types";
import { MutationTypes } from "@/store/mutation-types";

interface FormData {
  bondedValue: BN;
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

    const openStashOption = ref(false);
    const openControllerOption = ref(false);

    const formData = reactive<FormData>({
      bondedValue: new BN(10000),
    });

    const selStashAccount = ref(0);
    const toStashAccount = ref(props.allAccounts[0] as string);
    const toStashAddress = ref(props.allAccounts[0] as string);
    const toStashAccountName = ref(props.allAccountNames[0]);

    const selControllerAccount = ref(0);
    const toControllerAccount = ref(props.allAccounts[0] as string);
    const toControllerAddress = ref(props.allAccounts[0] as string);
    const toControllerAccountName = ref(props.allAccountNames[0]);

    watch(
      selStashAccount,
      () => {
        toStashAccount.value = props.allAccounts[selStashAccount.value] as string;
        toStashAccountName.value = props.allAccountNames[selStashAccount.value];
        toStashAddress.value = props.allAccounts[selStashAccount.value] as string;

        openStashOption.value = false;
      },
      { immediate: true }
    );

    watch(
      selControllerAccount,
      () => {
        toControllerAccount.value = props.allAccounts[
          selControllerAccount.value
        ] as string;
        toControllerAccountName.value = props.allAccountNames[selControllerAccount.value];
        toControllerAddress.value = props.allAccounts[
          selControllerAccount.value
        ] as string;

        openControllerOption.value = false;
      },
      { immediate: true }
    );

    const shortenToStashAddress = computed(() => {
      const address = toStashAccount.value as string;
      return `${address.slice(0, 6)}${".".repeat(6)}${address.slice(-6)}`;
    });

    const shortenToControllerAddress = computed(() => {
      const address = toControllerAccount.value as string;
      return `${address.slice(0, 6)}${".".repeat(6)}${address.slice(-6)}`;
    });

    const { api } = useApi();
    const store = useStore();

    const bond = async () => {
      console.log("Stash Address", toStashAddress.value);
      console.log("Controller Address", toControllerAddress.value);
      console.log("Bonded Value", formData.bondedValue);

      api?.value?.isReady.then(async () => {
        const bond = await api?.value?.tx.dappsStaking?.bond(
          toStashAddress.value,
          formData.bondedValue,
          1
        );
        const injector = await web3FromSource("polkadot-js");
        bond?.signAndSend(
          props.address,
          {
            signer: injector.signer,
          },
          ({ status }) => {
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
      openStashOption,
      openControllerOption,
      selStashAccount,
      toStashAccountName,
      toStashAddress,
      shortenToStashAddress,
      selControllerAccount,
      toControllerAccountName,
      toControllerAddress,
      shortenToControllerAddress,
      bond,
    };
  },
});
</script>
