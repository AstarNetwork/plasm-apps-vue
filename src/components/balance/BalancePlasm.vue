<template>
  <div v-if="isWeb3Injected && isConnected(currentNetworkStatus)">
    <div class="grid lg:grid-cols-2 gap-4 mb-4">
      <Address
        :address="defaultAccount"
        :address-name="defaultAccountName"
        v-model:isOpen="modalAccount"
      />
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
      <TotalBalance />
      <PlmBalance
        :address="defaultAccount"
        v-model:isOpenTransfer="modalTransferAmount"
      />
    </div>

    <!-- <h2 class="text-blue-900 dark:text-white text-lg font-bold my-3">Tokens</h2>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <Token v-model:isOpenTransfer="modalTransferToken" />
    </div> -->

    <!-- Modals -->
    <ModalAccount
      v-if="modalAccount"
      v-model:isOpen="modalAccount"
      :account-idx="currentAccountIdx"
      :all-accounts="allAccounts"
      :all-account-names="allAccountNames"
    />
    <ModalTransferAmount
      v-if="modalTransferAmount"
      v-model:isOpen="modalTransferAmount"
      v-on:completeTransfer="completeTransfer"
      :all-accounts="allAccounts"
      :all-account-names="allAccountNames"
      :balance="balance"
    />
    <ModalTransferToken
      v-if="modalTransferToken"
      v-model:isOpen="modalTransferToken"
    />
  </div>

  <modal-alert-box
    v-if="!isWeb3Injected"
    :hasClose="false"
    msg="Web3 is not found in the browser. You should install the polkadot extension or wallet."
  />
</template>
<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  computed,
  watch,
  provide,
  ref,
} from 'vue';
import { useAccount, useBalance, useApi } from '@/hooks';
import { useStore } from 'vuex';
import { useMeta } from 'vue-meta';
import { isWeb3Injected } from '@polkadot/extension-dapp';
import Address from '@/components/balance/Address.vue';
import PlmBalance from '@/components/balance/PlmBalance.vue';
import TotalBalance from '@/components/balance/TotalBalance.vue';
// import Token from '@/components/balance/Token.vue';
import ModalAlertBox from '@/components/common/ModalAlertBox.vue';
import ModalAccount from '@/components/balance/ModalAccount.vue';
import ModalTransferAmount from '@/components/balance/ModalTransferAmount.vue';
import ModalTransferToken from '@/components/balance/ModalTransferToken.vue';

interface Modal {
  modalAccount: boolean;
  modalTransferAmount: boolean;
  modalTransferToken: boolean;
}

export default defineComponent({
  components: {
    Address,
    PlmBalance,
    TotalBalance,
    // Token,
    ModalAlertBox,
    ModalAccount,
    ModalTransferAmount,
    ModalTransferToken,
  },
  setup() {
    useMeta({ title: 'Balance-Plasm' });

    const stateModal = reactive<Modal>({
      modalAccount: false,
      modalTransferAmount: false,
      modalTransferToken: false,
    });

    const {
      allAccounts,
      allAccountNames,
      defaultAccount,
      defaultAccountName,
    } = useAccount();

    const { api } = useApi();

    const store = useStore();

    const { balance } = useBalance(api, defaultAccount);
    provide('balance', balance);

    const currentNetworkStatus = computed(() => store.getters.networkStatus);
    const currentAccountIdx = computed(() => store.getters.accountIdx);

    const completeTransfer = () => {
      const curAccountRef = ref(defaultAccount.value);
      const { balance: balanceRef } = useBalance(api, curAccountRef);

      watch(balanceRef, () => {
        console.log('new balance:', balance.value);
        balance.value = balanceRef.value;
      });
    };

    watch(
      currentAccountIdx,
      () => {
        defaultAccount.value = allAccounts.value[currentAccountIdx.value];
        defaultAccountName.value =
          allAccountNames.value[currentAccountIdx.value];
      },
      { immediate: true }
    );

    return {
      ...toRefs(stateModal),
      isWeb3Injected,
      balance,
      allAccounts,
      allAccountNames,
      defaultAccount,
      defaultAccountName,
      currentNetworkStatus,
      currentAccountIdx,
      completeTransfer,
    };
  },
  methods: {
    isConnected(networkStatus: string) {
      return networkStatus === 'connected';
    },
  },
});
</script>
