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
                  Send from
                </label>

                <modal-select-account
                  :allAccounts="allAccounts"
                  :allAccountNames="allAccountNames"
                  v-model:selAddress="fromAddress"
                />
              </div>

              <div class="mb-4">
                <label
                  class="block text-sm font-medium text-gray-500 dark:text-darkGray-400 mb-2"
                >
                  Send to
                </label>

                <modal-select-account
                  :allAccounts="allAccounts"
                  :allAccountNames="allAccountNames"
                  v-model:selAddress="toAddress"
                />
              </div>
              <label
                class="block text-sm font-medium text-gray-500 dark:text-darkGray-400 mb-2"
              >
                Amount
              </label>
              <input-balance
                :maxBalanceInDefaultUnit="formatBalance"
                v-model:balance="transferAmt"
                v-model:unit="selectUnit"
              />
            </form>
          </div>
        </div>
        <div class="mt-6 flex justify-center flex-row-reverse">
          <button
            type="button"
            @click="transfer(transferAmt, fromAddress, toAddress)"
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
import { defineComponent, computed, inject, ref } from 'vue';
import BN from 'bn.js';
import { useApi } from '@/hooks';
import { web3FromSource } from '@polkadot/extension-dapp';
import * as plasmUtils from '@/helper';
import { useStore } from 'vuex';
import { MutationTypes } from '@/store/mutation-types';
import { ActionTypes } from '@/store/action-types';
import { getUnit } from '@/helper/units';
import ModalSelectAccount from '@/components/balance/ModalSelectAccount.vue';
import FormatBalance from '@/components/balance/FormatBalance.vue';
import InputBalance from '@/components/common/InputBalance.vue';

export default defineComponent({
  components: {
    ModalSelectAccount,
    FormatBalance,
    InputBalance,
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

    const transferAmt = ref(0);
    const fromAddress = ref('');
    const toAddress = ref('');

    // const arrUnitNames = getUnitNames(unitToken);
    const selectUnit = ref(unitToken);

    const formatBalance = computed(() => {
      const tokenDecimal = decimal;
      return plasmUtils.reduceBalanceToDenom(
        props.balance.clone(),
        tokenDecimal
      );
    });

    const { api } = useApi();
    const store = useStore();

    const transfer = async (
      transferAmt: number,
      fromAddress: string,
      toAddress: string
    ) => {
      console.log('transfer', transferAmt);
      console.log('fromAccount', fromAddress);
      console.log('toAccount', toAddress);
      console.log('selUnit', selectUnit.value);

      if (Number(transferAmt) === 0) {
        store.dispatch(ActionTypes.SHOW_ALERT_MSG, {
          msg: `The amount of token to be transmitted must not be zero`,
          alertType: 'error',
        });
        return;
      } else if (
        !plasmUtils.isValidAddressPolkadotAddress(fromAddress) ||
        !plasmUtils.isValidAddressPolkadotAddress(toAddress)
      ) {
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
          toAddress,
          toAmt
        );
        //1000000000000004 : 1 PLD
        transfer
          ?.signAndSend(
            fromAddress,
            {
              signer: injector.signer,
            },
            ({ status }) => {
              if (status.isInBlock) {
                console.log(
                  `Completed at block hash #${status.asInBlock.toString()}`
                );

                store.dispatch(ActionTypes.SHOW_ALERT_MSG, {
                  msg: `Completed at block hash #${status.asInBlock.toString()}`,
                  alertType: 'success',
                });

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

    return {
      closeModal,
      transfer,
      formatBalance,
      fromAddress,
      toAddress,
      openOption,
      transferAmt,
      unitToken,
      selectUnit,
    };
  },
});
</script>
