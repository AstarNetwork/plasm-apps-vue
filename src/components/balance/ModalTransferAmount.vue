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
        class="inline-block bg-white dark:bg-darkGray-900 rounded-lg px-4 sm:px-8 py-10 shadow-xl transform transition-all mx-2 my-2 align-middle max-w-lg w-full"
      >
        <div>
          <div>
            <h3
              class="text-lg font-extrabold text-blue-900 dark:text-white mb-6 text-center"
            >
              Transfer {{ unitToken }}
            </h3>

            <button
              type="button"
              class="w-full bg-blue-500 dark:bg-blue-800 text-white rounded-lg px-5 py-5 mb-4 relative hover:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-100 dark:focus:ring-blue-400"
            >
              <span class="block text-left font-bold text-sm mb-2"
                >{{ unitToken }} Balance</span
              >
              <span class="block font-semibold text-2xl mb-1"
                ><format-balance
              /></span>
              <!-- <span class="block font-normal text-sm mb-2">≈US $0</span> -->
            </button>

            <form>
              <div class="mb-4">
                <label
                  class="block text-sm font-medium text-gray-500 dark:text-darkGray-400 mb-2"
                >
                  Account
                </label>
                <div class="relative">
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
                      <icon-base
                        class="h-5 w-5 text-gray-400 dark:text-darkGray-300"
                        icon-name="selector"
                        viewBox="0 0 20 20"
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
                      <!-- Select option -->
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
              </div>

              <div>
                <label
                  class="block text-sm font-medium text-gray-500 dark:text-darkGray-400 mb-2"
                >
                  Amount
                </label>
                <div
                  class="border border-gray-300 dark:border-darkGray-500 rounded-md relative"
                >
                  <div
                    class="flex items-center border-b border-gray-300 dark:border-darkGray-500"
                  >
                    <div class="flex-1 pl-16">
                      <input
                        class="w-full text-blue-900 dark:text-darkGray-100 text-2xl focus:outline-none bg-transparent placeholder-gray-300 dark:placeholder-darkGray-600"
                        inputmode="decimal"
                        type="number"
                        min="0"
                        pattern="^[0-9]*(\.)?[0-9]*$"
                        placeholder="0.0"
                        v-model="transferAmt"
                      />
                    </div>
                    <button
                      type="button"
                      @click="setMaxAmount(formatBalance)"
                      class="bg-blue-100 dark:bg-blue-200 hover:bg-blue-200 dark:hover:bg-blue-300 text-xs rounded-full px-3 py-2 text-blue-900 dark:text-darkGray-900 mx-3 focus:outline-none focus:ring focus:ring-blue-100 dark:focus:ring-blue-300"
                    >
                      MAX
                    </button>
                    <div
                      class="text-blue-900 dark:text-darkGray-100 text-lg border-l border-gray-300 dark:border-darkGray-500 px-3 py-4"
                    >
                      <select
                        name="units"
                        class="dark:bg-darkGray-900"
                        v-model="selectUnit"
                      >
                        <option
                          v-for="item in arrUnitNames"
                          :key="item"
                          :value="item"
                        >
                          {{ item }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <!-- <div
                    class="text-gray-500 dark:text-darkGray-400 text-lg flex items-center justify-between"
                  >
                    <div class="pl-16">≈US $2,617.51</div>
                    <div class="px-3 py-4">aUSD</div>
                  </div> -->
                  <!-- <button
                    type="button"
                    class="bg-blue-100 dark:bg-blue-200 hover:bg-blue-200 dark:hover:bg-blue-300 text-xs rounded-full p-2 text-blue-900 dark:text-darkGray-900 absolute left-3 top-1/2 -mt-4 focus:outline-none focus:ring focus:ring-blue-100 dark:focus:ring-blue-300"
                  >
                    <icon-base
                      class="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <icon-exchange />
                    </icon-base>
                  </button> -->
                </div>
              </div>
            </form>
          </div>
        </div>
        <div class="mt-6 flex justify-center flex-row-reverse">
          <button
            type="button"
            @click="transfer(transferAmt, toAddress)"
            class="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-100 dark:focus:ring-blue-400 mx-1"
          >
            Confirm
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
import { defineComponent, computed, inject, ref, watch } from 'vue';
import BN from 'bn.js';
import { useApi } from '@/hooks';
import { web3FromSource } from '@polkadot/extension-dapp';
import * as plasmUtils from '@/helper';
import { useStore } from 'vuex';
import { MutationTypes } from '@/store/mutation-types';
import { ActionTypes } from '@/store/action-types';
import { getUnitNames, getUnit } from '@/helper/units';
import ModalSelectAccountOption from '@/components/balance/ModalSelectAccountOption.vue';
import FormatBalance from '@/components/balance/FormatBalance.vue';
import IconBase from '@/components/icons/IconBase.vue';
// import IconSolidChevronDown from '@/components/icons/IconSolidChevronDown.vue';
import IconAccountSample from '@/components/icons/IconAccountSample.vue';
import IconSolidSelector from '@/components/icons/IconSolidSelector.vue';
// import IconExchange from '@/components/icons/IconExchange.vue';

export default defineComponent({
  components: {
    ModalSelectAccountOption,
    IconBase,
    // IconSolidChevronDown,
    IconAccountSample,
    IconSolidSelector,
    // IconExchange,
    FormatBalance,
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
    balance: {
      type: BN,
      required: true,
    },
  },
  setup(props, { emit }) {
    const closeModal = () => {
      emit('update:is-open', false);
    };

    const openOption = ref(false);

    const unitToken = inject('unitToken', '');
    const decimal = inject('decimal', 10);

    const selAccount = ref(0);
    const transferAmt = ref(0);

    const toAccount = ref(props.allAccounts[0] as string);
    const toAddress = ref(props.allAccounts[0] as string);
    const toAccountName = ref(props.allAccountNames[0]);

    const arrUnitNames = getUnitNames(unitToken);
    const selectUnit = ref(unitToken);

    // const { balance } = useBalance(defaultAccount);
    // provide('balance', balance);

    const formatBalance = computed(() => {
      const tokenDecimal = decimal;
      return plasmUtils.reduceBalanceToDenom(
        props.balance.clone(),
        tokenDecimal
      );
    });

    const { api } = useApi();
    const store = useStore();

    const transfer = async (transferAmt: number, selAddress: string) => {
      console.log('transfer', transferAmt);
      console.log('selAccount', selAddress);
      console.log('selUnit', selectUnit.value);

      if (Number(transferAmt) === 0) {
        store.dispatch(ActionTypes.SHOW_ALERT_MSG, {
          msg: `The amount of token to be transmitted must not be zero`,
          alertType: 'error',
        });
        return;
      } else if (!plasmUtils.isValidAddressPolkadotAddress(selAddress)) {
        store.dispatch(ActionTypes.SHOW_ALERT_MSG, {
          msg: `The address is not valid`,
          alertType: 'error',
        });
        return;
      }

      try {
        const unit = getUnit(selectUnit.value);
        const toAmt = plasmUtils.reduceDenomToBalance(
          transferAmt,
          unit,
          decimal
        );
        console.log('toAmt', toAmt.toString(10));

        const injector = await web3FromSource('polkadot-js');
        const transfer = await api?.value?.tx.balances.transfer(
          selAddress,
          toAmt
        );
        //1000000000000004 : 1 PLD
        transfer
          ?.signAndSend(
            props.address,
            {
              signer: injector.signer,
            },
            ({ status }) => {
              if (status.isInBlock) {
                console.log(
                  `Completed at block hash #${status.asInBlock.toString()}`
                );

                store.dispatch(
                  ActionTypes.SHOW_ALERT_MSG,
                  `Completed at block hash #${status.asInBlock.toString()}`
                );

                store.commit(MutationTypes.SET_LOADING, false);
                emit('complete-transfer', true);

                closeModal();
              } else {
                console.log(`Current status: ${status.type}`);

                if (status.type !== 'Finalized') {
                  store.commit(MutationTypes.SET_LOADING, true);
                }
              }
            }
          )
          .catch((error: any) => {
            console.log(':( transaction failed', error);
          });
        // console.log('Transfer sent with hash', hash?.toHex());
      } catch (e) {
        console.error(e);
      }
    };

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

    return {
      closeModal,
      transfer,
      formatBalance,
      selAccount,
      toAccountName,
      toAddress,
      shortenToAddress,
      openOption,
      transferAmt,
      unitToken,
      arrUnitNames,
      selectUnit,
    };
  },
  methods: {
    setMaxAmount(balance: number) {
      this.transferAmt = balance;
    },
  },
});
</script>
